const functions = require('firebase-functions');

const config = functions.config();
process.env.MONGODB_URI = config.mongodb?.uri || process.env.MONGODB_URI;
process.env.JWT_SECRET = config.jwt?.secret || process.env.JWT_SECRET;
process.env.NODE_ENV = 'production';

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const app = require('./app');

connectDB();

exports.api = functions.https.onRequest(app);
