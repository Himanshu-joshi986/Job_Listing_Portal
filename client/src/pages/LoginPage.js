import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "../components/PageShell";
import { FloatingLabelInput } from "../components/FloatingLabelInput";
import { useAuth } from "../context/AuthContext";

const highlightItems = [
  {
    title: "Production-grade UX",
    copy: "Focus rings, adaptive spacing, and micro-interactions tuned for speed.",
  },
  {
    title: "Secure by default",
    copy: "Local session with role awareness and protected dashboard routes.",
  },
  {
    title: "Demo friendly",
    copy: "One-tap demo credentials for both seekers and employers.",
  },
];

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const { login, status, error, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const loading = status === "submitting";
  const fieldState =
    formError || error ? "error" : formSuccess ? "success" : "default";

  useEffect(() => {
    if (isAuthenticated && user) {
      const destination =
        from ||
        (user.role === "employer" ? "/dashboard/employer" : "/dashboard/seeker");
      navigate(destination, { replace: true });
    }
  }, [from, isAuthenticated, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!email || !password) {
      setFormError("Please enter both email and password.");
      return;
    }

    try {
      await login({ email, password, remember });
      setFormSuccess("Welcome back! Redirecting to your dashboard...");
    } catch (err) {
      setFormError(err.message || "Unable to login right now.");
    }
  };

  const handleFill = (role) => {
    const isEmployer = role === "employer";
    setEmail(isEmployer ? "employer@demo.com" : "seeker@demo.com");
    setPassword("password123");
    setFormError("");
    setFormSuccess("Demo credentials ready — just hit Sign In.");
  };

  const quickStats = useMemo(
    () => [
      { label: "Satisfaction", value: "4.9/5" },
      { label: "Avg. time to apply", value: "2m" },
      { label: "Protected routes", value: "Enabled" },
    ],
    []
  );

  return (
    <PageShell>
      <div className="container-app">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="glass-strong rounded-3xl p-7 md:p-9">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                  Welcome back
                </div>
                <div className="mt-3 text-3xl font-extrabold tracking-tight">
                  Sign in with confidence
                </div>
                <p className="mt-3 text-sm text-white/60">
                  Modern authentication with protected dashboards and polished
                  micro-interactions.
                </p>
              </div>
              <div className="glass rounded-2xl px-4 py-3">
                <div className="text-xs uppercase tracking-[0.26em] text-emerald-200">
                  Live stats
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-sm font-semibold">
                  {quickStats.map((item) => (
                    <div key={item.label}>
                      <div className="text-white/60 text-xs">{item.label}</div>
                      <div>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlightItems.map((item) => (
                <div key={item.title} className="glass rounded-2xl p-4">
                  <div className="text-sm font-semibold">{item.title}</div>
                  <div className="mt-1 text-sm text-white/60">{item.copy}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-xs uppercase tracking-[0.22em] text-white/55">
                Try a demo account
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFill("seeker")}
                  className="btn-ghost px-3 py-2 text-sm"
                  type="button"
                >
                  Seeker demo
                </button>
                <button
                  onClick={() => handleFill("employer")}
                  className="btn-ghost px-3 py-2 text-sm"
                  type="button"
                >
                  Employer demo
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="glass-strong rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl font-extrabold tracking-tight">Login</div>
                <p className="mt-2 text-sm text-white/60">
                  Use your account or the ready-to-go demo credentials.
                </p>
              </div>
              <div className="rounded-full border border-emerald-300/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-50">
                Secure
              </div>
            </div>

            {(formError || error) && (
              <div className="mt-4 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-50">
                {formError || error}
              </div>
            )}

            {formSuccess && (
              <div className="mt-4 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-50">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <FloatingLabelInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                state={fieldState}
                message={
                  fieldState === "error"
                    ? "Double-check your email and password."
                    : ""
                }
              />
              <FloatingLabelInput
                label="Password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                state={fieldState}
                message={
                  fieldState === "success"
                    ? "Looking good. You can save time with demo credentials."
                    : "Use at least 8 characters."
                }
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
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <span className="text-sm text-white/55 hover:text-white">
                  Forgot password?
                </span>
              </div>

              <button
                className="btn-primary w-full py-3"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <button className="btn-ghost w-full py-3" type="button">
                Continue with Google (UI)
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-white/60">
              New here?{" "}
              <Link
                className="font-semibold text-white hover:underline"
                to="/register"
              >
                Create an account
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
