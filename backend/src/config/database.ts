import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!env.mongodbUri) {
      throw new Error('MongoDB URI is not defined');
    }
    await mongoose.connect(env.mongodbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});