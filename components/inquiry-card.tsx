"use client";

import { FormEvent, useState } from "react";
import { ScheduleCallForm } from "@/components/schedule-call-form";

type ChatMessage = { role: "user" | "assistant"; content: string };

type Contact = { name: string; email: string };

type Phase = "form" | "loading" | "error" | "thread" | "needs_call";

function summarizeHistory(history: ChatMessage[]) {
  return history
    .map((m) => `${m.role === "user" ? "Customer" : "Trackora"}: ${m.content}`)
    .join("\n\n");
}

export function InquiryCard() {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);
  const [phase, setPhase] = useState<Phase>("form");

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [draft, setDraft] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const messageText = draft.trim();
    if (!messageText) return;

    const activeContact: Contact = contact ?? {
      name: nameInput.trim(),
      email: emailInput.trim(),
    };
    if (!activeContact.name || !activeContact.email) return;

    setPhase("loading");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: activeContact.name,
          email: activeContact.email,
          message: messageText,
          history,
        }),
      });

      if (!res.ok) {
        setErrorMessage(
          "Something went wrong sending your message. Please try again."
        );
        setPhase("error");
        return;
      }

      const data = await res.json();
      const replyText: string =
        data.message ||
        (data.status === "needs_call"
          ? "This looks like something we should talk through directly."
          : "Thanks for reaching out — we'll follow up shortly.");

      const updatedHistory: ChatMessage[] = [
        ...history,
        { role: "user", content: messageText },
        { role: "assistant", content: replyText },
      ];

      setHistory(updatedHistory);
      setContact(activeContact);
      setDraft("");
      setPhase(data.status === "needs_call" ? "needs_call" : "thread");
    } catch {
      setErrorMessage(
        "Something went wrong sending your message. Please try again."
      );
      setPhase("error");
    }
  }

  function openComposer() {
    setErrorMessage("");
    setPhase("form");
  }

  const showForm = phase === "form" || phase === "loading" || phase === "error";

  return (
    <div className="w-full max-w-md border-t-[3px] border-t-mint bg-cream shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-forest/10 px-5 py-3">
        <span className="mono-label text-mint">Get a Quote</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-mint">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
          Live
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {history.length > 0 && (
          <div className="mb-4 max-h-64 space-y-3 overflow-y-auto border-b border-forest/10 pb-4">
            {history.map((entry, i) => (
              <div key={i}>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-stone/60">
                  {entry.role === "user" ? "You" : "Trackora"}
                </p>
                <p
                  className={`mt-0.5 text-sm leading-relaxed ${
                    entry.role === "user" ? "font-medium text-forest" : "text-stone"
                  }`}
                >
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            {!contact && (
              <>
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
                    Your name
                  </label>
                  <input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    required
                    suppressHydrationWarning
                    className="w-full border border-forest/15 bg-white px-4 py-2.5 text-sm text-forest placeholder:text-stone/60 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
                    Email
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="you@company.com"
                    required
                    suppressHydrationWarning
                    className="w-full border border-forest/15 bg-white px-4 py-2.5 text-sm text-forest placeholder:text-stone/60 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint"
                  />
                </div>
              </>
            )}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
                {contact ? "Your message" : "Tell us what you're shipping"}
              </label>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={
                  contact
                    ? "Type your next message..."
                    : "Weight, dimensions, origin/destination, timeline — or any question you have..."
                }
                required
                rows={4}
                suppressHydrationWarning
                className="w-full border border-forest/15 bg-white px-4 py-2.5 text-sm text-forest placeholder:text-stone/60 focus:border-mint focus:outline-none focus:ring-1 focus:ring-mint"
              />
            </div>

            {phase === "error" && (
              <div className="sm:col-span-2">
                <p className="border border-amber/30 px-4 py-3 text-sm text-amber">
                  {errorMessage}
                </p>
              </div>
            )}

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={phase === "loading"}
                suppressHydrationWarning
                className="btn btn-accent w-full !py-2.5 disabled:opacity-60"
              >
                {phase === "loading"
                  ? "Sending…"
                  : contact
                    ? "Send"
                    : "Get a Quote"}
              </button>
            </div>
          </form>
        )}

        {phase === "thread" && (
          <button
            onClick={openComposer}
            className="btn btn-outline-dark !px-4 !py-2 text-[11px]"
          >
            Ask another question
          </button>
        )}

        {phase === "needs_call" && (
          <div className="animate-fade-up border-t border-forest/10 pt-5">
            <p className="mono-label text-mint">Schedule a Call</p>
            <div className="mt-4">
              <ScheduleCallForm
                variant="inline"
                initial={{
                  contact_name: contact?.name ?? "",
                  email: contact?.email ?? "",
                  inquiry_details: summarizeHistory(history),
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
