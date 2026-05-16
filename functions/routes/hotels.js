const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Hotel = require('../models/Hotel');

router.get('/', async (req, res, next) => {
  try {
    const { category, sort } = req.query;
    const query = {};
    if (category && category !== 'all') query.category = category;
    let hotels = await Hotel.find(query);
    if (sort === 'price_asc') hotels.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') hotels.sort((a, b) => b.price - a.price);
    else hotels.sort((a, b) => b.rating - a.rating);
    res.json({ success: true, count: hotels.length, data: hotels });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: hotel });
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
  body('name').trim().notEmpty().withMessage('Hotel name is required').isLength({ max: 100 }).withMessage('Name too long (max 100 chars)'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be 0-5'),
  body('category').optional().isIn(['luxury', 'resort', 'homestay', 'budget']).withMessage('Invalid category'),
  body('image').optional().isURL().withMessage('Invalid image URL'),
  body('location').optional().trim().isLength({ max: 200 }).withMessage('Location too long'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description too long'),
  body('amenities').optional().isArray().withMessage('Amenities must be an array'),
], validate, async (req, res, next) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({ success: true, data: hotel });
  } catch (err) { next(err); }
});

router.put('/:id', sanitize(['name', 'location', 'description']), [
  body('name').optional().trim().notEmpty().withMessage('Hotel name cannot be empty').isLength({ max: 100 }).withMessage('Name too long'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be 0-5'),
  body('category').optional().isIn(['luxury', 'resort', 'homestay', 'budget']).withMessage('Invalid category'),
  body('image').optional().isURL().withMessage('Invalid image URL'),
  body('amenities').optional().isArray().withMessage('Amenities must be an array'),
], validate, async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
    res.json({ success: true, data: hotel });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
