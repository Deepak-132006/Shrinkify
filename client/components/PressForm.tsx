"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { shortenUrl, extractShortCode } from "@/lib/api";
import { Ticket } from "@/lib/types";

type Phase = "idle" | "pressing" | "error";

export default function PressForm({ onIssued }: { onIssued: (t: Ticket) => void }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [nextId, setNextId] = useState(1);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!url.trim() || phase === "pressing") return;
    setError(null);
    setPhase("pressing");

    const started = Date.now();
    try {
      const res = await shortenUrl({
        originalUrl: url.trim(),
        customCode: customCode.trim() || undefined,
      });

      // Let the press animation land (min ~520ms) before revealing the
      // ticket, so a fast API response doesn't skip the motion.
      const elapsed = Date.now() - started;
      await new Promise((r) => setTimeout(r, Math.max(0, 560 - elapsed)));

      onIssued({
        id: nextId,
        shortUrl: res.shortUrl,
        shortCode: extractShortCode(res.shortUrl),
        originalUrl: url.trim(),
        createdAt: new Date().toISOString(),
      });
      setNextId((n) => n + 1);
      setUrl("");
      setCustomCode("");
      setPhase("idle");
    } catch (err) {
      setPhase("error");
      setError(err instanceof Error ? err.message : "Could not reach the press. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative overflow-hidden rounded-xl border border-ink/15 bg-sand/60">
        {/* the press bar — slams down over the input while a request is in flight */}
        <AnimatePresence>
          {phase === "pressing" && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1, 1, 0] }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.56, times: [0, 0.35, 0.7, 1], ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-ink"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/80">
                pressing…
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-2 sm:p-2">
          <label htmlFor="url" className="sr-only">
            Long URL
          </label>
          <input
            id="url"
            type="url"
            required
            disabled={phase === "pressing"}
            placeholder="https://your-really-long-url.com/with/a/lot/of/path/segments"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="min-w-0 flex-1 rounded-lg bg-cream px-4 py-3.5 font-mono text-sm text-ink placeholder:text-slate/70 focus:outline-none disabled:opacity-50 sm:px-4"
          />

          <input
            id="customCode"
            type="text"
            disabled={phase === "pressing"}
            placeholder="custom code (optional)"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            className="w-full rounded-lg bg-cream px-4 py-3.5 font-mono text-sm text-ink placeholder:text-slate/70 focus:outline-none disabled:opacity-50 sm:w-48"
          />

          <button
            type="submit"
            disabled={phase === "pressing"}
            className="w-full shrink-0 rounded-lg bg-ink px-6 py-3.5 font-display text-sm font-medium uppercase tracking-widest text-cream transition-transform hover:bg-tan hover:text-ink active:scale-[0.97] disabled:opacity-60 sm:w-auto"
          >
            {phase === "pressing" ? "···" : "Press"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 font-mono text-xs text-ink"
          >
            <span className="mr-1 rounded bg-tan/40 px-1.5 py-0.5">jam</span>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
