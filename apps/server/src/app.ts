import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import home from '@routes/home';
import user from '@routes/user';
import product from '@routes/product';
import payment from '@routes/payment';
import order from '@routes/order';

// Initialize dotenv
dotenv.config();

const app = express();

// Allow Resource Origin
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  });
}

// Swagger documentation
const swaggerDocument = YAML.load(path.resolve(__dirname, '../swagger.yml'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies and file middlewares
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// Logger middwares
app.use(morgan('tiny'));

// Router middleware
app.use('/api/v1', home);
app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', payment);
app.use('/api/v1', order);

export default app;
