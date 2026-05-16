const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['hero', 'story', 'mission', 'vision', 'team', 'stat', 'values'] },
  title: { type: String },
  content: { type: String },
  image: { type: String },
  subtitle: { type: String },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
