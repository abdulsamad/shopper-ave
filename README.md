<h2>ShopperAve</h2>

ShopperAve is a full-stack ecommerce web application built using MongoDB, Express, React, Node, and Turborepo. It features Swagger UI for API documentation and Cypress testing for the frontend, and Jest for the backend. With Shopper Ave, users can enjoy a seamless online shopping experience, from browsing products to placing orders, all within a secure and reliable platform. Its modern and user-friendly interface, combined with its powerful backend capabilities, make Shopper Ave a top choice for any ecommerce business looking to provide their customers with the best possible shopping experience.

### Technologies

- TurboRepo
- React
- Next.js
- TanStack Query
- Zustand
- Tailwind
- Zod
- React Hook Form
- Cypress
- Husky
- Jest
- Framer Motion
- Stripe
- Node
- Express
- MongoDB

### Local setup

This project uses Node.js `18.17.1` and Yarn `3.4.1`.

```bash
nvm install
nvm use
corepack enable
yarn install
```

Copy the environment templates before starting the apps:

```bash
cp apps/client/.env.example apps/client/.env
cp apps/server/.env.example apps/server/.env
```

The server requires a MongoDB connection and credentials for Cloudinary, Stripe, and SMTP email. Fill those values in `apps/server/.env`; set the client API and Stripe values in `apps/client/.env`.

Seed a local database with realistic demo data:

```bash
yarn workspace server seed
```

The seed is repeatable for its demo records. It creates an admin account (`admin@shopperave.test`), four customers, six categories, twelve products with catalog artwork uploaded to Cloudinary, reviews, and four orders. Demo passwords are `ShopperAve123!`.

Run the client and server together with:

```bash
yarn dev
```

The client runs on `http://localhost:3000` and the API runs on `http://localhost:4000`.

### Screenshots

## [![shopper ave screenshot](readme/shopper-ave-home.png 'Home')](#)
