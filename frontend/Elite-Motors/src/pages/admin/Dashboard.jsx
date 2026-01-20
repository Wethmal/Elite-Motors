import { carsData } from '../../data/carsData';
import { Car, DollarSign, Users, Activity } from 'lucide-react';

const Dashboard = () => {
  // සරල ගණනය කිරීම් (Dummy Logic)
  const totalCars = carsData.length;
  const inStock = carsData.filter(c => c.status === 'In Stock').length;
  const soldOut = carsData.filter(c => c.status === 'Sold Out').length;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Cars Card */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Total Cars</h3>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Car size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalCars}</p>
        </div>

        {/* Active Listings */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">In Stock</h3>
            <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Activity size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{inStock}</p>
        </div>

        {/* Sold Cars */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Sold Out</h3>
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><DollarSign size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{soldOut}</p>
        </div>

        {/* Bookings (Dummy) */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">New Bookings</h3>
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Users size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;