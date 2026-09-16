import { Reveal } from "@/components/ui/reveal";

const FEATURES = [
  {
    index: "01",
    title: "Live tracking",
    description:
      "Every scan and status change streams straight from the yard to your customer's screen — no manual updates.",
  },
  {
    index: "02",
    title: "Ops dashboard",
    description:
      "See every shipment, open ticket, and inbound lead in one place, sorted the way your team actually works.",
  },
  {
    index: "03",
    title: "Instant quoting",
    description:
      "Prospects submit cargo details in seconds and land straight in your pipeline as a qualified lead.",
  },
  {
    index: "04",
    title: "Exception handling",
    description:
      "Customs holds and failed attempts are flagged clearly, so nothing slips through without a follow-up.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="bg-cream-dim">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="flex flex-col gap-6 border-b border-forest/10 pb-10 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-3xl font-extrabold tracking-tightest text-forest sm:text-4xl">
            Everything ops needs, nothing they don&apos;t.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-stone">
            Trackora is built around the four things that actually move
            freight: visibility, ops tooling, fast quoting, and clean
            exception handling.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <Reveal
              key={feature.title}
              delay={i * 90}
              className="border-b border-forest/10 py-8 pr-6 transition-colors sm:odd:border-r sm:odd:pr-10 sm:even:pl-10"
            >
              <span className="font-mono text-xs font-medium text-mint">
                {feature.index}
              </span>
              <h3 className="mt-3 text-lg font-bold text-forest">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
