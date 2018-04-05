let mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  users: [String],
  messages: [Object]
}, { timestamps: true });

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
