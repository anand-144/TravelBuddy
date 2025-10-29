// src/services/CurrencyUtils.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY; // ✅ use VITE_ prefix for Vite

export const SUPPORTED_CURRENCIES = [
  { code: "USD", name: "US Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
];

export const fetchExchangeRates = async () => {
  try {
    const res = await axios.get("http://api.currencyapi.com/v3/latest?apikey=cur_live_j55oZ0wymplPAgBNA7PHZjO9w8ir4eHLwO27k5Oc&base_currency=USD&currencies=CAD", {
      params: {
        apikey: API_KEY,
        base_currency: "USD",
      },
    });

    const data = res.data?.data;
    const rates = {};
    for (const key in data) {
      rates[key] = data[key].value;
    }

    return rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return {};
  }
};

// 🪙 Convert a USD price string like "$100" or "USD 120" to target currency
export const convertUSDTo = (usdString = "", target = "INR", rates = {}) => {
  if (!usdString) return `— ${target}`;

  const numeric = parseFloat(usdString.replace(/[^0-9.]/g, ""));
  if (isNaN(numeric)) return `— ${target}`;

  const rate = rates[target] || 1;
  const value = numeric * rate;

  const symbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
  };

  const symbol = symbols[target] || target;
  return `${symbol}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};
