import { GoogleGenAI } from "@google/genai";
import { AI_PROMPT } from "../components/Options";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const lastPlanCache = {};
const MAX_DAYS_PER_SEGMENT = 10;
const isDev = import.meta.env.DEV;


function robustParse(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return baseFallback("Empty AI response");
  }

  try {
    return JSON.parse(rawText);
  } catch {
    try {
      // Basic cleanup
      let fixed = rawText
        .replace(/```json|```/gi, "")
        .replace(/^[^\[{]+/, "")
        .replace(/[^}\]]+$/, "")
        .replace(/\r?\n|\r/g, " ")
        .replace(/\s{2,}/g, " ")
        .replace(/“|”|‘|’/g, '"')
        .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":')
        .replace(/'/g, '"')
        .replace(/,\s*([\]}])/g, "$1")
        .trim();

      // Add missing commas between quoted values
      fixed = fixed.replace(/"(\s*")/g, '", "$1');

      // Fix missing commas between objects
      fixed = fixed.replace(/}\s*{/g, '}, {');

      // Ensure braces balance
      const openCurly = (fixed.match(/{/g) || []).length;
      const closeCurly = (fixed.match(/}/g) || []).length;
      if (openCurly > closeCurly) fixed += "}".repeat(openCurly - closeCurly);

      const openSquare = (fixed.match(/\[/g) || []).length;
      const closeSquare = (fixed.match(/]/g) || []).length;
      if (openSquare > closeSquare) fixed += "]".repeat(openSquare - closeSquare);

      // Parse safely
      const parsed = JSON.parse(fixed);
      return normalizePlan(parsed);
    } catch {
      return baseFallback("Unrecoverable malformed JSON");
    }
  }
}

/* ---------------------------------------------------------
   🧱 Fallback Builder (Never Fails)
--------------------------------------------------------- */
function baseFallback(reason) {
  return {
    hotels: [],
    itinerary: {},
    optional_experiences: [],
    travel_tips: [],
    total_estimate: "N/A",
    _warning: reason,
  };
}

/* ---------------------------------------------------------
   🧩 Normalize Partial Plans
--------------------------------------------------------- */
function normalizePlan(obj) {
  if (typeof obj !== "object" || Array.isArray(obj)) return baseFallback("Non-object AI output");
  return {
    hotels: obj.hotels || [],
    itinerary: obj.itinerary || {},
    optional_experiences: obj.optional_experiences || [],
    travel_tips: obj.travel_tips || [],
    total_estimate: obj.total_estimate || "N/A",
  };
}

/* ---------------------------------------------------------
   🧠 Prompt Builder
--------------------------------------------------------- */
function buildPrompt(location, duration, travelers, budget, segment) {
  const basePrompt = AI_PROMPT
    .replace("{location}", location)
    .replace("{duration}", duration)
    .replace("{travelers}", travelers)
    .replace("{budget}", budget);

  return `${basePrompt}

STRICT INSTRUCTIONS:
- Output ONLY valid JSON. No markdown, commentary, or notes.
- Double-check that all keys and string values use double quotes.
- Ensure commas separate every key/value pair.
- Do not include trailing commas.
- Start with '{' and end with '}'.
- Use this schema exactly:
{
  "hotels": [...],
  "itinerary": { "day${segment.startDay}": [...], ... },
  "optional_experiences": [...],
  "travel_tips": [...],
  "total_estimate": "₹xxxx"
}`;
}

/* ---------------------------------------------------------
   🌎 Unsplash Image Helper
--------------------------------------------------------- */
async function fetchUnsplashImage(query) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&client_id=${UNSPLASH_KEY}&orientation=landscape&per_page=1`
    );

    if (res.status === 403) return "RATE_LIMIT_EXCEEDED";

    const data = await res.json();
    return data.results?.[0]?.urls?.regular || null;
  } catch {
    return null;
  }
}

function handleImage(img) {
  return img === "RATE_LIMIT_EXCEEDED"
    ? "⚠️ Image temporarily unavailable"
    : img;
}

/* ---------------------------------------------------------
   🎨 Image Enrichment
--------------------------------------------------------- */
async function enrichWithImages(plan, location) {
  const destinationImage = await fetchUnsplashImage(`${location} travel`);

  if (plan.hotels) {
    for (const h of plan.hotels) {
      const img = await fetchUnsplashImage(`${h.name} hotel ${location}`);
      h.image_url = handleImage(img) || handleImage(destinationImage);
    }
  }

  if (plan.itinerary) {
    for (const [day, places] of Object.entries(plan.itinerary)) {
      for (const p of places) {
        p.ticket_pricing =
          p.ticket_pricing || p.ticket_price || p.price || p.entry_fee || "N/A";
        const img = await fetchUnsplashImage(`${p.place_name} ${location}`);
        p.image_url = handleImage(img) || handleImage(destinationImage);
      }
    }
  }

  if (plan.optional_experiences) {
    for (const o of plan.optional_experiences) {
      const img = await fetchUnsplashImage(`${o.name} ${location}`);
      o.image_url = handleImage(img) || handleImage(destinationImage);
    }
  }

  return { ...plan, image: handleImage(destinationImage) };
}

/* ---------------------------------------------------------
   🚀 Main Generator (Never Crashes)
--------------------------------------------------------- */
export async function generateTravelPlan(location, duration, travelers, budget) {
  if (!location || !duration || !travelers || !budget)
    return { error: true, message: "Please provide all details." };

  const cacheKey = `${location}-${duration}-${travelers}-${budget}`;
  if (lastPlanCache[cacheKey]) return lastPlanCache[cacheKey];

  const totalSegments = Math.ceil(duration / MAX_DAYS_PER_SEGMENT);
  const segmentPromises = [];

  for (let i = 0; i < totalSegments; i++) {
    const startDay = i * MAX_DAYS_PER_SEGMENT + 1;
    const endDay = Math.min((i + 1) * MAX_DAYS_PER_SEGMENT, duration);

    const prompt = buildPrompt(location, duration, travelers, budget, {
      index: i + 1,
      total: totalSegments,
      startDay,
      endDay,
    });

    const segmentPromise = (async () => {
      let fullText = "";
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const responseStream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
              temperature: attempt === 0 ? 0.9 : 0.4,
              topP: 0.9,
              maxOutputTokens: 8192,
              responseMimeType: "application/json",
            },
          });

          for await (const chunk of responseStream)
            if (chunk.text) fullText += chunk.text;

          const parsed = robustParse(fullText);
          if (parsed && Object.keys(parsed.itinerary || {}).length) return parsed;
        } catch {
          /* retry automatically */
        }
      }
      return baseFallback("No valid AI response");
    })();

    segmentPromises.push(segmentPromise);
  }

  try {
    const segments = await Promise.all(segmentPromises);

    const merged = segments.reduce(
      (acc, part) => {
        acc.hotels.push(...(part.hotels || []));
        acc.optional_experiences.push(...(part.optional_experiences || []));
        acc.travel_tips.push(...(part.travel_tips || []));
        acc.itinerary = { ...acc.itinerary, ...(part.itinerary || {}) };
        return acc;
      },
      baseFallback("Merged")
    );

    const enriched = await enrichWithImages(merged, location);
    lastPlanCache[cacheKey] = enriched;
    return enriched;
  } catch {
    return baseFallback("Global failure");
  }
}
