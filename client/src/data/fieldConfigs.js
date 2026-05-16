export const moduleConfigs = {
  hotels: {
    label: 'Hotels',
    icon: '🏨',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'category', label: 'Category' },
      { key: 'price', label: 'Price (₹)' },
      { key: 'rating', label: 'Rating' },
      { key: 'location', label: 'Location' },
    ],
    fields: [
      { key: 'name', label: 'Hotel Name', type: 'text', required: true, placeholder: 'e.g. Savoy Ooty' },
      { key: 'category', label: 'Category', type: 'select', options: ['luxury', 'resort', 'homestay', 'budget'] },
      { key: 'price', label: 'Price per Night (₹)', type: 'number', required: true, min: 0 },
      { key: 'rating', label: 'Rating (0-5)', type: 'number', min: 0, max: 5, step: 0.1, default: 0 },
      { key: 'image', label: 'Image URL', type: 'image' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g. North Lake Road' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the hotel...' },
      { key: 'amenities', label: 'Amenities', type: 'multi-select', default: [] },
    ],
  },

  restaurants: {
    label: 'Restaurants',
    icon: '🍽️',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'cuisine', label: 'Cuisine' },
      { key: 'costForTwo', label: 'Cost for Two (₹)' },
      { key: 'rating', label: 'Rating' },
      { key: 'timing', label: 'Timing' },
    ],
    fields: [
      { key: 'name', label: 'Restaurant Name', type: 'text', required: true, placeholder: 'e.g. Shinkows Chinese' },
      { key: 'cuisine', label: 'Cuisine Types', type: 'multi-select', default: [] },
      { key: 'costForTwo', label: 'Cost for Two (₹)', type: 'number', min: 0 },
      { key: 'rating', label: 'Rating (0-5)', type: 'number', min: 0, max: 5, step: 0.1, default: 0 },
      { key: 'image', label: 'Image URL', type: 'image' },
      { key: 'tags', label: 'Tags (Veg/Non-Veg)', type: 'multi-select', default: [] },
      { key: 'mustTry', label: 'Must-Try Dishes', type: 'multi-select', default: [] },
      { key: 'timing', label: 'Timing', type: 'text', placeholder: 'e.g. 11AM - 10PM' },
    ],
  },

  places: {
    label: 'Places',
    icon: '📍',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'type', label: 'Type' },
      { key: 'entryFee', label: 'Entry Fee (₹)' },
      { key: 'rating', label: 'Rating' },
      { key: 'isHiddenGem', label: 'Hidden Gem' },
    ],
    fields: [
      { key: 'name', label: 'Place Name', type: 'text', required: true, placeholder: 'e.g. Doddabetta Peak' },
      { key: 'type', label: 'Entry Type', type: 'select', options: ['free', 'paid'] },
      { key: 'entryFee', label: 'Entry Fee (₹)', type: 'number', min: 0, default: 0 },
      { key: 'rating', label: 'Rating (0-5)', type: 'number', min: 0, max: 5, step: 0.1, default: 0 },
      { key: 'image', label: 'Image URL', type: 'image' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'bestTime', label: 'Best Time to Visit', type: 'text', placeholder: 'e.g. 6AM - 10AM' },
      { key: 'duration', label: 'Duration Needed', type: 'text', placeholder: 'e.g. 1-2 hours' },
      { key: 'distance', label: 'Distance from Ooty', type: 'text', placeholder: 'e.g. 10 km' },
      { key: 'isHiddenGem', label: 'Hidden Gem', type: 'boolean', default: false },
    ],
  },

  guides: {
    label: 'Guides',
    icon: '🧭',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'experience', label: 'Experience (yrs)' },
      { key: 'price', label: 'Price/Day (₹)' },
      { key: 'verified', label: 'Verified' },
      { key: 'languages', label: 'Languages' },
    ],
    fields: [
      { key: 'name', label: 'Guide Name', type: 'text', required: true, placeholder: 'e.g. Ramesh Kumar' },
      { key: 'photo', label: 'Photo URL', type: 'image' },
      { key: 'languages', label: 'Languages Spoken', type: 'multi-select', default: [] },
      { key: 'experience', label: 'Experience (years)', type: 'number', min: 0, default: 0 },
      { key: 'specialization', label: 'Specializations', type: 'multi-select', default: [] },
      { key: 'price', label: 'Price per Day (₹)', type: 'number', min: 0 },
      { key: 'verified', label: 'Verified Badge', type: 'boolean', default: false },
      { key: 'phone', label: 'Phone Number', type: 'text', placeholder: '+91 98765 43210' },
    ],
  },

  transports: {
    label: 'Travel',
    icon: '🚗',
    columns: [
      { key: 'name', label: 'Vehicle' },
      { key: 'type', label: 'Type' },
      { key: 'capacity', label: 'Capacity' },
      { key: 'priceHalfDay', label: 'Half Day (₹)' },
      { key: 'priceFullDay', label: 'Full Day (₹)' },
      { key: 'driverName', label: 'Driver' },
    ],
    fields: [
      { key: 'name', label: 'Vehicle Name', type: 'text', required: true, placeholder: 'e.g. Toyota Innova' },
      { key: 'type', label: 'Type', type: 'select', options: ['SUV', 'Sedan', 'Tempo', 'Bike', 'Bus'] },
      { key: 'capacity', label: 'Passenger Capacity', type: 'number', min: 1 },
      { key: 'priceHalfDay', label: 'Half Day Price (₹)', type: 'number', min: 0 },
      { key: 'priceFullDay', label: 'Full Day Price (₹)', type: 'number', min: 0 },
      { key: 'image', label: 'Image URL', type: 'image' },
      { key: 'routes', label: 'Available Routes', type: 'textarea', placeholder: 'e.g. Local sightseeing / Coimbatore pickup' },
      { key: 'driverName', label: 'Driver Name', type: 'text', placeholder: 'Leave empty for self-drive' },
      { key: 'driverRating', label: 'Driver Rating', type: 'number', min: 0, max: 5, step: 0.1 },
    ],
  },

  shops: {
    label: 'Shops',
    icon: '🛍️',
    columns: [
      { key: 'name', label: 'Store Name' },
      { key: 'category', label: 'Category' },
      { key: 'priceRange', label: 'Price Range' },
      { key: 'location', label: 'Location' },
    ],
    fields: [
      { key: 'name', label: 'Store Name', type: 'text', required: true, placeholder: 'e.g. King Star Chocolates' },
      { key: 'category', label: 'Category', type: 'select', options: ['Tea', 'Chocolate', 'Spices', 'Handicraft', 'Woolens'] },
      { key: 'image', label: 'Image URL', type: 'image' },
      { key: 'famousFor', label: 'Famous For', type: 'text', placeholder: 'e.g. Homemade Ooty Chocolates' },
      { key: 'priceRange', label: 'Price Range', type: 'text', placeholder: 'e.g. ₹100 - ₹500' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g. Charing Cross' },
    ],
  },

  abouts: {
    label: 'About Us',
    icon: 'ℹ️',
    columns: [
      { key: 'sortOrder', label: 'Order' },
      { key: 'type', label: 'Type' },
      { key: 'title', label: 'Title / Name' },
      { key: 'subtitle', label: 'Role / Value' },
    ],
    fields: [
      { key: 'type', label: 'Section Type', type: 'select', options: ['hero', 'story', 'mission', 'vision', 'team', 'stat', 'values'] },
      { key: 'title', label: 'Title / Name', type: 'text', placeholder: 'e.g. Our Story, or team member name' },
      { key: 'content', label: 'Content / Bio', type: 'textarea', placeholder: 'Main text for this section' },
      { key: 'image', label: 'Image URL', type: 'image' },
      { key: 'subtitle', label: 'Subtitle / Role / Stat Value', type: 'text', placeholder: 'e.g. Founder & Lead Guide' },
      { key: 'sortOrder', label: 'Sort Order', type: 'number', min: 0, default: 0 },
    ],
  },

  highlights: {
    label: 'Home Highlights',
    icon: '⭐',
    columns: [
      { key: 'sortOrder', label: 'Order' },
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description' },
    ],
    fields: [
      { key: 'title', label: 'Highlight Title', type: 'text', required: true, placeholder: 'e.g. Nilgiri Mountain Railway' },
      { key: 'image', label: 'Image URL', type: 'image' },
      { key: 'description', label: 'Description', type: 'textarea', required: true },
      { key: 'sortOrder', label: 'Sort Order', type: 'number', min: 0, default: 0 },
    ],
  },
};
