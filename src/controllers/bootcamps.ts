import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from "../middleware";
import { Bootcamp } from "../models";
import { parseSortParams, parseSelectParams, parsePagination } from "../utils"

export const getBootcamps = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { query } = request
  const itemCount: number = await Bootcamp.count()
  const { offset, limit, pageCount } = parsePagination(query, itemCount)
  const items = await Bootcamp
    .find()
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