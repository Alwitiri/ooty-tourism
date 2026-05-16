require('dotenv').config({ path: require('path').join(__dirname, '..', 'server', '.env') });
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://alwinjosephm20_db_user:pzYn9C0q1GPY1NgP@cluster0.omyff2f.mongodb.net/ooty-tourism?retryWrites=true&w=majority';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'ooty-secret-2024';

const mongoose = require('mongoose');
const connectDB = require('../server/config/db');
const app = require('../server/app');

connectDB();

module.exports = app;
