import { Schema, model } from "mongoose";
import { IBootcamp } from "./types";

const BootcampSchema = new Schema<IBootcamp>({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Pleas provide a name'],
    maxlength: [50, 'Name can`t be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Pleas provide a description'],
    maxlength: [500, 'Description can`t be more than 500 characters']
  },
  create_at: {
    type: Number, 
    default: Date.now()
  }
}, {
  id: false,
  toJSON: {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {
      Object.assign(ret, { bid: ret._id})
      delete ret._id  
    }
  },
  toObject: {
    virtuals: true
  },
})

BootcampSchema.pre('remove', async function(next) {
  await this.model('Course').deleteMany({ bid: this._id })
  next()
})

export const Bootcamp = model('Bootcamp', BootcampSchema)

