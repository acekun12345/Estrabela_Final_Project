# Conference Expense Planner

A React application for planning conference expenses. Browse venue options,
choose add-ons and meals, and review an itemized event cost summary.

## Tech stack

- **Frontend:** Vite, React, TypeScript, Redux Toolkit
- **Backend:** Node.js, Express
- **Other:** CSS, `fetch`, and `dotenv`

## Requirements

- Node.js 20 or newer
- npm

## Installation

Install dependencies separately for the client and server:

```powershell
cd client
npm install
cd ..\server
npm install
```

## Environment configuration

The server reads its configuration from `server/.env`. A local example file is
provided at `server/.env.example`:

```dotenv
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

Copy the example if you need to recreate your local environment file:

```powershell
Copy-Item .env.example .env
```

Run that command from the `server` directory. The local `.env` file is ignored
by Git; keep machine-specific settings there.

The client uses `http://localhost:5000/api` by default. To use a different API
base URL, define `VITE_API_BASE_URL` in the client's environment (for example,
`http://localhost:5000/api`).

## Running locally

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

Open the Vite URL printed in the client terminal, usually
`http://localhost:5173`.

The API is available at `http://localhost:5000` by default:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status and uptime |
| `GET` | `/api/venues` | Available venues |
| `GET` | `/api/addons` | Available add-ons |
| `GET` | `/api/meals` | Available meals |

## Client scripts

Run these commands from `client/`:

```powershell
npm run dev       # Start the Vite development server
npm run build     # Type-check and create a production build
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Project structure

```text
client/
  src/
    app/           Redux store
    components/    Planner UI components
    features/      Feature-specific state and components
    hooks/         Reusable React hooks
    services/      API client
    utils/         Formatting helpers
server/
  middleware/      Express middleware
  index.js         Express API entry point
```
