import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGlobeAmericas, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

   useEffect(() => {
    if (user) {
      console.log("🧑‍💻 Logged in user data:", {
        name: user.full_name || user.name,
        email: user.email,
        avatar: user.avatar_url || user.picture,
        raw: user, // shows the complete object
      });
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <FaGlobeAmericas className="text-3xl text-violet-600 group-hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              TravelBuddy
            </h1>
          </Link>

          {/* Right section */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-violet-50 to-blue-50 rounded-full">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.fullName || user.email}
                    className="w-8 h-8 rounded-full border-2 border-violet-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {(user.fullname || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                  {user.fullname || user.email?.split('@')[0]}
                </span>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <FaSignOutAlt className="text-sm" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
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
    </header>
  );
};

export default Header;
