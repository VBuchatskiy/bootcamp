import { Router } from 'express'

const home = new Router()

home.get('/', (req, res) => {
  res.send('home')
})

export default home