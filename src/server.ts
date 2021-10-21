import express, { json } from 'express'
import cors from 'cors'
import chalk from 'chalk'
import { logger, errorHandler } from "./middleware";
import { connect } from '../config'
import { auth, bootcamps, courses } from './routers'
import { port } from '../config/config.json'

const app = express()

// Connect db
connect()

app.use(cors())
app.use(json())

// Create logger
if (process.env.NODE_ENV === 'development') {
  app.use(logger)
}

// Mount Routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

// handle error
app.use(errorHandler)


const server = app.listen(port, () => {
  chalk.cyan(`http://localhost:${port}/`)
})

// handle promise rejection
process.on('unhandledRejection', () => {
  server.close(() => process.exit(1))
})