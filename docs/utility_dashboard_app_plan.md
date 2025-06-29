# 📱 Utility Dashboard — Project Overview

## 📚 Summary

A customizable web dashboard for homeowners to monitor and manage their utility services (electric, gas, water, internet, solar) in one place. Users securely link their utility accounts (Dominion Energy, Columbia Gas, Chesterfield County VA, Verizon Fios, Enphase), and the app aggregates data via official APIs or credential-based scraping. The platform is web-based, targeting desktop and mobile browsers. After a trial period, users will pay a subscription fee.

---

## 🎯 Core Features

- User authentication and account management
- Secure linking of supported utility provider accounts
- Aggregated dashboard view of all connected utilities
- Visualizations for usage, cost, and trends per utility
- Provider management (add/remove/re-authenticate)
- Data refresh and sync scheduling
- Responsive, mobile-friendly UI
- Subscription management and payment processing

---

## 🧱 Architecture Components

### 1. User Management

- Handles registration, login, password reset, and profile management.
- Inputs: Email, password, profile info.
- Outputs: Auth tokens, user profile.
- Key technologies: .NET Identity, JWT, secure password storage.

### 2. Provider Integration Layer

- Connects to Dominion Energy, Columbia Gas, Chesterfield County VA, Verizon Fios, Enphase via API or scraping.
- Inputs: User credentials or API tokens.
- Outputs: Normalized utility data (usage, billing, etc.).
- Key technologies: Custom C# integrations, third-party scraping libraries, secure credential storage.

### 3. Data Aggregation & Storage

- Normalizes and stores utility data for each user.
- Inputs: Raw provider data.
- Outputs: Dashboard-ready data, historical records.
- Key technologies: Entity Framework Core, PostgreSQL.

### 4. Dashboard UI

- Displays utility metrics, charts, and account status.
- Inputs: Aggregated utility data.
- Outputs: Interactive, real-time dashboard.
- Key technologies: React 19, TypeScript, Tailwind CSS, Chart.js or similar.

### 5. API Layer

- Serves frontend requests for user, provider, and utility data.
- Inputs: Authenticated API calls.
- Outputs: JSON data for dashboard and settings.
- Key technologies: .NET 8 Minimal API.

### 6. Subscription & Payment Processing

- Manages trial periods, subscriptions, and payments.
- Inputs: User payment info, subscription status.
- Outputs: Access control, billing records.
- Key technologies: Stripe (recommended), .NET Stripe SDK.

---

## 🧰 Tools & Frameworks

| Component | Tool/Framework                                |
| --------- | --------------------------------------------- |
| UI        | React 19, Vite 7, Tailwind CSS 4              |
| Backend   | .NET 8 Minimal API, C# 11+                    |
| Data      | Entity Framework Core, PostgreSQL             |
| Scraping  | Playwright, PuppeteerSharp, or similar        |
| Payment   | Stripe                                        |
| Other     | xUnit, ESLint, Prettier, EditorConfig, Docker |

---

## ✅ MVP Goals

- [ ] User registration and login
- [ ] Link at least one supported utility provider (API or scraping)
- [ ] Fetch and display basic usage/cost data for each linked provider
- [ ] Responsive dashboard UI with simple charts
- [ ] Manual data refresh
- [ ] Secure credential handling
- [ ] Subscription trial logic (no payment integration in MVP, but design for it)

### 🔖 MVP End-to-End User Story

1. User visits the dashboard and registers an account.
2. User logs in and is prompted to link a utility provider.
3. User enters credentials or API token for their provider.
4. App fetches and stores utility data.
5. User sees a dashboard with their latest usage/cost data.
6. User can manually refresh data or unlink a provider.
7. User is notified when their trial is ending and prompted to subscribe.

---

## 🔄 Error Handling & Fallbacks

- Graceful handling of failed provider logins (clear error messages, retry options)
- Securely store and never expose user credentials
- Fallback to manual data entry if provider integration fails
- Notify users of data sync issues or provider outages
- Rate limiting and error logging for scraping/API calls
- Payment failures result in clear messaging and access restrictions

---

## 🚀 Future Features

- Support for more providers and regions
- Automated/scheduled data refresh
- Advanced analytics and forecasting
- Notifications for unusual usage or billing
- Multi-user/household support
- Mobile app (PWA or native)
- Integration with smart home devices

---

## ⏰ Development Timeline

> _Estimated: 5 hours/week_

### Phase 1: Project Setup & User Auth (Weeks 1–3)

- Scaffold frontend and backend projects
- Set up PostgreSQL database and ORM
- Implement user registration/login (JWT)

### Phase 2: Provider Integration (Weeks 4–7)

- Integrate Dominion Energy (first provider)
- Secure credential storage
- Normalize and store provider data

### Phase 3: Dashboard UI (Weeks 8–10)

- Build dashboard components
- Display usage/cost data with charts
- Responsive design

### Phase 4: Subscription Logic & Polish (Weeks 11–12)

