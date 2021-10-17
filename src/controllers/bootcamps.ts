import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from "../middleware";
import { Bootcamp } from "../models";
import { LIMIT, PAGE } from './constants'

export const getBootcamps = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { query } = request

  // pagination
  const limit: number = query.limit ? parseInt(query.limit as string, 10) : LIMIT
  const page: number = query.page ? parseInt(query.page as string, 10) : PAGE
  const offset: number = (page - 1) * limit;
  const itemCount: number = await Bootcamp.count()
  const pageCount: number = itemCount ? Math.floor(itemCount / limit) ? Math.floor(itemCount / limit) : 1 : 0

  const items = await Bootcamp
    .find()
    .limit(limit)
    .skip(offset)

  response.status(statusCode).json({
    items,
    itemCount,
    pageCount
  });
});

export const getBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  const item = await Bootcamp.findById(id)

  response.status(statusCode).json({
    item
  });
});

export const createBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request;

  const item = await Bootcamp.create(body)

  response.status(statusCode).json({
    item
  });
});

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

export const deleteBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  await Bootcamp.findByIdAndDelete(id)

  response.status(statusCode)
});