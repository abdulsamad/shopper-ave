import app from './app';
import connectDB from '@config/db';

// Connect with database
connectDB();

app.listen(process.env.PORT || 8000, () => {
  // eslint-disable-next-line security-node/detect-crlf
  console.log(`Server is running on port ${process.env.PORT}`);
});
