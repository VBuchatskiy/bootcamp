import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from "../middleware";
import { Bootcamp } from "../models";
import { parseSortParams, parseSelectParams, parsePaginationParams, parseFilterParams } from "../utils"

// @desc Get bootcamps
// @route GET /api/v1/bootcamps
// @sort sort sort=name%asc+age%desc
// @access public

export const getBootcamps = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const itemCount: number = await Bootcamp.count()
  const { statusCode } = response
  const { query } = request
  const { offset, limit, pageCount } = parsePaginationParams(query, itemCount)

  const items = await Bootcamp
    .find(query.filter ? parseFilterParams(query.sort as string) : {})
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
// @route Get /api/v1/bootcamps/:id
// @access public

export const getBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  const item = await Bootcamp.findById(id)

  response.status(statusCode).json({
    item
  });
});

// @desc Create Bootcamp
// @route Post /api/v1/bootcamps
// @access private

export const createBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request;

  const item = await Bootcamp.create(body)

  response.status(statusCode).json({
    item
  });
});

// @desc Update Bootcamp by id
// @route Put /api/v1/bootcamps
// @access private

export const updateBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request;
  const { params } = request
  const { id } = params

  const item = await Bootcamp.findByIdAndUpdate(id, body, {
    new: true
  })

  response.status(statusCode).json({
    item
  });
});

// @desc Delete Bootcamp by id
// @route Delete /api/v1/bootcamps/:id
// @access private

export const deleteBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  await Bootcamp.findByIdAndDelete(id)

  response.status(statusCode)
});