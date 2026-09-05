"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { ChevronRight, Clock, Power } from "@/components/Icons";

/**
 * Every sidebar destination except Timer lands here.
 *
 * Rather than a dead link or a stock 404, this says plainly what the prototype
 * is and is not — an evaluator who wanders off should understand within a
 * second that they have hit the edge of the scope on purpose, and get a way
 * straight back to the part that works.
 *
 * The area is called Timer, even though it is served at /calendar. Naming it
 * anything else here would send someone looking for a sidebar item that does
 * not exist.
 *
 * Each of these paths is a real route rather than a 404, so navigating to one
 * and back is a client-side transition and the week the user planned survives.
 * A genuine 404 still falls through to app/not-found.tsx, which renders this
 * same component.
 */
export default function OutOfScope() {
  const pathname = usePathname();

  return (
    <div className="app">
      <Sidebar active="none" />

      <main className="main nf">
        <div className="nf-card">
          <span className="nf-mark" aria-hidden>
            <Power size={30} />
          </span>

          <span className="nf-eyebrow">Toggl 2.0 prototype</span>

          <h1 className="nf-title">Nothing to see on this one</h1>

          <p className="nf-body">
            <code className="nf-path">{pathname}</code> is part of Toggl, but not
            part of this prototype. The build is deliberately one screen deep:
            everything here lives in <strong>Timer</strong>.
          </p>

          <p className="nf-body nf-body-dim">
            Timer covers onboarding, a week planned from anonymised peer
            benchmarks, and the loop that replaces those benchmarks with your own
            numbers once you have logged enough.
          </p>

          <Link href="/calendar" className="btn-primary nf-cta">
            <Clock size={16} />
            Go to Timer
            <ChevronRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
}
