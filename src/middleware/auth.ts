import { Response, Request, NextFunction } from "express"
import { async } from "./async"
import { verify } from 'jsonwebtoken'
import { User } from "@/models"
import { CustomJwtPayload } from "@/middleware/types";


export const protect = async(async (request: Request, response: Response, next: NextFunction) => {
  const { headers } = request


  if (!headers.authorization) {
    return next({ message: 'authorized' })
  }

  const decode = verify(
    headers.authorization.replace(/^bearer|\s*/gi, ''),
    process.env.JWT_SECRET || ''
  ) as CustomJwtPayload

  if (decode.id) {
    const user = await User.findById(decode.id)

    Object.assign(request, user)

    return next()
  }

  return next()
})