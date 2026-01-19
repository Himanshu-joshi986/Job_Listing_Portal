import React, { useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "rounded-xl px-3 py-2 text-sm font-semibold transition",
          isActive
            ? "bg-white/10 text-white"
            : "text-white/75 hover:bg-white/6 hover:text-white",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const nav = useMemo(
    () => [
      { to: "/jobs", label: "Jobs" },
      { to: "/dashboard/seeker", label: "Seeker" },
      { to: "/dashboard/employer", label: "Employer" },
      { to: "/profile", label: "Profile" },
    ],
    []
  );

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const dashboardHref =
    user?.role === "employer" ? "/dashboard/employer" : "/dashboard/seeker";

  const initials =
    user?.name
      ?.split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "JL";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-app">
        <div className="mt-4 glass flex items-center justify-between rounded-2xl px-4 py-3">
          <Link to="/" className="group flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <span className="absolute inset-0 rounded-xl bg-neon-conic opacity-30 blur-md transition group-hover:opacity-50" />
              <span className="relative text-sm font-black tracking-tight">
                JL
              </span>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight">
                Job Listing Portal
              </div>
              <div className="text-xs text-white/55">Premium UI Kit</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <NavItem key={item.to} to={item.to} label={item.label} />
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <>
                <div className="glass inline-flex items-center gap-3 rounded-2xl px-3 py-2">
                  <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-sm font-extrabold">
                    {initials}
                    <span className="absolute inset-0 rounded-xl border border-white/10" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                      {user?.role || "member"}
                    </div>
                    <div className="text-sm font-semibold">{user?.name}</div>
                  </div>
                </div>
                <Link to={dashboardHref} className="btn-primary">
                  Dashboard
                </Link>
                <button className="btn-ghost" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden btn-ghost px-3 py-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="text-sm font-semibold">{open ? "Close" : "Menu"}</span>
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-3 glass rounded-2xl p-3 md:hidden"
            >
              <div className="grid gap-1">
                {nav.map((item) => (
                  <NavItem key={item.to} to={item.to} label={item.label} />
                ))}
              </div>
              {isAuthenticated ? (
                <div className="mt-3 grid gap-2">
                  <div className="glass flex items-center gap-3 rounded-2xl px-3 py-2">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-sm font-bold">
                      {initials}
                    </span>
                    <div className="leading-tight">
                      <div className="text-xs text-white/60">{user?.email}</div>
                      <div className="text-sm font-semibold">{user?.name}</div>
                    </div>
                  </div>
                  <Link to={dashboardHref} className="btn-primary w-full">
                    Dashboard
                  </Link>
                  <button onClick={logout} className="btn-ghost w-full">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link to="/login" className="btn-ghost w-full">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary w-full">
                    Get Started
                  </Link>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

