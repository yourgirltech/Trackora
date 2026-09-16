import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { ArrowIcon } from "@/components/ui/arrow-icon";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/#track", label: "Track a shipment" },
      { href: "/#features", label: "Features" },
      { href: "/dashboard", label: "Ops dashboard" },
    ],
  },
  {
    heading: "Company",
    links: [{ href: "/#get-a-quote", label: "Request a quote" }],
  },
];

function FooterLinks() {
  return (
    <Reveal className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-cream/10 font-mono text-xs font-semibold text-mint">
              T
            </span>
            <span className="text-[15px] font-extrabold tracking-tightest">
              Trackora
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
            Real-time logistics tracking and operations for freight teams
            that move fast.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <div className="mono-label text-cream/45">{col.heading}</div>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline hover:text-mint">
                    {link.label}
                  </Link>
                </li>
              ))}
              {col.heading === "Company" && (
                <>
                  <li className="text-cream/40">About</li>
                  <li className="text-cream/40">Careers</li>
                </>
              )}
            </ul>
          </div>
        ))}

        <div>
          <div className="mono-label text-cream/45">Contact</div>
          <ul className="mt-4 space-y-2.5 font-mono text-sm text-cream/70">
            <li>
              <a href="mailto:hello@trackora.com" className="link-underline hover:text-mint">
                hello@trackora.com
              </a>
            </li>
            <li>+1 (555) 019-2044</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t border-cream/10 pt-6 font-mono text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Trackora. All rights reserved.</span>
        <span>Built for logistics teams that don&apos;t wait.</span>
      </div>
    </Reveal>
  );
}

/**
 * `showCta` renders the marketing pitch (photo background + Request a Quote)
 * above the link columns — only on the homepage. Internal/utility pages
 * (dashboard, quote) get a plain link-only footer instead.
 */
export function Footer({ showCta = true }: { showCta?: boolean }) {
  if (!showCta) {
    return (
      <footer className="border-t border-mint/20 bg-forest text-cream">
        <FooterLinks />
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden text-cream">
      <div className="absolute inset-0">
        <Image
          src="/images/night-highway.png"
          alt="Freight truck on a highway at night"
          fill
          className="object-cover"
        />
        {/* Light near the CTA headline, solid by the time it reaches the
            link columns so the fine print stays legible over the photo. */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/25 via-forest/55 to-forest/90" />
      </div>

      <div className="relative">
        <Reveal className="mx-auto flex max-w-6xl flex-col gap-8 border-b border-cream/10 px-6 py-14 sm:py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <p className="mono-label text-mint">Start Shipping</p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tightest text-cream sm:text-3xl">
              Ready to move freight with full visibility?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/65">
              Tell us what you&apos;re shipping and we&apos;ll get a quote
              back to you fast.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/#get-a-quote" className="btn btn-accent group">
              Request a Quote
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link href="#track" className="btn btn-outline-light">
              Track a Shipment
            </Link>
          </div>
        </Reveal>

        <FooterLinks />
      </div>
    </footer>
  );
}
