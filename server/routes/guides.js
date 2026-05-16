const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Guide = require('../models/Guide');

router.get('/', async (req, res, next) => {
  try {
    let guides = await Guide.find();
    guides.sort((a, b) => b.experience - a.experience);
    res.json({ success: true, count: guides.length, data: guides });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Guide.findById(req.params.id);
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

router.post('/', sanitize(['name', 'languages', 'specialty']), [
  body('name').trim().notEmpty().withMessage('Guide name is required').isLength({ max: 100 }).withMessage('Name too long (max 100 chars)'),
  body('experience').optional().isInt({ min: 0 }).withMessage('Experience must be a positive integer'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be 0-5'),
  body('languages').optional().isArray().withMessage('Languages must be an array'),
  body('specialty').optional().trim().isLength({ max: 200 }).withMessage('Specialty too long'),
  body('image').optional().isURL().withMessage('Invalid image URL'),
], validate, async (req, res, next) => {
  try {
    const item = await Guide.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.put('/:id', sanitize(['name', 'languages', 'specialty']), [
  body('name').optional().trim().notEmpty().withMessage('Guide name cannot be empty').isLength({ max: 100 }).withMessage('Name too long'),
  body('experience').optional().isInt({ min: 0 }).withMessage('Experience must be a positive integer'),
  body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be 0-5'),
  body('languages').optional().isArray().withMessage('Languages must be an array'),
  body('specialty').optional().trim().isLength({ max: 200 }).withMessage('Specialty too long'),
  body('image').optional().isURL().withMessage('Invalid image URL'),
], validate, async (req, res, next) => {
  try {
    const item = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Guide.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
