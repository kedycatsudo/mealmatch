const User = require('../models/User')

const errors = require('../utils/errors')

const success = require('../utils/succesStatuses')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

//Login

const loginUser = (req, res) => {
  console.log(req.body)

  const { userName, password } = req.body

  //check the username first
  User.findOne({ userName })
    .then((user) => {
      if (!user) {
        return res
          .status(errors.BAD_REQUEST_ERROR_CODE)
          .json({ message: 'Invalid Credentials' })
      }
      //compare the password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res
            .status(errors.BAD_REQUEST_ERROR_CODE)
            .json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign(
          { userId: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        )
        // Respond with token and user info (omit password)
        const { password, ...userData } = user.toObject()
        res.json({ token, message: 'Welcome ' + user.userName })
      })
    })
    .catch((err) => {
      console.log(err)
      return res
        .status(errors.INTERNAL_SERVER_ERROR_CODE)
        .json({ message: err.message })
    })
}

//Register a new user (with Promises)

const registerUser = (req, res) => {
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

module.exports = { registerUser, loginUser }
