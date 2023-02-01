import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  mongoose.set('strictQuery', true)
  const db = await mongoose.connect(process.env.MONGODB_URL);
  console.log("Database Connected")
  return db;
};

export default connectDB;
