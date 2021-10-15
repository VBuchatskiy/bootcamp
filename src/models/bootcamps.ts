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
  }
})

export const Bootcamp = model('Bootcamp', BootCampSchema)

