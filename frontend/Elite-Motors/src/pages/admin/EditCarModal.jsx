import { useState } from 'react';
import { X, Save } from 'lucide-react';

const EditCarModal = ({ car, onClose, onSave }) => {
  
  // 1. CHECK MODE: කාර් එකට ID එකක් තියෙනවද බලනවා
  // ID එකක් තියෙනවා නම් true (Edit), නැත්නම් false (Add New)
  const isEditMode = car.id ? true : false;

  // --- STATE VARIABLES ---
  const [brand, setBrand] = useState(car.brand || "");
  const [model, setModel] = useState(car.model || "");
  const [year, setYear] = useState(car.year || "");
  const [price, setPrice] = useState(car.price || "");
  const [status, setStatus] = useState(car.status || "In Stock");
  const [certified, setCertified] = useState(car.certified || false);
  const [fuel, setFuel] = useState(car.fuel || "");
  const [transmission, setTransmission] = useState(car.transmission || "");
  const [mileage, setMileage] = useState(car.mileage || "");
  const [image, setImage] = useState(car.image || "");
  const [description, setDescription] = useState(car.description || "");
  
  // 2. SAFETY CHECK: car.features නැත්නම් (null නම්) හිස්ව තියන්න
  // අලුත් කාර් එකක් දානකොට features නැති වෙන්න පුළුවන් නිසා මේක වැදගත්
  const [features, setFeatures] = useState(car.features ? car.features.join(', ') : '');

  // --- HANDLE SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCar = {
      id: car.id, // අලුත් එකක් නම් මේක undefined වෙයි (ප්‍රශ්නයක් නෑ)
      brand,
      model,
      year,
      price,
      status,
      certified,
      fuel,
      transmission,
      mileage,
      image,
      description,
      // String to Array conversion (හිස් ඒවා අයින් කරනවා)
      features: features.split(',').map((item) => item.trim()).filter(item => item !== "")
    };

    onSave(updatedCar);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header Section */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
          {/* 3. DYNAMIC HEADER: Edit ද Add ද කියලා බලලා මාතෘකාව වෙනස් කරනවා */}
          <h3 className="text-lg font-bold text-gray-800">
            {isEditMode ? "Edit Car Details" : "Add New Car"}
          </h3>
          
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="In Stock">In Stock</option>
                <option value="Sold Out">Sold Out</option>
                <option value="Pre-order">Pre-order</option>
              </select>
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={certified} onChange={(e) => setCertified(e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                <span className="ml-2 text-sm font-medium text-gray-700">Certified Vehicle</span>
              </label>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
              <input type="text" value={fuel} onChange={(e) => setFuel(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
              <input type="text" value={transmission} onChange={(e) => setTransmission(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
              <input type="text" value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          {/* Row 4 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          {/* Row 5 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
          </div>

          {/* Row 6 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Features (Separate with commas)</label>
            <textarea rows="2" value={features} onChange={(e) => setFeatures(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Sunroof, Leather Seats, GPS..."></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="flex-1 py-3 font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
            
            {/* 4. DYNAMIC BUTTON TEXT */}
            <button type="submit" className="flex-1 flex justify-center items-center gap-2 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <Save size={18} /> 
              {isEditMode ? "Update Car" : "Add Car"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditCarModal;