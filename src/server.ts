import express, { json } from 'express'
import cors from 'cors'
import chalk from 'chalk'
import { connect } from '~/config'
import { logger, error } from "@/middleware";
import { auth, bootcamps, courses } from '@/routers'

const app = express()

// Connect db
connect()

// create logger
if (process.env.NODE_ENV === 'development') {
  app.use(logger)
}

app.use(cors())
app.use(json())

// Mount Routes
app.use('/api/v1/auth', auth)
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)


// error handler
app.use(error)

const server = app.listen(process.env.port, () => {
  chalk.cyan(`http://localhost:${process.env.port}/`)
})

process.on('unhandledRejection', () => {
  server.close(() => process.exit(1))
})