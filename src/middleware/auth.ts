import { Response, Request, NextFunction } from "express"
import { async } from "./async"
import { verify } from 'jsonwebtoken'
import { User } from "@/models"
import { CustomJwtPayload } from "@/middleware/types";


export const protect = async(async (request: Request, response: Response, next: NextFunction) => {
  const { headers } = request


  if (!headers.authorization) {
    return next({ message: 'not authorized' })
  }

  const decode = verify(
    headers.authorization.replace(/^bearer|\s*/gi, ''),
    process.env.JWT_SECRET || ''
  ) as CustomJwtPayload

  if (decode.id) {
    await User.findById(decode.id)
    return next()
  }

  return next({ message: 'not authorized'})
})