const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['free', 'paid'] },
  entryFee: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  image: { type: String },
  bestTime: { type: String },
  duration: { type: String },
  distance: { type: String },
  isHiddenGem: { type: Boolean, default: false },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
