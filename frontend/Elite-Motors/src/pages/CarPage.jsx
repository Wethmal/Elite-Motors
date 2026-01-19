import { Link } from 'react-router-dom';

const Cars = () => {
  // Temporary dummy data to simulate database records
  const cars = [
    {
      id: 1,
      brand: "Toyota",
      model: "Premio",
      year: 2019,
      price: "12,500,000 LKR",
      image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=600&auto=format&fit=crop",
      fuel: "Petrol"
    },
    {
      id: 2,
      brand: "Honda",
      model: "Civic Turbo",
      year: 2020,
      price: "14,200,000 LKR",
      image: "https://images.unsplash.com/photo-1606152421811-aa911e6ade92?q=80&w=600&auto=format&fit=crop",
      fuel: "Petrol"
    },
    {
      id: 3,
      brand: "BMW",
      model: "i8",
      year: 2018,
      price: "35,000,000 LKR",
      image: "https://images.unsplash.com/photo-1556189250-72ba95452242?q=80&w=600&auto=format&fit=crop",
      fuel: "Hybrid"
    },
    {
      id: 4,
      brand: "Mercedes",
      model: "Benz C-Class",
      year: 2021,
      price: "28,500,000 LKR",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop",
      fuel: "Diesel"
    }
  ];

  return (
    // Main Container with top padding to avoid overlap with fixed Navbar
    <div className="min-h-screen px-4 py-8 bg-gray-50 pt-28">
      
      {/* Page Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Our Exclusive Collection</h2>
        <p className="text-gray-600">Choose the perfect car for your journey</p>
      </div>

      {/* Grid Layout for Cars */}
      {/* grid-cols-1: Mobile (1 column) */}
      {/* md:grid-cols-2: Tablet (2 columns) */}
      {/* lg:grid-cols-4: Desktop (4 columns) */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Mapping through the car data array */}
        {cars.map((car) => (
          <div key={car.id} className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
            
            {/* Car Image Section */}
            <div className="relative h-48">
              <img 
                src={car.image} 
                alt={car.model} 
                className="object-cover w-full h-full"
              />
              {/* Badge for Fuel Type */}
              <span className="absolute px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded top-2 right-2">
                {car.fuel}
              </span>
            </div>

            {/* Car Details Section */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h3>
                <span className="text-sm font-semibold text-gray-500">{car.year}</span>
              </div>
              
              <p className="mb-4 text-lg font-bold text-green-600">{car.price}</p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* View Details Button */}
                <button className="w-full py-2 text-sm font-medium text-blue-600 transition border border-blue-600 rounded hover:bg-blue-50">
                  Details
                </button>
                
                {/* Book Test Ride Button */}
                <button className="w-full py-2 text-sm font-medium text-white transition bg-blue-600 rounded hover:bg-blue-700">
                  Book Ride
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;