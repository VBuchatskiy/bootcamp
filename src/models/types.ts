import { ObjectId, Document } from "mongoose";
interface IUser extends Document {
  name: string
  email: string
  role: string
  password: string
  reset_token: string
  sing: () => string
  token: () => string
  compare: (password: string) => Promise<boolean>
}
interface IBootcamp extends Document {
  uid: ObjectId // user id
  name: string
  description: string
}
interface ICourse extends Document {
  bid: string | undefined
  name: string
  description: string
  create_at: string
  skills: string
  cost: number
}

export {
  IBootcamp,
  ICourse,
  IUser
}