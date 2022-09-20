declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRY: string;
    COOKIE_TIME: string;
  }
}

// Modifying Express Request
declare namespace Express {
  export interface Request {
    token: string;
  }
}
