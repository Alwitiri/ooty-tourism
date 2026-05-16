const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  costForTwo: { type: Number },
  image: { type: String },
  cuisine: [{ type: String }],
  tags: [{ type: String }],
  mustTry: [{ type: String }],
  timing: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
