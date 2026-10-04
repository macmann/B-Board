import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPage, PageHero } from "@/components/marketing/MarketingShell";

export const metadata: Metadata = { title: "User Guide | B Board", description: "Learn the recommended B Board workflow from invitation through planning, execution, QA, and reporting." };

const steps = [
  ["01", "Join and choose a project", "Create an account from your invitation link, sign in, open My Projects, and choose the workspace where you want to work."],
  ["02", "Shape the backlog", "Capture research, epics, stories, tasks, and bugs. Rank work, fill delivery context, and use AI grooming to focus refinement where it is needed."],
  ["03", "Plan the sprint", "Create a sprint, add ranked issues, compare scope with capacity and velocity context, then start the sprint when ownership is clear."],
  ["04", "Execute together", "Move cards through the board, keep assignees and blockers current, and add comments, attachments, or history where the team needs context."],
  ["05", "Coordinate daily", "Submit yesterday, today, blockers, dependencies, and help needed. Review an AI draft before saving; leads can turn team input into actions and digests."],
  ["06", "Validate and release", "Link reusable test cases to stories, record sprint executions, inspect QA Sprint 360, and connect verified issues to environment-specific builds."],
  ["07", "Learn and intervene", "Review health, guidance, burndown, velocity, cycle time, and blockers. Resolve alerts and carry the evidence into the next planning cycle."],
];

const roles = [
  ["Admin", "Workspace-wide administration plus full project control."],
  ["Project manager / PO", "Plans and runs the project, manages AI and team settings, and reviews team intelligence."],
  ["Contributor", "Creates and updates delivery work, submits standups, and uses enabled drafting tools."],
  ["Viewer", "Reads permitted project views without changing delivery data."],
];

export default function UserGuidePage() {
  return <MarketingPage>
    <PageHero eyebrow="User guide" title="From invitation to insight, one practical workflow." description="Use this quick guide to understand B Board's recommended delivery loop. Each step keeps people in control while reducing repetitive coordination.">
      <a href="#workflow" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">Start the walkthrough ↓</a>
      <a href="https://github.com/macmann/b-board/blob/main/USER_GUIDE.md" target="_blank" rel="noreferrer" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800">Open detailed guide ↗</a>
    </PageHero>
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <section id="workflow" className="scroll-mt-24">
        <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.24em] text-blue-600">Recommended workflow</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">A connected delivery rhythm.</h2></div>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">{steps.map(([number,title,body]) => <li key={number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><span className="text-xs font-bold text-blue-600">{number}</span><h3 className="mt-4 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{body}</p></li>)}</ol>
      </section>
      <section className="mt-20 grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
        <div><p className="text-xs font-bold uppercase tracking-[.24em] text-blue-600">Access at a glance</p><h2 className="mt-4 text-3xl font-bold">The right controls for every role.</h2><p className="mt-4 leading-7 text-slate-600">Project membership determines day-to-day access. Global admins retain workspace-level visibility and administration.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">{roles.map(([title,body]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>)}</div>
      </section>
      <section className="mt-20 rounded-3xl bg-blue-600 p-8 text-white sm:p-12"><p className="text-xs font-bold uppercase tracking-[.24em] text-blue-100">Safe AI habits</p><h2 className="mt-4 text-3xl font-bold">Review before you apply.</h2><div className="mt-6 grid gap-4 text-sm leading-6 text-blue-50 md:grid-cols-3"><p>Check generated facts, scope, acceptance criteria, and owners against source context.</p><p>Do not put secrets, credentials, or unnecessary personal data in issues or standups.</p><p>Treat forecasts and suggestions as decision support, then record the team's actual decision.</p></div></section>
      <div className="mt-12 text-center"><Link href="/resources" className="font-bold text-blue-600 hover:text-blue-700">Browse setup, QA, and support resources →</Link></div>
    </div>
  </MarketingPage>;
}
