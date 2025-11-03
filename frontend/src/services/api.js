import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
  withCredentials: false, // set to true only if backend uses cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // make sure token key matches AuthContext
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
