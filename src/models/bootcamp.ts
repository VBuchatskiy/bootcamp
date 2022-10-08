import { Schema, model } from "mongoose";
import { IBootcamp } from "./types";

const BootcampSchema = new Schema<IBootcamp>({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'pleas provide a name'],
    maxlength: [50, 'name can`t be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'pleas provide a description'],
    maxlength: [500, 'description can`t be more than 500 characters']
  },
}, {
  id: false,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      Object.assign(ret, { bid: doc._id })
      delete ret._id
    }
  },
  toObject: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'create_at',
    updatedAt: 'update_at'
  },
})

BootcampSchema.pre('remove', async function (next) {
  await this.$model('Course').deleteMany({ bid: this._id })
  next()
})

export const Bootcamp = model('Bootcamp', BootcampSchema)

