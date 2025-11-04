import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaGlobeAsia, FaUser, FaSignOutAlt, FaBookOpen, FaSuitcase } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user) {
      console.log("🧑‍💻 Logged in user data:", {
        name: user.full_name || user.name,
        email: user.email,
        avatar: user?.raw?.avatar_url || user.picture,
        raw: user,
      });
    }
  }, [user]);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <FaGlobeAsia className="text-3xl text-violet-600 group-hover:rotate-[360deg] transition-all duration-1000" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              TravelBuddy
            </h1>
          </Link>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-violet-50 to-blue-50 rounded-full hover:shadow-md transition-all"
                >
                  {user?.raw?.avatar_url ? (
                    <img
                      src={user?.raw?.avatar_url}
                      alt={user.full_name || user.email}
                      className="w-8 h-8 rounded-full border-2 border-violet-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                      {(user.full_name || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-gray-700 hidden sm:block cursor-pointer">
                    {user.full_name || user.email?.split("@")[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-2 animate-fadeIn">
                    <Link
                      to="/saved-trips"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaSuitcase className="text-sm" />
                      Your Trips
                    </Link>
                    <Link
                      to="/memory-board"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaBookOpen className="text-sm" />
                      Memories
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      <FaSignOutAlt className="text-sm" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <FaUser className="text-sm" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
