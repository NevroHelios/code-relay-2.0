import dbConnect from '@/lib/mongodb';
import Product from '../src/models/Product';

const sampleProducts = [
    // Academic Resources
    {
      category: "Academic Resources",
      productType: "Research Papers",
      description: "Access to IEEE journals bundle (2020-2023)",
      price: 45,
      techSpecs: { os: "Linux", warranty: "None" }
    },
  
    // Food & Beverages
    {
      category: "Food & Beverages",
      productType: "Protein Bars",
      description: "High-protein meal replacement bars (pack of 12)",
      price: 2.5,
      dietaryInfo: ["High Protein", "Low Sugar"]
    },
  
    // Lab & Research
    {
      category: "Lab & Research",
      productType: "3D Printing",
      description: "3D printer access (4-hour slot)",
      price: 150,
      labAccessLevel: "Advanced",
      techSpecs: { os: "Linux", warranty: "1 Year" }
    },
  
    // Hostel & Accommodation
    {
      category: "Hostel & Accommodation",
      productType: "Mini Fridges",
      description: "Compact 50L fridge rental (per semester)",
      price: 80
    },
  
    // Health & Wellness
    {
      category: "Health & Wellness",
      productType: "Sports Massage",
      description: "60-min physiotherapy session",
      price: 15
    },
  
    // Tech & Gadgets
    {
      category: "Tech & Gadgets",
      productType: "Arduino Kits",
      description: "Starter kit with 20+ sensors",
      price: 29.99,
      techSpecs: { os: "Windows", warranty: "None" }
    },
  
    // Campus Events
    {
      category: "Campus Events",
      productType: "Hackathon Kits",
      description: "Techfest 2024 participant package",
      price: 20
    },
  
    // Personal Development
    {
      category: "Personal Development",
      productType: "Coding Bootcamps",
      description: "Python & ML intensive (40 hours)",
      price: 200
    },
  
    // Transportation
    {
      category: "Transportation",
      productType: "Bike Rentals",
      description: "Monthly bicycle rental",
      price: 12.5
    },
  
    // Social Services
    {
      category: "Social Services",
      productType: "Blood Donation",
      description: "Campus blood drive participation",
      price: 0
    },
  
    // Career Services
    {
      category: "Career Services",
      productType: "Resume Reviews",
      description: "Professional CV analysis",
      price: 10
    },
  
    // Miscellaneous
    {
      category: "Miscellaneous",
      productType: "Time Management Tools",
      description: "Planner + productivity workshop",
      price: 8
    },
  
    // Sports & Recreation
    {
      category: "Sports & Recreation",
      productType: "Sports Gear Rentals",
      description: "Badminton racket + shuttlecocks",
      price: 3
    },
  
    // Travel & Exploration
    {
      category: "Travel & Exploration",
      productType: "Camping Gear",
      description: "Tent + sleeping bag package",
      price: 25
    },
  
    // Financial Services
    {
      category: "Financial Services",
      productType: "Scholarship Guidance",
      description: "1-on-1 consultation session",
      price: 5
    },
  
    // Stationary & Books
    {
      category: "Stationary & Books",
      productType: "Engineering Notebooks",
      description: "Quad-ruled lab journals (pack of 5)",
      price: 7
    }
  ];

async function seedDatabase() {
  try {
    await dbConnect();
    
    // Clear existing data
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert new data
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${inserted.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();