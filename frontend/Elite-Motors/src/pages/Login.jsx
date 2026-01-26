import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, User, ArrowRight, CarFront } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password
      });

      if (response.data.status === "ok") {
        localStorage.setItem("isAdmin", "true");
        toast.success("Welcome back, Admin!");
        
        setTimeout(() => {
            navigate("/admin/dashboard");
            window.location.reload(); 
        }, 1000);
      } else {
        toast.error("Invalid Username or Password!");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Server Error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <ToastContainer />

      {/* LEFT SIDE: Image & Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           
            <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop" 
                alt="Luxury Car" 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-12">
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <CarFront size={48} className="text-white" />
                </div>
            </div>
            <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight">Elite Motors</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
                Manage your inventory, bookings, and customer requests seamlessly from one powerful dashboard.
            </p>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Admin Sign In</h1>
            <p className="text-gray-500 mt-2">Enter your credentials to access the panel.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
              <div className="relative group">
                <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <User size={20} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                  placeholder="e.g. admin"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all transform active:scale-95 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">© 2026 Elite Motors System. Secured Panel.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;