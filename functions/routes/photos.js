const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const Photo = require('../models/Photo');

router.get('/', async (req, res, next) => {
  try {
    const photos = await Photo.find().sort('-createdAt');
    res.json({ success: true, count: photos.length, data: photos });
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

router.post('/', sanitize(['url', 'caption']), [
  body('url').trim().notEmpty().withMessage('Photo URL is required').isURL().withMessage('Invalid URL'),
  body('caption').optional().trim().isLength({ max: 500 }).withMessage('Caption too long'),
], validate, async (req, res, next) => {
  try {
    const photo = await Photo.create(req.body);
    res.status(201).json({ success: true, data: photo });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!photo) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: photo });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
