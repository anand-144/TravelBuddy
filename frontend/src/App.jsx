import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
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
import ServerLoading from "./pages/ServerLoading";
const AppContent = () => {
  const location = useLocation();
  const hideFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#333", color: "#fff" },
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

      {!hideFooter && <Footer />}
    </>
  );
};

function App(){
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
