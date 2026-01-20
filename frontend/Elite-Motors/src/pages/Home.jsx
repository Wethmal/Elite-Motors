import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative w-full h-screen">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-center bg-cover"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop')" 
        }}
      >
        {/* Overlay to darken the image */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
          Find Your <span className="text-blue-500">Dream Car</span> Today
        </h1>
        <p className="max-w-2xl mb-8 text-lg text-gray-300 md:text-xl">
          Experience the thrill of driving with our premium collection of luxury and performance vehicles.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link 
            to="/cars" 
            className="px-8 py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg"
          >
            Browse Collection
          </Link>
          <Link 
            to="/contact" 
            className="px-8 py-3 font-semibold text-white transition duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-black"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;