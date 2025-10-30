import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load profile on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user || res.data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Email signup
  const signUp = async (email, password, fullName) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
        fullName,
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return { data: res.data };
    } catch (error) {
      return { error: error.response?.data || error.message };
    }
  };

  // ✅ Email login
  const signIn = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return { data: res.data };
    } catch (error) {
      return { error: error.response?.data || error.message };
    }
  };

  // ✅ Google login
  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/google", {
          credential: tokenResponse.access_token,
        });
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      } catch (err) {
        console.error("Google login failed:", err);
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
  });

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
