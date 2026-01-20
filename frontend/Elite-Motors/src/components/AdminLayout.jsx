import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Fixed width) */}
      <AdminSidebar />
      
      {/* Main Content Area (Dynamic) */}
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;