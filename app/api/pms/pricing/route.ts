import { NextResponse } from "next/server";
import { safeJson } from "@/utils/safeJson";
export const runtime = "nodejs";

type PricingReq = { start?: string; end?: string; base?: number; weekendMarkup?: number };

class PricingEngine {
  calculate({ start, end, base = 100, weekendMarkup = 0.2 }: Required<PricingReq>) {
    // Ko Lake Villa pricing calculator with realistic Sri Lankan rates
    const startDate = new Date(start);
    const endDate = new Date(end);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const prices = Array.from({length: days}).map((_, i) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6; // Fri/Sat
      
      return Math.round((isWeekend ? base * (1 + weekendMarkup) : base));
    });
    
    const total = prices.reduce((sum, price) => sum + price, 0);
    const avgNightly = Math.round(total / days);
    
    return { 
      start, 
      end, 
      days,
      base, 
      weekendMarkup, 
      prices,
      total,
      avgNightly,
      currency: "USD"
    };
  }
}

export async function POST(req: Request) {
  const body = await safeJson<PricingReq>(req);
  if (!body?.start || !body?.end) {
    return NextResponse.json({ 
      ok: false, 
      error: "start and end are required (YYYY-MM-DD)" 
    }, { status: 400 });
  }
  
  const engine = new PricingEngine();
  const result = engine.calculate({ 
    start: body.start, 
    end: body.end, 
    base: body.base ?? 350, // Ko Lake Villa base rate USD
    weekendMarkup: body.weekendMarkup ?? 0.25 
  });
  
  return NextResponse.json({ ok: true, pricing: result });
}

export async function GET() {
  return NextResponse.json({ 
    ok: true, 
    hint: "POST { start, end, base?, weekendMarkup? }",
    sample: {
      start: "2025-01-01",
      end: "2025-01-07", 
      base: 350,
      weekendMarkup: 0.25
    }
  });
}