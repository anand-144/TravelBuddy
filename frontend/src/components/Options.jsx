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
  'Generate a Travel Plan for Location: {location}, for {duration} Days for {travelers} with a {budget} budget. ' +
  'Provide: ' +
  '1) A list of hotels (name, address, price, image URL, geo coordinates, rating, and short description), ' +
  '2) A 3-day itinerary (day-wise plan with place name, details, image URL, geo coordinates, ticket pricing, rating, and best time to visit). ' +
  'Return strictly valid JSON in this format: ' +
  '{ "hotels": [ ... ], "itinerary": { "day1": [ ... ], "day2": [ ... ], "day3": [ ... ] } }. ' +
  'Do not include markdown, code blocks, or explanations — only JSON.';
