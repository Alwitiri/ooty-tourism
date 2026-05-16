export const hotels = [
  { id: 1, name: 'Savoy Ooty', rating: 4.5, price: 8500, image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=400', category: 'luxury', amenities: ['WiFi', 'Breakfast', 'Valley View', 'Spa'], location: 'North Lake Road', description: 'Heritage hotel with stunning valley views, colonial architecture, and world-class service.' },
  { id: 2, name: 'Sterling Ooty', rating: 4.2, price: 5500, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400', category: 'resort', amenities: ['WiFi', 'Pool', 'Restaurant', 'Parking'], location: 'Fernhill', description: 'Premium resort amidst lush tea gardens with excellent amenities.' },
  { id: 3, name: 'Zostel Ooty', rating: 4.0, price: 1200, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400', category: 'budget', amenities: ['WiFi', 'Common Room', 'Cafe'], location: 'Ooty Main Road', description: 'Backpacker-friendly hostel with stunning common areas and mountain views.' },
  { id: 4, name: 'Taj Fort Aguada', rating: 4.8, price: 15000, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400', category: 'luxury', amenities: ['WiFi', 'Pool', 'Spa', 'Multi-Cuisine', 'Valet'], location: 'Kandal', description: 'Ultimate luxury experience with panoramic Nilgiri views.' },
  { id: 5, name: 'Green Wood Homestay', rating: 4.3, price: 2500, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400', category: 'homestay', amenities: ['Breakfast', 'Garden', 'Bonfire'], location: 'Ketti Valley', description: 'Cozy homestay with home-cooked meals and breathtaking valley views.' },
  { id: 6, name: 'Fernhurst Residency', rating: 4.1, price: 3200, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400', category: 'budget', amenities: ['WiFi', 'Restaurant', 'Parking'], location: 'Charing Cross', description: 'Well-maintained budget hotel in the heart of Ooty town.' },
];

export const restaurants = [
  { id: 1, name: 'Shinkows Chinese', rating: 4.3, costForTwo: 600, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', cuisine: ['Chinese', 'North Indian'], tags: ['Veg', 'Non-Veg'], mustTry: ['Gobi Manchurian', 'Schezwan Fried Rice'], timing: '11AM - 10PM' },
  { id: 2, name: 'Earlin Sam Cook', rating: 4.5, costForTwo: 400, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', cuisine: ['South Indian'], tags: ['Veg Only'], mustTry: ['Masala Dosa', 'Idiyappam'], timing: '7AM - 10PM' },
  { id: 3, name: 'Prasanna Vegetarian', rating: 4.1, costForTwo: 300, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400', cuisine: ['South Indian', 'North Indian'], tags: ['Veg Only'], mustTry: ['Meals', 'Parotta'], timing: '7AM - 10:30PM' },
  { id: 4, name: 'Mystic Kites Cafe', rating: 4.6, costForTwo: 800, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400', cuisine: ['Continental', 'Italian'], tags: ['Veg', 'Non-Veg'], mustTry: ['Pasta', 'Woodfire Pizza'], timing: '9AM - 9PM' },
  { id: 5, name: 'Tea Nest', rating: 4.4, costForTwo: 200, image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400', cuisine: ['Cafe', 'Bakery'], tags: ['Veg Only'], mustTry: ['Tea', 'Cakes', 'Sandwiches'], timing: '8AM - 8PM' },
  { id: 6, name: 'Kailash Parbat', rating: 4.2, costForTwo: 500, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', cuisine: ['North Indian', 'Street Food'], tags: ['Veg Only'], mustTry: ['Chole Bhature', 'Pav Bhaji'], timing: '10AM - 10PM' },
];

export const places = [
  { id: 1, name: 'Doddabetta Peak', type: 'paid', entryFee: 20, rating: 4.7, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400', bestTime: '6AM - 10AM', duration: '1-2 hours', distance: '10 km from Ooty', isHiddenGem: false, description: 'Highest peak in the Nilgiris offering panoramic views of the entire district.' },
  { id: 2, name: 'Ooty Lake', type: 'paid', entryFee: 30, rating: 4.3, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400', bestTime: '9AM - 5PM', duration: '2-3 hours', distance: '2 km from Ooty', isHiddenGem: false, description: 'Artificial lake offering boating, horseback riding, and scenic walks.' },
  { id: 3, name: 'Botanical Gardens', type: 'paid', entryFee: 30, rating: 4.5, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400', bestTime: '8AM - 6PM', duration: '1-2 hours', distance: '1 km from Ooty', isHiddenGem: false, description: 'Sprawling gardens with over 1,000 species of plants, flowers, and a fossilized tree.' },
  { id: 4, name: 'Nilgiri Mountain Railway', type: 'paid', entryFee: 250, rating: 4.8, image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=400', bestTime: '7AM - 9AM', duration: '5 hours', distance: 'Ooty Station', isHiddenGem: false, description: 'UNESCO World Heritage toy train journey through tunnels and stunning landscapes.' },
  { id: 5, name: 'Pine Forest', type: 'free', entryFee: 0, rating: 4.6, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400', bestTime: '9AM - 4PM', duration: '1 hour', distance: '5 km from Ooty', isHiddenGem: true, description: 'Serene pine tree forest perfect for photography and peaceful walks.' },
  { id: 6, name: 'Tea Museum', type: 'paid', entryFee: 50, rating: 4.2, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400', bestTime: '10AM - 5PM', duration: '1 hour', distance: '15 km from Ooty', isHiddenGem: false, description: 'Learn about tea processing history with tastings and factory tour.' },
  { id: 7, name: 'Hidden Valley', type: 'free', entryFee: 0, rating: 4.7, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', bestTime: '6AM - 12PM', duration: '3-4 hours', distance: '8 km from Ooty', isHiddenGem: true, description: 'Secluded valley with pristine nature, perfect for trekking and picnics.' },
  { id: 8, name: 'Rose Garden', type: 'paid', entryFee: 20, rating: 4.1, image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400', bestTime: '8AM - 6PM', duration: '1 hour', distance: '1 km from Ooty', isHiddenGem: false, description: 'India\'s largest rose garden with thousands of rose varieties.' },
];

export const guides = [
  { id: 1, name: 'Ramesh Kumar', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', languages: ['Tamil', 'English', 'Hindi'], experience: 8, specialization: ['Trekking', 'Heritage', 'Photography'], price: 2000, verified: true, phone: '+91 98765 43210' },
  { id: 2, name: 'Priya Devi', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', languages: ['Tamil', 'English', 'Malayalam'], experience: 5, specialization: ['Heritage', 'Bird Watching'], price: 1500, verified: true, phone: '+91 98765 43211' },
  { id: 3, name: 'Mohan Raj', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', languages: ['Tamil', 'English', 'Kannada'], experience: 12, specialization: ['Trekking', 'Adventure', 'Camping'], price: 3000, verified: true, phone: '+91 98765 43212' },
  { id: 4, name: 'Lakshmi S', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', languages: ['Tamil', 'English'], experience: 3, specialization: ['Heritage', 'Food Tours'], price: 1000, verified: false, phone: '+91 98765 43213' },
  { id: 5, name: 'Arun P', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', languages: ['Tamil', 'English', 'Hindi', 'Telugu'], experience: 7, specialization: ['Photography', 'Trekking', 'Wildlife'], price: 2500, verified: true, phone: '+91 98765 43214' },
];

export const transports = [
  { id: 1, type: 'SUV', name: 'Toyota Innova', capacity: 7, priceHalfDay: 2500, priceFullDay: 4000, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400', driver: { name: 'Suresh', rating: 4.7, trips: 340 }, routes: 'Local sightseeing / Coimbatore pickup' },
  { id: 2, type: 'Sedan', name: 'Honda City', capacity: 4, priceHalfDay: 1800, priceFullDay: 3000, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400', driver: { name: 'Rajesh', rating: 4.5, trips: 280 }, routes: 'Local sightseeing / Mysore route' },
  { id: 3, type: 'Tempo', name: 'Tempo Traveller', capacity: 12, priceHalfDay: 4000, priceFullDay: 6500, image: 'https://images.unsplash.com/photo-1566936012030-f9a1e39a02db?w=400', driver: { name: 'Kumar', rating: 4.8, trips: 420 }, routes: 'Group tours / Coimbatore to Ooty' },
  { id: 4, type: 'Bike', name: 'Royal Enfield', capacity: 2, priceHalfDay: 800, priceFullDay: 1500, image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=400', driver: null, routes: 'Self-drive / Local exploration' },
  { id: 5, type: 'Bus', name: 'Mini Bus', capacity: 20, priceHalfDay: 6000, priceFullDay: 10000, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400', driver: { name: 'Venkatesh', rating: 4.6, trips: 190 }, routes: 'Group tours / Multi-day trips' },
];

export const shops = [
  { id: 1, name: 'King Star Chocolates', category: 'Chocolate', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400', famousFor: 'Homemade Ooty Chocolates', priceRange: '₹100 - ₹500', location: 'Charing Cross' },
  { id: 2, name: 'Tea Emporium', category: 'Tea', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', famousFor: 'Nilgiri Orthodox Tea', priceRange: '₹200 - ₹2000', location: 'Commercial Road' },
  { id: 3, name: 'Himalayan Handicrafts', category: 'Handicraft', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400', famousFor: 'Wooden Carvings & Woolens', priceRange: '₹100 - ₹5000', location: 'Commercial Road' },
  { id: 4, name: 'Spice House', category: 'Spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', famousFor: 'Fresh Nilgiri Spices', priceRange: '₹50 - ₹300', location: 'Charing Cross' },
  { id: 5, name: 'Woolen World', category: 'Woolens', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400', famousFor: 'Handwoven Shawls & Sweaters', priceRange: '₹300 - ₹3000', location: 'Commercial Road' },
  { id: 6, name: 'Ooty Honey & Oils', category: 'Spices', image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400', famousFor: 'Pure Nilgiri Honey & Essential Oils', priceRange: '₹150 - ₹1000', location: 'Main Bazaar' },
];
