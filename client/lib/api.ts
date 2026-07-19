import { UrlRequest, UrlResponse, UrlStatsResponse } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function shortenUrl(payload: UrlRequest): Promise<UrlResponse> {
  const res = await fetch(`${API_BASE}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle<UrlResponse>(res);
}

export async function getStats(shortCode: string): Promise<UrlStatsResponse> {
  const res = await fetch(`${API_BASE}/stats/${shortCode}`, { cache: "no-store" });
  return handle<UrlStatsResponse>(res);
}

export function extractShortCode(shortUrl: string): string {
  const parts = shortUrl.split("/").filter(Boolean);
  return parts[parts.length - 1];
}
