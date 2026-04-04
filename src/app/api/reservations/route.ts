import { NextRequest, NextResponse } from "next/server";
import { saveReservation } from "@/lib/firestore";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const reservation = await saveReservation({
    name: String(body.name ?? ""),
    phone: String(body.phone ?? ""),
    partySize: Number(body.partySize ?? 1),
    date: String(body.date ?? ""),
    time: String(body.time ?? ""),
    specialRequests: body.specialRequests ? String(body.specialRequests) : undefined
  });

  return NextResponse.json({ ok: true, reservation }, { status: 201 });
}
