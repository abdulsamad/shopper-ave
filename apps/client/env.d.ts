declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_DOMAIN: string;
    NEXT_PUBLIC_TEST_EMAIL: string;
    NEXT_PUBLIC_TEST_PASSWORD: string;
    // Stripe
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  }
}
