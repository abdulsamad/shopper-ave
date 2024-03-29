import { v2 as cloudinary } from 'cloudinary';

import app from './app';
import connectDB from '@config/db';

// Connect with database
connectDB();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // eslint-disable-next-line security-node/detect-crlf
  console.log(`Server is running on port ${port}`);
});
