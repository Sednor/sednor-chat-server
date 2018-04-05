let mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  name: String,
  users: Array,
  messages: Array
}, { timestamps: true });

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
