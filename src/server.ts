import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import { user } from './routers'
import { port } from '../config/config.json'

const app = express()
app.use(cors())

app.use('/user', user)

app.listen(port, () => {
  chalk.cyan(`http://localhost:${port}/`)
})