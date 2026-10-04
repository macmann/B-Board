import { Card } from "@/components/ui/Card";

const faqs = [
  {
    question: "Is it a Jira replacement?",
    answer: "B Board can run the connected delivery workflow itself, including Jira CSV import. It currently does not provide live Jira, GitHub, Linear, or Slack synchronization.",
  },
  {
    question: "Do you support Scrum/Kanban?",
    answer: "Yes. Plan sprints with guardrails and run card-first boards that support Scrum and Kanban rituals.",
  },
  {
    question: "How does standup work?",
    answer: "Contributors submit structured updates and link delivery work. Admins and POs can review attendance, evidence, blockers, actions, questions, and a copyable stakeholder digest.",
  },
  {
    question: "What happens if AI is unavailable?",
    answer: "Team standup summaries use the last good version or a non-LLM fallback. Sprint health and proactive guidance are deterministic and continue to work without an AI provider.",
  },
  {
    question: "Does AI change work automatically?",
    answer: "No. Personal drafts are editable, backlog fields are selectively applied, and suggestions can be accepted, rejected, snoozed, or dismissed. People remain in control.",
  },
  {
    question: "Where can I find documentation?",
    answer: "The public Resources page links to the setup README, full feature catalog, detailed user guide, release QA checklist, source code, and community channels.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="mt-16 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">FAQ</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-50">Questions teams ask.</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Quick answers about how B Board fits your process and keeps everyone in sync.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map((item) => (
          <Card
            key={item.question}
            className="h-full border border-slate-200/80 bg-white/80 p-5 text-left shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/80"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{item.question}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.answer}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
