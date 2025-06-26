# Utility Dashboard

A modern full-stack utility dashboard application with a Vite/React/TypeScript/Tailwind frontend and a C# .NET 8 Web API backend.

## Project Structure

- **Frontend** (`/frontend`):
  - Vite 7, React 19, TypeScript 5.8, Tailwind CSS 4, PostCSS, Autoprefixer
  - ESLint, Prettier, EditorConfig for code quality and formatting
  - Vitest, React Testing Library, Jest DOM for testing
  - Organized as:
    - `src/components/`: React components (e.g., `UtilityMetrics.tsx`)
    - `src/services/`: API services (e.g., `api.ts`)
    - `tests/`: All frontend tests, organized by type
- **Backend** (`/backend/UtilityDashboard.Api`):
  - .NET 8 Minimal API (C# 11+)
  - Endpoints: `/api/metrics`, `/api/weather`
  - CORS configured for frontend dev server
  - xUnit for backend tests (`/backend/UtilityDashboard.Tests`)

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm
- .NET 8 SDK

### Local Development

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at [http://localhost:5173](http://localhost:5173)

#### Backend

```bash
cd backend/UtilityDashboard.Api
dotnet restore
dotnet watch run
```

Runs at [https://localhost:7039](https://localhost:7039)

#### VS Code Tasks

You can run both servers together using VS Code Tasks: `Start Frontend` and `Start Backend`.

## API Endpoints

- `GET /api/metrics`: Returns utility metrics data

## Testing

- **Frontend**
  - Run all tests with `npm test`
  - Watch mode with `npm run test:watch`
  - Coverage with `npm run test:coverage`
  - Tests are in `/frontend/tests`
- **Backend**
  - Run all tests with `dotnet test` in `/backend/UtilityDashboard.Tests`
  - Coverage: `dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=lcov`
  - Tests are in `/backend/UtilityDashboard.Tests`

## Linting & Formatting

- Lint: `npm run lint`
- Format: `npm run format`
- Uses ESLint, Prettier, and EditorConfig

## Troubleshooting

- **CORS:** Ensure backend CORS policy allows `http://localhost:5173`
- **TypeScript:** Run `npx tsc --noEmit` to check types
- **Tailwind:** Ensure directives are in `src/index.css` and config includes all relevant files

## Recommended VS Code Extensions

- C# Dev Kit
- ESLint
- Tailwind CSS IntelliSense
- Prettier - Code formatter

## Directory Overview

```plaintext
utility-dashboard/
├── .github/                    # GitHub-specific files
│   └── copilot-instructions.md # AI assistant instructions
├── .vscode/                    # VS Code config
├── backend/                    # .NET backend
│   ├── UtilityDashboard.Api/   # Web API project
│   └── UtilityDashboard.Tests/ # xUnit tests
├── frontend/                   # Vite/React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   ├── tests/
│   └── ...
└── utility-dashboard.sln       # .NET solution file
```
