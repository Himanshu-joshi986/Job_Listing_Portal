import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell } from "../components/PageShell";
import { FloatingLabelInput } from "../components/FloatingLabelInput";
import { TogglePill } from "../components/TogglePill";
import { useAuth } from "../context/AuthContext";

const employerPerks = [
  "Create and manage job posts",
  "Track applicants in real time",
  "Collaborate with your team",
];

const seekerPerks = [
  "Save and track applications",
  "Smart recommendations tailored to you",
  "Profile, portfolio, and availability",
];

export function RegisterPage() {
  const [role, setRole] = useState("seeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const { register, status, error, isAuthenticated, user } = useAuth();
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

  const strength = useMemo(() => {
    const points = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ].filter(Boolean).length;
    return Math.min(points, 4);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!name || !email || !password || !confirm) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (password !== confirm) {
      setFormError("Passwords must match.");
      return;
    }

    if (password.length < 8) {
      setFormError("Use a password with at least 8 characters.");
      return;
    }

    try {
      await register({ name, email, password, role });
      setFormSuccess("Account created! Redirecting to your dashboard...");
    } catch (err) {
      setFormError(err.message || "Unable to create your account.");
    }
  };

  return (
    <PageShell>
      <div className="container-app">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="glass-strong rounded-3xl p-6 md:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.26em] text-white/55">
                  Create account
                </div>
                <div className="mt-3 text-3xl font-extrabold tracking-tight">
                  Join the premium experience
                </div>
                <p className="mt-3 text-sm text-white/60">
                  Responsive, animated forms with role-aware flows for seekers and employers.
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

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(role === "employer" ? employerPerks : seekerPerks).map(
                (perk) => (
                  <div key={perk} className="glass rounded-2xl p-4">
                    <div className="text-sm font-semibold">✓ {perk}</div>
                    <div className="mt-1 text-xs text-white/60">
                      Crafted for clarity and speed.
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.22em] text-white/60">
                Pro tip
              </div>
              <div className="mt-2 text-sm text-white/70">
                You can always switch roles later—your session is persisted and dashboards are protected.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="glass-strong rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl font-extrabold tracking-tight">
                  Create your account
                </div>
                <p className="mt-2 text-sm text-white/60">
                  Secure authentication with a UI built for modern teams.
                </p>
              </div>
              <div className="rounded-full border border-blue-300/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-50">
                Role: {role === "employer" ? "Employer" : "Seeker"}
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
                label={role === "employer" ? "Company name" : "Full name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                state={fieldState}
              />
              <FloatingLabelInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                state={fieldState}
              />
              <FloatingLabelInput
                label="Password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                state={fieldState}
                message={
                  fieldState === "error"
                    ? "Follow the hints below to strengthen your password."
                    : "Use 8+ chars with numbers, symbols, and capitals."
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
              <FloatingLabelInput
                label="Confirm password"
                type={show ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                state={fieldState}
              />

              <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={[
                        "h-1.5 flex-1 rounded-full",
                        strength >= step ? "bg-emerald-400" : "bg-white/15",
                      ].join(" ")}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Strength indicator</span>
                  <span>
                    {strength <= 1
                      ? "Weak"
                      : strength === 2
                        ? "Okay"
                        : strength === 3
                          ? "Good"
                          : "Great"}
                  </span>
                </div>
              </div>

              <button
                className="btn-primary w-full py-3"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
              <div className="text-center text-sm text-white/60">
                Already have an account?{" "}
                <Link
                  className="font-semibold text-white hover:underline"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
