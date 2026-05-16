const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Place = require('../models/Place');

router.get('/', async (req, res, next) => {
  try {
    const { type } = req.query;
    const query = {};
    if (type === 'free') query.type = 'free';
    else if (type === 'paid') query.type = 'paid';
    let places = await Place.find(query);
    places.sort((a, b) => b.rating - a.rating);
    res.json({ success: true, count: places.length, data: places });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Place.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, message: errors.array().map((e) => e.msg).join('; ') });
  next();
};

const sanitize = (fields) => (req, res, next) => {
  fields.forEach((f) => { if (typeof req.body[f] === 'string') req.body[f] = req.body[f].trim(); });
  next();
};

router.post('/', sanitize(['name', 'location', 'description']), [
  body('name').trim().notEmpty().withMessage('Place name is required').isLength({ max: 100 }).withMessage('Name too long (max 100 chars)'),
  body('type').optional().isIn(['free', 'paid']).withMessage('Type must be free or paid'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be 0-5'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location too long'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description too long'),
  body('image').optional().isURL().withMessage('Invalid image URL'),
], validate, async (req, res, next) => {
  try {
    const item = await Place.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.put('/:id', sanitize(['name', 'location', 'description']), [
  body('name').optional().trim().notEmpty().withMessage('Place name cannot be empty').isLength({ max: 100 }).withMessage('Name too long'),
  body('type').optional().isIn(['free', 'paid']).withMessage('Type must be free or paid'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be 0-5'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location too long'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description too long'),
  body('image').optional().isURL().withMessage('Invalid image URL'),
], validate, async (req, res, next) => {
  try {
    const item = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Place not found' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
