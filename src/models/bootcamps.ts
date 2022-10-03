import { Schema, model } from "mongoose";
import { TBootcamp } from "./types";

const BootcampSchema = new Schema<TBootcamp>({
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
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

BootcampSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false
})

BootcampSchema.pre("remove", async function (next) {
  await this.model('Course').deleteMany({ bootcamp: this._id })
  next()
})

export const Bootcamp = model('Bootcamp', BootcampSchema)

