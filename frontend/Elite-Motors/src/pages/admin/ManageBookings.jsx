import { useState } from 'react';
import { bookingsData } from '../../data/bookingsData';
import { Check, X, Trash2, Calendar, Phone, MessageSquare } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- 1. CUSTOM CONFIRMATION COMPONENT ---
// මේක තමයි Toast එක ඇතුලේ පෙන්නන පොඩි Component එක
const ConfirmToast = ({ closeToast, onConfirm }) => (
  <div>
    <h3 className="font-bold text-gray-800">Are you sure?</h3>
    <p className="text-xs text-gray-500 mb-3">Do you really want to delete this booking?</p>
    <div className="flex gap-2">
      {/* Yes Button */}
      <button 
        onClick={() => {
          onConfirm(); // Delete එක කරවන්න
          closeToast(); // Toast එක වහන්න
        }}
        className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 rounded shadow-sm hover:bg-red-700"
      >
        Yes, Delete
      </button>
      {/* Cancel Button */}
      <button 
        onClick={closeToast} 
        className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm hover:bg-gray-200"
      >
        Cancel
      </button>
    </div>
  </div>
);

const ManageBookings = () => {
  const [bookings, setBookings] = useState(bookingsData);

  // --- FUNCTIONS ---

  // Handle Status Change
  const handleStatusUpdate = (id, newStatus) => {
    const updatedList = bookings.map((booking) => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedList);

    if (newStatus === "Approved") {
      toast.success("Booking Approved!", { position: "bottom-right", autoClose: 2000 });
    } else {
      toast.info("Booking Rejected.", { position: "bottom-right", autoClose: 2000 });
    }
  };

  // --- 2. UPDATED DELETE FUNCTION ---
  const handleDelete = (id) => {
    
    // මේ Function එක රන් වෙන්නේ "Yes" එබුවොත් විතරයි
    const performDelete = () => {
      setBookings(bookings.filter((b) => b.id !== id));
      toast.error("Booking deleted successfully!", { position: "bottom-right" });
    };

    // සාමාන්‍ය confirm එක වෙනුවට අපේ Custom Toast එක පෙන්වනවා
    toast(
      <ConfirmToast onConfirm={performDelete} />, 
      {
        position: "top-center",
        autoClose: false,       // ඉබේ මැකෙන්න එපා
        closeOnClick: false,    // එළිය ක්ලික් කළාම මැකෙන්න එපා
        draggable: false,
        className: "border-l-4 border-red-500", // වම් පැත්තේ රතු ඉරක්
      }
    );
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Approved": return "bg-green-100 text-green-700";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
        <p className="text-gray-500">Track and manage customer test ride requests.</p>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <table className="w-full text-left border-collapse">
          
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Customer Info</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Car Details</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Date & Note</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Status</th>
              <th className="px-6 py-4 text-end text-sm font-bold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {bookings.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                
                {/* Column 1: Customer */}
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{item.customerName}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <Phone size={14} /> {item.phone}
                  </div>
                </td>

                {/* Column 2: Car Name */}
                <td className="px-6 py-4">
                  <p className="font-semibold text-blue-600">{item.carName}</p>
                </td>

                {/* Column 3: Date & Note */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-800 mb-1">
                    <Calendar size={14} /> {item.date}
                  </div>
                  {item.message && (
                    <div className="flex items-start gap-1 text-xs text-gray-500 italic max-w-xs">
                      <MessageSquare size={12} className="mt-0.5 shrink-0" /> "{item.message}"
                    </div>
                  )}
                </td>

                {/* Column 4: Status Badge */}
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                {/* Column 5: Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    
                    {/* Approve Button */}
                    {item.status !== "Approved" && (
                      <button 
                        onClick={() => handleStatusUpdate(item.id, "Approved")}
                        className="p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100"
                        title="Approve"
                      >
                        <Check size={18} />
                      </button>
                    )}

                    {/* Reject Button */}
                    {item.status !== "Rejected" && (
                      <button 
                        onClick={() => handleStatusUpdate(item.id, "Rejected")}
                        className="p-2 text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100"
                        title="Reject"
                      >
                        <X size={18} />
                      </button>
                    )}

                    {/* Delete Button (Now with Confirmation) */}
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="p-8 text-center text-gray-500">No bookings found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;