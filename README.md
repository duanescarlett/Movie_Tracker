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
   git clone git@github.com:duanescarlett/Movie_Tracker.git
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

Below is the structure of the `.env` file required for this project. Ensure you replace the placeholder values with your actual configuration:

```
# Database Configuration
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMTI3MzlkMGQtYjM5Zi00YzI3LWE5MDktMjFkNmQxMzdmZGExIiwidGVuYW50X2lkIjoiMTUxYmMzZDBmYTg2MmQ5ODM3OGRjMzIyZmQ5MDE4OTA1YWI1MDNjY2FmMTFkOWY3MGQ4MjQ5ODFlZjU0ZDkwMiIsImludGVybmFsX3NlY3JldCI6ImNlZGRhMTM1LTgwM2YtNGU3OC05MjdjLWMxYjgyYmRlOGVjOSJ9.soguA7I0FneuUaSFMsBO3jxkaCglOHZ1b9rDry6gei8
POSTGRES_DB_TEST_PASSWORD=<your_test_db_password>

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your_nextauth_secret>

# OMDB API Configuration
OMDB_API=8e765993

# JWT Configuration
JWT_SECRET=<your_jwt_secret>

# Logging Configuration
LOG_LEVEL=info

# Other Environment Variables
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

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

## Deployment

The site is deployed on Vercel and can be accessed at the following URL:

[https://movie-tracker-delta.vercel.app/](https://movie-tracker-delta.vercel.app/)

## Known Issues

1. **Next-auth is not creating JWT tokens and it is not passing the user to the session object**
   - Investigate the NextAuth configuration and ensure the `jwt` and `session` callbacks are properly implemented.

2. **Application has an internal server error in Production after the API request to the database**
   - Debug the API routes and check for issues in the database queries or Prisma client usage.

3. **Either testing environment with Jest is not properly configured or I am unable to correctly test the page**
   - Verify the Jest configuration and ensure all necessary setup files and dependencies are correctly installed.
