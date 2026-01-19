import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "../components/PageShell";
import { FloatingLabelInput } from "../components/FloatingLabelInput";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <PageShell>
      <div className="container-app">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <div className="glass-strong rounded-3xl p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                Welcome back
              </div>
              <div className="mt-3 text-3xl font-extrabold tracking-tight">
                Sign in to your account
              </div>
              <p className="mt-3 text-sm text-white/60">
                UI-only demo: form doesn’t authenticate. Enjoy the motion and
                premium layout.
              </p>
              <div className="mt-6 grid gap-3">
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm font-semibold">Fast Apply Flow</div>
                  <div className="mt-1 text-sm text-white/60">
                    Clean CTA hierarchy and keyboard-friendly inputs.
                  </div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm font-semibold">Saved & Applied</div>
                  <div className="mt-1 text-sm text-white/60">
                    Dashboard sections that feel like a real product.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="glass-strong rounded-3xl p-6 md:p-8"
          >
            <div className="text-2xl font-extrabold tracking-tight">
              Login
            </div>
            <p className="mt-2 text-sm text-white/60">
              Use any credentials (UI only).
            </p>

            <div className="mt-6 grid gap-4">
              <FloatingLabelInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FloatingLabelInput
                label="Password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightSlot={
                  <button
                    className="text-xs font-semibold text-white/60 hover:text-white"
                    onClick={() => setShow((v) => !v)}
                    type="button"
                  >
                    {show ? "Hide" : "Show"}
                  </button>
                }
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-violet-400"
                  />
                  Remember me
                </label>
                <span className="text-sm text-white/55 hover:text-white">
                  Forgot password?
                </span>
              </div>

              <button className="btn-primary w-full py-3">Sign In</button>
              <button className="btn-ghost w-full py-3">
                Continue with Google
              </button>
            </div>

            <div className="mt-6 text-center text-sm text-white/60">
              New here?{" "}
              <Link className="font-semibold text-white hover:underline" to="/register">
                Create an account
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

