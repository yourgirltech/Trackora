"use client";

import { FormEvent, useState } from "react";

export type ScheduleFormState = {
  contact_name: string;
  email: string;
  phone: string;
  inquiry_details: string;
  preferred_date: string;
  preferred_time: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: ScheduleFormState = {
  contact_name: "",
  email: "",
  phone: "",
  inquiry_details: "",
  preferred_date: "",
  preferred_time: "",
};

export function ScheduleCallForm({
  initial,
  variant = "standalone",
}: {
  initial?: Partial<ScheduleFormState>;
  variant?: "standalone" | "inline";
}) {
  const [form, setForm] = useState<ScheduleFormState>({
    ...EMPTY_FORM,
    ...initial,
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof ScheduleFormState>(
    key: K,
    value: ScheduleFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitState("submitting");

    try {
      const res = await fetch("/api/schedule-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setMessage("Something went wrong scheduling your call. Please try again.");
        setSubmitState("error");
        return;
      }

      const data = await res.json();

      if (data.status !== "scheduled") {
        setMessage(
          data.message ||
            "Something went wrong scheduling your call. Please try again."
        );
        setSubmitState("error");
        return;
      }

      setMessage(data.message || "Your call is scheduled.");
      setSubmitState("success");
    } catch {
      setMessage("Something went wrong scheduling your call. Please try again.");
      setSubmitState("error");
    }
  }

  const inline = variant === "inline";

  const labelClass =
    "mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone";

  const inputClass =
    "w-full border border-forest/15 bg-white px-4 py-2.5 text-sm text-forest placeholder:text-stone/60 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint";

  if (submitState === "success") {
    return (
      <div className={inline ? "text-left" : "text-center"}>
        <div
          className={`flex h-11 w-11 items-center justify-center border border-mint/30 text-mint ${
            inline ? "" : "mx-auto"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-extrabold tracking-tightest text-forest">
          Call scheduled
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-stone">
          {message} A calendar invite with reminders is on its way to your
          email.
        </p>
      </div>
    );
  }

  const form_ = (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-4 ${inline ? "" : "sm:grid-cols-2"}`}
    >
      <div>
        <label className={labelClass}>Contact name</label>
        <input
          value={form.contact_name}
          onChange={(e) => update("contact_name", e.target.value)}
          required
          suppressHydrationWarning
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
          suppressHydrationWarning
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Phone</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          required
          suppressHydrationWarning
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Preferred date</label>
        <input
          type="date"
          value={form.preferred_date}
          onChange={(e) => update("preferred_date", e.target.value)}
          required
          suppressHydrationWarning
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Preferred time</label>
        <input
          type="time"
          value={form.preferred_time}
          onChange={(e) => update("preferred_time", e.target.value)}
          required
          suppressHydrationWarning
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Inquiry details</label>
        <textarea
          value={form.inquiry_details}
          onChange={(e) => update("inquiry_details", e.target.value)}
          required
          rows={4}
          suppressHydrationWarning
          className={inputClass}
        />
      </div>

      {submitState === "error" && (
        <div className="sm:col-span-2">
          <p className="border border-amber/30 px-4 py-3 text-sm text-amber">
            {message}
          </p>
        </div>
      )}

      <div className={`sm:col-span-2 ${inline ? "" : "mt-2 flex justify-center"}`}>
        <button
          type="submit"
          disabled={submitState === "submitting"}
          suppressHydrationWarning
          className={`btn ${inline ? "btn-accent w-full" : "btn-primary"} disabled:opacity-60`}
        >
          {submitState === "submitting" ? "Scheduling…" : "Schedule Call"}
        </button>
      </div>
    </form>
  );

  if (!inline) {
    return (
      <div className="border border-forest/10 bg-cream p-8 sm:p-10">
        <div className="border-b border-forest/10 pb-6 text-center">
          <p className="mono-label text-mint">Schedule a Call</p>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tightest text-forest sm:text-3xl">
            Pick a time that works for you
          </h1>
          <p className="mt-2 text-sm text-stone">
            Share your details and we&apos;ll lock in a slot on our
            calendar, with reminders sent your way.
          </p>
        </div>
        <div className="mt-8">{form_}</div>
      </div>
    );
  }

  return form_;
}
