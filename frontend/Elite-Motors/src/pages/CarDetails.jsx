import { useParams, Link } from 'react-router-dom';
import { carsData } from '../data/carsData';
import { ArrowLeft, CheckCircle, Calendar, Gauge, Fuel, Shield, Star, MapPin, Zap } from 'lucide-react';

const CarDetails = () => {
  const { id } = useParams();
  const car = carsData.find((c) => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Car not found!</h2>
          <Link to="/cars" className="text-blue-600 hover:underline">Back to Collection</Link>
        </div>
      </div>
    );
  }

  // 1. Status by color
  const getStatusColor = (status) => {
    switch(status) {
      case "In Stock": return "bg-blue-600";    // In Stock blue color
      case "Sold Out": return "bg-red-600";     // Sold Out red color
      case "Pre-order": return "bg-yellow-500"; // Pre-order yellow color
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen px-4 bg-gray-50 pt-28 pb-12">
      <div className="container max-w-6xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/cars" 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-200 rounded-full hover:bg-gray-100 hover:text-blue-600 shadow-sm"
          >
            <ArrowLeft size={16} /> Back to Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Left Column: Image */}
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden bg-white shadow-xl rounded-3xl group">
              <div className="aspect-video">
                <img 
                  src={car.image} 
                  alt={car.model} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              {/* 2. DYNAMIC BADGES SECTION */}
              <div className="absolute top-4 left-4 flex gap-2">
                
                {/* Status Badge (change the icon and color) */}
                <span className={`px-3 py-1 text-xs font-bold text-white rounded-full shadow-md ${getStatusColor(car.status)}`}>
                  {car.status}
                </span>

                {/* Certified Badge (true only) */}
                {car.certified && (
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-green-600 rounded-full shadow-md">
                    <Shield size={12} /> Certified
                  </span>
                )}

              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 text-center bg-blue-50 rounded-xl border border-blue-100">
                <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-xs text-gray-500">Warranty</p>
                <p className="text-sm font-bold text-gray-900">1 Year</p>
              </div>
              <div className="p-4 text-center bg-purple-50 rounded-xl border border-purple-100">
                <Star className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-xs text-gray-500">Rating</p>
                <p className="text-sm font-bold text-gray-900">4.9/5</p>
              </div>
              <div className="p-4 text-center bg-orange-50 rounded-xl border border-orange-100">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-bold text-gray-900">Colombo</p>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-2">{car.brand}</h2>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{car.model}</h1>
              <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                <p className="text-3xl font-bold text-gray-900">{car.price}</p>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star fill="currentColor" size={20} />
                  <span className="text-gray-900 font-bold ml-1">4.9</span>
                  <span className="text-gray-400 text-sm">(120 Reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Vehicle Overview</h3>
              <p className="leading-relaxed text-gray-600 text-lg">{car.description}</p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center p-4 transition bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200">
                <div className="p-3 mr-4 bg-blue-100 rounded-lg text-blue-600"><Calendar size={24} /></div>
                <div><p className="text-xs text-gray-500 uppercase">Year</p><p className="font-bold text-gray-900">{car.year}</p></div>
              </div>
              <div className="flex items-center p-4 transition bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-red-200">
                <div className="p-3 mr-4 bg-red-100 rounded-lg text-red-600"><Fuel size={24} /></div>
                <div><p className="text-xs text-gray-500 uppercase">Fuel Type</p><p className="font-bold text-gray-900">{car.fuel}</p></div>
              </div>
              <div className="flex items-center p-4 transition bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-green-200">
                <div className="p-3 mr-4 bg-green-100 rounded-lg text-green-600"><Gauge size={24} /></div>
                <div><p className="text-xs text-gray-500 uppercase">Mileage</p><p className="font-bold text-gray-900">{car.mileage}</p></div>
              </div>
              <div className="flex items-center p-4 transition bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-purple-200">
                <div className="p-3 mr-4 bg-purple-100 rounded-lg text-purple-600"><Zap size={24} /></div>
                <div><p className="text-xs text-gray-500 uppercase">Transmission</p><p className="font-bold text-gray-900">{car.transmission}</p></div>
              </div>
            </div>

            {/* PREMIUM FEATURES MAPPING */}
           
            <div className="mb-8 p-6 bg-gray-100 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Premium Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Check if features exist, then map them */}
                {car.features && car.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}

              </ul>
            </div>

            <div className="mt-auto">
              <Link 
                to={`/booking/${car.id}`} 
                className="group relative flex items-center justify-center w-full py-5 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30"
              >
                Book Test Ride Now
                <ArrowLeft className="ml-2 rotate-180 transition-transform group-hover:translate-x-1" size={20} />
              </Link>
              <p className="mt-3 text-xs text-center text-gray-500">Free cancellation within 24 hours of booking.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;