import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { InquiryCard } from "@/components/inquiry-card";

export function InquirySection() {
  return (
    <section id="get-a-quote" className="relative overflow-hidden bg-forest">
      <div className="absolute inset-0">
        <Image
          src="/images/warehouse.png"
          alt="Warehouse floor with freight ready for dispatch"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/85 via-forest/70 to-forest/90" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1fr_1fr] md:py-28">
        <Reveal>
          <p className="mono-label text-mint">Get a Quote</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tightest text-cream sm:text-4xl">
            Tell us what you&apos;re shipping.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/65">
            Share your cargo details and we&apos;ll get you pricing and
            transit options — or, for anything more involved, connect you
            straight with our team on a call.
          </p>
        </Reveal>

        <Reveal delay={120} className="md:justify-self-end">
          <InquiryCard />
        </Reveal>
      </div>
    </section>
  );
}
