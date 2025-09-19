const jwt = require('jsonwebtoken')

const errors = require('../utils/errors')

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization

  //check for "Bearer <token>"

  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
    return res
      .status(errors.UNAUTHORIZED__ERROR_CODE)
      .json({ message: 'To make a new donation, user has to login.' })
  }
}
module.exports = authenticate
