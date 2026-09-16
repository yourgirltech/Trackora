import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_TRACKING_CHATBOT_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Tracking assistant is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const waybillId =
    typeof body?.waybill_id === "string" ? body.waybill_id.trim() : "";

  if (!waybillId) {
    return NextResponse.json({ error: "waybill_id is required." }, { status: 400 });
  }

  const webhookResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ waybill_id: waybillId }),
  });

  if (!webhookResponse.ok) {
    return NextResponse.json(
      { error: "Could not reach the tracking assistant." },
      { status: 502 }
    );
  }

  const data = await webhookResponse.json();
  const reply = data?.reply ?? data?.message ?? data?.text ?? "";

  return NextResponse.json({ reply });
}
