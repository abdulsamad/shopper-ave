import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

import { home } from '@controllers/home';

// Initialize dotenv
dotenv.config();

const app = express();

// Regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies and file middlewares
app.use(cookieParser());
app.use(fileUpload());

// Logger
app.use(morgan('tiny'));

// Router middleware
app.use('/api/v1', home);

export default app;
