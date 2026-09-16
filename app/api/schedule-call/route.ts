import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_SCHEDULE_CALL_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Call scheduling is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json();

  const webhookResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!webhookResponse.ok) {
    return NextResponse.json(
      { error: "Could not schedule your call." },
      { status: 502 }
    );
  }

  const data = await webhookResponse.json();
  return NextResponse.json(data);
}
