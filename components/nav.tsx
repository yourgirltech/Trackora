import Link from "next/link";
import { ArrowIcon } from "@/components/ui/arrow-icon";

const LINKS = [
  { href: "/#track", label: "Track" },
  { href: "/#features", label: "Platform" },
  { href: "/dashboard", label: "Ops Dashboard" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-[3px] bg-forest font-mono text-[13px] font-semibold text-mint transition-colors group-hover:bg-forest-2">
            T
          </span>
          <span className="text-[15px] font-extrabold tracking-tightest text-forest">
            Trackora
          </span>
        </Link>

        <nav className="hidden items-center gap-10 font-mono text-[13px] uppercase tracking-[0.06em] text-forest/55 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/#get-a-quote" className="btn btn-accent group !py-2.5 text-forest">
          Get a Quote
          <ArrowIcon className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  );
}
