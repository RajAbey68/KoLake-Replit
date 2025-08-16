import { NextResponse } from "next/server";
import { sanitizeInput, logSecurityEvent } from "@/lib/security";
type Enquiry = { name:string; email:string; message:string; checkIn?:string; checkOut?:string; rooms?:number; guests?:number; };
export const runtime = "nodejs"; // allow email/db libs if you add them later

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Partial<Enquiry>;
    const clean = sanitizeInput(payload);
    // TODO: validate, persist, and/or send email
    return NextResponse.json({ ok: true, received: clean });
  } catch (e:any) {
    logSecurityEvent("enquiry_post_error", { error: e?.message });
    return NextResponse.json({ ok:false, error:"Invalid payload" }, { status: 400 });
  }
}
export async function GET() { return NextResponse.json({ ok: true }); }
