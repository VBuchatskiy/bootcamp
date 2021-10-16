import { Router } from 'express'
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} from '../controllers'

export const bootcamps = Router()

bootcamps
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp)

bootcamps
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp)