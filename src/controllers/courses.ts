import { Request, Response, NextFunction } from 'express';
import { async } from "@/middleware";
import { Course } from "@/models";

// @desc Get Courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @sort sort sort=name%asc+age%desc
// @access public

export const getCourses = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response

  const courses = await Course
    .find()

  response.status(statusCode).json({
    courses
  });
});

// @desc Get Course by id
// @route Get /api/v1/courses/:id
// @access public

export const getCourse = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  const item = await Course.findById(id)

  response.status(statusCode).json({
    item
  });
});

// @desc Create Course
// @route Post /api/v1/courses
// @access private

export const createCourse = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request;

  const item = await Course.create(body)

  response.status(statusCode).json({
    item
  });
});

// @desc Update Course
// @route Post /api/v1/courses
// @access private


export const updateCourse = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request;
  const { params } = request
  const { id } = params

  const item = await Course.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  })

  response.status(statusCode).json({
    item
  });
});

// @desc Delete Course
// @route Post /api/v1/courses
// @access private

export const deleteCourse = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  const course = await Course.findById(id)

  if (!course) {
    return next({ message: 'course not found' })
  }

  course.remove()

  response.status(statusCode).send({})
});