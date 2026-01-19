import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialSlider({ items }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 4200);
    return () => clearInterval(t);
  }, [items.length]);

  const item = items[index];

  return (
    <div className="glass overflow-hidden rounded-3xl p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-white/80">
          Testimonials
        </div>
        <div className="flex gap-2">
          <button
            className="btn-ghost px-3 py-2"
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          >
            Prev
          </button>
          <button
            className="btn-ghost px-3 py-2"
            onClick={() => setIndex((i) => (i + 1) % items.length)}
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-5 min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="text-lg leading-relaxed text-white/90">
              “{item.quote}”
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                <span className="text-xs font-extrabold">
                  {item.name
                    .split(" ")
                    .slice(0, 2)
                    .map((s) => s[0])
                    .join("")}
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-xs text-white/55">{item.role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            className={[
              "h-2 w-2 rounded-full transition",
              i === index ? "bg-white/70" : "bg-white/20 hover:bg-white/35",
            ].join(" ")}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

