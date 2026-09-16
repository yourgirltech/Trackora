import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const POINTS = [
  "Real-time shipment table with status, origin, and destination at a glance",
  "Ticket queue that highlights open issues before they become escalations",
  "Lead pipeline fed directly from every quote conversation on your site",
];

export function ProductSection() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <p className="mono-label text-mint">Ops Dashboard</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tightest text-forest sm:text-4xl">
            One screen for shipments, tickets, and leads.
          </h2>
          <p className="mt-4 text-stone">
            No more switching tabs between spreadsheets and inboxes.
            Trackora&apos;s dashboard pulls live from the same data your
            customers see.
          </p>
          <ul className="mt-7 space-y-4 border-t border-forest/10 pt-6">
            {POINTS.map((point, i) => (
              <li key={point} className="flex items-start gap-4 text-sm text-forest">
                <span className="mt-0.5 shrink-0 font-mono text-xs text-mint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <figure className="border border-forest/10 transition-shadow duration-300 hover:shadow-lg hover:shadow-forest/10">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/dashboard-laptop.png"
                alt="Trackora ops dashboard shown on a laptop"
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <figcaption className="flex items-center justify-between border-t border-forest/10 bg-cream-dim px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-stone">
              <span>Fig. 01 — Ops Dashboard</span>
              <span>/dashboard</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
