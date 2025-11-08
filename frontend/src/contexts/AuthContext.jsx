// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user profile on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userData = res.data.user || res.data;
        setUser(userData);

        // ✅ Also ensure userId stays in localStorage
        if (userData?._id) localStorage.setItem("userId", userData._id);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Email signup
  const signUp = async (email, password, fullName) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        email,
        password,
        fullName,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id); // 🔹 ADD THIS
      setUser(user);

      return { data: res.data };
    } catch (error) {
      return { error: error.response?.data || error.message };
    }
  };

  // ✅ Email login
  const signIn = async (email, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id); // 🔹 ADD THIS
      setUser(user);

      return { data: res.data };
    } catch (error) {
      return { error: error.response?.data || error.message };
    }
  };

  // ✅ Google login
  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, {
          credential: tokenResponse.access_token,
        });

        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user._id); // 🔹 ADD THIS
        setUser(user);
      } catch (err) {
        toast.error("Google login failed:", err);
      }
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  // ✅ Logout
  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // 🔹 ALSO CLEAR THIS
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
  