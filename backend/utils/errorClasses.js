const {
  NOT_FOUND_ERROR_CODE,
  BAD_REQUEST_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  UNAUTHORIZED__ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  BAD_CONFLICT_ERROR_CODE,
} = require('./errors')

class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, BAD_REQUEST_ERROR_CODE)
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, NOT_FOUND_ERROR_CODE)
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, FORBIDDEN_ERROR_CODE)
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, BAD_REQUEST_ERROR_CODE)
  }
}
class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, UNAUTHORIZED__ERROR_CODE)
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, BAD_CONFLICT_ERROR_CODE)
  }
}

class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, INTERNAL_SERVER_ERROR_CODE)
  }
}

module.exports = {
  AppError,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  ValidationError,
  UnauthorizedError,
  ConflictError,
  InternalServerError,
}
