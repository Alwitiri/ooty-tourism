const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  famousFor: { type: String },
  priceRange: { type: String },
  location: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);
