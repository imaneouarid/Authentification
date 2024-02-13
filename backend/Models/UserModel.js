// models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role', // This should match the model name of your Role schema
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
