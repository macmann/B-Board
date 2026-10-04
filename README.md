# B-Board

![B-Board](public/logo.svg)

[![Website](https://img.shields.io/badge/Website-www.bboard.site-0ea5e9?style=for-the-badge&logo=googlechrome&logoColor=white)](https://www.bboard.site)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-B--Board-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/bboardx)

**B-Board is an AI-assisted delivery workspace that helps product, engineering, and QA teams spend less time coordinating work and more time completing it.** It brings backlog refinement, sprint execution, standups, quality, releases, alerts, and delivery reporting into one Next.js application.

> New here? Use the [User Guide](USER_GUIDE.md) for task-by-task instructions. For a complete capability and access matrix, see the [Feature List](FEATURES.md).

## Why B-Board

Delivery signals are usually scattered across tickets, standup notes, QA tools, and status meetings. B-Board connects those signals and uses AI where it can remove repetitive work:

- **Refine work faster:** scan a backlog for incomplete stories and generate structured user-story drafts.
- **Shorten standups:** turn conversational answers into an editable update, then synthesize team submissions into a concise digest.
- **Act earlier:** expose blockers, assignment gaps, open questions, health trends, and recommended interventions before a sprint slips.
- **Keep people in control:** AI output is a draft. Users review, accept, selectively apply, snooze, dismiss, or reject suggestions.
- **Preserve accountability:** AI runs, settings changes, suggestion decisions, and issue changes have auditable records.

## AI-powered efficiency at a glance

| Workflow | What B-Board does | Efficiency gain | Human control |
| --- | --- | --- | --- |
| Backlog grooming | Scans up to 30 backlog items per run and groups completeness suggestions by issue | Finds refinement gaps without reviewing every ticket manually | Open the issue to preview, accept, reject, or snooze each suggestion |
| User-story drafting | Produces a structured story, description, acceptance criteria, assumptions, questions, and out-of-scope notes | Converts a thin ticket into a review-ready draft | Select which title, description, or criteria fields to apply |
| Personal standup drafting | Asks about yesterday, today, and blockers, then fills the standup form | Reduces formatting and rewriting time | Review and edit the form before saving |
| Team standup intelligence | Summarizes updates into progress, achievements, blockers, dependencies, gaps, actions, and questions | Replaces manual rollups and creates ready-to-share digests | Admins/POs review evidence, resolve actions, answer questions, and copy a digest |
| Sprint health and guidance | Calculates health, forecast confidence, spillover risk, capacity signals, and deterministic interventions | Focuses leaders on the highest-value action for the day | Guidance can be enabled per project; suggestions can be accepted, snoozed, or dismissed |
| Execution coordination | Turns persistent blockers and coordination events into targeted alerts and nudges | Reduces manual chasing and makes ownership explicit | Each user controls notification preferences and resolves alert state |

The sprint-health model and proactive guidance are **data-driven deterministic intelligence**, not free-form LLM output. This makes recommendations explainable and usable even when an AI provider is unavailable. Generative backlog and standup features require the API keys described below.

## Product capabilities

- Prioritized product and research backlogs, epics, filters, inline editing, bulk actions, and Jira CSV import.
- Sprint creation, scope planning, capacity signals, start/complete workflows, increments, and carry-over handling.
- Drag-and-drop Kanban execution with ownership, secondary assignees, comments, attachments, and issue history.
- Structured standups with linked issues/research, attendance, facilitator notes, clarifications, action states, and stakeholder digests.
- QA Sprint 360 with reusable test cases, executions, story traceability, defects, and sprint coverage.
- Release builds by environment/status, planned and deployed dates, linked issues, and release safeguards.
- Project and portfolio reports for velocity, burndown, cycle time, blocker themes, aging, orphaned work, adoption, delivery health, and cross-project status.
- Role-based project access, invitations, audit logs, configurable email, notifications, responsive layouts, and light/dark themes.

See [FEATURES.md](FEATURES.md) for details, maturity notes, role access, and efficiency outcomes.

## Technology

- **Application:** Next.js 16, React 19, TypeScript, Tailwind CSS, Radix UI
- **Server:** Next.js App Router/API routes plus one Pages API route for standup drafting
- **Data:** PostgreSQL, Prisma ORM
- **Authentication:** signed JWT stored in an HTTP-only cookie
- **AI:** OpenAI SDK; OpenAI for standups and OpenAI-compatible endpoints for backlog workflows
- **Analytics:** Recharts
- **Quality:** Vitest, Testing Library, ESLint, TypeScript

## Repository map

```text
.
├── src/app/                 # Pages, protected workspace, and App Router APIs
├── src/pages/api/           # AI standup draft endpoint
├── src/components/          # Product UI grouped by domain
├── src/lib/                 # Auth, AI, reporting, coordination, and domain logic
├── prisma/
│   ├── schema.prisma        # PostgreSQL data model
│   ├── migrations/          # Versioned schema changes
│   ├── seed.ts              # Baseline demo data
│   └── seedBuilds.ts        # Release-build QA data
├── public/                  # Logo and product illustrations
├── scripts/                 # Deploy and maintenance utilities
├── USER_GUIDE.md            # End-user and administrator workflows
├── FEATURES.md              # Comprehensive product capability catalog
├── QA_CHECKLIST.md          # Release-build regression checklist
└── render.yaml              # Render blueprint
```

## Quick start

### Prerequisites

- Node.js **20.9 or newer** (required by Next.js 16)
- npm
- PostgreSQL
- Optional AI provider credentials and SMTP service

### Install and run

```bash
git clone <repository-url>
cd B-Board
npm install
cp .env.example .env
```

Set at least `DATABASE_URL` and a strong `JWT_SECRET` in `.env`, then prepare and start the app:

```bash
npx prisma migrate dev
npm run seed          # optional demo workspace
npm run dev
```

Open <http://localhost:3000>. Set `HOMEPAGE_ENABLED=1` to show the marketing homepage at `/`; otherwise the root route redirects to authentication.

## Configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma. |
| `JWT_SECRET` | Yes | Signs and verifies authentication tokens; use a long random secret. |
| `APP_URL` | Production | Canonical public origin used in generated links. |
| `PORT` | No | Port used by `npm start`; defaults to `3000`. |
| `HOMEPAGE_ENABLED` | No | Set to `1` to serve the public marketing homepage. |
| `AI_API_KEY` | For backlog AI | Credential for backlog grooming and user-story autofill. |
| `AI_BASE_URL` | No | Base URL for an OpenAI-compatible backlog AI provider. |
| `AI_MODEL_DEFAULT` | No | Default backlog model; falls back to `gpt-4o-mini`. |
| `OPENAI_API_KEY` | For standup AI | OpenAI credential for personal drafts and team summaries. |
| `SMTP_HOST`, `SMTP_PORT` | For SMTP mail | SMTP server and port. |
| `SMTP_USER`, `SMTP_PASS` | Usually | SMTP credentials. |
| `SMTP_FROM` / `EMAIL_FROM` | Recommended | Sender identity. Project email settings can override it. |
| `CONTACT_TO` | Contact form | Destination for marketing-site contact requests. |
| `UPLOADS_DIR` | No | Filesystem location for uploaded files. |

Never commit real credentials. Use your deployment platform's secret manager. AI prompts can contain issue or standup content, so confirm that the chosen provider and data-retention policy meet your organization's requirements.

### Enable backlog AI

1. Configure `AI_API_KEY` and, for a compatible provider, `AI_BASE_URL`.
2. Sign in as a global admin or project Admin/PO.
3. Open **Project → Settings → AI & Automation**.
4. Enable **Backlog Grooming AI** and save.
5. Open **Backlog → AI Groom backlog** or an issue's AI drafting area.

The suggestion-scope selector currently remembers a UI preference for the browser session; backend scoping is not yet implemented.

### Enable standup AI

Set `OPENAI_API_KEY`. Contributors can use **AI Stand-up** to create editable personal drafts. Project Admins and POs can open the team summary for a date. If summary generation fails, B-Board uses the last good version or a non-LLM fallback instead of discarding the underlying submissions.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm start` | Start the production server on `PORT`. |
| `npm test` | Run the Vitest suite once. |
| `npm run lint` | Run ESLint on TypeScript, TSX, and MJS files. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm run seed` | Load baseline seed data. |
| `npm run seed:builds` | Load idempotent release-build QA data. |
| `npm run dedupe:testexecutions` | Remove duplicate test executions. |
| `npm run render:deploy` | Generate Prisma, dedupe executions, sync the schema, and build for Render. |

## Database workflow

```bash
# development: create/apply a migration and regenerate the client
npx prisma migrate dev

# production: apply committed migrations
npx prisma migrate deploy

# inspect data locally
npx prisma studio
```

Use `prisma migrate deploy` for durable production environments. The supplied Render helper currently uses `prisma db push --accept-data-loss`; review that trade-off before adopting it for production data.

## Deployment

### Render blueprint

1. Create a Render Blueprint from this repository.
2. Provision the referenced PostgreSQL database (or update `render.yaml` to match an existing database).
3. Add `APP_URL` and any AI, email, and upload configuration not declared in the blueprint.
4. Deploy and run the validation checklist below.

### Any Node host

```bash
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
npm start
```

Provide persistent storage or an object-storage adaptation if uploads must survive ephemeral deployments. Terminate TLS at the platform or reverse proxy and expose the configured `PORT`.

## Validation checklist

Before releasing:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Then verify `/api/health`, login/registration, project access, board movement, a standup submission, key reports, and role restrictions. With integrations enabled, also run one AI draft, one grooming scan, one email action, and one upload. Use [QA_CHECKLIST.md](QA_CHECKLIST.md) for build-management regressions.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Prisma cannot connect | Validate `DATABASE_URL`, SSL parameters, firewall rules, and whether migrations were applied. |
| Authentication resets or fails | Ensure every instance uses the same non-default `JWT_SECRET`; check HTTPS/cookie handling. |
| Backlog AI says it is disabled | Configure `AI_API_KEY`, enable the project setting, and confirm the user is a contributor or higher. |
| Standup AI fails | Configure `OPENAI_API_KEY`; inspect server logs and provider limits. Team summaries may display a fallback. |
| AI provider returns invalid output | Use a JSON-capable OpenAI-compatible model and check `AI_BASE_URL`/`AI_MODEL_DEFAULT`. Responses are schema validated. |
| Invite links point to the wrong host | Set `APP_URL` to the public HTTPS origin. |
| Mail is not delivered | Verify SMTP credentials, sender policy, project email overrides, and SPF/DKIM. |
| Uploaded files disappear | Point `UPLOADS_DIR` at persistent storage or use a persistent volume. |
| Render deploy is too destructive | Replace the helper's `prisma db push --accept-data-loss` with a migration-based release step. |

## Responsible AI notes

- Treat generated content and recommendations as decision support, not ground truth.
- Review drafts before applying them; B-Board deliberately keeps application actions explicit.
- Avoid placing secrets, credentials, or unnecessary personal data in issues and standups.
- Restrict AI settings to trusted Admin/PO users and periodically review audit history.
- Monitor provider usage, latency, and retention policies. B-Board enforces prompt/response size limits and request timeouts for backlog AI, but provider-side controls still matter.

## Documentation

- [User Guide](USER_GUIDE.md) — onboarding, daily workflows, AI workflows, roles, and admin operations.
- [Feature List](FEATURES.md) — full capability catalog, access matrix, AI guardrails, and status notes.
- [QA Checklist](QA_CHECKLIST.md) — release-build regression scenarios.
