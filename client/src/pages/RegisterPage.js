import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "../components/PageShell";
import { FloatingLabelInput } from "../components/FloatingLabelInput";
import { TogglePill } from "../components/TogglePill";

export function RegisterPage() {
  const [role, setRole] = useState("seeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <PageShell>
      <div className="container-app">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
          <div className="glass-strong rounded-3xl p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-2xl font-extrabold tracking-tight">
                  Create account
                </div>
                <p className="mt-2 text-sm text-white/60">
                  Choose a role (UI only) and enjoy the premium form UX.
                </p>
              </div>
              <TogglePill
                value={role}
                onChange={setRole}
                options={[
                  { value: "seeker", label: "Job Seeker" },
                  { value: "employer", label: "Employer" },
                ]}
              />
            </div>

            <motion.div
              key={role}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-6 grid gap-4"
            >
              <FloatingLabelInput
                label={role === "employer" ? "Company name" : "Full name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FloatingLabelInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FloatingLabelInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {role === "employer" ? (
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm font-semibold">Employer perks</div>
                  <div className="mt-1 text-sm text-white/60">
                    Create listings, track applicants, and view stats (UI-only
                    demo).
                  </div>
                </div>
              ) : (
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm font-semibold">Seeker perks</div>
                  <div className="mt-1 text-sm text-white/60">
                    Save jobs, track applications, and manage your profile (UI-only
                    demo).
                  </div>
                </div>
              )}

              <button className="btn-primary w-full py-3">Create Account</button>
              <div className="text-center text-sm text-white/60">
                Already have an account?{" "}
                <Link className="font-semibold text-white hover:underline" to="/login">
                  Login
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:block">
            <div className="glass-strong rounded-3xl p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                Premium UI system
              </div>
              <div className="mt-3 text-3xl font-extrabold tracking-tight">
                Designed for speed & clarity
              </div>
              <p className="mt-3 text-sm text-white/60">
                Floating labels, clean spacing, and subtle motion make the forms
                feel modern and “real”.
              </p>
              <div className="mt-6 grid gap-3">
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm font-semibold">Micro-interactions</div>
                  <div className="mt-1 text-sm text-white/60">
                    Hover states, focus rings, and springy toggles.
                  </div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm font-semibold">Consistent tokens</div>
                  <div className="mt-1 text-sm text-white/60">
                    Neon gradients + glass surfaces across all pages.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

