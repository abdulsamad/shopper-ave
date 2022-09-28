import express from 'express';
import cookieParser from 'cookie-parser';

/* istanbul ignore file */
const app = express();

// Regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Other middlewares
app.use(cookieParser());

export { app };
