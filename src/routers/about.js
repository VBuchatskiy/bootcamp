import { Router } from 'express'

const about = new Router()

about.get('/', (req, res) => {
  res.send('about')
})

export default about