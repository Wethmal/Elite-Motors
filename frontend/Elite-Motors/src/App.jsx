import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CarPage from './pages/CarPage';
// import AboutUs from './pages/AboutUs';
// import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarPage />} />
        {/* <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} /> */}
      </Routes>
    </Router>
  );
}

export default App;