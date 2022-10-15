import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from "./types";
import { async } from "@/middleware";
import { Bootcamp, User } from "@/models";

// @desc Get bootcamps
// @route GET /api/v1/bootcamps
// @sort sort sort=name%asc+age%desc
// @access public

export const getBootcamps = async(async (request: Request, response: Response) => {
  const { statusCode } = response

  const bootcamps = await Bootcamp.find()

  response.status(statusCode).json({
    bootcamps,
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

  if (!bootcamp) {
    return next({ message: 'not found' })
  }

  response.status(statusCode).json({
    bootcamp
  });
});

// @desc Create Bootcamp
// @route Post /api/v1/bootcamps
// @access private

export const createBootcamp = async(async (request: CustomRequest, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body } = request
  const { uid } = body

  const user = await User.findById(uid)

  if (user?.role === 'user') {
    return next({ message: 'authorized' })
  }

  const bootcamp = await Bootcamp.create(body)

  response.status(statusCode).json({
    bootcamp
  });
});

// @desc Update Bootcamp by id
// @route Put /api/v1/bootcamps
// @access private

export const updateBootcamp = async(async (request: CustomRequest, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { body, params, user } = request
  const { id } = params

  let bootcamp = await Bootcamp.findById(id)

  if (!bootcamp) {
    return next({ message: 'not found' })
  }

  if (bootcamp.uid !== user?.id) {
    return next({ message: 'authorized' })
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  })

  response.status(statusCode).json({
    bootcamp
  });
});

// @desc Delete Bootcamp by id
// @route Delete /api/v1/bootcamps/:id
// @access private

export const deleteBootcamp = async(async (request: CustomRequest, response: Response, next: NextFunction) => {
  const { statusCode } = response
  const { params, user } = request
  const { id } = params

  const bootcamp = await Bootcamp.findById(id)

  if (!bootcamp) {
    return next({ message: 'not found' })
  }

  if (bootcamp.uid !== user?.id) {
    return next({ message: 'authorized' })
  }

  bootcamp.remove()

  response.status(statusCode).send()
});