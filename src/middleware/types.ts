import { CastError } from "mongoose";
import { JwtPayload } from "jsonwebtoken"

interface CustomError extends CastError {
  status?: number
  code?: number
}

interface CustomJwtPayload extends JwtPayload {
  id?: string
}

export {
  CustomError,
  CustomJwtPayload
}