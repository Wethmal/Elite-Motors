import { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, Trash2, Calendar, Phone, MessageSquare, User, Car } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- CUSTOM CONFIRMATION COMPONENT ---
const ConfirmToast = ({ closeToast, onConfirm }) => (
  <div>
    <h3 className="font-bold text-gray-800">Are you sure?</h3>
    <p className="text-xs text-gray-500 mb-3">Do you really want to delete this booking?</p>
    <div className="flex gap-2">
      <button 
        onClick={() => { onConfirm(); closeToast(); }}
        className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 rounded shadow-sm hover:bg-red-700"
      >
        Yes, Delete
      </button>
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
  const [bookings, setBookings] = useState([]);
  const API_URL = "http://localhost:8080/api/bookings";

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setBookings(response.data.reverse());
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings. Is backend running?");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/status/${id}?status=${newStatus}`);
      const updatedList = bookings.map((booking) => 
        booking.id === id ? { ...booking, status: newStatus } : booking
      );
      setBookings(updatedList);
      if (newStatus === "Approved") toast.success("Booking Approved!");
      else toast.info("Booking Rejected.");
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = (id) => {
    const performDelete = async () => {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        setBookings(bookings.filter((b) => b.id !== id));
        toast.error("Booking deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete booking.");
      }
    };
    toast(<ConfirmToast onConfirm={performDelete} />, { position: "top-center", autoClose: false, closeOnClick: false, draggable: false });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Approved": return "bg-green-100 text-green-700 border border-green-200";
      case "Rejected": return "bg-red-100 text-red-700 border border-red-200";
      default: return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
        <p className="text-gray-500">Track and manage customer test ride requests.</p>
      </div>

      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <table className="w-full text-left border-collapse">
          
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {/* --- HEADERS වෙනස් කළා --- */}
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Car Info</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Booking Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th> {/* අලුත් Column එක */}
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-end text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {bookings.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                
                {/* 1. Customer Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item.customerName}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone size={12} /> {item.customerPhone || item.phone}
                      </div>
                    </div>
                  </div>
                </td>

                {/* 2. Car Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Car size={16} className="text-gray-400" />
                    <span className="font-semibold text-gray-700">{item.carName}</span>
                  </div>
                </td>

                {/* 3. Date Column (වෙනමම) */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg w-fit">
                    <Calendar size={14} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{item.bookingDate || item.date}</span>
                  </div>
                </td>

                {/* 4. Message Column (අලුතින් හැදුවා) */}
                <td className="px-6 py-4 max-w-xs">
                  {item.note || item.message ? (
                    <div className="flex items-start gap-2 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                      <MessageSquare size={14} className="mt-0.5 text-yellow-600 shrink-0" />
                      <p className="italic">"{item.note || item.message}"</p>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">No message</span>
                  )}
                </td>

                {/* 5. Status Column */}
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                {/* 6. Actions Column */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {item.status !== "Approved" && (
                      <button onClick={() => handleStatusUpdate(item.id, "Approved")} className="p-2 text-green-600 bg-white border border-green-200 rounded-lg hover:bg-green-50 shadow-sm" title="Approve">
                        <Check size={16} />
                      </button>
                    )}
                    {item.status !== "Rejected" && (
                      <button onClick={() => handleStatusUpdate(item.id, "Rejected")} className="p-2 text-orange-600 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 shadow-sm" title="Reject">
                        <X size={16} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 shadow-sm" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="p-12 text-center">
            <div className="inline-block p-4 rounded-full bg-gray-50 text-gray-400 mb-3">
              <Calendar size={48} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No bookings yet</h3>
            <p className="text-gray-500">Wait for customers to request test rides.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;