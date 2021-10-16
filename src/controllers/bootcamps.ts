import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from "../middleware";
import { Bootcamp } from "../models";

export const getBootcamps = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const bootcamps = await Bootcamp.find()
  const { length: count } = bootcamps

  response.status(statusCode).json({
    data: { bootcamps, count }
  });
});

export const getBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params
  const bootcamp = await Bootcamp.findById(id)

  response.status(statusCode).json({
    bootcamp
  });
});

export const createBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request;

  const bootcamp = await Bootcamp.create(body)

  response.status(statusCode).json({
    bootcamp
  });
});

export const updateBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request;
  const { params } = request
  const { id } = params

  const bootcamp = await Bootcamp.findByIdAndUpdate(id, body)

  response.status(statusCode).json({
    bootcamp
  });
});

export const deleteBootcamp = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  const bootcamp = await Bootcamp.findByIdAndDelete(id)

  response.status(statusCode).json({
    bootcamp
  });
});