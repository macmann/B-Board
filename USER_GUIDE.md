# B-Board User Guide

This guide explains how to use B-Board from initial setup through daily delivery. Interface labels are shown in **bold**. Access depends on both global and project roles; unavailable controls may be hidden or read-only.

## 1. Roles and access

| Role | Typical access |
| --- | --- |
| Global Admin | Full workspace access and an override for project administration. |
| Project Admin | Project configuration, team, AI settings, delivery workflows, and leadership views. |
| Product Owner (PO) | Project management, team delivery, AI settings, and leadership views. |
| Developer (DEV) | Contribute to issues, sprints, standups, and applicable project workflows. |
| QA | Contribute to issues and QA workflows and view project delivery information. |
| Viewer | Read-only project access. |

Admin/PO are the project-management roles; Admin/PO/DEV/QA are contributors. Exact enforcement is action-specific, so a visible page does not imply edit permission.

## 2. Get started

1. Register or accept an invitation, then sign in.
2. Open **My Projects** and select a project. Admins can create one here.
3. Use the left project navigation for **Backlog**, **Board**, **Builds**, **Sprints**, **Epics**, **Reports**, **QA**, **Standup**, **Execution Alerts**, and **Settings**.
4. Use the project switcher on workspace dashboards and reports.
5. Open the profile control to update your profile, avatar, or password. Use the theme control for light/dark mode.

## 3. Recommended efficient workflow

### Product Owner / project lead

1. Configure project features, team roles, AI, standup hours, and email in **Settings**.
2. Import or create work, then prioritize it in **Backlog**.
3. Run **AI Groom backlog**, review only flagged tickets, and apply useful improvements.
4. Plan and start the sprint; use **Board** for daily flow.
5. Review the **Team AI standup summary**, resolve generated actions/questions, and copy a stakeholder digest.
6. Check **Reports → Sprint health** for today's risks and interventions.
7. Track outstanding coordination in **Execution Alerts** and release content in **Builds**.

### Contributor

1. Filter the backlog/board to your work.
2. Keep issue status, ownership, estimate, and comments current.
3. Use **AI Stand-up** to draft an update, edit it, link relevant work, and save.
4. Respond to clarifications and notifications.
5. For QA work, record executions and connect defects to their stories.

## 4. Backlog and AI grooming

### Manage the backlog

- Use the **Product** segment for issues and the **Research** segment for discovery work.
- Create stories, tasks, bugs, and epics; rank work with drag and drop.
- Filter by the controls above the table and use inline edits for quick maintenance.
- Open an issue for the complete editor, comments, attachments, build links, activity, and AI suggestions.
- Admins can use bulk operations in project settings. Jira CSV import is available from the import/settings flow.

### Run an AI grooming scan

Prerequisites: `AI_API_KEY` is configured and **Settings → AI & Automation → Backlog Grooming AI** is enabled.

1. Open **Backlog**.
2. Select **AI Groom backlog**. A scan analyzes a bounded batch (currently up to 30 issues).
3. Review the **Grooming Inbox**. Suggestions are grouped by issue and show a type/code and confidence.
4. Enable **AI Only** to hide unflagged issues.
5. Select **Review** to open an issue rather than applying changes blindly.
6. Preview the rationale and proposed content, then **Accept**, **Reject**, or **Snooze** it for 7, 14, or 30 days.

### Generate and apply a user-story draft

1. Open an issue and generate its AI user-story draft.
2. Inspect the story, description, acceptance criteria, assumptions, open questions, out-of-scope items, and notes.
3. Choose only the fields you want to apply (title, description, and/or acceptance criteria).
4. Apply the selected edits and re-read the updated issue for correctness and product context.

**Efficiency tip:** put distinctive project context in ticket titles/descriptions and keep similar issues current. The drafting workflow uses project context, the current issue, and related examples. AI output remains a proposal until a contributor explicitly applies it.

## 5. Sprints and board execution

### Plan a sprint

1. Open **Sprints** and create a sprint with its dates and goal.
2. Add prioritized issues to scope and compare planned work with team capacity.
3. Start the sprint when scope and ownership are clear.
4. Use increment/complete actions as your process requires; review carry-over before closing.

### Execute on the board

- Drag cards between statuses and use filters to focus the view.
- Assign a primary and, where helpful, secondary owner.
- Update estimates, priority, comments, attachments, and issue relationships from the issue page.
- Keep statuses current: sprint-health, burndown, cycle-time, and coordination signals depend on this data.

## 6. Standups and AI summaries

### Submit a personal update

1. Open **Standup** and verify the selected date.
2. Enter today's plan, progress since yesterday, blockers, dependencies, help needed, and any relevant notes.
3. Link at least one issue or research item where the form requires linked work.
4. Save the entry. You can reopen it to make corrections.

### Use the AI Stand-up assistant

1. Select **AI Stand-up**.
2. Answer the short sequence for yesterday, today, and blockers.
3. Generate the draft. B-Board formats those answers into the form.
4. Review and edit every field, add links/dependencies, and save manually.

The assistant does not auto-submit. Microphone capture is displayed as coming soon and is not currently available.

### Review team intelligence (Admin/PO)

1. Choose a date in **Team AI standup summary**.
2. Review overall progress, achievements, blockers, dependencies, and assignment gaps.
3. Use evidence links to move from a summary item to its source submission.
4. Work through **Actions required**: mark done, snooze until today/tomorrow, or mark not relevant.
5. Answer, assign, or dismiss open clarification questions.
6. Review the data-quality score (Admin), then select a digest type and **Copy digest** for stakeholders.
7. Compare the generated summary with raw submissions before sharing externally.

