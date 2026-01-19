import React from "react";
import { motion } from "framer-motion";

export function StatCard({ label, value, hint }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className="glass rounded-3xl p-5"
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
        {label}
      </div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight">{value}</div>
      {hint ? <div className="mt-1 text-xs text-white/55">{hint}</div> : null}
    </motion.div>
  );
}

