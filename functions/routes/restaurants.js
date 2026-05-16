const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Restaurant = require('../models/Restaurant');

router.get('/', async (req, res, next) => {
  try {
    const { cuisine } = req.query;
    const query = {};
    if (cuisine && cuisine !== 'all') query.cuisine = cuisine;
    let restaurants = await Restaurant.find(query);
    restaurants.sort((a, b) => b.rating - a.rating);
    res.json({ success: true, count: restaurants.length, data: restaurants });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Restaurant.findById(req.params.id);
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

router.post('/', sanitize(['name', 'cuisine', 'location', 'description']), [
  body('name').trim().notEmpty().withMessage('Restaurant name is required').isLength({ max: 100 }).withMessage('Name too long (max 100 chars)'),
  body('cuisine').optional().trim().isLength({ max: 100 }).withMessage('Cuisine too long'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be 0-5'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location too long'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description too long'),
  body('image').optional().isURL().withMessage('Invalid image URL'),
], validate, async (req, res, next) => {
  try {
    const item = await Restaurant.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.put('/:id', sanitize(['name', 'cuisine', 'location', 'description']), [
  body('name').optional().trim().notEmpty().withMessage('Restaurant name cannot be empty').isLength({ max: 100 }).withMessage('Name too long'),
  body('cuisine').optional().trim().isLength({ max: 100 }).withMessage('Cuisine too long'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be 0-5'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location too long'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description too long'),
  body('image').optional().isURL().withMessage('Invalid image URL'),
], validate, async (req, res, next) => {
  try {
    const item = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
