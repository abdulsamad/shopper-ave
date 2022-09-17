declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
  }
}

declare namespace Express {
  export interface Request {
    token: string;
  }
}
