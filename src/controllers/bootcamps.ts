import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../utils';
import { Bootcamp } from "../models";;

export const getBootcamps = async (request: Request, response: Response) => { };

export const getBootcamp = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params
    const bootcamp = await Bootcamp.findById(id)
  } catch (error) {
    next(error)
  }
};

export const createBootcamp = async (request: Request, response: Response) => {

  try {
    const { body } = request;
    const { status } = response

    const bootcamp = await Bootcamp.create(body)

    status(201).json({
      data: bootcamp
    })
  } catch (error: any) {
    throw new Error(error)
  }

};

export const updateBootcamp = (request: Request, response: Response) => {
  response.status(200).json({ message: `get collection ${request.params}` })
}

export const deleteBootcamp = (request: Request, response: Response) => {
  response.status(200).json({ message: `get collection ${request.params}` })
}