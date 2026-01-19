import React from "react";

export function SectionHeading({ eyebrow, title, subtitle, right }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            {eyebrow}
          </div>
        ) : null}
        <div className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
          {title}
        </div>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm text-white/60">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </div>
  );
}

