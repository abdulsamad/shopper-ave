import app from './app';

app.listen(process.env.PORT || 8000, () => {
  // eslint-disable-next-line security-node/detect-crlf
  console.log(`Server is running on port ${process.env.PORT}`);
});
