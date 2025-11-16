const mongoose = require('mongoose');

const userConnectionsSchema = new mongoose.Schema({
  connection1Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  connection2Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('UserConnections', userConnectionsSchema);