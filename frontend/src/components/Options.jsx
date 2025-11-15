export const SelectTravelersList = [
  {
    id: 1,
    title: "Solo Explorer",
    desc: "Traveling alone to discover new places and yourself.",
    icon: "🧭",
    people: "1 Person",
  },
  {
    id: 2,
    title: "Romantic Getaway",
    desc: "A cozy trip for two filled with love and adventure.",
    icon: "💑",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family Vacation",
    desc: "Fun-filled adventures for the whole family to enjoy.",
    icon: "👨‍👩‍👧‍👦",
    people: "3–5 People",
  },
  {
    id: 4,
    title: "Friends Trip",
    desc: "A lively getaway with your favorite travel buddies.",
    icon: "🎒",
    people: "4–6 People",
  },
  {
    id: 5,
    title: "Group Adventure",
    desc: "An organized trip for large groups and travel enthusiasts.",
    icon: "🚌",
    people: "6+ People",
  },
];


export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Budget Friendly",
    desc: "Keep it light on the wallet without missing the fun.",
    icon: "💰",
  },
  {
    id: 2,
    title: "Moderate Comfort",
    desc: "Balance comfort and cost with smart travel choices.",
    icon: "🏝️",
  },
  {
    id: 3,
    title: "Luxury Escape",
    desc: "Indulge in premium experiences and top-tier stays.",
    icon: "💎",
  },
  {
    id: 4,
    title: "Adventure Seeker",
    desc: "Spend where it matters — on thrill and experiences.",
    icon: "🧗‍♂️",
  },
];

export const AI_PROMPT =
  'Generate a detailed AI-powered Travel Plan for Location: {location}, for {duration} Days, for {travelers} travelers, with a {budget} budget. ' +
  'The plan must include:\n' +
  '1) Hotels — name, address, price (₹ INR), geo coordinates, rating, short description, and image_url.\n' +
  '2) A day-wise itinerary — for each day, list 4–6 attractions or experiences with:\n' +
  '   - place_name, description, geo coordinates, ticket_price (₹ INR), rating, best_time_to_visit.\n' +
  '   - Include at least one hidden gem (lesser-known attraction) and one local food/cafe suggestion each day.\n' +
  '3) Optional experiences — like shopping areas, cultural events, nightlife, or outdoor adventures.\n' +
  '4) Travel tips — short bullet points about transport, local customs, and safety.\n' +
  '5) Total estimate (₹ INR) including hotels, food, and activities.\n' +
  'Return strictly valid JSON only in this format:\n' +
  '{\n' +
  '  "hotels": [...],\n' +
  '  "itinerary": { "day1": [...], "day2": [...], "day3": [...] },\n' +
  '  "optional_experiences": [...],\n' +
  '  "travel_tips": [...],\n' +
  '}\n' +
  'Do not include markdown symbols (**), bullets (•), or formatting — return clean plain text only. ' +
  'Return strictly valid JSON in this format: { ... }';