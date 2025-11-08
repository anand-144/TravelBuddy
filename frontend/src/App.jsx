import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster
import CreateTrip from "./pages/CreateTrip";
import Home from "./pages/Home";
import Header from "./components/Header";
import TripResult from "./pages/TripResult";
import TripMap from "./pages/TripMap";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MemoryBoard from "./components/MemoryBoard";
import SavedTrips from "./pages/SavedTrips";
import GroupChat from "./pages/GroupChat";
import NotFound from "./pages/NotFound";

// ✅ Separate wrapper to access useLocation inside Router
const AppContent = () => {
  const location = useLocation();

  // ✅ Hide Footer on login/register pages
  const hideFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {/* ✅ Global Toaster (for toast notifications anywhere in app) */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trip-result" element={<TripResult />} />
        <Route path="/trip-map" element={<TripMap />} />
        <Route path="/memory-board" element={<MemoryBoard />} />
        <Route path="/saved-trips" element={<SavedTrips />} />
        <Route path="/chat/:groupId" element={<GroupChat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ✅ Footer visible on all pages except login/register */}
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
