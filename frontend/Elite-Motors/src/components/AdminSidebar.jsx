import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Car, CalendarCheck, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/cars', label: 'Manage Cars', icon: Car },
    { path: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  ];

  return (
    <div className="w-64 min-h-screen text-white bg-gray-900 border-r border-gray-800">
      
      {/* Admin Logo */}
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Admin<span className="text-blue-500">Panel</span></h1>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive(item.path) 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}

        {/* Logout Button (Bottom) */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-gray-800 hover:text-red-300">
            <LogOut size={20} />
            Back to Website
          </Link>
        </div>
      </nav>

    </div>
  );
};

export default AdminSidebar;