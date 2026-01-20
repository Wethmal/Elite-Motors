import { Check, Star, MapPin, Clock } from 'lucide-react';

const About = () => {
  return (
    // 'overflow-hidden' added to prevent any unwanted lines or scrolling issues
    <div className="min-h-screen bg-white overflow-hidden pt-20">
      
      {/* Section 1: Hero Split (Text Left, Image Right) */}
      <div className="container px-4 mx-auto mb-24 mt-10">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Text Content */}
          <div>
            <h4 className="mb-2 text-sm font-bold tracking-widest text-blue-600 uppercase">Who We Are</h4>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Redefining the Art of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Luxury Driving
              </span>
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              At Elite Motors, we believe a car is more than just a mode of transport. It is a statement of class, power, and freedom. Since 2015, we have been the bridge between dreamers and their dream machines.
            </p>
            <div className="flex gap-4">
              <div className="pl-4 border-l-4 border-blue-600">
                <p className="font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-500">Cars Sold</p>
              </div>
              <div className="pl-4 border-l-4 border-cyan-500">
                <p className="font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-500">Customer Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="absolute top-0 right-0 w-full h-full bg-blue-100 rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1580273916550-e323be2ed5d6?q=80&w=800&auto=format&fit=crop" 
              alt="Luxury Car Showroom" 
              className="w-full rounded-3xl shadow-xl"
            />
          </div>

        </div>
      </div>

      {/* Section 2: Dark Statistics Bar */}
      <div className="py-16 text-white bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-700">
            
            <div className="p-4">
              <Star className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
              <h3 className="text-3xl font-bold">#1</h3>
              <p className="text-gray-400">Dealership in Colombo</p>
            </div>
            
            <div className="p-4">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-red-400" />
              <h3 className="text-3xl font-bold">3</h3>
              <p className="text-gray-400">Showroom Locations</p>
            </div>

            <div className="p-4">
              <Check className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <h3 className="text-3xl font-bold">100%</h3>
              <p className="text-gray-400">Verified Documents</p>
            </div>

            <div className="p-4">
              <Clock className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-gray-400">After Sales Support</p>
            </div>

          </div>
        </div>
      </div>

      {/* Section 3: Our Story (Image Left, Text Right) */}
      <div className="container px-4 mx-auto py-24">
        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
          
          {/* Image Side (Order 2 on Mobile, Order 1 on Desktop) */}
          <div className="order-2 lg:order-1 relative">
             <img 
              src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=800&auto=format&fit=crop" 
              alt="Mechanic Checking Car" 
              className="w-full rounded-lg shadow-2xl"
            />
            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
              <p className="text-sm font-semibold text-gray-800">"Quality is not an act, it is a habit."</p>
              <p className="text-xs text-gray-500 mt-1">- Our Motto</p>
            </div>
          </div>

          {/* Text Side (Order 1 on Mobile, Order 2 on Desktop) */}
          <div className="order-1 lg:order-2">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Why Customers Trust Us?</h2>
            <p className="mb-6 text-gray-600 leading-relaxed">
              In a market full of uncertainties, Elite Motors stands as a beacon of trust. We don't just import cars; we curate experiences. Every vehicle on our floor has passed a rigorous 150-point inspection by certified engineers.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                  <Check size={14} className="text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Transparent Pricing (No Hidden Fees)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                  <Check size={14} className="text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Direct Imports from Japan & UK</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                  <Check size={14} className="text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Lifetime Engine Warranty Options</span>
              </li>
            </ul>

          </div>

        </div>
      </div>

    </div>
  );
};

export default About;