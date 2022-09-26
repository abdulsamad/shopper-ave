declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRY: string;
    COOKIE_TIME: string;
    CLOUDINARY_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  }
}

// Modifying Express Request
// declare namespace Express {
//   export interface Request {
//     token: number;
//   }
// }
