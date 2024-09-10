# Plamatio Frontend

This project demonstrates a production-quality intuitive and responsive web frontend for an e-commerce store.

This project also serves as one of the frontends for the [Plamatio Backend](https://github.com/pranav-kural/plamatio-backend), which is a highly performant, scalable, and resilient distributed backend built using Go-lang and PostgreSQL.

![Plamatio Frontend](https://github.com/user-attachments/assets/7eca3bf6-e88e-4d49-961a-78c1a47f6d1a)

## Key Features

- **Next.js:** Built with Next.js, a React framework that enables server-side rendering and static site generation for faster content loading and improved SEO.
- **Redux / RTK-Query:** Uses Redux and RTK Query for efficient side effects and state management. Reduces latency in page loads and calls made to backend API for data fetching with optimal data caching with strategic invalidation.
- **TypeScript:** Written in TypeScript, providing static type checking to catch errors early and improve code quality and maintainability.
- **Tailwind CSS:** Utilizes Tailwind CSS for styling, allowing for rapid UI development with a utility-first approach and ensuring a consistent design system.
- **Event data streaming:** Streams user events to a Kafka pipeline, enabling real-time analytics and monitoring of user interactions.
- **Real-time cross-platform updates:** Listens to specific Kafka topics for updates to core components like cart and orders, ensuring real-time synchronization across different platforms.
- **Component-based development:** Follows a component-based architecture, promoting reusability, maintainability, and scalability of UI components.
- **Clerk:** Using Clerk for user authentication. A duplicate entry exists in the Plamatio backend for each user with user's data. This is done to reduce vendor dependency and to ensure referential integrity of data on the backend side.
- **Stripe:** Integrates with Stripe for payment handling. Plamatio frontend primarily uses the Stripe's JS SDK and Embedded Form, with price IDs setup in Stripe.

Plamatio is a brand focused on Llama-inspired products. However, the Plamatio Frontend and Plamatio Backend projects are very loosely coupled with the Plamatio e-commerce data.

It is possible to completely switch the products data, branding data, company name, product categories, product subcategories, etc. The intention behind building this project was not to develop a frontend specifically for Plamatio brand, but instead, focuses on displaying a production-quality e-commerce frontend that is not only snappy and visually pleasing but is also capable of handling side effects, data mutations, state changes efficiently, while streaming & listening for real-time data and user events (Kafka).

## Overall Architecture

The image below displays a simplified view of the overall architecture and the components involves in the functioning of the Plamatio Frontend.

<p align="center">
  <img src="https://github.com/user-attachments/assets/f0977b3e-d121-447e-9d3a-6f73e6519727" alt="Plamatio frontend overall architecture" width="800px" />
</p>

## Developing Locally

Please follow the steps below to get started with developing or testing Plamatio Frontend on your own local machine.

### Clone the Repository

```bash
git clone https://github.com/pranav-kural/plamatio-frontend.git
```

### Setup Environment Variables - Integrations

Plamatio frontend directly relies on three main external integrations:

- **Plamatio Backend:** For anything to do with any sort of data (example: products, categories, user orders, user cart items, etc.).
- **Clerk:** For user authentication. A duplicate entry exists in the Plamatio backend for each user with user's data. This is done to reduce vendor dependency and to ensure referential integrity of data on the backend side.
- **Stripe:** For payment handling. Plamatio frontend primarily uses the Stripe's JS SDK and Embedded Form.

Add API keys and other required environment variables in `.env.local` file (or you can create separate `.env.development` and `.env.production` files).

```bash
# Plamatio Backend
NEXT_PUBLIC_PLAMATIO_BACKEND_API_URL=
NEXT_PUBLIC_PLAMATIO_BACKEND_API_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Set this environment variable to support webhooks
# STRIPE_WEBHOOK_SECRET=
```

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Issues

If you encounter any issues or bugs while using Plamatio Frontend, please report them by following these steps:

1. Check if the issue has already been reported by searching our issue tracker.
2. If the issue hasn't been reported, create a new issue and provide a detailed description of the problem.
3. Include steps to reproduce the issue and any relevant error messages or screenshots.

[Open Issue](https://github.com/pranav-kural/plamatio-frontend/issues)
