import mongoose from "mongoose"

// connect db

export const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI || '')
}