const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const mongoose = require('mongoose')

logger.info('Connecting to MONGODB on', config.MONGODB_URL)

mongoose
  .connect(config.MONGODB_URL)
  .then(() => logger.info('Connected succesfully'))
  .catch((error) => logger.error('Error connecting to MongoDB:',error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app