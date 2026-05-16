require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Hotel = require('./models/Hotel');
const Restaurant = require('./models/Restaurant');
const Place = require('./models/Place');
const Guide = require('./models/Guide');
const Transport = require('./models/Transport');
const Shop = require('./models/Shop');
const Photo = require('./models/Photo');
const Highlight = require('./models/Highlight');
const About = require('./models/About');
const User = require('./models/User');

const hotels = [
  { name: 'Savoy Ooty', rating: 4.5, price: 8500, image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=400', category: 'luxury', amenities: ['WiFi', 'Breakfast', 'Valley View', 'Spa'], location: 'North Lake Road', description: 'Heritage hotel with stunning valley views.' },
  { name: 'Sterling Ooty', rating: 4.2, price: 5500, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400', category: 'resort', amenities: ['WiFi', 'Pool', 'Restaurant'], location: 'Fernhill', description: 'Premium resort amidst tea gardens.' },
  { name: 'Zostel Ooty', rating: 4.0, price: 1200, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400', category: 'budget', amenities: ['WiFi', 'Cafe'], location: 'Ooty Main Road', description: 'Backpacker hostel with mountain views.' },
  { name: 'Green Wood Homestay', rating: 4.3, price: 2500, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400', category: 'homestay', amenities: ['Breakfast', 'Garden', 'Bonfire'], location: 'Ketti Valley', description: 'Cozy homestay with valley views.' },
];

const restaurants = [
  { name: 'Shinkows Chinese', rating: 4.3, costForTwo: 600, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', cuisine: ['Chinese', 'North Indian'], tags: ['Veg', 'Non-Veg'], mustTry: ['Gobi Manchurian', 'Schezwan Rice'], timing: '11AM-10PM' },
  { name: 'Earlin Sam Cook', rating: 4.5, costForTwo: 400, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', cuisine: ['South Indian'], tags: ['Veg Only'], mustTry: ['Masala Dosa', 'Idiyappam'], timing: '7AM-10PM' },
  { name: 'Mystic Kites Cafe', rating: 4.6, costForTwo: 800, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400', cuisine: ['Continental', 'Italian'], tags: ['Veg', 'Non-Veg'], mustTry: ['Pasta', 'Woodfire Pizza'], timing: '9AM-9PM' },
];

const places = [
  { name: 'Doddabetta Peak', type: 'paid', entryFee: 20, rating: 4.7, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400', bestTime: '6AM-10AM', duration: '1-2 hours', distance: '10 km', description: 'Highest peak in the Nilgiris.' },
  { name: 'Ooty Lake', type: 'paid', entryFee: 30, rating: 4.3, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400', bestTime: '9AM-5PM', duration: '2-3 hours', distance: '2 km', description: 'Boating and scenic walks.' },
  { name: 'Pine Forest', type: 'free', entryFee: 0, rating: 4.6, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400', bestTime: '9AM-4PM', duration: '1 hour', distance: '5 km', isHiddenGem: true, description: 'Serene pine forest for photography.' },
  { name: 'Hidden Valley', type: 'free', entryFee: 0, rating: 4.7, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', bestTime: '6AM-12PM', duration: '3-4 hours', distance: '8 km', isHiddenGem: true, description: 'Secluded valley for trekking.' },
];

const guides = [
  { name: 'Ramesh Kumar', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', languages: ['Tamil', 'English', 'Hindi'], experience: 8, specialization: ['Trekking', 'Heritage'], price: 2000, verified: true, phone: '+91 98765 43210' },
  { name: 'Priya Devi', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', languages: ['Tamil', 'English'], experience: 5, specialization: ['Heritage', 'Bird Watching'], price: 1500, verified: true, phone: '+91 98765 43211' },
];

const transports = [
  { type: 'SUV', name: 'Toyota Innova', capacity: 7, priceHalfDay: 2500, priceFullDay: 4000, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400', driver: { name: 'Suresh', rating: 4.7, trips: 340 }, routes: 'Local sightseeing' },
  { type: 'Sedan', name: 'Honda City', capacity: 4, priceHalfDay: 1800, priceFullDay: 3000, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400', driver: { name: 'Rajesh', rating: 4.5, trips: 280 }, routes: 'Local sightseeing' },
  { type: 'Bike', name: 'Royal Enfield', capacity: 2, priceHalfDay: 800, priceFullDay: 1500, image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=400', driver: null, routes: 'Self-drive' },
];

const abouts = [
  { type: 'hero', title: 'About Ooty Escapes', content: 'Your gateway to the Queen of Hills — curated travels, stays, and experiences in the Nilgiris since 2015.', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200', subtitle: 'Discover. Explore. Escape.', sortOrder: 1 },
  { type: 'story', title: 'Our Story', content: 'Ooty Escapes was born out of a love for the misty hills and winding roads of the Nilgiris. What started as a small blog sharing hidden trails and local chai spots grew into a full-fledged travel platform. Today, we help thousands of travelers discover Ooty — from heritage train rides and tea plantation walks to cozy homestays tucked away in the valleys. Every itinerary we craft, every guide we recommend, and every stay we list is handpicked by people who call these hills home.', sortOrder: 2 },
  { type: 'mission', title: 'Our Mission', content: 'To make every Ooty trip unforgettable by connecting travelers with authentic local experiences, trusted guides, and hidden gems that typical guidebooks miss.', sortOrder: 3 },
  { type: 'vision', title: 'Our Vision', content: 'A world where travel is not just about seeing new places, but about feeling them — where every journey supports local communities and preserves the magic of the hills for generations to come.', sortOrder: 4 },
  { type: 'stat', title: null, content: null, image: null, subtitle: '10+', sortOrder: 5 },
  { type: 'stat', title: null, content: null, image: null, subtitle: '5000+', sortOrder: 6 },
  { type: 'stat', title: null, content: null, image: null, subtitle: '50+', sortOrder: 7 },
  { type: 'team', title: 'Ramesh Kumar', content: 'Founder & head guide with 15 years of experience exploring every trail in the Nilgiris.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', subtitle: 'Founder & Lead Guide', sortOrder: 8 },
  { type: 'team', title: 'Priya Devi', content: 'Customer Experience specialist who ensures every traveler feels welcome from the moment they land.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', subtitle: 'Customer Experience', sortOrder: 9 },
  { type: 'team', title: 'Arun Nair', content: 'Operations manager keeping our fleet of vehicles running smoothly across all routes.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', subtitle: 'Operations Manager', sortOrder: 10 },
  { type: 'values', title: 'Sustainability', content: 'We promote eco-friendly travel and partner with local businesses that respect the environment.', sortOrder: 11 },
  { type: 'values', title: 'Authenticity', content: 'No generic tours — every experience is crafted to show you the real Ooty, its people, and its culture.', sortOrder: 12 },
  { type: 'values', title: 'Community', content: 'We reinvest in local communities through guide training programs and conservation initiatives.', sortOrder: 13 },
];

const highlights = [
  { title: 'Nilgiri Mountain Railway', image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600', description: 'UNESCO World Heritage toy train journey through 16 tunnels and 250 bridges.', sortOrder: 1 },
  { title: 'Tea Gardens', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600', description: 'Endless rolling hills of lush green tea plantations stretching to the horizon.', sortOrder: 2 },
  { title: 'Doddabetta Peak', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600', description: 'The highest point in the Nilgiris at 2,637 meters above sea level.', sortOrder: 3 },
];

const shops = [
  { name: 'King Star Chocolates', category: 'Chocolate', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400', famousFor: 'Homemade Ooty Chocolates', priceRange: '₹100-₹500', location: 'Charing Cross' },
  { name: 'Tea Emporium', category: 'Tea', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', famousFor: 'Nilgiri Orthodox Tea', priceRange: '₹200-₹2000', location: 'Commercial Road' },
];

async function seed() {
  await connectDB();
  await Promise.all([
    Hotel.deleteMany({}), Restaurant.deleteMany({}), Place.deleteMany({}),
    Guide.deleteMany({}), Transport.deleteMany({}), Shop.deleteMany({}),
    Photo.deleteMany({}), Highlight.deleteMany({}), About.deleteMany({}),
    User.deleteMany({}),
  ]);
  await Promise.all([
    Hotel.insertMany(hotels), Restaurant.insertMany(restaurants), Place.insertMany(places),
    Guide.insertMany(guides), Transport.insertMany(transports), Shop.insertMany(shops),
    Highlight.insertMany(highlights), About.insertMany(abouts),
  ]);
  await User.create({ name: 'Saina', email: 'saina@ooty.com', password: 'sai1234', role: 'admin' });
  await User.create({ name: 'Alwin', email: 'alwin@ooty.com', password: 'alwin123', role: 'customer' });
  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
