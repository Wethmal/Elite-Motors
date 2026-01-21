import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Loader2 } from 'lucide-react'; // Loading icon

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- STATE VARIABLES ---
  const [car, setCar] = useState(null); // කාර් එකේ විස්තර තියාගන්න
  const [loading, setLoading] = useState(true); // Loading වෙනවද බලන්න
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  // --- FETCH CAR DETAILS FROM BACKEND ---
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        // Backend එකෙන් අදාළ ID එකට තියෙන කාර් එක ඉල්ලනවා
        const response = await axios.get(`http://localhost:8080/api/cars/${id}`);
        
        if (response.data) {
          setCar(response.data);
        } else {
          toast.error("Car not found in database");
        }
      } catch (error) {
        console.error("Error fetching car:", error);
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingDetails = {
      carId: car.id,
      carName: `${car.brand} ${car.model}`,
      
      // Backend එකේ නම් (Booking.java) = Frontend එකේ අගයන්
      customerName: name,         // Backend: customerName
      customerPhone: phone,       // Backend: customerPhone
      date: date,                 // Backend: date (මෙතන කලින් bookingDate තිබුනොත් වැඩ කරන්නේ නෑ)
      message: message,           // Backend: message (මෙතන කලින් note තිබුනොත් වැඩ කරන්නේ නෑ)
      
      status: "Pending"
    };

    try {
      await axios.post("http://localhost:8080/api/bookings/add", bookingDetails);
      toast.success(`Booking Request Sent for ${car.brand} ${car.model}!`);
      navigate('/cars');
    } catch (error) {
      toast.error("Booking failed. Please try again.");
      console.error(error);
    }
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  // --- ERROR STATE (Car not found) ---
  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20">
        <h2 className="text-2xl font-bold text-gray-600">Car Not Found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 bg-gray-50 pt-28 pb-12">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="p-8 bg-white shadow-xl rounded-2xl">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Book Your Ride</h2>
            
            {/* Summary of the Car (From Backend Data) */}
            <div className="flex items-center gap-4 p-4 mb-8 border border-blue-100 bg-blue-50 rounded-xl">
              <img 
                src={car.image} 
                alt={car.model} 
                className="w-24 h-16 object-cover rounded-lg"
                onError={(e) => {e.target.src = "https://via.placeholder.com/150"}}
              />
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
                  required type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Your Name"
                  value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">Phone Number</label>
                  <input 
                    required type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="077 123 4567"
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">Email Address</label>
                  <input 
                    required type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="example@gmail.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">Preferred Date</label>
                  <input 
                    required type="date" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={date} onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">Preferred Time</label>
                  <input 
                    required type="time" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={time} onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Additional Message</label>
                <textarea 
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Any questions?"
                  value={message} onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              {/* Submit Button */}
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