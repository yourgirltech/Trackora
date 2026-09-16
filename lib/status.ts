import { ShipmentStatus } from "./types";

export const ROUTE_STAGES: { key: ShipmentStatus; label: string }[] = [
  { key: "booked", label: "Booked" },
  { key: "picked_up", label: "Picked Up" },
  { key: "in_transit", label: "In Transit" },
  { key: "delivered", label: "Delivered" },
];

const ANOMALY_STATUSES: ShipmentStatus[] = ["customs_hold", "failed_attempt"];

export function isAnomalyStatus(status: string) {
  return ANOMALY_STATUSES.includes(status as ShipmentStatus);
}

export function statusLabel(status: string) {
  switch (status) {
    case "customs_hold":
      return "Customs Hold";
    case "failed_attempt":
      return "Failed Attempt";
    default: {
      const stage = ROUTE_STAGES.find((s) => s.key === status);
      return stage?.label ?? status;
    }
  }
}

/** Index of the current stage in ROUTE_STAGES, treating anomalies as stalled in transit. */
export function currentStageIndex(status: string) {
  if (isAnomalyStatus(status)) {
    return ROUTE_STAGES.findIndex((s) => s.key === "in_transit");
  }
  const index = ROUTE_STAGES.findIndex((s) => s.key === status);
  return index === -1 ? 0 : index;
}

export type StatusTone = "positive" | "warning" | "neutral";

export function statusTone(status: string): StatusTone {
  if (isAnomalyStatus(status)) return "warning";
  if (status === "delivered" || status === "new") return "positive";
  return "neutral";
}
