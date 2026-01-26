import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, CarFront, Home, Car, Info, Phone, LayoutDashboard, LogOut, Lock } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);  // Mobile menu toggle
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Check if Admin is logged in
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Check if current page is active
  const isActive = (path) => location.pathname === path;

  // 2. Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Remove Admin flag
    setIsOpen(false);                  // Close mobile menu
    window.location.href = "/Home";
  };

  // Main navigation links
  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/cars', label: 'Cars', icon: Car },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 border-b border-gray-800 shadow-md mx-4 md:mx-8 rounded-xl mt-2 backdrop-blur-2xl">

      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <CarFront className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-white">
            Elite<span className="text-blue-500">Motors</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">

          {/* Main Links */}
          {navLinks.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive(item.path) ? 'text-blue-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}

          {/* --- ADMIN LOGIC (DESKTOP) --- */}
          <div className="pl-6 ml-6 border-l border-gray-700 flex items-center gap-4">
            {isAdmin ? (
              <>
                {/* Admin Logged In: Show Dashboard & Logout */}
                <Link 
                  to="/admin/dashboard" 
                  className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                    isActive('/admin/dashboard') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-400 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                {/* Not Admin: Show Contact & Admin Login */}
                <Link 
                  to="/contact" 
                  className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone size={18} /> Contact Us
                </Link>

                <Link 
                  to="/login"
                  className="text-gray-500 hover:text-white transition-colors"
                  title="Admin Login"
                >
                  <Lock size={16} />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 rounded-b-xl">
          <div className="flex flex-col p-4 space-y-2">

            {/* Standard Links */}
            {navLinks.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-center gap-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.path) ? 'bg-gray-800 text-blue-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}

            {/* --- ADMIN LOGIC (MOBILE) --- */}
            {isAdmin ? (
              <>
                <div className="h-px bg-gray-800 my-2"></div>

                <Link 
                  to="/admin/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 py-3 text-sm font-bold text-blue-400 bg-gray-800/50 rounded-lg"
                >
                  <LayoutDashboard size={20} /> Admin Dashboard
                </Link>

                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-3 py-3 text-sm font-bold text-red-500 hover:bg-gray-800 rounded-lg"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 py-3 text-sm font-bold text-white bg-blue-600 rounded-lg"
                >
                  <Phone size={20} /> Contact Us
                </Link>
                
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 py-3 text-xs font-medium text-gray-500 hover:text-white"
                >
                  <Lock size={14} /> Admin Login
                </Link>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
