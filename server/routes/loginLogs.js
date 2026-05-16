const router = require('express').Router();
const LoginLog = require('../models/LoginLog');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    const { action, page = 1, limit = 50 } = req.query;
    const query = {};
    if (action) query.action = action;
    const logs = await LoginLog.find(query)
      .populate('user', 'name email')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await LoginLog.countDocuments(query);
    res.json({ success: true, count: logs.length, total, page: Number(page), data: logs });
  } catch (err) { next(err); }
});

router.get('/export', protect, adminOnly, async (req, res, next) => {
  try {
    const logs = await LoginLog.find()
      .populate('user', 'name email')
      .sort('-createdAt');
    const rows = [['Date', 'Email', 'Name', 'Action', 'IP', 'Country', 'City', 'User Agent']];
    logs.forEach((l) => {
      rows.push([
        l.createdAt?.toISOString(),
        l.email || '',
        l.user?.name || '',
        l.action,
        l.ip || '',
        l.location?.country || '',
        l.location?.city || '',
        l.userAgent || '',
      ]);
    });
    const csv = rows.map((r) => r.map((c) => `"${(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=login-logs.csv');
    res.send(csv);
  } catch (err) { next(err); }
});

module.exports = router;
