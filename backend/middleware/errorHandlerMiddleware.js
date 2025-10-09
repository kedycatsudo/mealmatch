const errors = require('../utils/errors')

function errorHandlerMiddleware(err, req, res, next) {
  //if the error has a statusCode, use it. Otherwise,default to 500

  const statusCode = err.statusCode || errors.INTERNAL_SERVER_ERROR_CODE

  const response = {
    message: err.message || 'Internal Server Error',
  }

  // Show stack trace ONLY in development mode
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
    response.stack = err.stack
    // Optionally include error name/type for debugging
    response.name = err.name
  }
  res.status(statusCode).json(response)
}

module.exports = errorHandlerMiddleware
