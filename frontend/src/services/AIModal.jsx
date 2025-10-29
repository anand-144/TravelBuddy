import { GoogleGenAI } from "@google/genai";
import { AI_PROMPT } from "../components/Options";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const lastPlanCache = {};

function safeJSONParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    try {
      const cleaned = text
        .replace(/```json|```/g, "")
        .replace(/\n+/g, " ")
        .replace(/\r/g, "")
        .replace(/,\s*([\]}])/g, "$1")
        .replace(/\s{2,}/g, " ")
        .trim();
      const jsonStart = cleaned.indexOf("{");
      const jsonEnd = cleaned.lastIndexOf("}");
      return JSON.parse(cleaned.slice(jsonStart, jsonEnd + 1));
    } catch {
      return null;
    }
  }
}

function buildPrompt(location, duration, travelers, budget) {
  const basePrompt = AI_PROMPT
    .replace("{location}", location)
    .replace("{duration}", duration)
    .replace("{travelers}", travelers)
    .replace("{budget}", budget);

  return `${basePrompt}
Additionally:
- Use only Indian Rupees (₹ INR) for all prices.
- Return valid JSON only.
{
  "hotels": [...],
  "itinerary": {...},
  "total_estimate": "₹xxxx"
}`;
}

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

      // Add Unsplash images
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

// 🌄 Fetch Unsplash image helper
async function fetchUnsplashImage(query) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&client_id=${UNSPLASH_KEY}&orientation=landscape&per_page=1`
    );
    const data = await res.json();
    return data.results?.[0]?.urls?.regular || null;
  } catch (e) {
    console.warn("Unsplash fetch failed:", e);
    return null;
  }
}

// 🖼️ Add images to hotels + itinerary
async function enrichWithImages(plan, location) {
  const destinationImage = await fetchUnsplashImage(`${location} travel`);

  if (plan.hotels) {
    for (const h of plan.hotels) {
      h.image_url =
        (await fetchUnsplashImage(`${h.name} hotel ${location}`)) ||
        (await fetchUnsplashImage(`${location} hotel`));
    }
  }

  if (plan.itinerary) {
    for (const [day, places] of Object.entries(plan.itinerary)) {
      for (const p of places) {
        p.image_url =
          (await fetchUnsplashImage(`${p.place_name} ${location}`)) ||
          (await fetchUnsplashImage(`${location} travel`));
      }
    }
  }

  return { ...plan, image: destinationImage };
}
