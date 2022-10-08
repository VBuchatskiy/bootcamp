import { Schema, model } from "mongoose";
import { ICourse } from "./types";

const CourseSchema = new Schema<ICourse>({
  bid: {
    type: Schema.Types.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'please provide a name'],
    maxlength: [50, 'name can`t be more than 50 characters']
  },
  description: {
    type: String,
    required: true,
    maxlength: [500, 'name can`t be more than 500 characters']
  },
  skills: {
    type: String,
    required: [true, 'please add minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  cost: {
    type: Number,
    required: [true, 'please provide a cost'],
    min: [0, 'cost can`t be less than 0'],
  },
}, {
  id: false,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      Object.assign(ret, { cid: doc._id })
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

export const Course = model('Course', CourseSchema)

