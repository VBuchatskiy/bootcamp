import { Request } from "express"
import { IUser } from "@/models/types"

export interface CustomRequest extends Request {
  user?: IUser
}