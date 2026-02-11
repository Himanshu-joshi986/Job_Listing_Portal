import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { applicationService } from "../services/dashboard";

export function JobCard({ job }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  const seekerId = localStorage.getItem("userId") || "demo-seeker-id";
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
      setSuccess("Application submitted!");
      setShowModal(false);
      setCoverLetter("");
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
        className="glass group rounded-3xl p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-bold tracking-tight">{job.title}</div>
            <div className="mt-1 text-sm text-white/70">{job.company}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip">{job.location}</span>
              <span className="chip">{job.type}</span>
              <span className="chip">{job.level}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-white/90">{job.salary}</div>
            <div className="mt-1 text-xs text-white/55">{job.postedAt}</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>

        {success && (
          <div className="mt-4 rounded-lg bg-green-500/20 border border-green-500/50 p-2 text-xs text-green-300">
            {success}
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-500/20 border border-red-500/50 p-2 text-xs text-red-300">
            {error}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <Link to={`/jobs/${job.id}`} className="btn-ghost">
            View Details
          </Link>
          <button
            onClick={() => setShowModal(true)}
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? "..." : "Apply"}
          </button>
        </div>
      </motion.div>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl p-6 max-w-md w-full">
            <div className="text-lg font-bold">{job.title}</div>
            <div className="mt-2 text-sm text-white/60">{job.company}</div>

            <div className="mt-5">
              <label className="block text-sm font-semibold mb-2">
                Cover Letter
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Why are you interested in this role?"
                className="input min-h-[120px] resize-none text-sm"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setCoverLetter("");
                  setError(null);
                }}
                disabled={loading}
                className="btn-ghost flex-1 py-2 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={loading}
                className="btn-primary flex-1 py-2 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

