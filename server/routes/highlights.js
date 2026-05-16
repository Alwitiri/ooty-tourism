const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Highlight = require('../models/Highlight');

router.get('/', async (req, res, next) => {
  try {
    let items = await Highlight.find().sort('sortOrder');
    res.json({ success: true, count: items.length, data: items });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await Highlight.findById(req.params.id);
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

router.post('/', sanitize(['title', 'description']), [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title too long (max 200 chars)'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description too long'),
  body('sortOrder').optional().isInt({ min: 0 }).withMessage('Sort order must be a positive integer'),
  body('image').optional().isURL().withMessage('Invalid image URL'),
], validate, async (req, res, next) => {
  try {
    const item = await Highlight.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.put('/:id', sanitize(['title', 'description']), [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 200 }).withMessage('Title too long'),
  body('description').optional().trim().isLength({ max: 2000 }).withMessage('Description too long'),
  body('sortOrder').optional().isInt({ min: 0 }).withMessage('Sort order must be a positive integer'),
  body('image').optional().isURL().withMessage('Invalid image URL'),
], validate, async (req, res, next) => {
  try {
    const item = await Highlight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Highlight not found' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Highlight.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
