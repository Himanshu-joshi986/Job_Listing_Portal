import React, { useMemo, useState } from "react";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";
import { SidebarNav } from "../components/SidebarNav";
import { JOBS } from "../data/jobs";
import { motion } from "framer-motion";

function UploadCard({ title, subtitle }) {
  const [fileName, setFileName] = useState("");
  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-bold tracking-tight">{title}</div>
          <div className="mt-1 text-sm text-white/60">{subtitle}</div>
        </div>
        <span className="chip">UI only</span>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="btn-ghost cursor-pointer">
          Choose file
          <input
            type="file"
            className="hidden"
            onChange={(e) =>
              setFileName(e.target.files?.[0]?.name || "")
            }
          />
        </label>
        <div className="text-sm text-white/55">
          {fileName ? (
            <span className="text-white/80">{fileName}</span>
          ) : (
            "No file selected"
          )}
        </div>
      </div>
    </div>
  );
}

export function SeekerDashboardPage() {
  const applied = useMemo(() => JOBS.slice(0, 3), []);
  const saved = useMemo(() => JOBS.slice(2, 5), []);

  const navItems = [
    { to: "/dashboard/seeker", label: "Overview", badge: "New" },
    { to: "/jobs", label: "Find Jobs" },
    { to: "/profile", label: "Edit Profile" },
  ];

  return (
    <PageShell className="container-app">
      <SectionHeading
        eyebrow="Job Seeker"
        title="Dashboard"
        subtitle="Profile, resume upload, applied jobs, and saved jobs — UI only."
        right={<span className="chip">Seeker Mode</span>}
      />

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <SidebarNav title="Navigation" items={navItems} />
          <div className="mt-6 glass rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                <span className="text-sm font-extrabold">HJ</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Himanshu Joshi</div>
                <div className="text-xs text-white/55">
                  Frontend • React • UI Systems
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="glass rounded-2xl p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  Profile strength
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                </div>
                <div className="mt-2 text-xs text-white/55">
                  Add portfolio + projects to reach 100%.
                </div>
              </div>
              <button className="btn-primary w-full py-3">
                Quick Apply Settings
              </button>
              <button className="btn-ghost w-full py-3">Manage Alerts</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 lg:grid-cols-2"
          >
            <UploadCard
              title="Resume upload"
              subtitle="Upload a PDF/DOC (mock)."
            />
            <div className="glass rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold tracking-tight">
                    Applied jobs
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    Track your applications.
                  </div>
                </div>
                <span className="chip">{applied.length} active</span>
              </div>
              <div className="mt-5 grid gap-3">
                {applied.map((j) => (
                  <div
                    key={j.id}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div>
                      <div className="text-sm font-semibold">{j.title}</div>
                      <div className="mt-1 text-xs text-white/55">
                        {j.company} • {j.location}
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      In Review
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="glass rounded-3xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold tracking-tight">
                  Saved jobs
                </div>
                <div className="mt-1 text-sm text-white/60">
                  Shortlist roles and come back later.
                </div>
              </div>
              <span className="chip">{saved.length} saved</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {saved.map((j) => (
                <div
                  key={j.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-sm font-semibold">{j.title}</div>
                  <div className="mt-1 text-xs text-white/55">
                    {j.company} • {j.type}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="btn-ghost px-3 py-2 text-xs">
                      Remove
                    </button>
                    <button className="btn-primary px-3 py-2 text-xs">
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

