let mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  author: String,
  payload: String
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
