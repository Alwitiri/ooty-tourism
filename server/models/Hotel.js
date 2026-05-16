const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, enum: ['luxury', 'resort', 'homestay', 'budget'] },
  amenities: [{ type: String }],
  location: { type: String },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
