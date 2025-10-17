const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    avatar: { type: String, required: false }, // 'required: false' is optional, default is not required
    printName: { type: String },
    userName: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
    },
    isKarmDonor: { type: Boolean },
    phone: { type: String },
    country: { type: String },
    city: { type: String },
    state: { type: String },
    address: { type: String },
    zipcode: { type: String },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (value) {
          return /[A-Za-z]/.test(value) && /\d/.test(value)
        },
        message:
          'Password must be at least 8 characters and contain at least one letter and one number',
      },
    },
    isAdmin: { type: Boolean, default: false },
    donationStatus: {
      totalDonations: { type: Number, default: 0 },
      availableDonations: { type: Number, default: 0 },
      totalDonationsServings: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
)
const User = mongoose.model('User', userSchema)

module.exports = User
