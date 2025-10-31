import { GoogleGenAI } from "@google/genai";
import { AI_PROMPT } from "../components/Options";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const lastPlanCache = {};

// 🧹 Robust JSON cleaner and parser
function safeJSONParse(rawText) {
  try {
    return JSON.parse(rawText);
  } catch {
    try {
      let cleaned = rawText
        .replace(/```json|```/gi, "")
        .replace(/^[^\[{]+/, "") // remove text before JSON
        .replace(/[^}\]]+$/, "") // remove text after JSON
        .replace(/\n|\r/g, " ")
        .replace(/\s{2,}/g, " ")
        .replace(/,\s*([\]}])/g, "$1") // remove trailing commas
        .replace(/“|”/g, '"') // replace smart quotes
        .trim();

      const jsonStart = cleaned.indexOf("{");
      const jsonEnd = cleaned.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found");

      const jsonString = cleaned.slice(jsonStart, jsonEnd + 1);
      return JSON.parse(jsonString);
    } catch (err) {
      console.error("❌ JSON parse failed, raw text:", rawText.slice(0, 300));
      return null;
    }
  }
}

// 🧠 Build a strict JSON-only prompt
function buildPrompt(location, duration, travelers, budget) {
  const basePrompt = AI_PROMPT
    .replace("{location}", location)
    .replace("{duration}", duration)
    .replace("{travelers}", travelers)
    .replace("{budget}", budget);

  return `${basePrompt}

CRITICAL INSTRUCTIONS (READ CAREFULLY):
- Output ONLY valid JSON — start directly with '{' and end with '}'.
- Do NOT include any extra text, explanations, markdown, or "Sure!" prefixes.
- No bullet points, no bold, no backticks.
- All text should be plain English.
- Use only Indian Rupees for prices.
- No trailing commas or invalid syntax.
- End output immediately after closing brace.

EXPECTED JSON FORMAT:
{
  "hotels": [...],
  "itinerary": { "day1": [...], "day2": [...], "day3": [...] },
  "optional_experiences": [...],
  "travel_tips": [...],
  "total_estimate": "₹xxxx"
}`;
}

// 🧭 Generate AI travel plan
export async function generateTravelPlan(location, duration, travelers, budget) {
  if (!location || !duration || !travelers || !budget) {
    return { error: true, message: "Please provide all details." };
  }

  const cacheKey = `${location}-${duration}-${travelers}-${budget}`;
  if (lastPlanCache[cacheKey]) return lastPlanCache[cacheKey];

  const prompt = buildPrompt(location, duration, travelers, budget);

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Response timeout")), 180000)
    );

    const aiPromise = (async () => {
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
      if (!parsed) throw new Error("Invalid AI JSON response");

      const result = await enrichWithImages(parsed, location);
      lastPlanCache[cacheKey] = result;
      return result;
    })();

    return await Promise.race([aiPromise, timeoutPromise]);
  } catch (err) {
    console.error("AI travel plan generation failed:", err);
    return {
      error: true,
      message: "Failed to generate travel plan. Please try again.",
    };
  }
}

// 🖼️ Fetch Unsplash image with fallback
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

// 🎨 Enrich AI output with images and fix ticket pricing
async function enrichWithImages(plan, location) {
  const destinationImage = await fetchUnsplashImage(`${location} travel`);
  const handleImage = (img) =>
    img === "RATE_LIMIT_EXCEEDED" ? "⚠️ Image temporarily unavailable" : img;

  // Add hotel images
  if (plan.hotels) {
    for (const h of plan.hotels) {
      const img = await fetchUnsplashImage(`${h.name} hotel ${location}`);
      h.image_url = handleImage(img) || handleImage(destinationImage);
    }
  }

  // Add itinerary images and normalize ticket pricing
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
// Add optional experiences images
  if (plan.optional_experiences) {
    for (const o of plan.optional_experiences) {
      const img = await fetchUnsplashImage(`${o.name} ${location}`);
      o.image_url = handleImage(img) || handleImage(destinationImage);
    }
  }

  return { ...plan, image: handleImage(destinationImage) };
}