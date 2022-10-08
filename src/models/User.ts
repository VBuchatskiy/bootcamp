import { Schema, model } from "mongoose";
import { IUser } from "./types";
import { genSalt, hash } from "bcrypt"
import { sign } from "jsonwebtoken"

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Pleas provide a name'],
    maxlength: [50, 'Name can`t be more than 50 characters']
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
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

// @desc hash password before save
UserSchema.pre('save', async function (next) {
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
  next()
})

// @desc assign token
UserSchema.methods.sing = function (): string {
  return sign({ id: this._id }, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_EXPIRATION_TIME || '1d'
  })
}

export const User = model('User', UserSchema)
