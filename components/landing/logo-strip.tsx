import { Reveal } from "@/components/ui/reveal";

const PARTNERS = [
  "Meridian Freight",
  "Northbound Retail",
  "Orbit Manufacturing",
  "Palmetto Foods",
  "Ironclad Supply",
  "Westline Goods",
];

export function LogoStrip() {
  return (
    <section className="border-b border-forest/10 bg-cream">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:gap-10">
        <p className="mono-label shrink-0 text-stone/70">Trusted By</p>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-0 gap-y-3 sm:justify-start sm:divide-x sm:divide-forest/10">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="px-5 text-sm font-semibold tracking-tight text-stone/60 transition-colors first:pl-0 hover:text-forest"
            >
              {name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
