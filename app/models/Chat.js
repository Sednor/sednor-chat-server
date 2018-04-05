let mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  name: String,
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  messages: Array
}, { timestamps: true });

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
