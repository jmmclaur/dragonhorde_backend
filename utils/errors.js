const { BAD_REQUEST } = require("./errors/BAD_REQUEST");
const { NOT_FOUND } = require("./errors/NOT_FOUND");
const { DUPLICATE } = require("./errors/DUPLICATE");
const { DEFAULT } = require("./errors/DEFAULT");
const { NOT_AUTHORIZED } = require("./errors/NOT_AUTHORIZED");
const { FORBIDDEN } = require("./errors/FORBIDDEN");

function handleErrors(err, next) {
  console.error(err);
  if (err.name === "ValidationError" || err.name === "CastError") {
    return next(new BAD_REQUEST("Bad Request"));
  }
  if (err.name === "DocumentNotFoundError") {
    return next(new NOT_FOUND("Not Found"));
  }
  if (err.code === 11000) {
    return next(new DUPLICATE("Duplicate Error"));
  }
  if (err.statusCode === 401) {
    return next(new NOT_AUTHORIZED("Not Authorized Error"));
  }
  if (err.statusCode === 403) {
    return next(new FORBIDDEN("Forbidden Error"));
  }
  return next(new DEFAULT("Server Error"));
}

module.exports = {
  handleErrors,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  DUPLICATE: 409,
  DEFAULT: 500,
  NOT_AUTHORIZED: 401,
  FORBIDDEN: 403,
};
