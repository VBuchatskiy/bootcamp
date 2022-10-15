import { Request, Response, NextFunction } from "express";
import { CustomError } from "./types";

export const error = ($error: CustomError, request: Request, response: Response, next: NextFunction) => {
  const { message, status } = $error

  response.status(status || 400).json({ message })
}