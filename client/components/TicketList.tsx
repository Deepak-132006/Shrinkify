"use client";

import { AnimatePresence } from "framer-motion";
import { Ticket } from "@/lib/types";
import TicketStub from "./TicketStub";

export default function TicketList({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-slate/40 px-5 py-8 text-center">
        <p className="font-mono text-xs text-slate">
          no tickets issued yet — the first one appears here
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      <AnimatePresence initial={false}>
        {tickets.map((t, i) => (
          <TicketStub key={t.id} ticket={t} index={i} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
