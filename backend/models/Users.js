const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
