import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import chalk from 'chalk'
import parser from 'body-parser'
import { home, about } from '@@/routers'
import { port } from '@/config/config'

const app = express()

app.use(logger('dev'))
app.use(parser.json())
app.use(cors())

app.use('/home', home)
app.use('/about', about)

app.listen(port, () => {
  console.log(chalk.cyan(`http://localhost:${port}/`))
})