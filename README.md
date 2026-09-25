# Habit Tracker

A full-stack habit tracker: an Express + Prisma (SQLite) API for creating habits, logging daily completions, and computing progress stats, paired with a React + Vite frontend dashboard.

## Project Structure

```
backend/    Express API, Prisma schema/migrations
frontend/   React + Vite dashboard
```

## Prerequisites

- Node.js 20+
- npm

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with a SQLite database URL:

```
DATABASE_URL="file:./dev.db"
```

Run the database migrations:

```bash
npx prisma migrate dev
```

Start the API in dev mode (runs on `http://localhost:3001`):

```bash
npm run dev
```

### API Endpoints

| Method | Route                  | Description                    |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/habits`              | List all habits                |
| GET    | `/habits/:id`          | Get a single habit             |
| POST   | `/habits`              | Create a habit                 |
| DELETE | `/habits/:id`          | Delete a habit                 |
| POST   | `/habits/:id/complete` | Log a completion for today     |
| GET    | `/habits/:id/history`  | List completion history        |
| GET    | `/habits/:id/stats`    | Get completion count + message |

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The dashboard runs on `http://localhost:5173` (Vite's default) and expects the backend API at `http://localhost:3001`.

## Running Both

Start the backend and frontend in separate terminals using the `npm run dev` commands above, then open the frontend URL in your browser.
