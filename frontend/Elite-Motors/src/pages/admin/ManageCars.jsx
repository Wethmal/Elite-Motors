import { useState } from 'react';
import { carsData } from '../../data/carsData'; // Import the dummy data
import { Edit, Trash2, Plus } from 'lucide-react'; // Import icons
import EditCarModal from './EditCarModal';

const ManageCars = () => {
  // --- STATE VARIABLES ---
  
  // 1. Store the list of cars. We initialize it with data from our file.
  const [cars, setCars] = useState(carsData);

  // 2. Store the car currently being edited.
  // If this is null, the Modal is hidden. If it has a car object, the Modal is visible.
  const [editingCar, setEditingCar] = useState(null);

  // --- FUNCTIONS ---

  // Function to delete a car
  const handleDelete = (id) => {
    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this car?")) {
      // Remove the car with the matching ID from the list
      setCars(cars.filter((car) => car.id !== id));
    }
  };

  // Function to save changes coming from the EditCarModal
  const handleSaveChanges = (updatedCar) => {
    // We loop through the current list of cars.
    // If we find the car with the same ID as the updated one, we replace it.
    // Otherwise, we keep the original car.
    const newCarList = cars.map((car) => (car.id === updatedCar.id ? updatedCar : car));
    
    setCars(newCarList); // Update the state with the new list
    setEditingCar(null); // Close the modal
  };

  return (
    <div className="p-6">
      
      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Cars</h1>
          <p className="text-gray-500">Full control over your vehicle inventory.</p>
        </div>
        {/* Add Button (Visual only for now) */}
        <button className="flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg">
          <Plus size={20} /> Add New Car
        </button>
      </div>

      {/* --- CAR LIST TABLE --- */}
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <table className="w-full text-left border-collapse">
          
          {/* Table Header Row */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Car Details</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Specs</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Price & Status</th>
              <th className="px-6 py-4 text-end text-sm font-bold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>

          {/* Table Body - Looping through cars */}
          <tbody className="divide-y divide-gray-100">
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                
                {/* Column 1: Image & Basic Details */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={car.image} alt={car.model} className="w-16 h-12 object-cover rounded-md shadow-sm" />
                    <div>
                      <p className="font-bold text-gray-900">{car.brand} {car.model}</p>
                      {/* Check if certified is true, then show Checkmark */}
                      <p className="text-xs text-gray-500">{car.year} • {car.certified ? 'Certified ✅' : 'Standard'}</p>
                    </div>
                  </div>
                </td>

                {/* Column 2: Technical Specs */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    <p>Fuel: {car.fuel}</p>
                    <p>Trans: {car.transmission}</p>
                    <p>Miles: {car.mileage}</p>
                  </div>
                </td>

                {/* Column 3: Price & Status Badge */}
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{car.price}</p>
                  {/* Dynamic coloring based on status */}
                  <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-bold rounded-full ${
                    car.status === "In Stock" ? "bg-green-100 text-green-700" :
                    car.status === "Sold Out" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {car.status}
                  </span>
                </td>

                {/* Column 4: Action Buttons */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Edit Button: Sets the 'editingCar' state, which opens the modal */}
                    <button 
                      onClick={() => setEditingCar(car)}
                      className="p-2 text-blue-600 transition bg-blue-50 rounded-lg hover:bg-blue-100"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    {/* Delete Button: Calls handleDelete */}
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
        
        {/* Show a message if the list is empty */}
        {cars.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No cars found.
          </div>
        )}
      </div>

      {/* --- RENDER MODAL CONDITIONALLY --- */}
      {/* If 'editingCar' is NOT null, we show the <EditCarModal /> */}
      {editingCar && (
        <EditCarModal 
          car={editingCar}                  // Pass the car data to the modal
          onClose={() => setEditingCar(null)} // Function to close modal
          onSave={handleSaveChanges}        // Function to save data coming back from modal
        />
      )}

    </div>
  );
};

export default ManageCars;