Summaries are versioned. If the provider fails, the system can use the latest valid version or a structured fallback, so always check the displayed content and model/fallback context when precision matters.

## 7. Sprint health and proactive guidance

Open **Project → Reports → Sprint health**. The module shows:

- current and three-day-smoothed health scores,
- status and confidence,
- sprint-success and spillover probabilities,
- forecast confidence and a 14-day trend,
- today's focus, top risks, and top actions,
- reallocation, scope-adjustment, and meeting-optimization suggestions.

Guidance is derived from delivery data and rules rather than free-form generative AI. This improves explainability, but recommendations still depend on data quality.

For each suggestion:

- **Accept** records that the team intends to act.
- **Snooze 3d** temporarily removes it from immediate focus.
- **Dismiss 30d** suppresses an irrelevant recommendation.

**Efficiency tip:** update estimates, assignees, blockers, actions, and status before relying on forecasts. Low-confidence data intentionally suppresses some reallocation and scope recommendations.

## 8. Execution alerts and notifications

- Open **Execution Alerts** at workspace or project level to review coordination items.
- Configure project nudge preferences on the project alerts page.
- Use the notification bell for personal notifications; open or mark items as appropriate.
- Resolve the underlying blocker/coordination need instead of only dismissing the message.

Alerts are designed to replace repeated manual follow-ups by surfacing persistent blockers, owners, and escalation state.

## 9. QA Sprint 360

1. Open **QA** and create reusable test cases.
2. Link a test case to the relevant story when applicable.
3. Record executions with result/status and supporting details.
4. Review the sprint-oriented 360 view for coverage, executions, and defects.
5. Use workspace/project QA reports for broader visibility.

Keeping story links current gives delivery leaders a better release-readiness picture than isolated test results.

## 10. Release builds

1. Open **Builds** to create a project build with a unique key, environment, status, description, and dates.
2. Link the issues included in the release.
3. Open the build detail to update readiness and deployment information.
4. Use the sprint page's build section to see builds that touch sprint issues.

Only Admin/PO roles manage builds. Contributors/viewers have read-focused access. Deployed builds cannot be deleted, and issue links must belong to the same project.

## 11. Reports

### Project reports

- **Sprint health:** risk forecast, daily focus, and proactive suggestions.
- **Burndown:** remaining work over the sprint timeline.
- **Velocity:** delivery trend and capacity context.
- **Cycle time:** median, P75, and P90 completion time.
- **Blocker themes:** recurring impediment categories.
- **Standup insights:** participation and AI summary history.

### Workspace/portfolio reports

Leadership users can access delivery health, project status, aging issues, orphaned work, inactive projects, blocker aggregation, cross-project issue status, role distribution, adoption, and QA Sprint 360.

Use filters/project switchers before interpreting a chart. Empty reports generally mean no matching data, insufficient history, or restricted access—not necessarily an application error.

## 12. Research, epics, and discovery

- Use **Epics** to group related delivery work.
- Switch the backlog to **Research** to maintain discovery items, observations, evidence, and decisions.
- Link research to standup entries and delivery issues to preserve the path from evidence to execution.
- Use list/board views and ranking to keep discovery priorities visible.

## 13. Project administration

Open **Settings** to manage:

- **General:** project identity and core details.
- **Features:** project feature toggles.
- **Team & Permissions:** members, invitations, and roles.
- **AI & Automation:** backlog AI availability. Only Admin/PO can persist AI settings.
- **Audit & Security:** inspect user, system, and AI activity.
- **Bulk Operations:** administrative changes across many issues.
- **Danger Zone:** destructive project actions.

Related settings also cover standup windows/weekends, email providers, assignment emails, project icons, and coordination preferences. Confirm recipient lists and role changes before saving.

### AI configuration note

The visible backlog toggle is persistent. The **Suggestion scope** selector currently stores a session preference only; backend scoping is planned. Model, temperature, project brief, and proactive-guidance fields exist in the API/data model but are not all exposed by the current settings tab, so operators should not promise end users those controls in the UI.

## 14. Safe and effective AI use

1. **Review before applying.** Generated text can be incomplete or confidently wrong.
2. **Use minimum necessary data.** Do not enter secrets or regulated personal data unless your provider agreement allows it.
3. **Prefer specific context.** Clear goals, descriptions, estimates, owners, and acceptance criteria improve results.
4. **Keep an evidence trail.** Use issue history and audit logs to understand what the AI proposed and what a person approved.
5. **Escalate decisions to people.** AI should accelerate synthesis; product priority, commitments, personnel decisions, and release approval remain human responsibilities.

## 15. Common problems

| Problem | Resolution |
| --- | --- |
| AI grooming controls are absent | Ask an Admin/PO to enable Backlog Grooming AI and an operator to configure `AI_API_KEY`. |
| A suggestion disappeared | It may have been applied, rejected, or snoozed. The default request excludes snoozed suggestions. |
| Standup draft fails | Ask an operator to verify `OPENAI_API_KEY` and provider availability; enter the update manually meanwhile. |
| Summary does not reflect a change | Save the revised standup and reload/regenerate the selected date; verify the source entry in raw submissions. |
| Sprint forecast looks wrong | Correct stale statuses, estimates, assignments, blockers, and action states; then re-check confidence. |
| Cannot edit a project area | Confirm project membership and role with an Admin/PO. |
| Invite/email is missing | Check spam, recipient address, project email configuration, and SMTP delivery logs. |
| Upload is unavailable after deployment | Ask the operator to verify persistent `UPLOADS_DIR` storage. |

For installation and operations, return to [README.md](README.md). For the capability matrix, see [FEATURES.md](FEATURES.md).
