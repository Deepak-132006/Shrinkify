"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getStats } from "@/lib/api";
import { UrlStatsResponse } from "@/lib/types";

export default function StatsPage({ params }: { params: { code: string } }) {
  const [stats, setStats] = useState<UrlStatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getStats(params.code)
      .then((s) => active && setStats(s))
      .catch((e) => active && setError(e instanceof Error ? e.message : "Ticket not found"));
    return () => {
      active = false;
    };
  }, [params.code]);

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 sm:py-24">
      <Link href="/" className="font-mono text-xs text-slate hover:text-ink">
        ← back to the press
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Ticket <span className="font-mono text-tan">{params.code}</span>
        </h1>

        {error && (
          <p className="mt-6 rounded-md border border-dashed border-slate/40 px-5 py-8 text-center font-mono text-xs text-slate">
            {error}
          </p>
        )}

        {!stats && !error && (
          <p className="mt-6 font-mono text-xs text-slate">reading the ticket…</p>
        )}

        {stats && (
          <div className="mt-6 overflow-hidden rounded-md border border-slate/30 bg-sand">
            <div className="ticket-perforation" aria-hidden />
            <dl className="divide-y divide-ink/10 px-6 py-2 font-mono text-sm">
              <div className="flex items-center justify-between py-4">
                <dt className="text-slate">short code</dt>
                <dd className="text-ink">{stats.shortCode}</dd>
              </div>
              <div className="flex items-center justify-between py-4 gap-4">
                <dt className="shrink-0 text-slate">destination</dt>
                <dd className="truncate text-ink" title={stats.originalUrl}>
                  {stats.originalUrl}
                </dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-slate">clicks</dt>
                <dd className="text-2xl font-bold text-ink">{stats.clickCount}</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-slate">issued</dt>
                <dd className="text-ink">{new Date(stats.createdAt).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        )}
      </motion.div>
    </main>
  );
}
