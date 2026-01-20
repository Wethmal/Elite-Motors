import { useState } from 'react';
import { X, Save } from 'lucide-react';

const EditCarModal = ({ car, onClose, onSave }) => {
  
  // --- STATE VARIABLES ---
  // We create a separate piece of state for every single input field.
  // This is easier to understand than managing one big object.
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year);
  const [price, setPrice] = useState(car.price);
  const [status, setStatus] = useState(car.status);
  const [certified, setCertified] = useState(car.certified);
  const [fuel, setFuel] = useState(car.fuel);
  const [transmission, setTransmission] = useState(car.transmission);
  const [mileage, setMileage] = useState(car.mileage);
  const [image, setImage] = useState(car.image);
  const [description, setDescription] = useState(car.description);
  
  // Special handling for 'features':
  // The car data has features as a List (Array) ["A", "B"], 
  // but in the text box, we want to show a String "A, B".
  const [features, setFeatures] = useState(car.features.join(', '));

  // --- HANDLE SUBMIT ---
  // This function runs when you click the "Save Changes" button.
  const handleSubmit = (e) => {
    e.preventDefault(); // This stops the page from refreshing automatically

    // 1. Re-create the Car Object
    // We gather all the individual state values back into one object.
    const updatedCar = {
      id: car.id, // Keep the original ID
      brand: brand,
      model: model,
      year: year,
      price: price,
      status: status,
      certified: certified,
      fuel: fuel,
      transmission: transmission,
      mileage: mileage,
      image: image,
      description: description,
      // 2. Convert Features String back to Array
      // We split the text by commas to make it a list again.
      features: features.split(',').map((item) => item.trim())
    };

    // 3. Send the updated data back to the parent component
    onSave(updatedCar);
  };

  return (
    // Modal Backdrop (Black semi-transparent background)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      
      {/* Modal Container (White box) */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header Section */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
          <h3 className="text-lg font-bold text-gray-800">Edit Car Details</h3>
          {/* Close Button */}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Row 1: Brand, Model, Year */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              {/* We link the Input Value to State, and update State on Change */}
              <input 
                type="text" 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)} 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input 
                type="text" 
                value={model} 
                onChange={(e) => setModel(e.target.value)} 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input 
                type="number" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>

          {/* Row 2: Price, Status, Certified */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input 
                type="text" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              {/* Dropdown for Status */}
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="In Stock">In Stock</option>
                <option value="Sold Out">Sold Out</option>
                <option value="Pre-order">Pre-order</option>
              </select>
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center cursor-pointer">
                {/* Checkbox uses 'checked' instead of 'value' */}
                <input 
                  type="checkbox" 
                  checked={certified} 
                  onChange={(e) => setCertified(e.target.checked)} 
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Certified Vehicle</span>
              </label>
            </div>
          </div>

          {/* Row 3: Technical Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
              <input 
                type="text" 
                value={fuel} 
                onChange={(e) => setFuel(e.target.value)} 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
              <input 
                type="text" 
                value={transmission} 
                onChange={(e) => setTransmission(e.target.value)} 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
              <input 
                type="text" 
                value={mileage} 
                onChange={(e) => setMileage(e.target.value)} 
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>

          {/* Row 4: Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input 
              type="text" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          {/* Row 5: Description (Large Text Area) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              rows="3" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Row 6: Features (Comma Separated) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Features (Separate with commas)</label>
            <textarea 
              rows="2" 
              value={features} 
              onChange={(e) => setFeatures(e.target.value)} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="Sunroof, Leather Seats, GPS..."
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            {/* Cancel Button */}
            <button type="button" onClick={onClose} className="flex-1 py-3 font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
            
            {/* Save Button */}
            <button type="submit" className="flex-1 flex justify-center items-center gap-2 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <Save size={18} /> Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditCarModal;