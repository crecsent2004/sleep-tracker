const express = require('express');
const jwt = require('jsonwebtoken');
const SleepLog = require('../models/SleepLog');
const router = express.Router();

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

router.post('/', authMiddleware, async (req, res) => {
  const { date, sleepTime, wakeTime, notes } = req.body;
  try {
    const newLog = new SleepLog({ userId: req.userId, date, sleepTime, wakeTime, notes });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const logs = await SleepLog.find({ userId: req.userId }).sort({ date: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
