import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateTrip from './pages/CreateTrip';
import Home from './pages/Home';
import Header from './components/Header';
import TripResult from './pages/TripResult';
import TripMap from './pages/TripMap';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/trip-result" element={<TripResult />} />
        <Route path="/trip-map" element={<TripMap />} />
      </Routes>
    </Router>
  );
}

export default App;
