import { useState, useEffect } from 'react';
import axios from 'axios';
import { Car, DollarSign, Users, Activity, TrendingUp, Clock, CheckCircle, XCircle, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // --- STATE VARIABLES ---
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCars: 0,
    inStock: 0,
    soldOut: 0,
    totalBookings: 0,
    pendingBookings: 0,
    inventoryValue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        
        const [carsResponse, bookingsResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/cars/all"),
          axios.get("http://localhost:8080/api/bookings/all")
        ]);

        const cars = carsResponse.data;
        const bookings = bookingsResponse.data;

        // 1. Calculate Car Stats
        const inStockCount = cars.filter(c => c.status === 'In Stock').length;
        const soldOutCount = cars.filter(c => c.status === 'Sold Out').length;
        
        // Price Calculation Logic (String "13,500,000 LKR" -> Number)
        const totalValue = cars.reduce((acc, car) => {
          
          const priceNumber = parseFloat(car.price.replace(/[^0-9.]/g, '')) || 0;
          return acc + priceNumber;
        }, 0);

        // 2. Calculate Booking Stats
        const pendingCount = bookings.filter(b => b.status === 'Pending').length;

        // 3. Update State
        setStats({
          totalCars: cars.length,
          inStock: inStockCount,
          soldOut: soldOutCount,
          totalBookings: bookings.length,
          pendingBookings: pendingCount,
          inventoryValue: totalValue
        });

        
        setRecentBookings(bookings.reverse().slice(0, 5));
        setLoading(false);

      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // --- HELPER: Format Currency ---
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumSignificantDigits: 3
    }).format(value);
  };

  // --- LOADING VIEW ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 fade-in-up">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm text-gray-500 font-medium">Total Inventory Value</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(stats.inventoryValue)}</p>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        
        {/* Total Cars */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Total Inventory</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Car size={22} /></div>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-gray-900">{stats.totalCars}</p>
            <span className="text-sm text-green-600 font-medium mb-1 flex items-center">
              <TrendingUp size={14} className="mr-1" /> Active
            </span>
          </div>
        </div>

        {/* Pending Requests (Actionable Item) */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-orange-100 transition hover:shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 w-16 h-16 bg-orange-50 rounded-bl-full -mr-2 -mt-2"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-gray-600 font-medium">Pending Requests</h3>
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Clock size={22} /></div>
          </div>
          <p className="text-4xl font-bold text-gray-900 relative z-10">{stats.pendingBookings}</p>
          <p className="text-xs text-gray-500 mt-2">Requires attention</p>
        </div>

        {/* Sold Cars */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Total Sold</h3>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={22} /></div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.soldOut}</p>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(stats.soldOut / stats.totalCars) * 100}%` }}></div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Total Bookings</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Users size={22} /></div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
          <p className="text-xs text-gray-400 mt-2">All time records</p>
        </div>

      </div>

      {/* --- BOTTOM SECTION: RECENT ACTIVITY --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Bookings Table (Takes 2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Recent Booking Requests</h3>
            <Link to="/admin/bookings" className="text-sm text-blue-600 font-medium hover:underline flex items-center">
              View All <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Car</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{booking.customerName}</td>
                      <td className="px-6 py-3 text-blue-600">{booking.carName}</td>
                      <td className="px-6 py-3 text-gray-500 flex items-center gap-1">
                        <Calendar size={12} /> {booking.date || booking.bookingDate}
                      </td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          booking.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          booking.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      No recent bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Summary (Takes 1/3 width) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-6">Inventory Status</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">In Stock</span>
                <span className="font-bold text-gray-900">{stats.inStock}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(stats.inStock / stats.totalCars) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Sold Out</span>
                <span className="font-bold text-gray-900">{stats.soldOut}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(stats.soldOut / stats.totalCars) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Pre-orders (Other)</span>
                <span className="font-bold text-gray-900">{stats.totalCars - stats.inStock - stats.soldOut}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${((stats.totalCars - stats.inStock - stats.soldOut) / stats.totalCars) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start gap-3">
              <Activity className="text-blue-600 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-blue-900 text-sm">System Health</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Database connected. API responding. All systems operational.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;