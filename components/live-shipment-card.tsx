"use client";

import { FormEvent, useState } from "react";

type LookupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "found"; reply: string };

export function LiveShipmentCard() {
  const [waybillId, setWaybillId] = useState("");
  const [state, setState] = useState<LookupState>({ status: "idle" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = waybillId.trim();
    if (!trimmed) return;

    setState({ status: "loading" });

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ waybill_id: trimmed }),
      });

      if (!res.ok) {
        setState({
          status: "error",
          message:
            "Something went wrong while looking up that shipment. Please try again.",
        });
        return;
      }

      const data = await res.json();
      setState({
        status: "found",
        reply:
          data.reply ||
          `I couldn't find anything for waybill "${trimmed}" — double-check the ID and try again.`,
      });
    } catch {
      setState({
        status: "error",
        message:
          "Something went wrong while looking up that shipment. Please try again.",
      });
    }
  }

  return (
    <div id="track" className="w-full max-w-md border border-cream/15 bg-forest-2/60 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-cream/10 px-5 py-3">
        <span className="mono-label text-cream/50">Shipment Lookup</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-mint">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
          Live
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-0 border-b border-cream/10 p-5">
        <input
          value={waybillId}
          onChange={(e) => setWaybillId(e.target.value)}
          placeholder="TRK-10234"
          suppressHydrationWarning
          className="min-w-0 flex-1 border border-cream/15 bg-forest px-4 py-2.5 font-mono text-sm text-cream placeholder:text-cream/30 focus:border-mint focus:outline-none"
        />
        <button
          type="submit"
          disabled={state.status === "loading"}
          suppressHydrationWarning
          className="btn btn-accent ml-2 shrink-0 !px-5 !py-2.5"
        >
          {state.status === "loading" ? "Tracking…" : "Track"}
        </button>
      </form>

      <div className="p-5">
        {state.status === "idle" && (
          <p className="text-sm leading-relaxed text-cream/50">
            Enter a waybill ID above and we&apos;ll tell you exactly where
            your shipment stands.
          </p>
        )}

        {state.status === "loading" && (
          <p className="py-6 text-center text-sm text-cream/50">
            Looking up your shipment…
          </p>
        )}

        {state.status === "error" && (
          <p className="border border-amber/30 px-4 py-3 text-sm text-amber">
            {state.message}
          </p>
        )}

        {state.status === "found" && (
          <p className="text-sm leading-relaxed text-cream/90">
            {state.reply}
          </p>
        )}
      </div>
    </div>
  );
}
