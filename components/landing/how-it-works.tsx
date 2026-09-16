import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    index: "01",
    title: "Request a quote",
    description:
      "Tell us what you're shipping — weight, dimensions, origin, destination, and timeline.",
  },
  {
    index: "02",
    title: "We book the move",
    description:
      "Our team prices the route, confirms carrier availability, and issues a waybill ID for the shipment.",
  },
  {
    index: "03",
    title: "Track to delivery",
    description:
      "Every scan updates in real time. You and your customer watch the same live status, end to end.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-cream-dim">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="mono-label text-mint">Process</p>
          <h2 className="mt-4 max-w-xl text-3xl font-extrabold tracking-tightest text-forest sm:text-4xl">
            From quote to delivered, in three steps.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-10 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative pt-6">
              <Reveal delay={i * 110}>
                <div className="absolute left-0 top-0 h-px w-full bg-forest/15" />
                <div className="absolute left-0 top-0 h-px w-10 bg-mint" />
                <span className="font-mono text-xs text-stone/60">
                  {step.index}
                </span>
                <h3 className="mt-3 text-lg font-bold text-forest">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {step.description}
                </p>
                {i < STEPS.length - 1 && (
                  <span className="pointer-events-none absolute -right-5 top-6 hidden font-mono text-stone/25 sm:block">
                    →
                  </span>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
