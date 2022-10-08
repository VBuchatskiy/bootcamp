import { Schema, model } from "mongoose";
import { IUser } from "./types";

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Pleas provide a name'],
    maxlength: [50, 'Name can`t be more than 50 characters']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Pleas provide an email']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Pleas provide a password'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user'
  }
}, {
  id: false,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      Object.assign(ret, { uid: doc._id })
      delete ret._id
    }
  },
  toObject: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at'
  }
})

export const User = model('User', UserSchema)

