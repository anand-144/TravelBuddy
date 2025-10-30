import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import CreateTrip from './pages/CreateTrip';
import Home from './pages/Home';
import Header from './components/Header';
import TripResult from './pages/TripResult';
import TripMap from './pages/TripMap';
import Login from './pages/Login';
import Register from './pages/Register';
;

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trip-result" element={<TripResult />} />
          <Route path="/trip-map" element={<TripMap />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
