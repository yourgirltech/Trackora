"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shipment } from "@/lib/types";
import { statusLabel, statusTone } from "@/lib/status";
import { StatusBadge } from "@/components/ui/status-badge";
import { DashboardSection } from "./dashboard-section";
import { LoadingState, ErrorState, EmptyState } from "./table-states";

export function ShipmentsTable() {
  const [shipments, setShipments] = useState<Shipment[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .order("created_at", { ascending: false });

      if (!active) return;
      if (error) {
        setError("Couldn't load shipments.");
        return;
      }
      setShipments(data ?? []);
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardSection title="Shipments" subtitle={`${shipments?.length ?? "—"} Total`}>
      {error && <ErrorState message={error} />}
      {!error && shipments === null && <LoadingState label="Loading shipments…" />}
      {!error && shipments?.length === 0 && <EmptyState label="No shipments yet." />}
      {!error && shipments && shipments.length > 0 && (
        <table className="animate-fade-up w-full text-left text-sm">
          <thead>
            <tr className="border-b border-forest/10">
              <th className="px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone sm:px-6">
                Waybill
              </th>
              <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
                Origin
              </th>
              <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
                Destination
              </th>
              <th className="px-4 py-3 pr-5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone sm:pr-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr
                key={shipment.id}
                className="border-b border-forest/10 last:border-0 hover:bg-forest/[0.02]"
              >
                <td className="px-5 py-3 font-mono text-xs font-medium text-forest sm:px-6">
                  {shipment.waybill_id}
                </td>
                <td className="px-4 py-3 text-stone">{shipment.origin}</td>
                <td className="px-4 py-3 text-stone">{shipment.destination}</td>
                <td className="px-4 py-3 pr-5 sm:pr-6">
                  <StatusBadge
                    label={statusLabel(shipment.current_status)}
                    tone={statusTone(shipment.current_status)}
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
