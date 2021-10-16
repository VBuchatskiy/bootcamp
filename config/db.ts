import mongoose from "mongoose";
import { MONGO_URI } from '../config/config.json'

// connect db

export const connect = async () => {
  const { connection } = await mongoose.connect(MONGO_URI)
}