- Add trial period logic
- Prepare for Stripe integration
- Error handling, notifications, and basic tests

---

## 📋 Project Organization

The Utility Dashboard project is organized using a GitHub Project board with custom fields, epics, and sprint planning to enable agile development.

### Project Details

- **GitHub Project:** [Utility Dashboard](https://github.com/users/eslutz/projects/12)
- **Total Issues:** 26 (6 epics + 20 sub-issues)
- **Sprint Duration:** 2 weeks (starting Mondays)
- **Development Period:** July 21, 2025 - February 15, 2026 (15 sprints)
- **Target Work:** ~10 story points per sprint (5-8 hours/week)

### Epic Structure

The project is organized into 6 main epics that align with the MVP goals. Each epic spans from its first implementation sprint to its completion:

1. **User Authentication & Management** (4 issues) - _Sprints 3-13_

   - User registration, login, profile management, password reset

2. **Provider Integration Layer** (4 issues) - _Sprints 2-13_

   - Credential storage, data fetching, normalization, error handling

3. **Data Aggregation & Storage** (3 issues) - _Sprints 1-8_

   - Database schema, Entity Framework setup, data models

4. **Dashboard UI Components** (4 issues) - _Sprints 6-11_

   - Main dashboard, charts/visualizations, responsive design, navigation

5. **API Layer Development** (3 issues) - _Sprints 2-12_

   - Endpoint creation, authentication middleware, error handling

6. **Subscription & Trial Logic** (2 issues) - _Sprint 15_
   - Trial period implementation, subscription preparation

### Project Fields

- **Status:** Backlog, Todo, In Progress, Done
- **Priority:** Low, Medium, High, Critical
- **Epic:** Links sub-issues to their parent epic
- **Story Points:** 1, 2, 3, 5, 8, 13 (Fibonacci sequence)
- **Sprint:** 15 two-week iterations (Sprint 1-15)
- **Target Release:** MVP v1.0

### Sprint Schedule

> [!Note] > _Adjusted for solo development at 5-8 hours/week, targeting ~10 story points per sprint_

- **Sprint 1:** July 21 - August 3, 2025 (Database schema design - 8 points)
- **Sprint 2:** August 4 - August 17, 2025 (API setup, provider interface - 10 points)
- **Sprint 3:** August 18 - August 31, 2025 (User registration, JWT auth - 10 points)
- **Sprint 4:** September 1 - September 14, 2025 (User management API - 8 points)
- **Sprint 5:** September 15 - September 28, 2025 (Secure credential storage - 8 points)
- **Sprint 6:** September 29 - October 12, 2025 (Frontend setup, repository pattern, user profile - 11 points)
- **Sprint 7:** October 13 - October 26, 2025 (Dominion Energy provider - 13 points)
- **Sprint 8:** October 27 - November 9, 2025 (Data aggregation service - 8 points)
- **Sprint 9:** November 10 - November 23, 2025 (Provider management API - 8 points)
- **Sprint 10:** November 24 - December 7, 2025 (Dashboard layout, auth UI - 13 points)
- **Sprint 11:** December 8 - December 21, 2025 (Utility metrics visualization - 8 points)
- **Sprint 12:** December 22, 2025 - January 4, 2026 (Provider management UI - 8 points)
- **Sprint 13:** January 5 - January 18, 2026 (Utility data API - 8 points)
- **Sprint 14:** January 19 - February 1, 2026 (Data normalization, password reset - 8 points)
- **Sprint 15:** February 2 - February 15, 2026 (Subscription features - 13 points)

### Project Views

The GitHub Project includes multiple views for different perspectives:

- **Backlog View:** All issues grouped by epic with priority sorting
- **Kanban View:** Status-based workflow (Backlog → Todo → In Progress → Done)
- **Roadmap View:** Timeline visualization of epics and sprints

All issues are currently in the Backlog status, with sprint assignments distributed according to the realistic timeline above for solo development.

---

## 🏠 Project Considerations

### Time Constraints

- 5 hours/week: Focus on one provider at a time, keep MVP scope tight
- Use automation for testing and deployment

### Real-World Integration

- Start with your providers: Dominion Energy, Columbia Gas, Chesterfield County VA, Verizon Fios, Enphase
- Respect provider TOS for scraping; prefer official APIs
- Use environment variables for secrets

### Sustainable Development

- Modular code for easy provider expansion
- Document setup and onboarding for future contributors
- Use Docker for local development and deployment parity

### Hosting Recommendations

- **Backend & API:** Azure App Service (recommended for .NET 8 Minimal API; supports Docker and easy scaling)
- **Frontend:** Azure Static Web Apps (SWA) (best for seamless Azure integration, built-in auth, and unified management)
- **Database:** Azure Database for PostgreSQL (fully managed, scalable, and integrates with other Azure services)
- **Payment Processor:** Stripe (widely supported, easy .NET integration, good for subscriptions)
