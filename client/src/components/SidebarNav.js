import React from "react";
import { NavLink } from "react-router-dom";

export function SidebarNav({ title, items }) {
  return (
    <aside className="glass hidden h-fit rounded-3xl p-4 md:block">
      <div className="px-2 py-2 text-sm font-semibold text-white/85">
        {title}
      </div>
      <div className="mt-2 grid gap-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              [
                "rounded-2xl px-3 py-3 text-sm font-semibold transition",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/6 hover:text-white",
              ].join(" ")
            }
          >
            <div className="flex items-center justify-between">
              <span>{it.label}</span>
              {it.badge ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
                  {it.badge}
                </span>
              ) : null}
            </div>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

