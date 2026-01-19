import React, { useMemo, useState } from "react";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";
import { FiltersBar } from "../components/FiltersBar";
import { JobCard } from "../components/JobCard";
import { Pagination } from "../components/Pagination";
import { JOBS, JOB_TYPES, LOCATIONS } from "../data/jobs";

function salaryBucket(job) {
  const s = (job.salary || "").toLowerCase();
  if (s.includes("$")) return "high";
  if (s.includes("35") || s.includes("28") || s.includes("1.8")) return "high";
  if (s.includes("18") || s.includes("16") || s.includes("1.2")) return "mid";
  return "low";
}

export function JobListingsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = JOBS.filter((j) => {
      const matchesQuery =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.tags.join(" ").toLowerCase().includes(q);
      const matchesType = !type || j.type === type;
      const matchesLoc = !location || j.location === location;
      const matchesSalary = !salary || salaryBucket(j) === salary;
      return matchesQuery && matchesType && matchesLoc && matchesSalary;
    });

    if (sort === "company") list = list.sort((a, b) => a.company.localeCompare(b.company));
    if (sort === "salaryDesc") list = list.sort((a, b) => (salaryBucket(a) < salaryBucket(b) ? 1 : -1));

    return list;
  }, [query, type, location, salary, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  React.useEffect(() => {
    setPage(1);
  }, [query, type, location, salary, sort]);

  return (
    <PageShell className="container-app">
      <SectionHeading
        eyebrow="Job listings"
        title="Find your next role"
        subtitle="Search and filter through jobs using dummy JSON data. UI-only—no APIs."
        right={
          <div className="hidden sm:flex gap-2">
            <span className="chip">{filtered.length} results</span>
            <span className="chip">UI-only</span>
          </div>
        }
      />

      <div className="mt-6">
        <FiltersBar
          query={query}
          onQueryChange={setQuery}
          type={type}
          onTypeChange={setType}
          location={location}
          onLocationChange={setLocation}
          salary={salary}
          onSalaryChange={setSalary}
          jobTypes={JOB_TYPES}
          locations={LOCATIONS}
          sort={sort}
          onSortChange={setSort}
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paged.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {paged.length === 0 ? (
        <div className="glass mt-6 rounded-3xl p-10 text-center">
          <div className="text-lg font-bold">No matches</div>
          <p className="mt-2 text-sm text-white/60">
            Try removing some filters or searching a different keyword.
          </p>
          <div className="mt-5">
            <button
              className="btn-ghost"
              onClick={() => {
                setQuery("");
                setType("");
                setLocation("");
                setSalary("");
                setSort("recent");
              }}
            >
              Reset filters
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-8 glass rounded-3xl p-5">
        <Pagination
          page={Math.min(page, totalPages)}
          totalPages={totalPages}
          onChange={(p) => setPage(Math.max(1, Math.min(totalPages, p)))}
        />
      </div>
    </PageShell>
  );
}

