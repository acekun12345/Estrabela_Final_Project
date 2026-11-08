# Conference Expense Planner

A full-stack app for planning conference venue, add-on, and meal expenses.

## Tech stack

- Frontend: Vite, React, TypeScript, Redux Toolkit
- Backend: Node.js and Express

## Requirements

- Node.js 20 or newer
- npm

## Install

```powershell
cd server
npm install
Copy-Item .env.example .env
cd ..\client
npm install
```

The server environment file uses `PORT=5000` and
`CORS_ORIGIN=http://localhost:5173` by default. Keep `.env` local; it is
excluded from Git.

## Run locally

Start the backend in one terminal:

```powershell
cd server
npm start
```

Start the frontend in a second terminal:

```powershell
cd client
npm run dev
```

Open the Vite URL shown in the client terminal, usually
`http://localhost:5173`. The client connects to `http://localhost:5000/api` by
default; set `VITE_API_BASE_URL` in the client environment to change it.

## API

- `GET /api/health` — server status and uptime
- `GET /api/venues` — available venues
- `GET /api/addons` — available add-ons
- `GET /api/meals` — available meals

## Client checks

Run from `client/`:

```powershell
npm run build
npm run lint
```
