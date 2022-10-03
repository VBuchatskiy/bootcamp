import { CastError } from "mongoose";

interface CustomError extends CastError {
  status?: number
  code?: number
}

export {
  CustomError
}