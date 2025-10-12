const errors = require('../utils/errors/errors')
const { v4: uuidv4 } = require('uuid')

/**
 * Centralized error handler for Express.
 *
 * - Uses err.statusCode when available, otherwise defaults to 500.
 * - For server (5xx) errors:
 *   - generates an errorId (uuid) so the client can report it
 *   - logs the original error + errorId for lookup
 *   - returns a generic client-facing message in production
 * - For client (4xx) errors: returns the error message as-is
 * - In development: includes stack and name in the JSON response
 */
function errorHandlerMiddleware(err, req, res, next) {
  const statusCode =
    err && err.statusCode ? err.statusCode : errors.INTERNAL_SERVER_ERROR_CODE
  const isServerError = statusCode >= 500

  // Generate correlation id for server errors
  const errorId = isServerError ? uuidv4() : undefined

  // Logging: keep the original error logged for diagnostics.
  // For server errors we always log with errorId so you can correlate logs.
  if (isServerError) {
    // Replace console with a structured logger (winston/pino) later if available.
    console.error(`errorId=${errorId}`, err)
  } else if (process.env.NODE_ENV === 'development') {
    console.error(err)
  }

  // Prepare client-facing message
  let clientMessage = err && err.message ? err.message : 'Internal Server Error'

  // For production server errors, avoid exposing internals; provide a friendly message
  if (isServerError && process.env.NODE_ENV !== 'development') {
    clientMessage = 'Something went wrong. Please try again later.'
  }

  const response = {
    message: clientMessage,
  }

  // Include an errorId for server errors so the client can report it to support
  if (errorId) {
    response.errorId = errorId
  }

  // Include stack/name ONLY in development for debugging
  if (process.env.NODE_ENV === 'development') {
    response.stack = err && err.stack
    response.name = err && err.name
  }

  // Send the response
  res.status(statusCode).json(response)
}

module.exports = errorHandlerMiddleware
