"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PressForm from "@/components/PressForm";
import TicketList from "@/components/TicketList";
import { Ticket } from "@/lib/types";

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  function onIssued(t: Ticket) {
    setTickets((prev) => [t, ...prev]);
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 sm:py-24">
      <header className="mb-14 flex items-center justify-between">
        <span className="font-display text-lg font-bold tracking-tight">
          shrink<span className="text-tan">ify</span>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate">
          claim-ticket URLs
        </span>
      </header>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl"
      >
        Paste a mile.
        <br />
        <span className="text-slate">Get an inch back.</span>
      </motion.h1>

      <p className="mt-5 max-w-md font-body text-sm leading-relaxed text-slate">
        Drop a long link under the press. It comes back out as a short,
        numbered claim ticket you can hand to anyone.
      </p>

      <div className="mt-10">
        <PressForm onIssued={onIssued} />
      </div>

      <section className="mt-16">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-sm font-medium uppercase tracking-[0.2em] text-ink">
            Issued this session
          </h2>
          <span className="font-mono text-xs text-slate">{tickets.length} ticket(s)</span>
        </div>
        <TicketList tickets={tickets} />
      </section>

      <footer className="mt-24 border-t border-slate/20 pt-6">
        <p className="font-mono text-[11px] text-slate">
          shrinkify · spring boot backend · this session only, refresh clears the queue
        </p>
      </footer>
    </main>
  );
}
