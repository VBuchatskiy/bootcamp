import { Router } from 'express'

const about = Router()

export default about.get('/', (req, res): void => {
  res.send();
})