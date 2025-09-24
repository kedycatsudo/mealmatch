const jwt = require('jsonwebtoken')

const errors = require('../utils/errors')

const authenticate = (req, res, next) => {
  console.log('Middleware hit')
  const authHeader = req.headers.authorization
  console.log('Auth Header:', authHeader) // <-- Add this
  //check for "Bearer <token>"

  if (authHeader && authHeader.startsWith('Bearer ')) {
    let token = authHeader.split(' ')[1]
    console.log('Token:', token) // <-- Add this

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      console.log('JWT error:', err)
      console.log('Decoded JWT:', decoded)
      if (err) {
        return res.status(errors.UNAUTHORIZED__ERROR_CODE).json({
          message:
            'Your session has expired or is invalid. Please log in again. ',
        })
      }
      req.user = decoded
      next()
    })
  } else {
    console.log(`else block`)
    return res
      .status(errors.UNAUTHORIZED__ERROR_CODE)
      .json({ message: 'To make a new donation, user has to login.' })
  }
}
module.exports = authenticate
