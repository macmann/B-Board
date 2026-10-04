# B-Board Feature List

This catalog describes the implemented product surface, with emphasis on how intelligent automation improves delivery efficiency. **Generative AI** means an external model is called; **delivery intelligence** means B-Board computes a signal or recommendation from application data and deterministic rules.

## AI and intelligent automation

| Capability | Type | What it provides | Efficiency and control |
| --- | --- | --- | --- |
| Backlog completeness scan | Generative AI | Reviews a bounded backlog batch and creates issue-level flags with rationale and confidence | Directs refinement attention to incomplete work; suggestions stay in an inbox for review |
| User-story autofill | Generative AI | Story wording, description, acceptance criteria, assumptions, questions, out-of-scope items, and notes | Selectively apply only desired fields; original issue remains unchanged until explicit action |
| Suggestion lifecycle | Workflow automation | Proposed, accepted, rejected, applied, and snoozed states | Prevents repeat review and preserves decisions; snooze durations are available in the issue UI |
| Personal standup assistant | Generative AI | Converts answers about yesterday/today/blockers into structured fields | Reduces writing overhead; draft is editable and is never auto-submitted |
| Team standup summary | Generative AI + fallback | Progress, achievements, blockers, dependencies, assignment gaps, actions, and open questions | Produces fast rollups with source evidence, version history, and raw-entry review |
| Standup action generation | Delivery intelligence | Structured unblock, help, follow-up, assignment, and dependency actions | Turns passive notes into owned work; actions can be done, snoozed, or dismissed |
| Clarification workflow | Delivery intelligence | Generates/tracks open questions and their assignment/resolution state | Closes ambiguity without another status meeting |
| Stakeholder digests | Automation | Detailed or stakeholder-friendly copyable output, optionally with references | Makes status sharing a copy action rather than manual rewriting |
| Standup quality | Delivery intelligence | Daily quality/data signals | Highlights missing or weak updates before they undermine decisions |
| Sprint health score | Delivery intelligence | Current/smoothed score, status, confidence, success/spillover probability, and trends | Consolidates multiple delivery signals into a daily decision view |
| Velocity projection | Delivery intelligence | Completion rate, projected completion, remaining linked work, capacity signals, and confidence | Exposes schedule/capacity risk before sprint end |
| Proactive guidance | Delivery intelligence | Reallocation, scope, meeting, top-risk, and top-action recommendations | Offers interventions with lifecycle controls; low confidence suppresses unsafe advice |
| Coordination engine | Delivery intelligence | Events, triggers, escalation, nudges, preferences, and notifications | Automates persistent-blocker follow-up without removing human ownership |
| AI audit trail | Governance | AI actor/run records, input/output/error metadata, setting changes, and suggestion actions | Supports troubleshooting and accountable adoption |

### AI availability and boundaries

- Backlog generation uses `AI_API_KEY`, optional `AI_BASE_URL`, and `AI_MODEL_DEFAULT`.
- Standup drafting/summarization uses `OPENAI_API_KEY`.
- Backlog AI is disabled by default per project and must be enabled by Admin/PO.
- Generated JSON is parsed and schema validated; backlog requests have prompt/response bounds and a timeout.
- Team summaries can fall back to a last-good or non-LLM representation.
- The microphone button and persistent suggestion-scope backend are not implemented; the interface identifies these limitations.

## Planning and backlog

- Create and maintain stories, tasks, bugs, and issue metadata.
- Stable human-readable project issue keys.
- Prioritized backlog with drag-and-drop ranking.
- Inline editing and detailed issue editing.
- Filtered backlog views and an AI-only focus mode.
- Primary and secondary assignees.
- Epic creation and issue grouping.
- Sprint assignment and active-sprint awareness.
- Comments, attachments, Markdown content, and issue activity/audit history.
- Bulk issue operations with preview/confirmation.
- Jira CSV issue import with row-level validation.
- Research backlog with ranking, list/board presentation, observations, evidence-oriented types, and issue links.

**Efficiency outcome:** planning, discovery, and refinement stay connected; bulk actions and AI flags reduce repetitive ticket maintenance.

## Sprint and execution management

- Create, start, increment, and complete sprints.
- Manage sprint scope and linked issues.
- Capacity and velocity context.
- Drag-and-drop Kanban board.
- Fast status/priority/ownership visibility.
- Sprint-linked build visibility.
- Burndown and sprint-specific reporting.

**Efficiency outcome:** teams move from ranked intent to daily execution without duplicating work across separate planning and tracking systems.

