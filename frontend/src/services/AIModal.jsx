// 📦 generateTravelPlan.js
import { GoogleGenAI } from "@google/genai";
import { AI_PROMPT } from "../components/Options";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const lastPlanCache = {};
const MAX_DAYS_PER_SEGMENT = 10;

/* ---------------------------------------------------------
   🧹 Ultra-Robust JSON Cleaner + Auto-Healer
--------------------------------------------------------- */
function safeJSONParse(rawText) {
  if (!rawText || typeof rawText !== "string") return null;

  try {
    return JSON.parse(rawText);
  } catch {
    try {
      let cleaned = rawText
        .replace(/```json|```/gi, "")
        .replace(/^[^\[{]+/, "")
        .replace(/[^}\]]+$/, "")
        .replace(/\n|\r/g, " ")
        .replace(/\s{2,}/g, " ")
        .replace(/“|”|‘|’/g, '"')
        .replace(/,\s*([\]}])/g, "$1")
        .trim();

      // Balance braces/brackets
      const openCurly = (cleaned.match(/{/g) || []).length;
      const closeCurly = (cleaned.match(/}/g) || []).length;
      if (openCurly > closeCurly) cleaned += "}".repeat(openCurly - closeCurly);

      const openSquare = (cleaned.match(/\[/g) || []).length;
      const closeSquare = (cleaned.match(/]/g) || []).length;
      if (openSquare > closeSquare) cleaned += "]".repeat(openSquare - closeSquare);

      const start = cleaned.search(/[{[]/);
      if (start > 0) cleaned = cleaned.slice(start);

      const endCurly = cleaned.lastIndexOf("}");
      const endSquare = cleaned.lastIndexOf("]");
      const endIndex = Math.max(endCurly, endSquare);
      if (endIndex > -1) cleaned = cleaned.slice(0, endIndex + 1);

      return JSON.parse(cleaned);
    } catch (err) {
      console.warn("⚠️ AI output could not be parsed perfectly, returning fallback object.");
      return {
        hotels: [],
        itinerary: {},
        optional_experiences: [],
        travel_tips: [],
        total_estimate: "N/A",
        _rawText: rawText?.slice(0, 1000),
      };
    }
  }
}

/* ---------------------------------------------------------
   🧠 Build a strict JSON-only AI prompt
--------------------------------------------------------- */
function buildPrompt(location, duration, travelers, budget, segment) {
  const basePrompt = AI_PROMPT
    .replace("{location}", location)
    .replace("{duration}", duration)
    .replace("{travelers}", travelers)
    .replace("{budget}", budget);

  return `${basePrompt}

CRITICAL INSTRUCTIONS:
- You are generating part ${segment?.index || 1} of ${segment?.total || 1} of this travel plan.
- Focus on days ${segment?.startDay} to ${segment?.endDay}.
- Output ONLY valid JSON — start directly with '{' and end with '}'.
- No text, markdown, or commentary outside JSON.
- All prices in INR.
- Use this exact schema:
{
  "hotels": [...],
  "itinerary": { "day${segment?.startDay}": [...], ... },
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

    if (res.status === 403) {
      console.warn("⚠️ Unsplash rate limit reached.");
      return "RATE_LIMIT_EXCEEDED";
    }

    const data = await res.json();
    return data.results?.[0]?.urls?.regular || null;
  } catch (e) {
    console.warn("Unsplash fetch failed:", e.message);
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

  // Hotels
  if (plan.hotels) {
    for (const h of plan.hotels) {
      const img = await fetchUnsplashImage(`${h.name} hotel ${location}`);
      h.image_url = handleImage(img) || handleImage(destinationImage);
    }
  }

  // Itinerary
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

  // Optional Experiences
  if (plan.optional_experiences) {
    for (const o of plan.optional_experiences) {
      const img = await fetchUnsplashImage(`${o.name} ${location}`);
      o.image_url = handleImage(img) || handleImage(destinationImage);
    }
  }

  return { ...plan, image: handleImage(destinationImage) };
}

/* ---------------------------------------------------------
   🚀 Main: Generate Travel Plan (with auto-split)
--------------------------------------------------------- */
export async function generateTravelPlan(location, duration, travelers, budget) {
  if (!location || !duration || !travelers || !budget) {
    return { error: true, message: "Please provide all details." };
  }

  const cacheKey = `${location}-${duration}-${travelers}-${budget}`;
  if (lastPlanCache[cacheKey]) return lastPlanCache[cacheKey];

  // Split into segments of 10 days max
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
      try {
        const responseStream = await ai.models.generateContentStream({
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            temperature: 0.9,
            topP: 0.95,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          },
        });

        let fullText = "";
        for await (const chunk of responseStream) if (chunk.text) fullText += chunk.text;
        const parsed = safeJSONParse(fullText);
        return parsed || {};
      } catch (err) {
        console.warn(`❌ Segment ${i + 1} failed:`, err);
        return { itinerary: {}, hotels: [], optional_experiences: [], travel_tips: [] };
      }
    })();

    segmentPromises.push(segmentPromise);
  }

  try {
    const segments = await Promise.all(segmentPromises);

    // Merge segments intelligently
    const merged = segments.reduce(
      (acc, part) => {
        acc.hotels.push(...(part.hotels || []));
        acc.optional_experiences.push(...(part.optional_experiences || []));
        acc.travel_tips.push(...(part.travel_tips || []));
        acc.itinerary = { ...acc.itinerary, ...(part.itinerary || {}) };
        return acc;
      },
      { hotels: [], itinerary: {}, optional_experiences: [], travel_tips: [] }
    );

    const enriched = await enrichWithImages(merged, location);
    lastPlanCache[cacheKey] = enriched;
    return enriched;
  } catch (err) {
    console.error("AI travel plan generation failed:", err);
    return { error: true, message: "Failed to generate travel plan. Please try again." };
  }
}
