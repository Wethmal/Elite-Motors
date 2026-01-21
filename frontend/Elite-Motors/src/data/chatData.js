// src/data/chatData.js

export const chatData = [
  {
    keywords: ["hi", "hello", "hey", "ආයුබෝවන්", "හායි"],
    response: "Hello! Welcome to Elite Motors. How can I help you today? 🚗"
  },
  {
    keywords: ["price", "cost", "how much", "මිල", "ගාන"],
    response: "Our car prices depend on the model. You can check the 'Cars' page for latest prices or contact us for a quotation."
  },
  {
    keywords: ["location", "address", "where", "place", "ලිපිනය", "කොහෙද"],
    response: "We are located at No. 123, High Level Road, Colombo. Come visit us!"
  },
  {
    keywords: ["contact", "phone", "call", "number", "දුරකථන", " නම්බර්"],
    response: "You can call us at +94 77 123 4567 or email at info@elitemotors.lk."
  },
  {
    keywords: ["test ride", "booking", "book", "try", "ටෙස්ට්"],
    response: "You can book a test ride by clicking the 'Book Now' button on any car details page."
  },
  {
    keywords: ["warranty", "guarantee", "වගකීම"],
    response: "Yes! All our vehicles come with a 1-year comprehensive warranty and 3 free services."
  },
  {
    keywords: ["finance", "leasing", "loan", "ලිසිං"],
    response: "We have partnerships with major banks to provide easy leasing facilities."
  },
  {
    keywords: ["bye", "goodbye", "later", "ගිහින් එන්නම්"],
    response: "Goodbye! Drive safe! 🚘"
  }
];

// Default response when no keyword matches
export const defaultResponse = "I'm sorry, I didn't understand that. Please contact our hotline for more details: +94 77 123 4567.";