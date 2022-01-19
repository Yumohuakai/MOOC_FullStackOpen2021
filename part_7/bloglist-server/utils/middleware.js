const logger = require('./logger')
const User = require('../models/user')
const SECRET = require('../utils/config').SECRET
const jwt = require('jsonwebtoken')

// const tokenExtractor = (request, response, next) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     request.token = authorization.substring(7)
//   }
//   next()
// }

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token =  authorization.substring(7)
  }
  const decodedToken = jwt.verify(token, SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (user) {
    // logger.info('middleware..........user type', typeof user)
    // logger.info('middleware..........user content', user)
    request.user = user
  } else {
    return response.status(401).json({ error: 'invalid user' })
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else {
    // logger.info('middleware..........error content', error)
    // logger.info('middleware..........error name', error.name)
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  // tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}