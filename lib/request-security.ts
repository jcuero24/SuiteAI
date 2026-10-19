import type { ConsentLog } from "@/lib/consent";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;
const requestBuckets = new Map<string, { startedAt: number; count: number }>();

function requestIp(request: Request): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function anonymizeIp(ip: string): string {
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) return ip.replace(/\.\d{1,3}$/, ".0");
  if (ip.includes(":")) return `${ip.split(":").slice(0, 3).join(":")}::/48`;
  return "no disponible";
}

export function isRateLimited(request: Request): boolean {
  const now = Date.now();
  const ip = requestIp(request);
  if (ip === "unknown") return false;
  const key = anonymizeIp(ip);
  const current = requestBuckets.get(key);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    requestBuckets.set(key, { startedAt: now, count: 1 });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export function createConsentLog(request: Request): ConsentLog {
  return { timestamp: new Date().toISOString(), ip: anonymizeIp(requestIp(request)) };
}
