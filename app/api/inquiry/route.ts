import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_INQUIRY_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Inquiry handling is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { name, email, message, history } = body ?? {};

  const webhookResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      message,
      history: Array.isArray(history) ? history : [],
    }),
  });

  if (!webhookResponse.ok) {
    return NextResponse.json(
      { error: "Could not submit your inquiry." },
      { status: 502 }
    );
  }

  const data = await webhookResponse.json();
  return NextResponse.json(data);
}
