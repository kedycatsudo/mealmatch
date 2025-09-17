const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    avatar: { type: String, required: false }, // 'required: false' is optional, default is not required
    printName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    isKarmDonor: { type: Boolean, required: true },
    phone: { type: String },
    country: { type: String },
    city: { type: String },
    state: { type: String },
    address: { type: String },
    zipcode: { type: String },
    password: { type: String, required: true }, // Keep type as String; handle password securely elsewhere
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)
const User = mongoose.model('User', userSchema)

module.exports = User
