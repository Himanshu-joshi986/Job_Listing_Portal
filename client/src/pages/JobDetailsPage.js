import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { JOBS } from "../data/jobs";
import { applicationService, savedJobService } from "../services/dashboard";

export function JobDetailsPage() {
  const { jobId } = useParams();
  const job = useMemo(() => JOBS.find((j) => j.id === jobId), [jobId]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const seekerId = localStorage.getItem("userId") || "demo-seeker-id";
  // In a real app, get employerId from job document or database
  const employerId = localStorage.getItem("employerId") || "demo-employer-id";

  const handleApply = async () => {
    if (!coverLetter.trim()) {
      setError("Please write a cover letter");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await applicationService.applyForJob(
        job.id,
        seekerId,
        employerId,
        coverLetter
      );
      setSuccess("Application submitted successfully!");
      setShowApplyModal(false);
      setCoverLetter("");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || "Failed to apply for job");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async () => {
    try {
      setLoading(true);
      setError(null);
      if (isSaved) {
        // Remove from saved
        setIsSaved(false);
      } else {
        // Save job
        await savedJobService.saveJob(job.id, seekerId);
        setSuccess("Job saved successfully!");
        setIsSaved(true);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to save job");
    } finally {
      setLoading(false);
    }
  };

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

            {success && (
              <div className="mt-3 rounded-2xl bg-green-500/20 border border-green-500/50 p-3 text-xs text-green-300">
                {success}
              </div>
            )}

            {error && (
              <div className="mt-3 rounded-2xl bg-red-500/20 border border-red-500/50 p-3 text-xs text-red-300">
                {error}
              </div>
            )}

            <button
              onClick={() => setShowApplyModal(true)}
              disabled={loading}
              className="btn-primary mt-4 w-full py-3 disabled:opacity-50"
            >
              {loading ? "Applying..." : "Apply Now"}
            </button>
            <button
              onClick={handleSaveJob}
              disabled={loading}
              className={`mt-2 w-full py-3 rounded-xl font-medium transition ${
                isSaved
                  ? "btn-primary"
                  : "btn-ghost"
              } disabled:opacity-50`}
            >
              {isSaved ? "✓ Saved" : "Save Job"}
            </button>
          </div>

          {/* Apply Modal */}
          {showApplyModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="glass rounded-3xl p-6 max-w-md w-full">
                <div className="text-xl font-bold">Apply for {job.title}</div>
                <div className="mt-2 text-sm text-white/60">
                  At {job.company}
                </div>

                <div className="mt-5">
                  <label className="block text-sm font-semibold mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Tell the employer why you're a great fit for this role..."
                    className="input min-h-[150px] resize-none"
                  />
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => {
                      setShowApplyModal(false);
                      setCoverLetter("");
                    }}
                    disabled={loading}
                    className="btn-ghost flex-1 py-3 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApply}
                    disabled={loading}
                    className="btn-primary flex-1 py-3 disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </div>
            </div>
          )}
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

