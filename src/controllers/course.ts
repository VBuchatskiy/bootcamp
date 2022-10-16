import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from "./types";
import { async } from "@/middleware";
import { Bootcamp, Course } from "@/models";

// @desc Get Courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @sort sort sort=name%asc+age%desc
// @access public

export const getCourses = async(async (request: Request, response: Response) => {
  const { statusCode } = response

  const courses = await Course.find()

  response.status(statusCode).json({
    courses
  });
});

// @desc Get Course by cid
// @route Get /api/v1/courses/:cid
// @access public

export const getCourse = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { cid } = params

  const course = await Course.findById(cid)

  if (!course) {
    return next({ message: 'not found' })
  }

  response.status(statusCode).json({
    course
  });
});

// @desc Create Course
// @route Post /api/v1/courses
// @access private

export const createCourse = async(async (request: CustomRequest, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params, body, user } = request;
  const { bid } = params

  const bootcamp = await Bootcamp.findById(bid)

  if (!bootcamp) {
    return next({ message: 'not found' })
  }

  if (user?.role === 'user') {
    return next({ message: 'not authorized' })
  }

  const course = await Course.create(body)

  response.status(statusCode).json({
    course
  });
});

// @desc Update Course
// @route Post /api/v1/courses
// @access private


export const updateCourse = async(async (request: CustomRequest, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body, user } = request;
  const { params } = request
  const { cid } = params
  const { bid } = body

  const bootcamp = await Bootcamp.findById(bid)

  if (!bootcamp) {
    return next({ message: 'not found' })
  }

  if (bootcamp.uid !== user?.id) {
    return next({ message: 'not authorized' })
  }

  const course = await Course.findByIdAndUpdate(cid, body, {
    new: true,
    runValidators: true
  })

  if (!course) {
    return next({ message: 'not found' })
  }

  response.status(statusCode).json({
    course
  });
});

// @desc Delete Course
// @route Post /api/v1/courses
// @access private

export const deleteCourse = async(async (request: CustomRequest, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params, user } = request
  const { cid } = params

  const course = await Course.findById(cid)

  if (!course) {
    return next({ message: 'not found' })
  }

  const bootcamp = await Bootcamp.findById(course.bid)

  if (!bootcamp) {
    return next({ message: 'not found' })
  }

  if (bootcamp.uid !== user?.id) {
    return next({ message: 'not authorized' })
  }

  course.remove()

  response.status(statusCode).send()
});