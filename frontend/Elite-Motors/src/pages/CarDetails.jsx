import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Calendar, Gauge, Fuel, Shield, Star, MapPin, Zap, Loader2 } from 'lucide-react';

const CarDetails = () => {
  const { id } = useParams(); // URL එකෙන් ID එක ගන්නවා

  // --- STATE VARIABLES ---
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        // Backend එකෙන් අදාළ ID එකට විතරක් කෝල් කරනවා
        const response = await axios.get(`http://localhost:8080/api/cars/${id}`);
        setCar(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError("Car not found or server error.");
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // 1. Status Color Helper
  const getStatusColor = (status) => {
    switch(status) {
      case "In Stock": return "bg-blue-600";
      case "Sold Out": return "bg-red-600";
      case "Pre-order": return "bg-yellow-500";
      default: return "bg-gray-600";
    }
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-20">
        <Loader2 size={48} className="text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-500">Loading car details...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !car) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Car not found!</h2>
          <p className="mb-6 text-gray-500">The vehicle you are looking for does not exist or has been removed.</p>
          <Link to="/cars" className="px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  // --- MAIN CONTENT ---
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
                  onError={(e) => {e.target.src = "https://via.placeholder.com/600x400?text=No+Image"}}
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1 text-xs font-bold text-white rounded-full shadow-md ${getStatusColor(car.status)}`}>
                  {car.status}
                </span>

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
                {car.features && car.features.length > 0 ? (
                  car.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No specific features listed.</li>
                )}
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