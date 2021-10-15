import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import { connect } from "../config";
import { user } from './routers'
import { port } from '../config/config.json'

connect()

const app = express()

app.use(cors())
app.use('/user', user)

const server = app.listen(port, () => {
  chalk.cyan(`http://localhost:${port}/`)
})

// handle promise rejection

process.on('unhandledRejection', () => {
  server.close(() => process.exit(1))
})