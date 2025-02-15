import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: [
      'Academic Resources',
      'Food & Beverages',
      'Stationary & Books',
      'Tech & Gadgets',
      'Hostel & Accommodation',
      'Transportation',
      'Health & Wellness',
      'Campus Events',
      'Financial Services',
      'Career Services',
      'Sports & Recreation',
      'Travel & Exploration',
      'Social Services',
      'Miscellaneous',
      'Lab & Research',
      'Personal Development'
    ],
    required: [true, 'Product category is required']
  },
  productType: {
    type: String,
    required: [true, 'Product type is required'],
    trim: true,
    enum: {
      values: [
        // Academic Resources
        'Textbooks', 'Research Papers', 'Course Notes', 'Project Kits', 'Calculator Rentals',
        // Food & Beverages
        'Mess Meal Pass', 'Snack Box', 'Energy Drinks', 'Protein Bars', 'Late Night Bites',
        // Stationary & Books
        'Engineering Notebooks', 'Scientific Calculators', 'Graph Papers', 'Blueprints', 'Art Supplies',
        // Tech & Gadgets
        'Arduino Kits', 'Laptop Rentals', 'PCB Boards', 'Software Licenses', 'Power Banks',
        // Hostel & Accommodation
        'Bedding Kits', 'Laundry Services', 'Room Heaters', 'Mini Fridges', 'Storage Lockers',
        // Transportation
        'Bike Rentals', 'Carpool Services', 'Shuttle Passes', 'Scooter Charging', 'Parking Permits',
        // Health & Wellness
        'Gym Memberships', 'Yoga Sessions', 'Mental Health Counseling', 'Medical Kits', 'Sports Massage',
        // Campus Events
        'Tech Fest Passes', 'Cultural Night Tickets', 'Guest Lectures', 'Hackathon Kits', 'Workshop Materials',
        // Financial Services
        'Scholarship Guidance', 'Part-time Job Listings', 'Book Buyback', 'Budget Planning', 'Crowdfunding',
        // Career Services
        'Resume Reviews', 'Interview Prep', 'Internship Listings', 'Placement Tests', 'Mock GD/PI',
        // Sports & Recreation
        'Sports Gear Rentals', 'Gym Access', 'Adventure Trips', 'Swimming Pass', 'Court Bookings',
        // Travel & Exploration
        'Study Tour Packages', 'Backpacking Kits', 'Local Guide Services', 'Camping Gear', 'Field Trip Essentials',
        // Social Services
        'Volunteering', 'Blood Donation', 'Community Meals', 'Old Book Drives', 'Campus Cleaning',
        // Miscellaneous
        'Lost & Found', 'Event Tickets', 'Campus Map', 'Emergency Kits', 'Time Management Tools',
        // Lab & Research
        'Lab Coat Rentals', 'Chemical Kits', 'Microscope Access', '3D Printing', 'Sensor Modules',
        // Personal Development
        'Online Courses', 'Certification Prep', 'Language Classes', 'Coding Bootcamps', 'Leadership Workshops'
      ],
      message: 'Invalid product type for category'
    }
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required']
  },
  // Additional IIT-specific fields
  labAccessLevel: {
    type: String,
    enum: ['Basic', 'Chemical', 'Electronics', 'Biohazard', 'High Voltage'],
    required: function(this: any) { return this.category === 'Lab & Research'; }
  },
  dietaryInfo: {
    type: [String],
    enum: ['Vegan', 'Gluten-Free', 'High Protein', 'Low Sugar', 'Halal', 'Kosher'],
    required: function(this: any) { return this.category === 'Food & Beverages'; }
  },
  techSpecs: {
    os: { type: String, enum: ['Windows', 'Linux', 'MacOS', 'Android', 'RTOS'] },
    warranty: { type: String, enum: ['None', '1 Year', '2 Years', 'Lifetime'] }
  }
}, { timestamps: true });

// Compound index for optimized queries
ProductSchema.index({ category: 1, productType: 1 });

// Virtual for formatted product name
ProductSchema.virtual('displayName').get(function() {
  return `${this.productType} (${this.category})`;
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);