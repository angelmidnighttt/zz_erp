# ERP API

Backend API built with Node.js, Express 5 and TypeScript.

## Requirements

- Node.js >= 18
- Yarn 1.x

## Getting started

```bash
cd api
yarn install
cp .env.example .env
yarn dev
```

The server starts at `http://localhost:8017`. Health check: `GET /api/v1/health`.

## Scripts

| Script           | Description                              |
| ---------------- | ---------------------------------------- |
| `yarn dev`       | Run in watch mode with `tsx`             |
| `yarn build`     | Compile TypeScript to `dist/`            |
| `yarn start`     | Run the compiled build (`dist/server.js`) |
| `yarn typecheck` | Type-check without emitting files        |

## Structure

```
src/
├── config/        # Environment configuration
├── middlewares/   # Error handler, 404 handler
├── routes/        # Route definitions (mounted at /api/v1)
├── app.ts         # Express app setup
└── server.ts      # Entry point (starts the HTTP server)
```
