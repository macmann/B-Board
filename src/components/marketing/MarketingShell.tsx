import type { ReactNode } from "react";
import Link from "next/link";

import Logo from "@/components/branding/Logo";

const navigation = [
  { href: "/#product", label: "Product" },
  { href: "/features", label: "Features" },
  { href: "/user-guide", label: "User guide" },
  { href: "/resources", label: "Resources" },
];

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 sm:px-8">
        <Link href="/" aria-label="B Board home">
          <Logo subtitle="Agile delivery, connected" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 lg:flex" aria-label="Marketing navigation">
          {navigation.map((item) => (
            <Link key={item.href} className="transition hover:text-blue-600" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-bold text-slate-700 transition hover:text-blue-600">Sign in</Link>
          <Link href="/#contact" className="hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 sm:block">
            Talk to us
          </Link>
        </div>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="mx-auto mt-20 flex max-w-7xl flex-col gap-6 border-t border-slate-200 px-5 py-10 text-sm text-slate-500 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
      <Logo subtitle="Plan less. Ship with clarity." />
      <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Footer navigation">
        {navigation.slice(1).map((item) => <Link key={item.href} href={item.href} className="hover:text-blue-600">{item.label}</Link>)}
        <a href="https://github.com/macmann/b-board" target="_blank" rel="noreferrer" className="hover:text-blue-600">GitHub</a>
        <a href="https://www.linkedin.com/company/bboardx" target="_blank" rel="noreferrer" className="hover:text-blue-600">LinkedIn</a>
        <span>© {new Date().getFullYear()} B Board</span>
      </nav>
    </footer>
  );
}

export function MarketingPage({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950">
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </main>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="relative border-b border-slate-200 bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,.12),transparent_30%),radial-gradient(circle_at_15%_5%,rgba(99,102,241,.08),transparent_25%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
