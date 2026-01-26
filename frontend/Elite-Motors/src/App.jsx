import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Components ---
import Navbar from './components/Navbar';
import Footer from './components/footer'; 
import AdminLayout from './components/AdminLayout'; 
import ChatBot from './components/ChatBot';

// --- Customer Pages ---
import Home from './pages/Home';
import CarPage from './pages/CarPage';
import AboutUs from './pages/bout'; 
import ContactUs from './pages/ContactUs';
import CarDetails from './pages/CarDetails';
import Booking from './pages/Booking';
import Login from './pages/Login'; 

// --- Admin Pages ---
import Dashboard from './pages/admin/Dashboard'; 
import ManageCars from './pages/admin/ManageCars';
import ManageBookings from './pages/admin/ManageBookings';

// --- PROTECTED ROUTE ---
// Check if user is Admin, else redirect to Login
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/login" />;
};

// --- CUSTOMER LAYOUT ---
// Layout with Navbar, Footer, and ChatBot
const CustomerLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow pt-16"> {/* Space for Navbar */}
        {children}
      </div>
      <ChatBot />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* --- Login Route (No layout) --- */}
        <Route path="/login" element={<Login />} />

        {/* === Customer Routes === */}
        <Route path="/" element={<CustomerLayout><Home /></CustomerLayout>} />
        <Route path="/cars" element={<CustomerLayout><CarPage /></CustomerLayout>} />
        <Route path="/about" element={<CustomerLayout><AboutUs /></CustomerLayout>} />
        <Route path="/contact" element={<CustomerLayout><ContactUs /></CustomerLayout>} />
        <Route path="/cars/:id" element={<CustomerLayout><CarDetails /></CustomerLayout>} />
        <Route path="/booking/:id" element={<CustomerLayout><Booking /></CustomerLayout>} />

        {/* === Admin Routes (Protected + Sidebar Layout) === */}

        {/* 1. Dashboard */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* 2. Manage Cars */}
        <Route path="/admin/cars" element={
          <ProtectedRoute>
            <AdminLayout>
              <ManageCars />
            </AdminLayout>
          </ProtectedRoute>
        } /> 

        {/* 3. Manage Bookings */}
        <Route path="/admin/bookings" element={
          <ProtectedRoute>
            <AdminLayout>
              <ManageBookings />
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* 4. Redirect /admin to dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
