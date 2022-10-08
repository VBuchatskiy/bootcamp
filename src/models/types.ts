import { Document } from "mongoose";

enum ESkills {
  beginner = 1,
  intermediate = 2,
  advanced = 3
}

enum ERole {
  user = 1,
  publisher = 2
}
interface IUser extends Document {
  name: string,
  email: string
  role: string[ERole]
  password: string,
  sing: () => {}
}
interface IBootcamp extends Document {
  name: string;
  description: string;
}
interface ICourse extends Document {
  bid: string | undefined
  name: string;
  description: string;
  create_at: string;
  skills: string[ESkills];
  cost: number,
}

export {
  IBootcamp,
  ICourse,
  IUser
}