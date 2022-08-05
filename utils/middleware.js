const logger = require("./logger")

const requestLogger = (request, response, next) => {
  // don't log password fields
  const hideSensitiveBody = (b) =>
    'password' in b ? { ...b, password: '<hidden>' } : b

  logger.info("Method:", request.method)
  logger.info("Path:  ", request.path)
  logger.info("Body:  ", hideSensitiveBody(request.body))
  logger.info("---")
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformed id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
