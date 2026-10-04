const features = [
  {
    icon: "▤",
    title: "Backlog & epics",
    description: "Capture, rank, filter, and refine stories, tasks, bugs, and epics in one product backlog.",
    tags: ["Drag to rank", "AI grooming", "Jira import"],
  },
  {
    icon: "↗",
    title: "Sprint planning",
    description: "Plan scope, track capacity, and carry work from a prioritized backlog into focused sprints.",
    tags: ["Capacity", "Scope", "Velocity"],
  },
  {
    icon: "◫",
    title: "Kanban execution",
    description: "Move work through a fast, card-first board with clear ownership, priority, and status.",
    tags: ["Drag & drop", "Quick edit", "Filters"],
  },
  {
    icon: "✦",
    title: "AI standups",
    description: "Draft daily updates, connect issues, detect blockers, and turn team input into a concise digest.",
    tags: ["AI drafts", "Summaries", "Blockers"],
  },
  {
    icon: "◎",
    title: "Sprint health",
    description: "See delivery risk, capacity pressure, and proactive guidance before the sprint slips.",
    tags: ["Health score", "Forecasting", "Guidance"],
  },
  {
    icon: "⌁",
    title: "Delivery reports",
    description: "Explore burndown, velocity, cycle time, blockers, aging work, adoption, and cross-project status.",
    tags: ["Trends", "Portfolio", "Exports"],
  },
  {
    icon: "✓",
    title: "QA Sprint 360",
    description: "Keep test cases, executions, defects, and sprint quality signals connected to delivery work.",
    tags: ["Test cases", "Coverage", "Defects"],
  },
  {
    icon: "⬡",
    title: "Release builds",
    description: "Track builds by environment and status, link shipped issues, and preserve a release audit trail.",
    tags: ["Environments", "Issue links", "Readiness"],
  },
  {
    icon: "◇",
    title: "Research backlog",
    description: "Organize discovery work and decisions alongside the product delivery workflow.",
    tags: ["Discovery", "Evidence", "Decisions"],
  },
  {
    icon: "⚡",
    title: "Execution alerts",
    description: "Surface risks, blockers, and coordination nudges so the right person can act at the right time.",
    tags: ["Nudges", "Alerts", "Owners"],
  },
  {
    icon: "♙",
    title: "Teams & permissions",
    description: "Invite teammates and give admins, project managers, contributors, and viewers the right access.",
    tags: ["Roles", "Invites", "Audit log"],
  },
  {
    icon: "◐",
    title: "A workspace that fits",
    description: "Switch projects quickly, work in light or dark mode, and use keyboard-friendly controls.",
    tags: ["Themes", "Responsive", "Fast"],
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">Everything in one place</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          From the first idea to the release.
        </h2>
        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
          B Board connects product planning, engineering execution, QA, releases, and reporting—without stitching
          together another stack of tools.
        </p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,.04)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-xl font-semibold text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              {feature.icon}
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-950">{feature.title}</h3>
            <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600">{feature.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {feature.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
