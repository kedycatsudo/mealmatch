const jwt = require('jsonwebtoken')

const errors = require('../utils/errors')

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization

  //check for "Bearer <token>"

  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(errors.UNAUTHORIZED__ERROR_CODE)
          .json({ message: 'Invalid token ' })
      }
      req.user = decoded
      next()
    })
  } else {
    return res
      .status(errors.UNAUTHORIZED__ERROR_CODE)
      .json({ message: 'NO token, authorization denied' })
  }
}
module.exports = authenticate
