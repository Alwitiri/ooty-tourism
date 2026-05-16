const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  type: { type: String },
  name: { type: String, required: true },
  capacity: { type: Number },
  priceHalfDay: { type: Number },
  priceFullDay: { type: Number },
  image: { type: String },
  driver: {
    name: String,
    rating: Number,
    trips: Number,
  },
  routes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Transport', transportSchema);
