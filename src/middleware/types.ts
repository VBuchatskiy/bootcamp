import { CastError } from "mongoose";

interface CustomError extends CastError {
  status: number
}

export {
  CustomError
}