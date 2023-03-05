declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    // Stripe
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  }
}
