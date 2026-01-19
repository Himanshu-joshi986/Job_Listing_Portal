import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/8">
      <div className="container-app py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold tracking-tight">
              Job Listing Portal
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/60">
              A premium, dark, glassmorphism UI for job discovery and hiring.
              Frontend-only demo with dummy data and smooth motion.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="chip">Tailwind</span>
              <span className="chip">Framer Motion</span>
              <span className="chip">React Three Fiber</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-sm font-semibold text-white/85">Explore</div>
              <div className="mt-3 grid gap-2 text-sm text-white/65">
                <Link className="hover:text-white" to="/jobs">
                  Browse Jobs
                </Link>
                <Link className="hover:text-white" to="/dashboard/seeker">
                  Seeker Dashboard
                </Link>
                <Link className="hover:text-white" to="/dashboard/employer">
                  Employer Dashboard
                </Link>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white/85">Account</div>
              <div className="mt-3 grid gap-2 text-sm text-white/65">
                <Link className="hover:text-white" to="/login">
                  Login
                </Link>
                <Link className="hover:text-white" to="/register">
                  Register
                </Link>
                <Link className="hover:text-white" to="/profile">
                  Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="text-sm font-semibold">Newsletter</div>
            <p className="mt-2 text-sm text-white/60">
              UI-only mock. This form doesn’t submit anywhere.
            </p>
            <div className="mt-4 flex gap-2">
              <input className="input" placeholder="Email address" />
              <button className="btn-primary whitespace-nowrap">Join</button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Job Listing Portal. UI demo.</div>
          <div className="flex gap-4">
            <span className="hover:text-white/80">Privacy</span>
            <span className="hover:text-white/80">Terms</span>
            <span className="hover:text-white/80">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

