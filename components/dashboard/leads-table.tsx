"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Lead } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { DashboardSection } from "./dashboard-section";
import { LoadingState, ErrorState, EmptyState } from "./table-states";

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;
      if (error) {
        setError("Couldn't load leads.");
        return;
      }
      setLeads(data ?? []);
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardSection title="Leads" subtitle={`${leads?.length ?? "—"} Total`}>
      {error && <ErrorState message={error} />}
      {!error && leads === null && <LoadingState label="Loading leads…" />}
      {!error && leads?.length === 0 && <EmptyState label="No leads yet." />}
      {!error && leads && leads.length > 0 && (
        <table className="animate-fade-up w-full text-left text-sm">
          <thead>
            <tr className="border-b border-forest/10">
              <th className="px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone sm:px-6">
                Company
              </th>
              <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
                Contact
              </th>
              <th className="px-4 py-3 pr-5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone sm:pr-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-forest/10 last:border-0 hover:bg-forest/[0.02]"
              >
                <td className="px-5 py-3 font-medium text-forest sm:px-6">
                  {lead.company_name}
                </td>
                <td className="px-4 py-3 text-stone">{lead.contact_name}</td>
                <td className="px-4 py-3 pr-5 sm:pr-6">
                  <StatusBadge
                    label={lead.status}
                    tone={lead.status?.toLowerCase() === "new" ? "positive" : "neutral"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardSection>
  );
}
