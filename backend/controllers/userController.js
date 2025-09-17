const User = require('../models/User')

const errors = require('../utils/errors')

const success = require('../utils/succesStatuses')

const bcrypt = require('bcryptjs')

//Register a new user (with Promises)

const registerUser = (req, res) => {
  console.log(req.body)
  const {
    avatar,
    printName,
    userName,
    email,
    isKarmDonor,
    phone,
    country,
    city,
    state,
    address,
    zipcode,
    password,
    isAdmin,
  } = req.body

  User.findOne({ userName })
    .then((userExists) => {
      if (userExists) {
        // Stop the chain by returning here
        res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: 'User already exist' })
        return Promise.reject('User already exist')
      }
      return bcrypt.hash(password, 10)
    })
    .then((hashedPassword) => {
      if (!hashedPassword) return

      return User.create({
        avatar,
        printName,
        userName,
        email,
        isKarmDonor,
        phone,
        country,
        city,
        state,
        address,
        zipcode,
        password: hashedPassword,
        isAdmin,
      })
    })
    .then((user) => {
      if (!user) return

      return res
        .status(success.CREATED_SUCCESS_CODE)
        .json({ message: 'User registered succesfully.', user })
    })
    .catch((err) => {
      if (!res.headersSent) {
        res
          .status(errors.INTERNAL_SERVER_ERROR_CODE)
          .json({ message: err.message || err })
      }
    })
}
module.exports = { registerUser }
