import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils";

export const errorHandler = (error: ErrorResponse, request: Request, response: Response, next: NextFunction) => {
  response.status(400).json({ message: error.message })
}