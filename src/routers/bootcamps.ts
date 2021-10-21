import { Router } from 'express'
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} from '../controllers'
import { courses } from '../routers'

export const bootcamps = Router()

bootcamps.use('/:bootcampId/courses', courses)

bootcamps
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp)

bootcamps
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp)