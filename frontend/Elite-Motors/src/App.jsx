import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Components ---
import Navbar from './components/Navbar';
import Footer from './components/footer'; 
import AdminLayout from './components/AdminLayout'; 

// --- Customer Pages ---
import Home from './pages/Home';
import CarPage from './pages/CarPage';
import AboutUs from './pages/bout'; 
import ContactUs from './pages/ContactUs';
import CarDetails from './pages/CarDetails';
import Booking from './pages/Booking';

// --- Admin Pages ---
import Dashboard from './pages/admin/Dashboard'; 
import ManageCars from './pages/admin/ManageCars';
import EditCarModal from './pages/admin/EditCarModal';


// 1. Customer Layout 
const CustomerLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        
        {/* === Customer Routes (Navbar + Footer ) === */}
        <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
        <Route path="/cars" element={<CustomerLayout><CarPage /></CustomerLayout>} />
        <Route path="/about" element={<CustomerLayout><AboutUs /></CustomerLayout>} />
        <Route path="/contact" element={<CustomerLayout><ContactUs /></CustomerLayout>} />
        <Route path="/cars/:id" element={<CustomerLayout><CarDetails /></CustomerLayout>} />
        <Route path="/booking/:id" element={<CustomerLayout><Booking /></CustomerLayout>} />

        {/* === Admin Routes (Sidebar ) === */}
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/cars" element={<AdminLayout><ManageCars /></AdminLayout>} /> 
        <Route path="/admin/cars/edit/:id" element={<AdminLayout><EditCarModal /></AdminLayout>} />

      </Routes>
    </Router>
  );
}

export default App;