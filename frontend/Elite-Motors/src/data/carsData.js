export const carsData = [
  { 
    id: 1, 
    brand: "Toyota", 
    model: "Premio", 
    year: 2019, 
    price: "12,500,000 LKR", 
    fuel: "Petrol", 
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=600&auto=format&fit=crop",
    description: "Toyota Premio 2019 offers a perfect blend of luxury and reliability. Features include electric seats, beige interior, and safety sense.",
    mileage: "25,000 km",
    transmission: "Automatic",
    features: ["Electric Seats", "Beige Interior", "Toyota Safety Sense", "Push Start", "Idle Stop", "Lane Departure Alert"],
    
    // Updated Fields
    status: "In Stock",
    certified: true
  },
  { 
    id: 2, 
    brand: "Honda", 
    model: "Civic Turbo", 
    year: 2020, 
    price: "14,200,000 LKR", 
    fuel: "Petrol", 
    image: "https://images.unsplash.com/photo-1606152421811-aa911e6ade92?q=80&w=600&auto=format&fit=crop",
    description: "Experience the power of the Civic Turbo. Sporty design with advanced handling and a premium sound system.",
    mileage: "18,000 km",
    transmission: "CVT",
    features: ["Sunroof", "Paddle Shifters", "Honda Sensing", "Apple CarPlay", "Sport Mode", "Lane Watch Camera"],

    // Updated Fields (Sold Out example)
    status: "Sold Out",
    certified: true
  },
  { 
    id: 3, 
    brand: "BMW", 
    model: "i8", 
    year: 2018, 
    price: "35,000,000 LKR", 
    fuel: "Hybrid", 
    image: "https://images.unsplash.com/photo-1556189250-72ba95452242?q=80&w=600&auto=format&fit=crop",
    description: "The future is here. BMW i8 combines electric efficiency with supercar performance. Butterfly doors and carbon fiber structure.",
    mileage: "12,000 km",
    transmission: "Automatic",
    features: ["Butterfly Doors", "Head-Up Display (HUD)", "Carbon Fiber Chassis", "Harman Kardon Audio", "360 Camera", "Laser Headlights"],

    // Updated Fields (Not Certified example)
    status: "In Stock",
    certified: false
  },
  { 
    id: 4, 
    brand: "Mercedes", 
    model: "Benz C-Class", 
    year: 2021, 
    price: "28,500,000 LKR", 
    fuel: "Diesel", 
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop",
    description: "Luxury defined. The C-Class sets the standard for compact executive cars with its cutting-edge technology and comfort.",
    mileage: "5,000 km",
    transmission: "Automatic",
    features: ["Ambient Lighting", "Burmester Surround Sound", "Panoramic Sliding Sunroof", "Active Brake Assist", "Memory Seats", "Wireless Charging"],

    // Updated Fields (Pre-order example)
    status: "Pre-order",
    certified: true
  }
];