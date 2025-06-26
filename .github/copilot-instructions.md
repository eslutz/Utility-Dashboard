<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Copilot Instructions for Utility Dashboard

## Project Context

- Full-stack utility dashboard
- **Frontend:** Vite 7, React 19, TypeScript 5.8, Tailwind CSS 4, ESLint, Prettier, EditorConfig
- **Backend:** .NET 8 Minimal API (C# 11+), xUnit
- **Frontend structure:**
  - `/src/components/`: React components (PascalCase)
  - `/src/services/`: API services (camelCase)
  - `/tests/`: All frontend tests, organized by type
- **Backend structure:**
  - `/backend/UtilityDashboard.Api/`: API endpoint registrations in `Program.cs`
  - `/backend/UtilityDashboard.Api/Endpoints/`: Endpoint implementations
  - `/backend/UtilityDashboard.Tests/`: xUnit tests

## Coding Conventions

- Use functional React components and hooks
- TypeScript interfaces for all API data and component props
- Tailwind CSS for all styling
- Use the API service for all backend communication
- Keep frontend and backend tests in their respective `/tests` folders
- Use ESLint and Prettier for code style; run `npm run lint` and `npm run format`
- Use EditorConfig for consistent whitespace and quotes

## Explicit Instructions for AI

- Only use public API endpoints defined in `Program.cs`
- Do not add new endpoints or features unless requested
- Use PascalCase for components, camelCase for services/utilities
- All new code must be type-safe and follow project conventions
- Keep instructions and code suggestions concise and relevant
