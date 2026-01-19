import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  // Mobile Menu  Open  State 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mx-4 mt-3 rounded-lg bg-gray-900/80 backdrop-blur-2xl shadow-md border border-gray-700/50">
      <div className="flex items-center justify-between p-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">Elite Motors</h1>

        {/* Desktop Menu /}
        {/* md:flex  Medium screen ,or hidden */}
        <div className="hidden space-x-8 md:flex text-white font-medium">
          <Link to="/" className="hover:text-blue-500 transition">Home</Link>
          <Link to="/cars" className="hover:text-blue-500 transition">Cars</Link>
          <Link to="/about" className="hover:text-blue-500 transition">About Us</Link>
          <Link to="/contact" className="hover:text-blue-500 transition">Contact Us</Link>
        </div>

        {/* Mobile Menu Button (Visible only on phones) */}
        {/* md:hidden means hidden on medium screens and up */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Visible only when button is clicked) */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-700/50">
          <div className="flex flex-col space-y-4 px-6 py-6 text-white text-center font-medium">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)} 
              className="hover:text-blue-500 transition"
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              onClick={() => setIsOpen(false)} 
              className="hover:text-blue-500 transition"
            >
              Cars
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsOpen(false)} 
              className="hover:text-blue-500 transition"
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)} 
              className="hover:text-blue-500 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;