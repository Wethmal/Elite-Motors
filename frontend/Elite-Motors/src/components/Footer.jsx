import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 text-white bg-gray-900 border-t border-gray-800">
      <div className="container px-4 mx-auto text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Elite Motors</h2>
        <p className="text-sm text-gray-400 mb-6">Your trusted partner for premium vehicles.</p>
        
        <div className="flex justify-center space-x-6 mb-8">
          <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
          <Link to="/cars" className="text-gray-400 hover:text-white">Cars</Link>
          <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
            <Facebook className="hover:text-blue-500 cursor-pointer"/>
            <Twitter className="hover:text-blue-400 cursor-pointer"/>
            <Instagram className="hover:text-pink-600 cursor-pointer"/>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Elite Motors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;