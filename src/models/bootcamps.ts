import { Schema, model } from "mongoose";

const BootcampSchema = new Schema({
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
    required: [true, 'Pleas provide a description'],
    maxlength: [500, 'Description can`t be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Pleas provide a price'],
    min: [0, 'Price con`t be less than 0'],
  },
  create_at: {
    type: Number,
    default: Date.now()
  }
})

export const Bootcamp = model('Bootcamp', BootcampSchema)

