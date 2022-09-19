import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import swaggerUI from 'swagger-ui-express';
import * as YAML from 'yamljs';
import path from 'path';

import { home } from '@controllers/home';

// Initialize dotenv
dotenv.config();

const app = express();

// Swagger documentation
const swaggerDocument = YAML.load(path.resolve(__dirname, '../swagger.yml'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
