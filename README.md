# Trackora

Trackora is the marketing site, customer-facing tools, and internal ops dashboard for a logistics/freight platform — live shipment tracking, an AI-driven quote and inquiry flow, call scheduling, and a dashboard for shipments, tickets, and leads.

> **In production for a client.** The live system runs on the client's own domain and isn't linked here. This repository is the build record: the full source, with client data, credentials and URLs removed.

This repository is the **frontend only**. It is one piece of a three-part system:

| Layer | Role |
|---|---|
| **Next.js app** (this repo) | UI, routing, and thin server-side API routes |
| **Supabase** | System of record — `shipments`, `events`, `tickets`, `leads` tables |
| **n8n** | Automation layer — the workflows that actually *do* things (AI replies, emails, calendar invites, ticket creation) |

## Architecture rule this app follows

This is the load-bearing convention in the codebase, and it should guide any new feature:

- **Anything with a side effect** (an email, an AI-generated reply, a calendar invite, a notification) is **never** written directly to Supabase from the browser. It goes through a Next.js API route (`app/api/*/route.ts`), which server-side calls the matching **n8n webhook**. The webhook URL is read from a server-only environment variable and is never exposed to the client.
- **Anything that's a plain read** (displaying shipments, tickets, or leads with no automation to trigger) queries Supabase directly from the client, using the public anon key. There's no workflow to bypass, so this is safe and simpler.

If you're adding a feature, decide which bucket it falls into *before* writing code.

## Features

### Public site (`/`)
- **Hero** — live shipment lookup card that calls the *Tracking Chatbot* n8n workflow and renders an AI-narrated status reply (not raw database fields).
- **Get a Quote** (`#get-a-quote`) — a conversational inquiry card. Every "Get a Quote" CTA on the site (nav, hero, footer) points here. It:
  - Sends the customer's message plus the full conversation history to the *Inquiry Triage* n8n workflow on every turn, so a conversation can escalate to `needs_call` on a later message, not just the first one.
  - Renders the exchange as a running thread (previous turns stay visible; "Ask another question" continues the same conversation instead of resetting it).
  - When the workflow returns `needs_call`, reveals an inline call-scheduling form pre-filled with the customer's contact info and a summary of the whole conversation.
- **Schedule a Call** (`/schedule-call`) — the same scheduling form as a standalone page, for anyone who lands on it directly instead of via the inquiry flow. Submits to the *Schedule Sales Call* n8n workflow, which books a Google Calendar event with reminders.

### Ops dashboard (`/dashboard`)
Internal, read-only view of live Supabase data — shipments (waybill, route, status), tickets (with open tickets visually flagged), and leads — each sorted most-recent first. No n8n involvement; these are plain reads.

### API routes
| Route | Forwards to | Purpose |
|---|---|---|
| `app/api/inquiry/route.ts` | `N8N_INQUIRY_WEBHOOK_URL` | Classifies a message as answerable now vs. needing a call |
| `app/api/schedule-call/route.ts` | `N8N_SCHEDULE_CALL_WEBHOOK_URL` | Books a sales call |
| `app/api/track/route.ts` | `N8N_TRACKING_CHATBOT_WEBHOOK_URL` | Returns an AI-narrated shipment status |

Each route's only job is to hold the webhook URL server-side and pass the request through — no business logic lives here, that's in n8n.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Supabase JS client** for direct, read-only queries
- **n8n** (external, self-hosted or cloud) for every side-effecting workflow

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

### Environment variables

Create `.env.local` in the project root (this file is gitignored — never commit it):

```bash
# Supabase — public, safe for the browser (read-only via RLS)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# n8n workflow webhooks — server-side only, read exclusively inside app/api/*/route.ts.
# Never reference these with NEXT_PUBLIC_ and never import them into a client component.
N8N_LEAD_INTAKE_WEBHOOK_URL=
N8N_TRACKING_CHATBOT_WEBHOOK_URL=
N8N_INQUIRY_WEBHOOK_URL=
N8N_SCHEDULE_CALL_WEBHOOK_URL=
```

> `N8N_LEAD_INTAKE_WEBHOOK_URL` is currently unused in the UI — it backed the original structured quote form, which was consolidated into the conversational "Get a Quote" flow above. It's left as a placeholder pending a decision on whether to retire or repurpose that workflow.

The app will run without the n8n variables set, but any route that depends on a missing webhook URL returns a clear 500 rather than failing silently.

### Supabase schema this app expects

| Table | Used by |
|---|---|
| `shipments` | Hero shipment lookup, ops dashboard |
| `events` | Hero shipment lookup (has a Postgres trigger wired to an n8n notification workflow — inserting here has real side effects) |
| `tickets` | Ops dashboard |
| `leads` | Ops dashboard |

## Project structure

```
app/
  page.tsx                 Landing page (Hero, Inquiry, How It Works, etc.)
  dashboard/page.tsx        Internal ops dashboard
  schedule-call/page.tsx    Standalone call-scheduling page
  api/
    inquiry/route.ts        -> N8N_INQUIRY_WEBHOOK_URL
    schedule-call/route.ts  -> N8N_SCHEDULE_CALL_WEBHOOK_URL
    track/route.ts          -> N8N_TRACKING_CHATBOT_WEBHOOK_URL
components/
  nav.tsx, footer.tsx        Shared chrome
  inquiry-card.tsx           Conversational "Get a Quote" widget
  schedule-call-form.tsx     Reusable form (inline + standalone variants)
  live-shipment-card.tsx     Hero's AI shipment lookup
  landing/                   Marketing sections
  dashboard/                 Ops dashboard tables
  ui/                        Small shared primitives (Reveal, StatusBadge, ArrowIcon)
lib/
  supabase.ts                Browser Supabase client
  types.ts                   Shared row types
  status.ts                  Shipment status labels/ordering helpers
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |
