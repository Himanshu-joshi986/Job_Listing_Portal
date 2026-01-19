import React from "react";

export function Pagination({ page, totalPages, onChange }) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pages = [];
  for (let p = 1; p <= totalPages; p++) pages.push(p);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-white/60">
        Page <span className="text-white/85">{page}</span> of{" "}
        <span className="text-white/85">{totalPages}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          className="btn-ghost px-3 py-2 disabled:opacity-40"
          disabled={!canPrev}
          onClick={() => onChange(page - 1)}
        >
          Prev
        </button>
        <div className="flex flex-wrap gap-2">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={[
                "h-10 w-10 rounded-xl border text-sm font-semibold transition",
                p === page
                  ? "border-white/15 bg-white/12 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/8 hover:text-white",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          className="btn-ghost px-3 py-2 disabled:opacity-40"
          disabled={!canNext}
          onClick={() => onChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

