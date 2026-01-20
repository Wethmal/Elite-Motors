import { useParams, useNavigate } from 'react-router-dom';
import { carsData } from '../data/carsData';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Booking = () => {
  // Extract car ID from URL and initialize navigation
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the specific car object based on the URL ID
  const car = carsData.find((c) => c.id === parseInt(id));

  // --- STATE VARIABLES ---
  // Managed separately for simplicity and direct binding to inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  // --- SUBMIT FUNCTION ---
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default page refresh on form submission

    // Construct the data object to be sent to a backend or API
    const bookingDetails = {
      carId: car.id,
      carName: `${car.brand} ${car.model}`,
      customerName: name,
      customerPhone: phone,
      bookingDate: date,
      note: message
    };

    // Log data for debugging purposes
    console.log("Booking Data:", bookingDetails);

    // Display a success notification to the user
    toast.success(`Booking Request Sent for ${car.brand} ${car.model}!`, {
      position: "top-center"
    });

    // Redirect the user back to the main cars listing page
    navigate('/cars');
  };

  // Error handling if the car ID does not exist in the data
  if (!car) return <div className="pt-32 text-center text-2xl font-bold">Car not found!</div>;

  return (
    <div className="min-h-screen px-4 bg-gray-50 pt-28 pb-12">
      
      {/* Main Container Layout */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          
          <div className="p-8 bg-white shadow-xl rounded-2xl">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Book a Test Ride</h2>
            
            {/* Summary of the Car being booked */}
            <div className="flex items-center gap-4 p-4 mb-8 border border-blue-100 bg-blue-50 rounded-xl">
              <img src={car.image} alt={car.model} className="w-24 h-16 object-cover rounded-lg" />
              <div className="flex flex-col">
                <h3 className="font-bold text-gray-800">{car.brand} {car.model}</h3>
                <p className="text-sm text-blue-600 font-semibold">{car.price}</p>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Full Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Phone Field */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="077 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Date Selection */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Preferred Date</label>
                <input 
                  required 
                  type="date" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Additional Message (Textarea) */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Additional Message</label>
                <textarea 
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Any questions?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              {/* Submission Button */}
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