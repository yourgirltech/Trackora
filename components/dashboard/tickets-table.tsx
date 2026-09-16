"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Ticket } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { DashboardSection } from "./dashboard-section";
import { LoadingState, ErrorState, EmptyState } from "./table-states";

type TicketWithWaybill = Ticket & { waybill_id: string };

export function TicketsTable() {
  const [tickets, setTickets] = useState<TicketWithWaybill[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      const [ticketsRes, shipmentsRes] = await Promise.all([
        supabase.from("tickets").select("*").order("created_at", { ascending: false }),
        supabase.from("shipments").select("id, waybill_id"),
      ]);

      if (!active) return;

      if (ticketsRes.error || shipmentsRes.error) {
        setError("Couldn't load tickets.");
        return;
      }

      const waybillById = new Map(
        (shipmentsRes.data ?? []).map((s) => [s.id, s.waybill_id as string])
      );

      const withWaybill = (ticketsRes.data ?? []).map((ticket) => ({
        ...ticket,
        waybill_id: waybillById.get(ticket.shipment_id) ?? "—",
      }));

      setTickets(withWaybill);
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const openCount = tickets?.filter((t) => t.status?.toLowerCase() === "open").length ?? 0;

  return (
    <DashboardSection title="Tickets" subtitle={tickets ? `${openCount} Open` : "—"}>
      {error && <ErrorState message={error} />}
      {!error && tickets === null && <LoadingState label="Loading tickets…" />}
      {!error && tickets?.length === 0 && <EmptyState label="No tickets yet." />}
      {!error && tickets && tickets.length > 0 && (
        <table className="animate-fade-up w-full text-left text-sm">
          <thead>
            <tr className="border-b border-forest/10">
              <th className="px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone sm:px-6">
                Shipment
              </th>
              <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
                Issue Type
              </th>
              <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
                Severity
              </th>
              <th className="px-4 py-3 pr-5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone sm:pr-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const open = ticket.status?.toLowerCase() === "open";
              return (
                <tr
                  key={ticket.id}
                  className={`border-b border-forest/10 last:border-0 hover:bg-forest/[0.02] ${
                    open ? "bg-amber/[0.05]" : ""
                  }`}
                >
                  <td className="px-5 py-3 font-mono text-xs font-medium text-forest sm:px-6">
                    {ticket.waybill_id}
                  </td>
                  <td className="px-4 py-3 text-stone">{ticket.issue_type}</td>
                  <td className="px-4 py-3 text-stone">{ticket.severity}</td>
                  <td className="px-4 py-3 pr-5 sm:pr-6">
                    <StatusBadge
                      label={ticket.status}
                      tone={open ? "warning" : "neutral"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </DashboardSection>
  );
}
