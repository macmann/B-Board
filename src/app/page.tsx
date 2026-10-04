import Logo from "@/components/branding/Logo";
import { ContactUsSection } from "@/components/marketing/ContactUsSection";
import { FAQSection } from "@/components/marketing/FAQSection";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { ProductShowcaseSection } from "@/components/marketing/ProductShowcaseSection";
import { homepageEnabled } from "@/config/appConfig";
import { redirect } from "next/navigation";
import Image from "next/image";

const workflow = [
  ["01", "Shape the work", "Capture research, turn ideas into epics and issues, then rank the backlog with your team."],
  ["02", "Plan with confidence", "Build a sprint around capacity and priorities, with the context everyone needs to commit."],
  ["03", "Execute together", "Move cards, share standups, connect QA, and surface blockers before they become surprises."],
  ["04", "Learn and ship", "Review health and delivery trends, link release builds, and carry insights into the next sprint."],
];

const outcomes = [
  ["One workspace", "Product, engineering, QA, and delivery leads work from the same source of truth."],
  ["Earlier signals", "Health scores, alerts, blockers, and forecasts make risk visible while there is time to act."],
  ["Less reporting", "Standup digests and delivery reports turn live work into stakeholder-ready context."],
];

export default function HomePage() {
  if (!homepageEnabled) redirect("/login");

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="#top" aria-label="B Board home">
            <Logo subtitle="Agile delivery, connected" />
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex" aria-label="Main navigation">
            <a className="transition hover:text-blue-600" href="#features">Features</a>
            <a className="transition hover:text-blue-600" href="#screenshots">Product</a>
            <a className="transition hover:text-blue-600" href="#workflow">How it works</a>
            <a className="transition hover:text-blue-600" href="#faq">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/login" className="hidden text-sm font-bold text-slate-700 transition hover:text-blue-600 sm:block">Sign in</a>
            <a href="/register" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Get started</a>
          </div>
        </div>
      </header>

      <section id="top" className="relative pt-36 sm:pt-44">
        <div className="absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(circle_at_78%_24%,rgba(37,99,235,.16),transparent_30%),radial-gradient(circle_at_18%_10%,rgba(99,102,241,.12),transparent_28%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              AI-powered agile delivery
            </div>
            <h1 className="mt-7 text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
              Plan less.<br />Ship with <span className="text-blue-600">clarity.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              B Board unifies backlog, sprints, standups, QA, releases, and delivery intelligence—so your team can
              spend less time coordinating and more time building.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/register" className="rounded-full bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">Start your workspace</a>
              <a href="#screenshots" className="rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:border-slate-400">See the product <span aria-hidden>↓</span></a>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500">Free and open source · Set up in minutes</p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-blue-200/50 via-indigo-100/40 to-transparent blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-2.5 shadow-2xl shadow-blue-950/20">
              <Image src="/screenshots/board.svg" alt="B Board sprint board showing work across To do, In progress, Review, and Done" width={1440} height={900} priority className="h-auto w-full rounded-2xl" />
            </div>
            <div className="absolute -bottom-8 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
              <p className="text-xs font-bold text-slate-500">SPRINT HEALTH</p>
              <div className="mt-2 flex items-center gap-3"><span className="text-3xl font-bold text-slate-950">86</span><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">On track</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <section className="mt-28 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-3">
          {outcomes.map(([title, body], index) => (
            <div key={title} className={`p-7 sm:p-8 ${index ? "border-t border-slate-200 md:border-l md:border-t-0" : ""}`}>
              <h2 className="font-bold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </section>

        <FeaturesSection />
        <ProductShowcaseSection />

        <section id="workflow" className="scroll-mt-24 py-24">
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-400">One connected loop</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Your delivery rhythm, without the busywork.</h2>
                <p className="mt-5 leading-7 text-slate-400">B Board keeps context moving with the work—from discovery through release and learning.</p>
                <a href="/register" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50">Build your first project</a>
              </div>
              <ol className="grid gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 sm:grid-cols-2">
                {workflow.map(([number, title, body]) => (
                  <li key={number} className="bg-slate-950 p-7">
                    <span className="text-xs font-bold text-blue-400">{number}</span>
                    <h3 className="mt-5 text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <FAQSection />

        <section className="my-24 overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-16 text-center text-white shadow-2xl shadow-blue-900/20 sm:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-100">Move work forward</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">Give your team one clear place to deliver.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100">Start with a project, invite your team, and turn your next sprint into a shared, measurable plan.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/register" className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50">Get started free</a>
            <a href="#contact" className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">Talk to us</a>
          </div>
        </section>

        <ContactUsSection />

        <footer className="mt-20 flex flex-col gap-5 border-t border-slate-200 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <Logo subtitle="Plan less. Ship with clarity." />
          <div className="flex flex-wrap gap-5"><a href="#features">Features</a><a href="#screenshots">Product</a><a href="https://github.com/macmann/b-board">GitHub</a><span>© {new Date().getFullYear()} B Board</span></div>
        </footer>
      </div>
    </main>
  );
}
