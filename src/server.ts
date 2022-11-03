import express, { json } from 'express'
import sanitize from 'express-mongo-sanitize'
import limit from 'express-rate-limit'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import hpp from 'hpp'
import chalk from 'chalk'
import { logger, error } from "@/middleware";
import { auth, bootcamps, courses } from '@/routers'
import { connect } from '~/config'

const app = express()

// Connect db
connect()

// create logger
if (process.env.NODE_ENV === 'development') {
  app.use(logger)
}

app.use(json())

// no sql injection
app.use(sanitize())

// set security headers
app.use(helmet())

// xss clean
app.use(xss())

// rate limit
app.use(limit({
  windowMs: 10 * 60 * 1000,
  max: 100
}))

// prevent http param pollution
app.use(hpp())

// enable CORS
app.use(cors())

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