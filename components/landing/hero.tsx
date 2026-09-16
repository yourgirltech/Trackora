import Image from "next/image";
import Link from "next/link";
import { LiveShipmentCard } from "@/components/live-shipment-card";
import { ArrowIcon } from "@/components/ui/arrow-icon";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest">
      <div className="absolute inset-0">
        <Image
          src="/images/warehouse.png"
          alt="Warehouse floor with freight ready for dispatch"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/45 to-forest/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/45 via-forest/8 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-6xl items-center justify-between border-b border-cream/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50">
        <span>Manifest / Logistics Platform</span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
          Status — Operational
        </span>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-20 pt-14 sm:pt-20 md:grid-cols-[1.1fr_0.9fr] md:items-start md:pb-28 md:pt-24">
        <div className="max-w-xl">
          <p className="animate-fade-up mono-label text-amber">
            001 — Real-Time Freight Visibility
          </p>
          <h1 className="animate-fade-up mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tightest text-cream [animation-delay:80ms] sm:text-5xl md:text-[3.4rem]">
            Freight that moves fast,
            <br />
            tracked in real time.
          </h1>
          <p className="animate-fade-up mt-6 max-w-md text-[15px] leading-relaxed text-cream/65 [animation-delay:160ms]">
            Trackora connects your customers, ops team, and every shipment
            event into one live view — from booking to delivered.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap gap-3 [animation-delay:240ms]">
            <Link
              href="#get-a-quote"
              className="btn btn-accent group shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5),0_0_28px_4px_rgba(46,158,107,0.75)]"
            >
              Request a Quote
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link href="#track" className="btn btn-outline-light">
              Track a Shipment
            </Link>
          </div>

          <dl className="animate-fade-up mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-cream/10 pt-6 [animation-delay:320ms]">
            <div>
              <dt className="mono-label text-cream/40">Waybills / Mo</dt>
              <dd className="mt-1 text-xl font-bold text-cream">12,400+</dd>
            </div>
            <div>
              <dt className="mono-label text-cream/40">On-Time Rate</dt>
              <dd className="mt-1 text-xl font-bold text-cream">98.2%</dd>
            </div>
            <div>
              <dt className="mono-label text-cream/40">Avg. Response</dt>
              <dd className="mt-1 text-xl font-bold text-cream">4 min</dd>
            </div>
          </dl>
        </div>

        <div className="animate-fade-up md:pt-1 [animation-delay:200ms]">
          <LiveShipmentCard />
        </div>
      </div>
    </section>
  );
}
