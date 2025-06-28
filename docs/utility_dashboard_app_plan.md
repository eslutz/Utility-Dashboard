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
