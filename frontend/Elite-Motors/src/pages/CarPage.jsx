import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { Fuel, Calendar, Gauge, ArrowRight, Zap, Loader2, Search, Filter, X } from 'lucide-react';

const Cars = () => {
  // 1. State Variables
  const [cars, setCars] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- SEARCH & FILTER STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // 2. Fetch Data
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/cars/all");
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars. Please try again later.");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // --- FILTER LOGIC ---
  
  // 1. Get Unique Values for Dropdowns 
  const uniqueBrands = ["All", ...new Set(cars.map(c => c.brand))];
  const uniqueFuels = ["All", ...new Set(cars.map(c => c.fuel))];
  const uniqueYears = ["All", ...new Set(cars.map(c => c.year))].sort((a, b) => b - a); 

  // 2. Filter the Cars Array
  const filteredCars = cars.filter((car) => {
    // Search Filter (Brand or Model)
    const matchesSearch = 
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
      car.model.toLowerCase().includes(searchQuery.toLowerCase());

    // Dropdown Filters
    const matchesBrand = selectedBrand === "All" || car.brand === selectedBrand;
    const matchesFuel = selectedFuel === "All" || car.fuel === selectedFuel;
    const matchesYear = selectedYear === "All" || car.year.toString() === selectedYear;

    return matchesSearch && matchesBrand && matchesFuel && matchesYear;
  });

  // 3. Clear Filters Function
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrand("All");
    setSelectedFuel("All");
    setSelectedYear("All");
  };

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

      {/* --- SEARCH & FILTERS SECTION --- */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            
            {/* 1. Search Bar */}
            <div className="relative flex-grow lg:max-w-md">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by brand or model..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            {/* 2. Dropdown Filters */}
            <div className="flex flex-wrap gap-3 flex-grow lg:justify-end">
              
              {/* Brand Filter */}
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-sm font-medium text-gray-700"
              >
                {uniqueBrands.map(brand => <option key={brand} value={brand}>{brand === "All" ? "All Brands" : brand}</option>)}
              </select>

              {/* Fuel Filter */}
              <select 
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-sm font-medium text-gray-700"
              >
                {uniqueFuels.map(fuel => <option key={fuel} value={fuel}>{fuel === "All" ? "All Fuel Types" : fuel}</option>)}
              </select>

              {/* Year Filter */}
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-sm font-medium text-gray-700"
              >
                {uniqueYears.map(year => <option key={year} value={year}>{year === "All" ? "All Years" : year}</option>)}
              </select>

              {/* Clear Filter Button */}
              {(searchQuery || selectedBrand !== "All" || selectedFuel !== "All" || selectedYear !== "All") && (
                <button 
                  onClick={clearFilters}
                  className="px-4 py-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center gap-2 font-bold text-sm"
                >
                  <X size={18} /> Clear
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* --- LOADING STATE --- */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 size={48} className="text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500">Loading vehicles...</p>
        </div>
      )}

      {/* --- ERROR STATE --- */}
      {error && (
        <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      {/* --- CARS GRID --- */}
      {!loading && !error && (
        <div className="flex flex-wrap -mx-4 max-w-7xl mx-auto">
          
          {/* Check if filtered cars array is empty */}
          {filteredCars.length === 0 ? (
            <div className="w-full text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm mx-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Filter size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">No cars found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
              <button onClick={clearFilters} className="mt-4 text-blue-600 font-bold hover:underline">Clear all filters</button>
            </div>
          ) : (
            // Map through FILTERED data
            filteredCars.map((car) => (
              <div key={car.id} className="w-full px-4 mb-8 md:w-1/2 lg:w-1/3 xl:w-1/4">
                
                {/* Card Component */}
                <div className="relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 group">
                  
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img 
                      src={car.image} 
                      alt={car.model} 
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                      onError={(e) => {e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}}
                    />
                    
                    <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider rounded-full shadow-sm ${getStatusColor(car.status)}`}>
                      {car.status}
                    </span>

                    <span className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 text-xs font-bold text-gray-800 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
                      <Fuel size={12} className="text-blue-600" /> {car.fuel}
                    </span>

                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col flex-grow p-6">
                    
                    <div className="mb-4">
                      <h3 className="text-xs font-bold tracking-widest text-blue-600 uppercase">{car.brand}</h3>
                      <h2 className="text-xl font-bold text-gray-900 truncate">{car.model}</h2>
                    </div>

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

                    <div className="mb-6">
                      <p className="text-2xl font-extrabold text-gray-900">{car.price}</p>
                    </div>

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
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Cars;