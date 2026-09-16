import { ReactNode } from "react";

export function DashboardSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-forest/10 bg-cream">
      <div className="flex items-baseline justify-between gap-4 border-b border-forest/10 px-5 py-4 sm:px-6">
        <h2 className="text-base font-bold text-forest">{title}</h2>
        <p className="mono-label text-stone/60">{subtitle}</p>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}
