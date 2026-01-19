import React from "react";
import { motion } from "framer-motion";

export function FeatureCard({ title, description, icon }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="glass group relative overflow-hidden rounded-3xl p-6"
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blue-500/15 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-violet-500/15 blur-2xl" />
      </div>
      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85">
          {icon}
        </div>
        <div className="text-lg font-bold tracking-tight">{title}</div>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

