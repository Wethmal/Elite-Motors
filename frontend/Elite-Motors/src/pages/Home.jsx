import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Play, Gauge, Zap, Trophy, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full bg-neutral-950 text-white selection:bg-amber-500 selection:text-black font-sans">
      
      {/* ================= HERO SECTION (Cinematic) ================= */}
      <div className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden">
        
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1920&auto=format&fit=crop" 
            alt="Luxury Car Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 mt-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6 animate-fade-in">
                <div className="h-[2px] w-12 bg-amber-500"></div>
                <span className="text-amber-500 tracking-[0.2em] text-sm font-bold uppercase">The Elite Collection</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-8 tracking-tight">
              UNLEASH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600">PERFORMANCE.</span>
            </h1>
            
            <p className="text-neutral-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed border-l-2 border-neutral-800 pl-6">
              Experience the art of motion. Rent the world's most exclusive vehicles with zero compromise on luxury or speed.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link 
                to="/cars" 
                className="group relative px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-amber-400 transition-colors duration-300"
              >
                View Inventory
                <span className="absolute -bottom-2 -right-2 w-full h-full border border-white/20 -z-10 group-hover:border-amber-400/50 transition-colors"></span>
              </Link>
              
              <Link 
                to="/about" 
                className="group flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                <Play size={16} className="text-amber-500 fill-amber-500" /> Watch Film
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= STATS STRIP ================= */}
      <div className="border-y border-white/5 bg-neutral-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
                { label: "Horsepower", value: "800+" },
                { label: "0-60 mph", value: "2.8s" },
                { label: "Fleet Size", value: "50+" },
                { label: "Support", value: "24/7" },
            ].map((stat, idx) => (
                <div key={idx} className="py-8 text-center group hover:bg-white/5 transition-colors cursor-default">
                    <h3 className="text-3xl font-black text-white mb-1 group-hover:text-amber-500 transition-colors">{stat.value}</h3>
                    <p className="text-neutral-500 text-xs uppercase tracking-widest">{stat.label}</p>
                </div>
            ))}
        </div>
      </div>

      {/* ================= BENTO GRID (CATEGORIES) ================= */}
      <div className="py-24 container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
             <h2 className="text-4xl font-bold">Curated Categories</h2>
             <Link to="/cars" className="hidden md:flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors font-medium">
                View All <ArrowRight size={18} />
             </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
            
            {/* Large Item */}
            <Link to="/cars" className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl bg-neutral-900">
                <img src="https://images.unsplash.com/photo-1603584173870-7b23139f9746?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-8 left-8">
                    <h3 className="text-3xl font-bold mb-2">Super Sport</h3>
                    <p className="text-neutral-400 text-sm">Engineered for pure adrenaline.</p>
                </div>
            </Link>

            {/* Wide Item */}
            <Link to="/cars" className="md:col-span-2 relative group overflow-hidden rounded-2xl bg-neutral-900">
                <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold mb-1">Luxury Sedan</h3>
                    <p className="text-neutral-400 text-sm">Chauffeur driven comfort.</p>
                </div>
            </Link>

            {/* Small Item 1 */}
            <Link to="/cars" className="relative group overflow-hidden rounded-2xl bg-neutral-900">
                <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-6 left-6">
                    <h3 className="text-xl font-bold">SUV</h3>
                </div>
            </Link>

            {/* Small Item 2 */}
            <Link to="/cars" className="relative group overflow-hidden rounded-2xl bg-neutral-900">
                <img src="https://images.unsplash.com/photo-1580273916550-e323be2ed5f6?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-6 left-6">
                    <h3 className="text-xl font-bold">Electric</h3>
                </div>
            </Link>

        </div>
      </div>

      {/* ================= FEATURED SHOWCASE ================= */}
      <div className="bg-neutral-900 py-24 relative overflow-hidden">
        {/* Background Decorative Number */}
        <span className="absolute -top-20 -right-20 text-[300px] font-black text-white/5 select-none">01</span>

        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 relative z-10">
            
            <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider mb-6">
                    <Star size={12} fill="currentColor" /> Deal of the Month
                </div>
                <h2 className="text-5xl font-bold mb-6">Porsche 911 GT3</h2>
                <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                    A high-performance sports car that delivers a racing experience for the road. 
                    Precision handling, naturally aspirated power, and an unmistakable silhouette.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-neutral-800/50 p-4 rounded-xl border border-white/5">
                        <Gauge className="text-amber-500 mb-2" />
                        <p className="text-2xl font-bold">3.2s</p>
                        <p className="text-neutral-500 text-xs">0-60 mph</p>
                    </div>
                    <div className="bg-neutral-800/50 p-4 rounded-xl border border-white/5">
                        <Zap className="text-amber-500 mb-2" />
                        <p className="text-2xl font-bold">502 HP</p>
                        <p className="text-neutral-500 text-xs">Power</p>
                    </div>
                </div>

                <Link to="/cars" className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-amber-500 pb-1 hover:text-amber-500 transition-colors">
                    View Details <ChevronRight size={16} />
                </Link>
            </div>

            <div className="flex-1 relative">
                <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                    <img src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1000&auto=format&fit=crop" className="w-full h-auto" />
                </div>
                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/20 blur-[100px] -z-10 rounded-full"></div>
            </div>

        </div>
      </div>

      {/* ================= TRUST BADGES ================= */}
      <div className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 p-8 rounded-2xl border border-white/5 hover:border-amber-500/50 transition-colors duration-300">
                <Shield size={32} className="text-amber-500 mb-6" />
                <h3 className="text-xl font-bold mb-3">Insured & Secure</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Every rental includes premium insurance coverage and 24/7 roadside assistance.</p>
            </div>
            <div className="bg-neutral-900 p-8 rounded-2xl border border-white/5 hover:border-amber-500/50 transition-colors duration-300">
                <Trophy size={32} className="text-amber-500 mb-6" />
                <h3 className="text-xl font-bold mb-3">Premium Fleet</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Our cars are maintained to manufacturer standards, ensuring a showroom experience.</p>
            </div>
            <div className="bg-neutral-900 p-8 rounded-2xl border border-white/5 hover:border-amber-500/50 transition-colors duration-300">
                <Gauge size={32} className="text-amber-500 mb-6" />
                <h3 className="text-xl font-bold mb-3">Unlimited Miles</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">Choose our premium packages to enjoy unlimited mileage on selected vehicles.</p>
            </div>
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="bg-amber-500 text-black py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">Ready to Drive?</h2>
        <p className="text-neutral-800 mb-8 max-w-xl mx-auto font-medium">Book your dream car today and experience the ultimate driving pleasure.</p>
        <Link to="/cars" className="inline-block px-10 py-4 bg-black text-white font-bold rounded-lg hover:bg-neutral-800 transition-colors shadow-xl">
            Browse All Cars
        </Link>
      </div>

    </div>
  );
};

export default Home;