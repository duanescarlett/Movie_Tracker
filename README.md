# SMS Movie Tracker

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16 or later)
- [Docker](https://www.docker.com/) (for running the database and other services)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sms_movie_tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   This command will:
   - Start the Docker containers defined in `docker-compose.yml`.
   - Generate Prisma client files.
   - Start the Next.js development server with Turbopack.

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

   The application will be available at this URL.

### Alternative Development Mode

If you want to run the development server without Turbopack, use the following command:
   ```bash
   npm run dev-no-turbo
   # or
   yarn dev-no-turbo
   ```

### Database Setup

This project uses Prisma for database management. Ensure the database is running via Docker and apply migrations if needed:

1. Apply migrations:
   ```bash
   npx prisma migrate dev
   ```

2. Seed the database (if applicable):
   ```bash
   npx prisma db seed
   ```

### Environment Variables

Create a `.env` file in the root directory and configure the required environment variables. Refer to `.env.example` (if available) for guidance.

### Testing

Run the test suite using:
   ```bash
   npm test
   # or
   yarn test
   ```

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
