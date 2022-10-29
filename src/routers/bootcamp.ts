import { Router } from 'express'
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} from '@/controllers'
import { courses } from './course'
import { protect, authorized } from '@/middleware'

const bootcamps = Router()

bootcamps.use('/:bid/courses', courses)

bootcamps
  .route('/')
  .get(getBootcamps)
  .post(protect, authorized('admin'), createBootcamp)

bootcamps
  .route('/:bid')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp)


export {
  bootcamps
}