import Image from "next/image";

const screens = [
  {
    src: "/screenshots/board.svg",
    title: "Keep every sprint moving",
    eyebrow: "Board",
    description: "See ownership, priority, and progress at a glance. Move work forward without losing context.",
  },
  {
    src: "/screenshots/sprint-health.svg",
    title: "Spot delivery risk early",
    eyebrow: "Sprint health",
    description: "Combine health scoring, forecasts, workload signals, and concrete recommendations in one view.",
  },
  {
    src: "/screenshots/standup.svg",
    title: "Turn updates into action",
    eyebrow: "AI standups",
    description: "Capture structured updates and give the whole team an instant summary of progress and blockers.",
  },
];

export function ProductShowcaseSection() {
  return (
    <section id="screenshots" className="scroll-mt-24 py-24">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">See B Board in action</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Clarity in every view.</h2>
        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
          A shared workspace that helps every role answer the same question: what needs attention next?
        </p>
      </div>

      <div className="mt-14 space-y-20">
        {screens.map((screen, index) => (
          <article key={screen.title} className="grid items-center gap-9 lg:grid-cols-[1.65fr_0.75fr] lg:gap-14">
            <div className={index % 2 ? "lg:order-2" : ""}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-2 shadow-2xl shadow-slate-950/15">
                <Image
                  src={screen.src}
                  alt={`${screen.eyebrow} product screenshot`}
                  width={1440}
                  height={900}
                  loading="eager"
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </div>
            <div className={index % 2 ? "lg:order-1" : ""}>
              <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                {screen.eyebrow}
              </span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{screen.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{screen.description}</p>
              <a href="/login" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
                Explore the workspace <span aria-hidden>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
