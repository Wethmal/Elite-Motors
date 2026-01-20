import { useState } from 'react';
import { carsData } from '../../data/carsData';
import { Edit, Trash2, Plus } from 'lucide-react';
import EditCarModal from './EditCarModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- CUSTOM CONFIRMATION COMPONENT ---
// This little component will appear INSIDE the toast notification
const ConfirmToast = ({ closeToast, onConfirm }) => (
  <div>
    <h3 className="font-bold text-gray-800">Are you sure?</h3>
    <p className="text-xs text-gray-500 mb-3">Do you really want to delete this?</p>
    <div className="flex gap-2">
      {/* Yes Button */}
      <button 
        onClick={() => {
          onConfirm(); // Call the delete function
          closeToast(); // Close the popup
        }}
        className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 rounded shadow-sm hover:bg-red-700"
      >
        Yes, Delete
      </button>
      {/* No Button */}
      <button 
        onClick={closeToast} 
        className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm hover:bg-gray-200"
      >
        Cancel
      </button>
    </div>
  </div>
);

const ManageCars = () => {
  const [cars, setCars] = useState(carsData);
  const [editingCar, setEditingCar] = useState(null);

  // --- FUNCTIONS ---

  // Updated Delete Function
  const handleDelete = (id) => {
    
    // 1. Define what happens when the user clicks "Yes"
    const performDelete = () => {
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      toast.success("Car deleted successfully!", { position: "bottom-right" });
    };

    // 2. Show the Custom Toast
    toast(
      <ConfirmToast onConfirm={performDelete} />, 
      {
        position: "top-center", // Show at the top center
        autoClose: false,       // IMPORTANT: Don't disappear automatically
        closeOnClick: false,    // Don't close if clicked on background
        draggable: false,       // Disable dragging
        className: "border-l-4 border-red-500", // Optional styling
      }
    );
  };

  const handleSaveChanges = (updatedCar) => {
    // Validation
    if (!updatedCar.brand || updatedCar.brand.trim() === "") {
      toast.warn("Brand name cannot be empty!", { position: "top-center" });
      return;
    }

    const newCarList = cars.map((car) => (car.id === updatedCar.id ? updatedCar : car));
    setCars(newCarList);
    setEditingCar(null);

    toast.success("Car updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="p-6">
      
      {/* Toast Container needs to be here */}
      <ToastContainer />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Cars</h1>
          <p className="text-gray-500">Full control over your vehicle inventory.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg">
          <Plus size={20} /> Add New Car
        </button>
      </div>

      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Car Details</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Specs</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Price & Status</th>
              <th className="px-6 py-4 text-end text-sm font-bold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={car.image} alt={car.model} className="w-16 h-12 object-cover rounded-md shadow-sm" />
                    <div>
                      <p className="font-bold text-gray-900">{car.brand} {car.model}</p>
                      <p className="text-xs text-gray-500">{car.year} • {car.certified ? 'Certified ✅' : 'Standard'}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    <p>Fuel: {car.fuel}</p>
                    <p>Trans: {car.transmission}</p>
                    <p>Miles: {car.mileage}</p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{car.price}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-bold rounded-full ${
                    car.status === "In Stock" ? "bg-green-100 text-green-700" :
                    car.status === "Sold Out" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {car.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => setEditingCar(car)}
                      className="p-2 text-blue-600 transition bg-blue-50 rounded-lg hover:bg-blue-100"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(car.id)}
                      className="p-2 text-red-600 transition bg-red-50 rounded-lg hover:bg-red-100"
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
        
        {cars.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No cars found.
          </div>
        )}
      </div>

      {editingCar && (
        <EditCarModal 
          car={editingCar}
          onClose={() => setEditingCar(null)}
          onSave={handleSaveChanges}
        />
      )}

    </div>
  );
};

export default ManageCars;