import { Request, Response, NextFunction } from "express";
import { CastError } from "mongoose";

export const errorHandler = (error: CastError, request: Request, response: Response, next: NextFunction) => {
  const { name, message } = error
  const { params } = request
  const { statusCode } = response

  response.status(statusCode).json({ name, message, params })
}