import { useParams, useNavigate } from 'react-router-dom';
import { carsData } from '../data/carsData';
import { useState } from 'react';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = carsData.find((c) => c.id === parseInt(id));
  
  const [formData, setFormData] = useState({
    name: '', phone: '', date: '', message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Request Sent for ${car.brand} ${car.model}!`);
    navigate('/cars');
  };

  if (!car) return <div className="pt-32 text-center text-2xl font-bold">Car not found!</div>;

  return (
    <div className="min-h-screen px-4 bg-gray-50 pt-28 pb-12">
      
      {/* Centering the Container using Flexbox */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          
          <div className="p-8 bg-white shadow-xl rounded-2xl">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Book a Test Ride</h2>
            
            {/* Selected Car Summary - Flex Row */}
            <div className="flex items-center gap-4 p-4 mb-8 border border-blue-100 bg-blue-50 rounded-xl">
              <img src={car.image} alt={car.model} className="w-24 h-16 object-cover rounded-lg" />
              <div className="flex flex-col">
                <h3 className="font-bold text-gray-800">{car.brand} {car.model}</h3>
                <p className="text-sm text-blue-600 font-semibold">{car.price}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Full Name</label>
                <input 
                  required type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your Name"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Phone Number</label>
                <input 
                  required type="tel" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="077 123 4567"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Preferred Date</label>
                <input 
                  required type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Additional Message</label>
                <textarea 
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Questions?"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 font-bold text-lg shadow-lg"
              >
                Confirm Booking
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;