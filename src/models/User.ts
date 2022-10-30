import { Schema, model } from "mongoose";
import { IUser } from "./types";
import { createHash } from "crypto";
import { genSalt, hash, compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { randomBytes } from 'crypto'

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: [true, 'please provide a name'],
    maxlength: [50, 'name can`t be more than 50 characters']
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: [true, 'please provide an email']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'please provide a password'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  reset_token: {
    type: String
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
  if (!this.isModified('password')) {
    next()
  }

  const salt = await genSalt(10)

  this.password = await hash(this.password, salt)

  next()
})

// @desc sing token
UserSchema.methods.sing = function (): string {
  return sign({ id: this._id }, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_EXPIRATION_TIME || '1d'
  })
}

// @desc generate reset token
UserSchema.methods.token = function (): string {
  const token = randomBytes(20).toString('hex')

  this.reset_token = createHash('sha256').update(token).digest('hex')

  return token
}

UserSchema.methods.compare = async function (password: string): Promise<boolean> {
  return await compare(password, this.password)
}

export const User = model('User', UserSchema)

