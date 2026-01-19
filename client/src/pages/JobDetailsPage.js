import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { JOBS } from "../data/jobs";

export function JobDetailsPage() {
  const { jobId } = useParams();
  const job = useMemo(() => JOBS.find((j) => j.id === jobId), [jobId]);

  if (!job) {
    return (
      <PageShell className="container-app">
        <div className="glass rounded-3xl p-10 text-center">
          <div className="text-xl font-extrabold">Job not found</div>
          <p className="mt-2 text-sm text-white/60">
            This is dummy data. Try going back to listings.
          </p>
          <div className="mt-6">
            <Link className="btn-primary" to="/jobs">
              Back to Jobs
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell className="container-app">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Link to="/jobs" className="text-sm text-white/60 hover:text-white">
              ← Back to listings
            </Link>
            <div className="mt-3 text-3xl font-extrabold tracking-tight">
              {job.title}
            </div>
            <div className="mt-2 text-sm text-white/70">
              {job.company} • {job.location} • {job.type}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-4 md:min-w-[320px]">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white/85">Salary</div>
              <div className="text-sm font-semibold">{job.salary}</div>
            </div>
            <div className="mt-2 text-xs text-white/55">Posted {job.postedAt}</div>
            <button className="btn-primary mt-4 w-full py-3">
              Apply Now
            </button>
            <button className="btn-ghost mt-2 w-full py-3">
              Save Job
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="glass rounded-3xl p-6 md:p-8">
              <div className="text-lg font-bold tracking-tight">
                Responsibilities
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-white/65">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-400/80" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 text-lg font-bold tracking-tight">
                Qualifications
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-white/65">
                {job.qualifications.map((q) => (
                  <li key={q} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400/80" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-7">
            <div className="text-lg font-bold tracking-tight">
              Company Overview
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {job.companyOverview}
            </p>
            <div className="mt-6 grid gap-3">
              <div className="glass rounded-2xl p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  Hiring for
                </div>
                <div className="mt-2 text-sm font-semibold">{job.level}</div>
              </div>
              <div className="glass rounded-2xl p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  Work type
                </div>
                <div className="mt-2 text-sm font-semibold">{job.type}</div>
              </div>
              <div className="glass rounded-2xl p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  Location
                </div>
                <div className="mt-2 text-sm font-semibold">{job.location}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

