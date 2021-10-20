import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from "../middleware";
import { Course } from "../models";
import { parseSortParams, parseSelectParams, parsePagination } from "../utils"

// @desc Get Courses
// @route GET /api/v1/bootcamps/:bootcampId/courses
// @sort sort sort=name%asc+age%desc
// @access public

export const getCourses = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const itemCount: number = await Course.count()
  const { statusCode } = response
  const { query } = request
  const { offset, limit, pageCount } = parsePagination(query, itemCount)

  const items = await Course
    .find(query.bootcampId ? { bootcamp: query.bootcampId } : {})
    .skip(offset)
    .limit(limit)
    .sort(query.sort ? parseSortParams(query.sort as string) : [])
    .select(query.select ? parseSelectParams(query.select as string) : [])

  response.status(statusCode).json({
    items,
    itemCount,
    pageCount
  });
});

// @desc Get Bootcamp by id
// @route Get /api/v1/courses/:id
// @access public

export const getCourse = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  const item = await Course.findById(id)

  response.status(statusCode).json({
    item
  });
});

// @desc Create Bootcamp
// @route Post /api/v1/courses
// @access private

export const createCourse = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request;

  const item = await Course.create(body)

  response.status(statusCode).json({
    item
  });
});

export const updateCourse = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request;
  const { params } = request
  const { id } = params

  const item = await Course.findByIdAndUpdate(id, body, {
    new: true
  })

  response.status(statusCode).json({
    item
  });
});

export const deleteCourse = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  await Course.findByIdAndDelete(id)

  response.status(statusCode)
});