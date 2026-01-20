import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CarFront, Home, Car, Info, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Menu Items Configuration (ලේසියෙන් වෙනස් කරන්න පුළුවන් විදිහට හදාගත්තා)
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
        <div className="hidden md:flex items-center space-x-8">
          
          {/* Main Links Loop */}
          {navLinks.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive(item.path) ? 'text-blue-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              {/* Icon */}
              <item.icon size={18} />
              {/* Label */}
              {item.label}
            </Link>
          ))}
          
          {/* Contact Button (With Icon) */}
          <Link 
            to="/contact" 
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Phone size={18} />
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 rounded-b-xl">
          <div className="flex flex-col p-4 space-y-2">
            
            {/* Render all links including Contact for mobile */}
            {[
              ...navLinks, 
              { path: '/contact', label: 'Contact Us', icon: Phone }
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-center gap-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? 'bg-gray-800 text-blue-500' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;