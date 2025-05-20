const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  sleepTime: { type: Date, required: true },
  wakeTime: { type: Date, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('SleepLog', sleepSchema);
