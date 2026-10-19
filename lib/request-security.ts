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
  const value = ip.trim().toLowerCase();
  const ipv4 = value.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const octets = ipv4.slice(1).map(Number);
    if (octets.some((part) => part > 255)) return "no disponible";
    return `${octets[0]}.${octets[1]}.${octets[2]}.0`;
  }

  if (!value.includes(":")) return "no disponible";
  let address = value.split("%")[0];
  const embeddedIpv4 = address.match(/(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (embeddedIpv4) {
    const octets = embeddedIpv4[1].split(".").map(Number);
    if (octets.length !== 4 || octets.some((part) => part > 255)) return "no disponible";
    const high = ((octets[0] << 8) | octets[1]).toString(16);
    const low = ((octets[2] << 8) | octets[3]).toString(16);
    address = address.slice(0, embeddedIpv4.index) + high + ":" + low;
  }

  const halves = address.split("::");
  if (halves.length > 2) return "no disponible";
  const left = halves[0] ? halves[0].split(":") : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - left.length - right.length;
  if ((halves.length === 1 && missing !== 0) || (halves.length === 2 && missing < 1)) {
    return "no disponible";
  }
  const groups = halves.length === 2
    ? [...left, ...Array(missing).fill("0"), ...right]
    : left;
  if (groups.some((group) => !/^[0-9a-f]{1,4}$/.test(group))) return "no disponible";

  const prefix = groups.slice(0, 3).map((group) => parseInt(group, 16).toString(16));
  return `${prefix.join(":")}::/48`;
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
