import { Schema, model } from "mongoose";

const BootCampSchema = new Schema({
  slug: String,
  name: {
    type: String,
    required: [true, 'Pleas provide a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can`t be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Pleas provide a description'],
    maxlength: [500, 'Description can`t be more than 50 characters']
  },
  price: {
    type: Number,
    required: [true, 'Pleas provide a price'],
    min: [0, 'Price con`t be less than 0'],
  },
  remote: {
    type: Boolean,
  },
  create_at: {
    type: Number,
    default: new Date().getTime()
  }
})

export const Bootcamp = model('Bootcamp', BootCampSchema)

