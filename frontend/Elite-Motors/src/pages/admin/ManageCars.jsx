import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Edit, Trash2, Plus } from 'lucide-react';
import EditCarModal from './EditCarModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- CUSTOM CONFIRM TOAST ---
const ConfirmToast = ({ closeToast, onConfirm }) => (
  <div>
    <h3 className="font-bold text-gray-800">Are you sure?</h3>
    <p className="text-xs text-gray-500 mb-3">Do you really want to delete this?</p>
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

const ManageCars = () => {

  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  // --- API URL ---
  const API_URL = "http://localhost:8080/api/cars";

  useEffect(() => {
    fetchCars();
  }, []);


  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setCars(response.data); 
    } catch (error) {
      toast.error("Failed to fetch cars. Is the backend running?");
      console.error(error);
    }
  };

  // --- HANDLE DELETE (Backend) ---
  const handleDelete = (id) => {
    const performDelete = async () => {
      try {
        
        await axios.delete(`${API_URL}/delete/${id}`);
        
        
        setCars(cars.filter((car) => car.id !== id));
        toast.success("Car deleted successfully!", { position: "bottom-right" });
      } catch (error) {
        toast.error("Failed to delete car.");
      }
    };

    toast(<ConfirmToast onConfirm={performDelete} />, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    });
  };

  // --- HANDLE SAVE (Add OR Update) ---
  const handleSaveChanges = async (carData) => {
    
    // Validation
    if (!carData.brand || carData.brand.trim() === "") {
      toast.warn("Brand name cannot be empty!", { position: "top-center" });
      return;
    }

    try {
      if (carData.id) {
        // ID එකක් තියෙනවා නම් ඒක UPDATE එකක් (PUT Request)
        await axios.put(`${API_URL}/update/${carData.id}`, carData);
        toast.success("Car updated successfully!");
      } else {
        // ID එකක් නැත්නම් ඒක NEW CAR එකක් (POST Request)
        await axios.post(`${API_URL}/add`, carData);
        toast.success("New car added successfully!");
      }

      // Save වුනාට පස්සේ ආයේ අලුත් ලිස්ට් එක ගන්නවා
      fetchCars();
      setEditingCar(null); // Modal එක වහනවා

    } catch (error) {
      toast.error("Failed to save changes.");
      console.error(error);
    }
  };

  // --- ADD NEW BUTTON CLICK ---
  const handleAddNew = () => {
    // අලුත් කාර් එකක් නිසා හිස් Object එකක් යවනවා
    setEditingCar({
      brand: "", model: "", year: "", price: "", fuel: "",
      image: "", description: "", mileage: "", transmission: "",
      status: "In Stock", certified: false, features: []
    });
  };

  return (
    <div className="p-6">
      <ToastContainer />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Cars</h1>
          <p className="text-gray-500">Full control over your vehicle inventory.</p>
        </div>
        
        {/* ADD NEW BUTTON */}
        <button 
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg"
        >
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
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(car.id)}
                      className="p-2 text-red-600 transition bg-red-50 rounded-lg hover:bg-red-100"
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
            No cars found. Click "Add New Car" to start.
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