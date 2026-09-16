import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScheduleCallForm } from "@/components/schedule-call-form";

export const metadata: Metadata = {
  title: "Schedule a Call — Trackora",
  description: "Book time with our team to talk through your shipping needs.",
};

export default function ScheduleCallPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-cream">
        <div className="mx-auto max-w-lg px-6 py-16 sm:py-24">
          <ScheduleCallForm variant="standalone" />
        </div>
      </main>
      <Footer showCta={false} />
    </>
  );
}
