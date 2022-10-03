declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGODB_URI: string;
    // Authentication
    JWT_SECRET: string;
    JWT_EXPIRY: string;
    COOKIE_TIME: string;
    // Cloudinary
    CLOUDINARY_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    // SMTP
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_EMAIL: string;
  }
}

// Modifying Express Request
declare namespace Express {
  export interface Request {
    user?: import('@types').User;
  }
}
