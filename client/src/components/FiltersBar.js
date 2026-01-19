import React from "react";

export function FiltersBar({
  query,
  onQueryChange,
  type,
  onTypeChange,
  location,
  onLocationChange,
  salary,
  onSalaryChange,
  jobTypes,
  locations,
  sort,
  onSortChange,
}) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="grid gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Search
          </div>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="input mt-2"
            placeholder="Role, company, keyword..."
          />
        </div>

        <div className="md:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Type
          </div>
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className="input mt-2"
          >
            <option value="">All</option>
            {jobTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Location
          </div>
          <select
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="input mt-2"
          >
            <option value="">Any</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Salary
          </div>
          <select
            value={salary}
            onChange={(e) => onSalaryChange(e.target.value)}
            className="input mt-2"
          >
            <option value="">Any</option>
            <option value="low">Entry</option>
            <option value="mid">Mid</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="md:col-span-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
            Sort
          </div>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="input mt-2"
          >
            <option value="recent">Recent</option>
            <option value="salaryDesc">Salary</option>
            <option value="company">Company</option>
          </select>
        </div>
      </div>
    </div>
  );
}

