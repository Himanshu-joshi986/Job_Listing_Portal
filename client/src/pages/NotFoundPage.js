import React from "react";
import { Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";

export function NotFoundPage() {
  return (
    <PageShell className="container-app">
      <div className="mx-auto max-w-2xl">
        <div className="glass rounded-3xl p-10 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            404
          </div>
          <div className="mt-3 text-3xl font-extrabold tracking-tight">
            Page not found
          </div>
          <p className="mt-3 text-sm text-white/60">
            This is a frontend-only UI demo. Use the navigation to explore pages.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link className="btn-primary" to="/">
              Go Home
            </Link>
            <Link className="btn-ghost" to="/jobs">
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

