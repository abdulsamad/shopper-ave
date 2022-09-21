import mongoose from 'mongoose';

/**
 * Connects with MongoDB database
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('DB Connected!');
  } catch (err) {
    console.error('DB connection issues');
    process.exit(1);
  }
};

export default connectDB;
