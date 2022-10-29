import { Router } from 'express'
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from '@/controllers'
import { protect, authorized } from '@/middleware'

const courses = Router({
  mergeParams: true
})

courses
  .route('/')
  .get(getCourses)
  .post(protect, authorized('admin'), createCourse)

courses
  .route('/:cid')
  .get(getCourse)
  .put(protect, authorized('admin'), updateCourse)
  .delete(protect, authorized('admin'), deleteCourse)

export {
  courses
}