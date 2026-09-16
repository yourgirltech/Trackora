import { StatusTone } from "@/lib/status";

// border-current keys off the text color, so the badge reads correctly
// on both light (cream) and dark (forest) surfaces without a second variant.
const TONE_STYLES: Record<StatusTone, string> = {
  positive: "border-current/30 text-mint",
  warning: "border-current/40 text-amber",
  neutral: "border-current/25 text-stone",
};

const TONE_DOT: Record<StatusTone, string> = {
  positive: "bg-mint",
  warning: "bg-amber",
  neutral: "bg-stone",
};

export function StatusBadge({
  label,
  tone,
}: {
  label: string;
  tone: StatusTone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.06em] ${TONE_STYLES[tone]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[tone]}`} />
      {label}
    </span>
  );
}
