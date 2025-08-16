import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ 
    ok: true, 
    ts: Date.now(),
    status: "Ko Lake Villa API operational",
    version: "1.3.1"
  });
}