## Standups and coordination

- Date-based individual submissions.
- Today's plan, prior progress, blockers, dependencies, help-needed, and notes.
- Linked delivery issues and research items.
- Attendance tracking and teammate review.
- Configurable standup window and weekend behavior.
- Facilitator notes and a configurable standup sequence.
- Structured summaries with evidence traceability and versions.
- Action state and clarification state persistence.
- Stakeholder/detailed digest rendering and clipboard export.
- Summary emails to configured stakeholders.
- Per-project coordination notification preferences.

**Efficiency outcome:** asynchronous updates become a concise, actionable coordination layer instead of another collection of status messages.

## QA and release readiness

- Reusable project test cases.
- Test execution recording with pass/fail/blocked/not-run state.
- Test-to-story linking and defect visibility.
- Sprint-filtered executions and QA Sprint 360.
- Build records with unique per-project keys.
- Build environments, statuses, descriptions, and planned/deployed dates.
- Issue-to-build linking with same-project validation.
- Deployed-build deletion safeguards.
- Build content visible from both issue and sprint context.

**Efficiency outcome:** coverage, defects, release content, and delivery scope share traceable records, reducing manual release reconciliation.

## Reporting and decision support

### Project reports

- Sprint health and proactive guidance.
- Sprint burndown.
- Velocity trend.
- Cycle-time distribution with median, P75, and P90.
- Blocker themes.
- Standup participation and AI-summary insights.

### Workspace reports

- Delivery-health summary.
- Project-status overview with health classification.
- Aging issues.
- Orphaned work.
- Inactive projects.
- Blocker aggregation.
- Cross-project issue status.
- QA Sprint 360.
- Role distribution.
- User adoption metrics.

**Efficiency outcome:** leaders use exceptions, trends, and risk signals instead of assembling status spreadsheets.

## Collaboration and administration

- Registration, login/logout, signed-cookie authentication, and password updates.
- Workspace and project membership.
- Project roles: Admin, PO, DEV, QA, Viewer.
- Invitations, resend/revoke flows, and project team management.
- Profile and avatar management.
- In-app notification bell and execution-alert pages.
- Project/general/feature/team/AI/audit/danger/bulk settings areas.
- Project icons and fast project switching.
- User, system, and AI audit actors.
- SMTP/project email configuration, assignment notifications, invites, summaries, and contact mail.
- Light/dark themes, responsive views, and keyboard-conscious controls.
- Health endpoint and configurable local upload directory.

## Access summary

This is an orientation matrix, not a replacement for endpoint-specific checks.

| Area | Admin / PO | DEV / QA | Viewer |
| --- | --- | --- | --- |
| Read project work | Yes | Yes | Yes |
| Modify issues and contribute | Yes | Yes | No |
| Use enabled issue/backlog AI | Yes | Yes | Read/review access may be limited by action |
| Submit personal standup | Yes | Yes | Role/workflow dependent |
| Review leadership team summary | Yes | No | No |
| Manage project/team/AI settings | Yes | No | No |
| Manage builds | Yes | Read-focused | Read-focused |
| Execute QA workflow | Yes | QA/contributor access | Read-focused |
| Workspace leadership dashboard/reports | Leadership access | Generally no | No |

Global Admins bypass project role checks for administrative access.

## Data and governance characteristics

- PostgreSQL-backed relational model through Prisma.
- Project-scoped records and role checks on protected operations.
- AI input snapshots, raw outputs/errors, decisions, confidence, and versioned summaries where supported.
- Audit records for issue, project, settings, AI suggestion, and AI run activity.
- Explicit user action before generated backlog content changes issue fields.
- Fallback summary behavior to keep operational workflows available during provider failure.
- Configurable external-provider credentials through environment variables rather than the repository.

## Current limitations and roadmap-adjacent UI

- AI is optional; B-Board's core planning, execution, QA, release, and reporting features work without provider keys.
- Standup voice/microphone capture is marked **coming soon**.
- The AI suggestion-scope selector is session-only; persistent backend scope behavior is not implemented.
- The settings API/data model supports additional AI tuning/context values that the current settings UI does not fully expose.
- Local filesystem uploads require persistent storage in production.
- The bundled Render deploy helper uses schema push with `--accept-data-loss`; migration-based production releases are safer.
- Forecasts and guidance are decision support, not guarantees. Their usefulness depends on complete, timely project data.

For workflows, see [USER_GUIDE.md](USER_GUIDE.md). For development, configuration, deployment, and troubleshooting, see [README.md](README.md).
