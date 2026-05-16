const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String },
  section: { type: String, enum: ['hero', 'gallery'], default: 'gallery' },
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);
