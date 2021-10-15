import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import morgan from 'morgan'
import { connect } from '../config'
import { auth, bootcamps } from './routers'
import { port } from '../config/config.json'

const app = express()

connect()

app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/auth', auth)
app.use('/api/v1/bootcamps', bootcamps)

const server = app.listen(port, () => {
  chalk.cyan(`http://localhost:${port}/`)
})

// handle promise rejection

process.on('unhandledRejection', () => {
  server.close(() => process.exit(1))
})