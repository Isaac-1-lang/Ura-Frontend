# URA (NGO Management Platform)

URA is a modern, modular monolith web application designed for NGO operations, including managing organizations, projects, beneficiaries, distributions, and analytics. Built by **Genzura**.

This project focuses on providing a clean, production-ready codebase without bundled infrastructure/DevOps tooling.

## Tech Stack

- **Backend**: NestJS, PostgreSQL (Prisma ORM), Redis, JWT Auth.
- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, Lucide Icons.

## Prerequisites

- Node.js (v18+)
- PostgreSQL Database
- Redis Server

## Setup Instructions

### 1. Database Setup

Ensure PostgreSQL is running. Create a database for URA.

```bash
# Set your environment variables in backend/.env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ura?schema=public"
JWT_SECRET="your-super-secret-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
REDIS_HOST="localhost"
REDIS_PORT="6379"
```

### 2. Backend Initialization

Navigate to the backend directory, install dependencies, and run Prisma migrations.

```bash
cd backend
npm install

# Run database migrations
npx prisma migrate dev --name init

# Start the development server
npm run start:dev
```

The API will be available at `http://localhost:3000`.
Swagger documentation is available at `http://localhost:3000/api/docs`.

### 3. Frontend Initialization

Navigate to the frontend directory, install dependencies, and start the Next.js server.

```bash
cd frontend
npm install

# Create a .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3001` (or 3000 depending on what port Next.js chooses).

## Project Structure

This is a **Modular Monolith** architecture. The backend contains distinct domain modules:
- `AuthModule`: Authentication (JWT) and Authorization (RBAC).
- `UsersModule`: Admin, Project Managers, and Field Agents.
- `OrganizationsModule`: NGO and partner organization management.
- `ProjectsModule`: Project lifecycle and budget tracking.
- `BeneficiariesModule`: Registering and categorizing beneficiaries.
- `DistributionsModule`: Tracking aid distribution.
- `ReportsModule`: Aggregated metrics and analytics with Redis caching.
- `DashboardModule`: High-level summary stats.
- `NotificationsModule`: In-app notifications.

## Features & UI

The frontend uses a modern, responsive design system powered by Tailwind CSS, featuring dark mode support, glassmorphism elements, micro-interactions, and custom color palettes for a premium feel.
