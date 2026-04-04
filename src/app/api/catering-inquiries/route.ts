import { NextRequest, NextResponse } from "next/server";
import { saveCateringInquiry } from "@/lib/firestore";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const inquiry = await saveCateringInquiry(body as Record<string, unknown>);
  return NextResponse.json({ ok: true, inquiry }, { status: 201 });
}
