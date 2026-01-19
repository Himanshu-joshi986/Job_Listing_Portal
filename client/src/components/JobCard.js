import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function JobCard({ job }) {
  return (
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

      <div className="mt-5 flex items-center justify-between">
        <Link to={`/jobs/${job.id}`} className="btn-ghost">
          View Details
        </Link>
        <button className="btn-primary">Apply</button>
      </div>
    </motion.div>
  );
}

