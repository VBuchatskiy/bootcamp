import { Request, Response, NextFunction } from 'express';
import { async } from "@/middleware";
import { Bootcamp } from "@/models";

// @desc Get bootcamps
// @route GET /api/v1/bootcamps
// @sort sort sort=name%asc+age%desc
// @access public

export const getBootcamps = async(async (request: Request, response: Response) => {
  const { statusCode } = response
  const { query } = request
  const { sort_by, page, per_page } = query

  const total = await Bootcamp.count()
  const limit = per_page && per_page ? parseInt(per_page as string, 10) : 10 
  const skip = page && parseInt(page as string, 10) === 1 ? 0 : (limit * parseInt(page as string, 10) - 1)
  const sort = sort_by ? sort_by : '-create_at'

  const bootcamps = await Bootcamp
  .find()
  .skip(skip)
  .limit(limit)
  .sort(sort)

  response.status(statusCode).json({
    bootcamps,
    pagination: {
      page: page ? parseInt(page as string, 10) : 1,
      per_page: per_page ? parseInt(per_page as string, 10) : 1,
      total,
    }
  });
});

// @desc Get Bootcamp by id
// @route Get /api/v1/bootcamps/:id
// @access public

export const getBootcamp = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  const bootcamp = await Bootcamp.findById(id)

  if(!bootcamp) {
    return next({ message: 'bootcamp not found' })
  }

  response.status(statusCode).json({
    bootcamp
  });
});

// @desc Create Bootcamp
// @route Post /api/v1/bootcamps
// @access private

export const createBootcamp = async(async (request: Request, response: Response) => {
  const { statusCode } = response
  const { body } = request;

  const bootcamp = await Bootcamp.create(body)

  response.status(statusCode).json({
    bootcamp
  });
});

// @desc Update Bootcamp by id
// @route Put /api/v1/bootcamps
// @access private

export const updateBootcamp = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request;
  const { params } = request
  const { id } = params

  const bootcamp = await Bootcamp.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  })

  if (!bootcamp) {
    return next({ message: 'bootcamp not found' })
  }

  response.status(statusCode).json({
    bootcamp
  });
});

// @desc Delete Bootcamp by id
// @route Delete /api/v1/bootcamps/:id
// @access private

export const deleteBootcamp = async(async (request: Request, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params } = request
  const { id } = params

  const bootcamp = await Bootcamp.findById(id)

  if (!bootcamp) {
    return next({ message: 'bootcamp not found' })
  }

  bootcamp.remove()

  response.status(statusCode).send({
    status: statusCode
  })
});