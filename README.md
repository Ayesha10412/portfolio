# Portfolio API

This repository contains the first backend slice of the portfolio: a NestJS API with a versioned REST boundary. The current workspace contains the backend starter only; a React frontend is not present here yet.

## Setup

```bash
npm install
copy .env.example .env
npm run start:dev
```

The API listens on `http://localhost:3000` by default. `.env` is local-only and must never be committed.

## Current endpoints

- `GET /api/v1/health` — confirms that the API is running.
- `GET /api/v1/projects` — returns temporary in-memory project data.

## Commands

```bash
npm run start:dev  # watch mode
npm run build      # production compilation
npm run lint       # static analysis
npm test           # unit tests
npm run test:e2e   # API tests
```

## Architecture

Each feature owns its NestJS module, controller, and service. Controllers define HTTP routes; services contain application logic; modules wire related classes together. See [docs/ARCHITECTURE_GUIDE.md](docs/ARCHITECTURE_GUIDE.md) for a beginner-friendly explanation.

The database, DTO validation, Swagger, contact persistence, and frontend integration are intentionally deferred until the first API flow is understood.
