const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  userDetailId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail', default: null },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);