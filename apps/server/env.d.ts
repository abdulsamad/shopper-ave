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
  }
}

// Modifying Express Request
declare namespace Express {
  export interface Request {
    user?: {
      _id: string;
      __v: number;
      name: string;
      email: string;
      password: '🤨';
      role: string;
      createdAt: string;
      updatedAt: string;
    };
  }
}
