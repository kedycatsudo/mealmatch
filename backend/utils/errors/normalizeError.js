// normalizeError.js
const {
  AppError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
  ValidationError,
} = require('../errors/errorClasses')
/**
 * Normalize errors into your AppError subclasses.
 * - Returns the same error if it's already an AppError.
 * - Translates known shapes (Mongo duplicate key, Mongoose validation/cast, JWT).
 * - Logs the original error in development when wrapping.
 */
function normalizeError(err) {
  // Already a typed AppError -> return unchanged
  if (err instanceof AppError) return err

  // Mongo duplicate key error (11000)
  if (err && err.code === 11000) {
    const duplicateField = Object.keys(err.keyPattern || {})[0]
    let message = 'Duplicate value.'
    if (duplicateField === 'email') message = 'Email already used.'
    else if (duplicateField === 'userName') message = 'Username already used.'
    return new BadRequestError(message)
  }

  // Mongoose validation error
  if (err && err.name === 'ValidationError') {
    // Build a concise message from Mongoose errors if available
    const messages = Object.values(err.errors || {}).map((e) => e.message)
    const message = messages.length ? messages.join(', ') : 'Validation failed'
    return new ValidationError(message)
  }

  // Mongoose CastError (invalid ObjectId, etc.)
  if (err && err.name === 'CastError') {
    return new BadRequestError('Invalid identifier provided')
  }

  // JWT errors
  if (
    err &&
    (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError')
  ) {
    return new UnauthorizedError(err.message || 'Invalid or expired token')
  }

  // Unknown error -> log original in development, then wrap as InternalServerError
  if (process.env.NODE_ENV === 'development') {
    // Keep console.error here for development visibility of the original error
    console.error('normalizeError - original error:', err)
  }

  return new InternalServerError(
    err && err.message ? err.message : 'An unexpected error occurred'
  )
}

module.exports = normalizeError
