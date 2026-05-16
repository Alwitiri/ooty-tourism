const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  languages: [{ type: String }],
  experience: { type: Number },
  specialization: [{ type: String }],
  price: { type: Number },
  verified: { type: Boolean, default: false },
  phone: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Guide', guideSchema);
