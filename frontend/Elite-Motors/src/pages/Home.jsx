import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- Hero Section --- */}
      <section 
        className="relative h-[85vh] flex items-center justify-center bg-cover bg-center text-white"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920')` 
        }}
      >
        <div className="text-center px-4 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black mb-4 uppercase tracking-tighter">
            Elite Motors
          </h1>
          <p className="text-lg md:text-2xl mb-8 font-light tracking-wide text-gray-200">
            EXPERIENCE THE PINNACLE OF AUTOMOTIVE LUXURY & PERFORMANCE
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-md font-bold transition duration-300 uppercase text-sm tracking-widest">
              Explore Inventory
            </button>
            <button className="backdrop-blur-md border border-white/50 hover:bg-white hover:text-black text-white px-10 py-4 rounded-md font-bold transition duration-300 uppercase text-sm tracking-widest">
              Book a Test Drive
            </button>
          </div>
        </div>
      </section>

      {/* --- Stats/Features Section --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Feature 1 */}
          <div className="group border-l-4 border-blue-600 pl-6 py-4 transition-all hover:bg-white hover:shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase tracking-tight">Premium Selection</h3>
            <p className="text-gray-600 leading-relaxed">
              Carefully curated collection of world-class luxury vehicles and high-performance sports cars.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group border-l-4 border-blue-600 pl-6 py-4 transition-all hover:bg-white hover:shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase tracking-tight">Certified Quality</h3>
            <p className="text-gray-600 leading-relaxed">
              Every vehicle undergoes a rigorous 150-point inspection to ensure absolute perfection and reliability.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group border-l-4 border-blue-600 pl-6 py-4 transition-all hover:bg-white hover:shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase tracking-tight">VIP Experience</h3>
            <p className="text-gray-600 leading-relaxed">
              Personalized concierge service to help you find the vehicle that perfectly complements your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* --- Featured Brands (Visual Placeholder) --- */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Trusted by Enthusiasts of</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition duration-500">
             <span className="text-2xl font-serif italic font-bold">Mercedes-Benz</span>
             <span className="text-2xl font-serif italic font-bold">Porsche</span>
             <span className="text-2xl font-serif italic font-bold">BMW</span>
             <span className="text-2xl font-serif italic font-bold">Audi</span>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="relative overflow-hidden bg-gray-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 uppercase tracking-tight">Ready to Drive Your Dream?</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Visit our showroom today and explore the most exclusive collection in the region.
          </p>
          <button className="bg-white text-black px-12 py-4 hover:bg-blue-600 hover:text-white transition-all duration-300 font-black uppercase tracking-widest text-sm">
            Contact Specialist
          </button>
        </div>
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      </section>

    </div>
  );
};

export default Home;