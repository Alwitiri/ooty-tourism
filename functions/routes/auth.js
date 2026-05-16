const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const LoginLog = require('../models/LoginLog');
const { generateToken, protect } = require('../middleware/auth');
const { getLocation, getClientIp } = require('../utils/location');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array().map((e) => e.msg).join('; ') });
  next();
};

const sanitize = (fields) => (req, res, next) => {
  fields.forEach((f) => { if (typeof req.body[f] === 'string') req.body[f] = req.body[f].trim(); });
  next();
};

router.post('/register', sanitize(['name', 'email', 'password']), [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], validate, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    const ip = getClientIp(req);
    await LoginLog.create({ user: user._id, email, action: 'signup', ip, location: getLocation(ip), userAgent: req.headers['user-agent']?.slice(0, 200) });
    res.status(201).json({ success: true, data: { user: user.toJSON(), token } });
  } catch (err) { next(err); }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });
    const user = await User.findOne({ email });
    const ip = getClientIp(req);
    const location = getLocation(ip);
    if (!user || !(await user.comparePassword(password))) {
      await LoginLog.create({ email, action: 'failed_login', ip, location, userAgent: req.headers['user-agent']?.slice(0, 200) });
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const token = generateToken(user);
    await LoginLog.create({ user: user._id, email, action: 'login', ip, location, userAgent: req.headers['user-agent']?.slice(0, 200) });
    res.json({ success: true, data: { user: user.toJSON(), token } });
  } catch (err) { next(err); }
});

router.get('/me', protect, async (req, res) => {
  res.json({ success: true, data: req.user });
});

module.exports = router;
