import React, { useEffect, useMemo, useState } from "react";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";
import { SidebarNav } from "../components/SidebarNav";
import { JOBS } from "../data/jobs";
import { motion } from "framer-motion";
import { dashboardService, applicationService, savedJobService } from "../services/dashboard";

function UploadCard({ title, subtitle, onUpload }) {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setLoading(true);
      try {
        // In a real scenario, upload to cloud storage first
        // For now, just calling the upload function
        await onUpload(file);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-bold tracking-tight">{title}</div>
          <div className="mt-1 text-sm text-white/60">{subtitle}</div>
        </div>
        <span className="chip">{loading ? "Uploading..." : "Active"}</span>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="btn-ghost cursor-pointer">
          {loading ? "Uploading..." : "Choose file"}
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>
        <div className="text-sm text-white/55">
          {fileName ? (
            <span className="text-white/80">{fileName}</span>
          ) : (
            "No file selected"
          )}
        </div>
      </div>
    </div>
  );
}

export function SeekerDashboardPage() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use hardcoded userId for now - in production, get from auth context
  const userId = localStorage.getItem("userId") || "demo-seeker-id";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getSeekerDashboard(userId);
        setUserProfile(data.user);
        setAppliedJobs(data.appliedJobs);
        setSavedJobs(data.savedJobs);
        setStats(data.stats);
      } catch (err) {
        setError(err.message);
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  const handleResumeUpload = async (file) => {
    try {
      // In a real implementation, upload file to cloud storage
      // For now, just simulate it
      const resumeUrl = URL.createObjectURL(file);
      await dashboardService.uploadResume(userId, resumeUrl);
    } catch (error) {
      console.error("Resume upload error:", error);
    }
  };

  const handleRemoveSavedJob = async (savedJobId) => {
    try {
      await savedJobService.removeSavedJob(savedJobId);
      setSavedJobs(savedJobs.filter(job => job._id !== savedJobId));
    } catch (error) {
      console.error("Error removing saved job:", error);
    }
  };

  const navItems = [
    { to: "/dashboard/seeker", label: "Overview", badge: "New" },
    { to: "/jobs", label: "Find Jobs" },
    { to: "/profile", label: "Edit Profile" },
  ];

  if (loading) {
    return (
      <PageShell className="container-app">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-white/60">Loading dashboard...</div>
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell className="container-app">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-400">Error: {error}</div>
        </div>
      </PageShell>
    );
  }

  const initials = userProfile
    ? `${userProfile.firstName?.charAt(0) || ''}${userProfile.lastName?.charAt(0) || ''}`.toUpperCase()
    : "HJ";

  return (
    <PageShell className="container-app">
      <SectionHeading
        eyebrow="Job Seeker"
        title="Dashboard"
        subtitle="Profile, resume upload, applied jobs, and saved jobs."
        right={<span className="chip">Seeker Mode</span>}
      />

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <SidebarNav title="Navigation" items={navItems} />
          <div className="mt-6 glass rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                <span className="text-sm font-extrabold">{initials}</span>
              </div>
              <div>
                <div className="text-sm font-semibold">
                  {userProfile?.firstName} {userProfile?.lastName}
                </div>
                <div className="text-xs text-white/55">
                  {userProfile?.skills?.join(" • ") || "Add your skills"}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div className="glass rounded-2xl p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  Profile strength
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                    style={{ width: `${userProfile?.profileStrength || 0}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-white/55">
                  {userProfile?.profileStrength || 0}% complete
                </div>
              </div>
              <button className="btn-primary w-full py-3">
                Quick Apply Settings
              </button>
              <button className="btn-ghost w-full py-3">Manage Alerts</button>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 lg:grid-cols-2"
          >
            <UploadCard
              title="Resume upload"
              subtitle="Upload a PDF/DOC resume."
              onUpload={handleResumeUpload}
            />
            <div className="glass rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold tracking-tight">
                    Applied jobs
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    Track your applications.
                  </div>
                </div>
                <span className="chip">{stats.applicationCount || 0} active</span>
              </div>
              <div className="mt-5 grid gap-3">
                {appliedJobs.length > 0 ? (
                  appliedJobs.map((app) => (
                    <div
                      key={app._id}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div>
                        <div className="text-sm font-semibold">{app.jobId?.title}</div>
                        <div className="mt-1 text-xs text-white/55">
                          {app.jobId?.company} • {app.jobId?.location}
                        </div>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        {app.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-white/55 py-4">
                    No applications yet. Start applying to jobs!
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="glass rounded-3xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold tracking-tight">
                  Saved jobs
                </div>
                <div className="mt-1 text-sm text-white/60">
                  Shortlist roles and come back later.
                </div>
              </div>
              <span className="chip">{stats.savedCount || 0} saved</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {savedJobs.length > 0 ? (
                savedJobs.map((saved) => (
                  <div
                    key={saved._id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="text-sm font-semibold">{saved.jobId?.title}</div>
                    <div className="mt-1 text-xs text-white/55">
                      {saved.jobId?.company} • {saved.jobId?.jobType}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        className="btn-ghost px-3 py-2 text-xs"
                        onClick={() => handleRemoveSavedJob(saved._id)}
                      >
                        Remove
                      </button>
                      <button className="btn-primary px-3 py-2 text-xs">
                        Apply
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-white/55 py-4 md:col-span-2">
                  No saved jobs yet. Save jobs to apply later!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

