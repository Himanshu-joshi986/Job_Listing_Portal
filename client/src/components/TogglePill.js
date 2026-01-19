import React from "react";
import { motion } from "framer-motion";

export function TogglePill({ options, value, onChange }) {
  return (
    <div className="glass inline-flex rounded-2xl p-1">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={[
              "relative rounded-xl px-3 py-2 text-sm font-semibold transition",
              active ? "text-white" : "text-white/65 hover:text-white",
            ].join(" ")}
          >
            {active ? (
              <motion.span
                layoutId="pill"
                className="absolute inset-0 rounded-xl bg-white/10"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            ) : null}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

