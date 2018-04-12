let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
  verified: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
