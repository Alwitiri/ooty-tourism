const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());

const corsOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:5173'];
app.use(cors({ origin: corsOrigins, credentials: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later' },
});
app.use('/api/', limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts, please try again later' },
});
app.use('/api/auth/', authLimiter);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/places', require('./routes/places'));
app.use('/api/guides', require('./routes/guides'));
app.use('/api/transports', require('./routes/transports'));
app.use('/api/shops', require('./routes/shops'));
app.use('/api/photos', require('./routes/photos'));
app.use('/api/highlights', require('./routes/highlights'));
app.use('/api/abouts', require('./routes/abouts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/login-logs', require('./routes/loginLogs'));

app.use('/api/health', (req, res) => {
  res.json({ success: true, message: 'Ooty Tourism API is running', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html')));
}

app.use(errorHandler);

module.exports = app;
