import { Phone, Mail, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen px-4 bg-gray-50 pt-28 pb-12">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Get in Touch</h1>
        <p className="mt-4 text-lg text-gray-600">
          Have questions about a car or need support? Our team is here to help you.
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="container max-w-5xl mx-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side: Contact Info (with Gradient) */}
          <div className="relative p-10 text-white bg-gradient-to-br from-blue-900 to-blue-800 lg:p-12">
            
            {/* Background Decoration (Optional) */}
            <div className="absolute top-0 right-0 p-3 -mr-16 -mt-16 bg-white opacity-10 rounded-full w-64 h-64 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 p-3 -ml-16 -mb-16 bg-blue-500 opacity-10 rounded-full w-64 h-64 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="mb-2 text-3xl font-bold">Contact Information</h2>
              <p className="mb-8 text-blue-200">Fill up the form and our team will get back to you within 24 hours.</p>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl group-hover:bg-blue-600 transition-colors">
                    <Phone className="text-blue-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 uppercase tracking-wider font-semibold">Phone</p>
                    <p className="text-lg font-medium">+94 77 123 4567</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl group-hover:bg-blue-600 transition-colors">
                    <Mail className="text-blue-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 uppercase tracking-wider font-semibold">Email</p>
                    <p className="text-lg font-medium">info@elitemotors.lk</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl group-hover:bg-blue-600 transition-colors">
                    <MapPin className="text-blue-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-200 uppercase tracking-wider font-semibold">Location</p>
                    <p className="text-lg font-medium">No. 123, Galle Road,<br/>Colombo 03, Sri Lanka</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-12">
                <p className="mb-4 text-sm font-semibold text-blue-200">Follow us on</p>
                <div className="flex space-x-4">
                  <a href="#" className="p-2 transition bg-white/10 rounded-lg hover:bg-blue-600 hover:text-white"><Facebook size={20} /></a>
                  <a href="#" className="p-2 transition bg-white/10 rounded-lg hover:bg-blue-600 hover:text-white"><Twitter size={20} /></a>
                  <a href="#" className="p-2 transition bg-white/10 rounded-lg hover:bg-blue-600 hover:text-white"><Instagram size={20} /></a>
                  <a href="#" className="p-2 transition bg-white/10 rounded-lg hover:bg-blue-600 hover:text-white"><Linkedin size={20} /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="p-10 bg-white lg:p-12">
            <form className="space-y-6">
              
              {/* Name Input */}
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  placeholder="John Doe" 
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                  placeholder="john@example.com" 
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">Your Message</label>
                <textarea 
                  rows="4" 
                  className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="button" 
                className="group flex items-center justify-center w-full px-6 py-4 font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Send Message 
                <Send size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;