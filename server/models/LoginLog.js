const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: { type: String },
  action: { type: String, enum: ['signup', 'login', 'failed_login'], required: true },
  ip: { type: String },
  location: {
    country: String,
    region: String,
    city: String,
    lat: Number,
    lon: Number,
  },
  userAgent: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('LoginLog', loginLogSchema);
