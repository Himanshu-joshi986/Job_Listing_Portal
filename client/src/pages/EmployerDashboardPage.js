import React, { useMemo, useState } from "react";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";
import { SidebarNav } from "../components/SidebarNav";
import { StatCard } from "../components/StatCard";
import { JOBS } from "../data/jobs";
import { motion } from "framer-motion";

export function EmployerDashboardPage() {
  const posted = useMemo(() => JOBS.slice(0, 4), []);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [salary, setSalary] = useState("");

  const navItems = [
    { to: "/dashboard/employer", label: "Overview", badge: "3" },
    { to: "/jobs", label: "Browse Jobs" },
    { to: "/profile", label: "Company Profile" },
  ];

  return (
    <PageShell className="container-app">
      <SectionHeading
        eyebrow="Employer"
        title="Dashboard"
        subtitle="Company profile, create listing (UI), manage posted jobs, and view stats."
        right={<span className="chip">Employer Mode</span>}
      />

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <SidebarNav title="Navigation" items={navItems} />
          <div className="mt-6 glass rounded-3xl p-6">
            <div className="text-sm font-semibold text-white/85">
              Company profile
            </div>
            <div className="mt-3 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                <span className="text-sm font-extrabold">NW</span>
              </div>
              <div>
                <div className="text-sm font-semibold">NeonWorks</div>
                <div className="text-xs text-white/55">Hiring • Product UI</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/60">
              UI-only demo. Edit buttons below do not persist changes.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button className="btn-ghost w-full py-3">Edit</button>
              <button className="btn-primary w-full py-3">Upgrade</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 md:grid-cols-3"
          >
            <StatCard label="Posted jobs" value="12" hint="+2 this week" />
            <StatCard label="Applicants" value="148" hint="24 new" />
            <StatCard label="Response rate" value="92%" hint="Top 10%" />
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold tracking-tight">
                    Create Job Listing
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    UI-only form (does not submit).
                  </div>
                </div>
                <span className="chip">UI only</span>
              </div>

              <div className="mt-5 grid gap-3">
                <input
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Job title"
                />
                <input
                  className="input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                />
                <select
                  className="input"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
                <input
                  className="input"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Salary range"
                />
                <textarea
                  className="input min-h-[110px] resize-none"
                  placeholder="Description (dummy)"
                />
                <button className="btn-primary w-full py-3">
                  Publish Listing
                </button>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold tracking-tight">
                    Posted Jobs
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    Manage listings (UI-only).
                  </div>
                </div>
                <span className="chip">{posted.length}</span>
              </div>

              <div className="mt-5 grid gap-3">
                {posted.map((j) => (
                  <div
                    key={j.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{j.title}</div>
                        <div className="mt-1 text-xs text-white/55">
                          {j.location} • {j.type}
                        </div>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        Live
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="btn-ghost px-3 py-2 text-xs">
                        Edit
                      </button>
                      <button className="btn-ghost px-3 py-2 text-xs">
                        Delete
                      </button>
                      <button className="btn-primary ml-auto px-3 py-2 text-xs">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

