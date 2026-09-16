import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ShipmentsTable } from "@/components/dashboard/shipments-table";
import { TicketsTable } from "@/components/dashboard/tickets-table";
import { LeadsTable } from "@/components/dashboard/leads-table";

export const metadata: Metadata = {
  title: "Ops Dashboard — Trackora",
  description: "Internal view of shipments, tickets, and leads.",
};

export default function DashboardPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-8 border-b border-forest/10 pb-6">
            <p className="mono-label text-mint">Internal</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tightest text-forest">
              Ops Dashboard
            </h1>
            <p className="mt-1 text-stone">
              Live view of shipments, tickets, and leads.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <ShipmentsTable />
            <TicketsTable />
            <LeadsTable />
          </div>
        </div>
      </main>
      <Footer showCta={false} />
    </>
  );
}
