export function isAllowedOrigin(origin: string, allowedList: string[] = []) {
  if (!origin) return false;
  return allowedList.length === 0 ? true : allowedList.includes(origin);
}
export function sanitizeInput<T>(data: T): T {
  if (typeof data === "string") return (data as string).replace(/\0/g,"").trim() as unknown as T;
  if (Array.isArray(data)) return data.map(sanitizeInput) as unknown as T;
  if (data && typeof data === "object") { const out:any={}; for (const [k,v] of Object.entries(data as any)) out[k]=sanitizeInput(v as any); return out; }
  return data;
}
export function logSecurityEvent(event: string, details?: Record<string, unknown>) {
  try { console.warn(`[SECURITY] ${event}`, details ? JSON.stringify(details).slice(0,500) : ""); } catch {}
}
