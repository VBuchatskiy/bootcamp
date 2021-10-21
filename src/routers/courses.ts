import { Router } from 'express'
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers'

const courses = Router({
  mergeParams: true
})

courses
  .route('/')
  .get(getCourses)
  .post(createCourse)

courses
  .route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse)

export {
  courses
}