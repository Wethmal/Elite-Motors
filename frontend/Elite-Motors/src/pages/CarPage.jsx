import { Link } from 'react-router-dom';
import { carsData } from '../data/carsData';
import { Fuel, Calendar, Gauge, ArrowRight, Zap } from 'lucide-react';

const Cars = () => {
  
  // Helper to get status badge colors
  const getStatusColor = (status) => {
    switch(status) {
      case "In Stock": return "bg-blue-600";
      case "Sold Out": return "bg-red-600";
      case "Pre-order": return "bg-yellow-500 text-black";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 pt-28">
      
      {/* Page Header */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Exclusive Collection</h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover a world of performance and luxury. Choose the perfect car for your journey.
        </p>
      </div>

      {/* Flexbox Layout Container */}
      <div className="flex flex-wrap -mx-4">
        {carsData.map((car) => (
          
          // Flex Item Wrapper
          <div key={car.id} className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3 xl:w-1/4">
            
            {/* Card Component */}
            <div className="relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 group">
              
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img 
                  src={car.image} 
                  alt={car.model} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Floating Badges (Top Left) */}
                <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded-full shadow-sm ${getStatusColor(car.status)}`}>
                  {car.status}
                </span>

                {/* Fuel Badge (Top Right) */}
                <span className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 text-xs font-bold text-gray-800 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                  <Fuel size={12} className="text-blue-600" /> {car.fuel}
                </span>

                {/* Gradient Overlay (Bottom) for better text contrast if needed */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow p-6">
                
                {/* Title & Brand */}
                <div className="mb-4">
                  <h3 className="text-xs font-bold tracking-widest text-blue-600 uppercase">{car.brand}</h3>
                  <h2 className="text-xl font-bold text-gray-900 truncate">{car.model}</h2>
                </div>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-3 gap-2 mb-6 text-xs text-gray-500 border-t border-b border-gray-100 py-4">
                  <div className="flex flex-col items-center justify-center gap-1 text-center border-r border-gray-100 last:border-0">
                    <Calendar size={16} className="text-blue-500" />
                    <span>{car.year}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 text-center border-r border-gray-100 last:border-0">
                    <Zap size={16} className="text-purple-500" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 text-center">
                    <Gauge size={16} className="text-green-500" />
                    <span>{car.mileage}</span>
                  </div>
                </div>

                {/* Price Tag */}
                <div className="mb-6">
                  <p className="text-2xl font-extrabold text-gray-900">{car.price}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <Link 
                    to={`/cars/${car.id}`} 
                    className="flex-1 py-3 text-sm font-semibold text-center text-blue-600 transition-colors border-2 border-blue-50 rounded-xl hover:bg-blue-50 hover:border-blue-100"
                  >
                    Details
                  </Link>
                  <Link 
                    to={`/booking/${car.id}`} 
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-blue-200"
                  >
                    Book Now <ArrowRight size={16} />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;