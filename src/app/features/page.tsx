import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPage, PageHero } from "@/components/marketing/MarketingShell";

export const metadata: Metadata = { title: "Features | B Board", description: "Explore B Board's AI-assisted planning, execution, QA, release, and reporting capabilities." };

const groups = [
  { icon: "✦", title: "AI-assisted refinement", description: "Scan a bounded backlog for incomplete work, review confidence-scored suggestions, and generate structured user-story drafts without silently changing an issue.", items: ["Backlog completeness scan", "Selective story-field application", "Accept, reject, apply, or snooze", "Auditable AI runs and decisions"] },
  { icon: "▤", title: "Planning & discovery", description: "Keep product discovery, epics, and delivery-ready work in one prioritized flow.", items: ["Stories, tasks, bugs, and epics", "Research backlog and evidence", "Drag-to-rank and inline editing", "Bulk actions and Jira CSV import"] },
  { icon: "↗", title: "Sprint execution", description: "Move from ranked intent to daily delivery with clear scope, ownership, and status.", items: ["Sprint planning and capacity context", "Drag-and-drop Kanban board", "Primary and secondary assignees", "Comments, attachments, and history"] },
  { icon: "◫", title: "Standups & coordination", description: "Turn asynchronous team updates into concise, traceable actions—not another status meeting.", items: ["Editable personal AI drafts", "Team summaries with fallback", "Blockers, dependencies, and questions", "Stakeholder digests and alerts"] },
  { icon: "◎", title: "Delivery intelligence", description: "Use explainable, deterministic signals to focus on the intervention that matters today.", items: ["Sprint health and trends", "Velocity and spillover forecasts", "Capacity and assignment signals", "Accept, snooze, or dismiss guidance"] },
  { icon: "✓", title: "QA & releases", description: "Connect test evidence and release content directly to sprint and issue context.", items: ["Reusable test cases", "Sprint-filtered executions", "QA Sprint 360 and defects", "Environment-aware release builds"] },
  { icon: "⌁", title: "Reports", description: "Give project leads and portfolio viewers a shared, current view of delivery.", items: ["Burndown, velocity, and cycle time", "Blocker and standup insights", "Delivery health and project status", "Aging, adoption, roles, and orphaned work"] },
  { icon: "♙", title: "Administration & governance", description: "Control who can act, how teams are notified, and what changed.", items: ["Project roles and invitations", "Email and standup settings", "Notification preferences", "Audit history and AI controls"] },
];

export default function FeaturesPage() {
  return <MarketingPage>
    <PageHero eyebrow="Complete capability map" title="One connected system for the work around the work." description="B Board brings planning, execution, standups, quality, releases, and delivery reporting together. Generative features accelerate drafting; explainable delivery intelligence helps teams act earlier.">
      <Link href="/user-guide" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">See how it works</Link>
      <a href="https://github.com/macmann/b-board/blob/main/FEATURES.md" target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 hover:border-slate-400">Technical feature list ↗</a>
    </PageHero>
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="grid gap-5 md:grid-cols-2">
        {groups.map((group) => <article key={group.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">{group.icon}</div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight">{group.title}</h2>
          <p className="mt-3 leading-7 text-slate-600">{group.description}</p>
          <ul className="mt-6 grid gap-3 text-sm font-medium text-slate-700 sm:grid-cols-2">{group.items.map((item) => <li key={item} className="flex gap-2"><span className="text-emerald-600">✓</span>{item}</li>)}</ul>
        </article>)}
      </div>
      <section className="mt-16 rounded-3xl bg-slate-950 p-8 text-white sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[.24em] text-blue-400">Human control, by design</p>
        <h2 className="mt-4 text-3xl font-bold">AI proposes. Your team decides.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">Generated drafts remain editable and require explicit action. Backlog AI is disabled by default per project, output is validated, and team summaries retain evidence or fall back safely. Sprint health and proactive guidance use deterministic application data rather than free-form model output.</p>
      </section>
    </div>
  </MarketingPage>;
}
