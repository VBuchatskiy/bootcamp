import { Router } from 'express'
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from '@/controllers'
import { protect } from '@/middleware'

const courses = Router({
  mergeParams: true
})

courses
  .route('/')
  .get(getCourses)
  .post(protect, createCourse)

courses
  .route('/:cid')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse)

export {
  courses
}