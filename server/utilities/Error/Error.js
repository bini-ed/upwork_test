const moment = require("moment");
const { Messages } = require("./Message");

class Error {
  payload;
  statusCode;

  constructor(statusCode, errors) {
    this.statusCode = statusCode;
    this.payload = {
      timestamp: moment(),
      errors: errors,
    };
  }
}

/**
 * Bad Request Error
 */
class BadRequestError extends Error {
  constructor(errors) {
    super(400, errors);
  }
}

/**
 * Already registered Error
 */
class AlreadyRegisteredError extends Error {
  constructor(error) {
    super(409, error);
  }
}

/**
 * Unauthorized Error
 */
class UnauthorizedError extends Error {
  constructor() {
    super(401, [Messages.UNAUTHORIZED_ERROR]);
  }
}

/**
 * Forbidden Error
 */
class ForbiddenError extends Error {
  constructor() {
    super(403, [Messages.FORBIDDEN_ERROR]);
  }
}

/**
 * Not Found Error
 */
class NotFoundError extends Error {
  constructor(error) {
    super(404, [error]);
  }
}

/**
 * Internal Server Error
 */
class InternalServerError extends Error {
  constructor(error) {
    super(
      500,
      error ? `Internal Server Error: ${error}` : Messages.INTERNAL_SERVER_ERROR
    );
  }
}

/**
 * Not Implemented Error
 */
class NotImplementedError extends Error {
  constructor(error) {
    super(501, [
      error ? `Not Implemented: ${error}` : Messages.NOT_IMPLEMENTED_ERROR,
    ]);
  }
}

/**
 * Service Unavailable Error
 */
class ServiceUnavailableError extends Error {
  constructor(error) {
    super(502, [
      error
        ? `Service Unavailable: ${error}`
        : Messages.SERVICE_UNAVAILABLE_ERROR,
    ]);
  }
}

/**
 * Conflict Error
 */
class ConflictError extends Error {
  constructor(error) {
    super(409, [error]);
  }
}

module.exports = {
  Error,
  BadRequestError,
  AlreadyRegisteredError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  NotImplementedError,
  ServiceUnavailableError,
};
