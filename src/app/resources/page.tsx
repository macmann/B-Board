import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPage, PageHero } from "@/components/marketing/MarketingShell";

export const metadata: Metadata = { title: "Resources | B Board", description: "B Board product documentation, setup resources, QA guidance, source code, and community links." };

const resources = [
  { title: "Product overview & setup", label: "README", body: "Understand the product, architecture, configuration, local setup, deployment, troubleshooting, and responsible AI guidance.", href: "https://github.com/macmann/b-board/blob/main/README.md" },
  { title: "Complete feature catalog", label: "FEATURES", body: "Review capabilities, access boundaries, AI guardrails, efficiency outcomes, data characteristics, and current limitations.", href: "https://github.com/macmann/b-board/blob/main/FEATURES.md" },
  { title: "Detailed user guide", label: "USER GUIDE", body: "Follow task-by-task instructions for backlog, sprints, standups, QA, builds, reports, research, and administration.", href: "https://github.com/macmann/b-board/blob/main/USER_GUIDE.md" },
  { title: "Release QA checklist", label: "QA", body: "Run the regression scenarios for build management and validate release behavior before deployment.", href: "https://github.com/macmann/b-board/blob/main/QA_CHECKLIST.md" },
  { title: "Source code", label: "GITHUB", body: "Explore the Next.js application, Prisma data model, tests, deployment scripts, and open-source project history.", href: "https://github.com/macmann/b-board" },
  { title: "B Board on LinkedIn", label: "COMMUNITY", body: "Follow product updates and connect with the B Board team.", href: "https://www.linkedin.com/company/bboardx" },
];

export default function ResourcesPage() {
  return <MarketingPage>
    <PageHero eyebrow="Resources" title="Go deeper, from first login to production." description="Find the public product pages, detailed source documentation, operating guidance, and community links in one place.">
      <Link href="/features" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">Explore features</Link>
      <Link href="/user-guide" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800">Read user guide</Link>
    </PageHero>
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{resources.map((resource) => <a key={resource.title} href={resource.href} target="_blank" rel="noreferrer" className="group flex min-h-64 flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"><span className="text-xs font-bold tracking-[.2em] text-blue-600">{resource.label}</span><h2 className="mt-5 text-xl font-bold">{resource.title}</h2><p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{resource.body}</p><span className="mt-6 text-sm font-bold text-blue-600">Open resource <span className="inline-block transition group-hover:translate-x-1">↗</span></span></a>)}</div>
      <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center"><h2 className="text-2xl font-bold">Need help with your workflow?</h2><p className="mx-auto mt-3 max-w-2xl text-slate-600">Tell us how your team plans, coordinates, and reports. We can help map B Board to your delivery process.</p><Link href="/#contact" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white">Contact the team</Link></div>
    </section>
  </MarketingPage>;
}
