const jwt = require('jsonwebtoken')

const errors = require('../utils/errors/errors')

const User = require('../models/User')

const authenticate = (req, res, next) => {
  console.log('Middleware hit')
  const authHeader = req.headers.authorization
  console.log('Auth Header:', authHeader) // <-- Add this
  //check for "Bearer <token>"

  if (!authHeader || !authHeader.startsWith(`Bearer `)) {
    return res
      .status(errors.UNAUTHORIZED__ERROR_CODE)
      .json({ message: 'Acces Denied' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res
      .status(errors.UNAUTHORIZED__ERROR_CODE)
      .json({ message: 'Token not found' })
  }

  Promise.resolve()
    .then(() => {
      console.log('authHeader:', req.headers.authorization)
      console.log('Extracted token:', token)
      return jwt.verify(token, process.env.JWT_SECRET)
    })
    .then((decoded) => {
      console.log('Decoded JWT:', decoded)
      if (!decoded || !decoded.userId) {
        throw { name: 'InvalidPayload', message: 'Invalid token payload' }
      }

      req.user = decoded

      return User.findById(decoded.userId)
    })
    .then((user) => {
      if (!user) {
        return res
          .status(errors.UNAUTHORIZED__ERROR_CODE)
          .json({ message: 'User no longer exists' })
      }
      req.userDoc = user
      next()
    })
    .catch((err) => {
      if (err.name === 'TokenExpiredError') {
        return res
          .status(errors.UNAUTHORIZED__ERROR_CODE)
          .json({ message: 'Token expired. Please Login again' })
      } else if (err.name === 'JsonWebTokenError') {
        return res
          .status(errors.UNAUTHORIZED__ERROR_CODE)
          .json({ message: 'Invalid token' })
      } else {
        console.log(err)
        return res
          .status(errors.UNAUTHORIZED__ERROR_CODE)
          .json({ message: 'Authentication error.' })
      }
    })
}

module.exports = authenticate
