import { Schema, model } from "mongoose";

const CourseSchema = new Schema({
  slug: String,
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Pleas provide a name'],
    maxlength: [50, 'Name can`t be more than 50 characters']
  },
  description: {
    type: String,
    required: true,
    maxlength: [500, 'Name can`t be more than 500 characters']
  },
  skills: {
    type: String,
    required: [true, 'Pleas add minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  cost: {
    type: Number,
    required: [true, 'Pleas provide a cost'],
    min: [0, 'Cost con`t be less than 0'],
  },
  create_at: {
    type: Number,
    default: Date.now()
  },
  bootcamp: {
    type:  Schema.Types.ObjectId,
    ref: 'Bootcamp',
    required: true
  }
})

export const Course = model('Course', CourseSchema)

