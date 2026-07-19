"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ticket } from "@/lib/types";

function truncate(url: string, max = 46) {
  return url.length > max ? url.slice(0, max - 1) + "…" : url;
}

export default function TicketStub({ ticket, index }: { ticket: Ticket; index: number }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(ticket.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — silently ignore, copy still visible via select */
    }
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="list-none"
    >
      <div className="relative overflow-hidden rounded-md border border-slate/30 bg-sand shadow-[0_1px_0_rgba(37,35,35,0.08)]">
        <div className="ticket-perforation" aria-hidden />
        <div className="flex items-center gap-4 px-5 py-4">
          <span className="shrink-0 font-mono text-xs text-slate">
            #{String(ticket.id).padStart(3, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <a
              href={ticket.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="block truncate font-mono text-sm font-medium text-ink underline decoration-tan decoration-2 underline-offset-2 hover:text-tan"
            >
              {ticket.shortUrl.replace(/^https?:\/\//, "")}
            </a>
            <p className="mt-0.5 truncate text-xs text-slate" title={ticket.originalUrl}>
              {truncate(ticket.originalUrl)}
            </p>
          </div>

          <button
            onClick={copy}
            className="shrink-0 rounded border border-ink/15 bg-cream px-3 py-1.5 font-mono text-xs font-medium text-ink transition-colors hover:bg-ink hover:text-cream active:scale-95"
          >
            {copied ? "copied" : "copy"}
          </button>

          <a
            href={`/stats/${ticket.shortCode}`}
            className="shrink-0 rounded border border-transparent px-3 py-1.5 font-mono text-xs font-medium text-slate transition-colors hover:border-slate/40"
          >
            stats →
          </a>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-tan"
          style={{ opacity: 0.9 - index * 0.08 > 0.2 ? 0.9 - index * 0.08 : 0.2 }}
          aria-hidden
        />
      </div>
    </motion.li>
  );
}
