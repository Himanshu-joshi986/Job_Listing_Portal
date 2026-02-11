import React, { useEffect, useState } from "react";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";
import { SidebarNav } from "../components/SidebarNav";
import { StatCard } from "../components/StatCard";
import { JobManagementModal } from "../components/JobManagementModal";
import { motion } from "framer-motion";
import { dashboardService, applicationService, jobService } from "../services/dashboard";

export function EmployerDashboardPage() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Use hardcoded userId for now - in production, get from auth context
  const employerId = localStorage.getItem("userId") || "demo-employer-id";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getEmployerDashboard(employerId);
        setUserProfile(data.user);
        setPostedJobs(data.postedJobs);
        setApplications(data.applications);
        setStats(data.stats);
      } catch (err) {
        setError(err.message);
        console.error("Error loading employer dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [employerId]);

  const handleUpdateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const updated = await applicationService.updateApplicationStatus(
        applicationId,
        newStatus
      );
      setApplications(
        applications.map(app => app._id === applicationId ? updated : app)
      );
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  const handleCreateJob = () => {
    setEditingJob(null);
    setShowJobModal(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowJobModal(true);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await jobService.deleteJob(jobId);
      setPostedJobs(postedJobs.filter(job => job._id !== jobId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleJobSaved = async () => {
    try {
      const jobs = await jobService.getEmployerJobs(employerId);
      setPostedJobs(jobs);
    } catch (error) {
      console.error("Error refreshing jobs:", error);
    }
  };

  const navItems = [
    { to: "/dashboard/employer", label: "Overview", badge: stats.applicantsCount?.toString() || "0" },
    { to: "/jobs", label: "Browse Jobs" },
    { to: "/profile", label: "Company Profile" },
  ];

  return (
    <PageShell className="container-app">
      <SectionHeading
        eyebrow="Employer"
        title="Dashboard"
        subtitle="Company profile, create listing, manage posted jobs, and track applicants."
        right={<span className="chip">Employer Mode</span>}
      />

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <SidebarNav title="Navigation" items={navItems} />
          <div className="mt-6 glass rounded-3xl p-6">
            <div className="text-sm font-semibold text-white/85">
              Company profile
            </div>
            {loading ? (
              <div className="mt-3 text-white/55">Loading...</div>
            ) : (
              <>
                <div className="mt-3 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                    <span className="text-sm font-extrabold">
                      {userProfile?.companyName?.slice(0, 2).toUpperCase() || "NW"}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      {userProfile?.companyName || "Your Company"}
                    </div>
                    <div className="text-xs text-white/55">
                      {userProfile?.industry || "Industry not set"}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/60">
                  {userProfile?.companyDescription || "Add a company description"}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button className="btn-ghost w-full py-3">Edit</button>
                  <button className="btn-primary w-full py-3">Upgrade</button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="md:col-span-8 grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 md:grid-cols-3"
          >
            <StatCard
              label="Posted jobs"
              value={stats.postedJobsCount || "0"}
              hint={`${stats.activeJobsCount || 0} active`}
            />
            <StatCard
              label="Applicants"
              value={stats.applicantsCount || "0"}
              hint="Applications received"
            />
            <StatCard
              label="Response rate"
              value={`${stats.responseRate || 0}%`}
              hint="Applications reviewed"
            />
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold tracking-tight">
                    Create Job Listing
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    Post a new job to attract candidates.
                  </div>
                </div>
                <span className="chip">Full Form</span>
              </div>

              <div className="mt-5">
                <button
                  onClick={handleCreateJob}
                  className="btn-primary w-full py-3"
                >
                  + Create New Job
                </button>
              </div>

              <div className="mt-4 p-4 bg-white/5 rounded-xl text-sm text-white/60">
                Click the button above to create a complete job listing with:
                <ul className="mt-2 space-y-1 text-xs">
                  <li>✓ Job title & description</li>
                  <li>✓ Qualifications & responsibilities</li>
                  <li>✓ Location & salary range</li>
                  <li>✓ Job type & requirements</li>
                </ul>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold tracking-tight">
                    Posted Jobs
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    Manage your job listings.
                  </div>
                </div>
                <span className="chip">{stats.postedJobsCount || "0"}</span>
              </div>

              <div className="mt-5 grid gap-3 max-h-[400px] overflow-y-auto">
                {postedJobs.length > 0 ? (
                  postedJobs.map((job) => (
                    <div
                      key={job._id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">{job.title}</div>
                          <div className="mt-1 text-xs text-white/55">
                            {job.location} • {job.jobType}
                          </div>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                          {job.status || "Active"}
                        </span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleEditJob(job)}
                          className="btn-ghost px-3 py-2 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(job._id)}
                          className="btn-ghost px-3 py-2 text-xs text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                        <button className="btn-primary ml-auto px-3 py-2 text-xs">
                          View
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-white/55 py-4">
                    No posted jobs yet. Create your first listing!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold tracking-tight">
                  Recent Applications
                </div>
                <div className="mt-1 text-sm text-white/60">
                  Review and manage applicants.
                </div>
              </div>
              <span className="chip">{stats.applicantsCount || "0"} total</span>
            </div>

            <div className="mt-5 grid gap-3 max-h-[500px] overflow-y-auto">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <div
                    key={app._id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="text-sm font-semibold">
                          {app.seekerId?.firstName} {app.seekerId?.lastName}
                        </div>
                        <div className="mt-1 text-xs text-white/55">
                          Applied for: {app.jobId?.title}
                        </div>
                        <div className="mt-1 text-xs text-white/55">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <select
                        className="input text-xs px-2 py-1"
                        value={app.status}
                        onChange={(e) =>
                          handleUpdateApplicationStatus(app._id, e.target.value)
                        }
                      >
                        <option value="Applied">Applied</option>
                        <option value="In Review">In Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Accepted">Accepted</option>
                      </select>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="btn-ghost px-3 py-2 text-xs">
                        View Profile
                      </button>
                      <button className="btn-primary px-3 py-2 text-xs">
                        Message
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-white/55 py-4">
                  No applications yet. Wait for candidates to apply!
                </div>
              )}
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {deleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="glass rounded-3xl p-6 max-w-sm mx-auto">
                <div className="text-lg font-bold">Delete Job Listing?</div>
                <div className="mt-2 text-sm text-white/60">
                  This action cannot be undone. The job listing and its associated applications will be removed.
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="btn-ghost flex-1 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteJob(deleteConfirm)}
                    className="btn-primary flex-1 py-2 bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Job Management Modal */}
          <JobManagementModal
            isOpen={showJobModal}
            onClose={() => setShowJobModal(false)}
            onJobSaved={handleJobSaved}
            editingJob={editingJob}
          />
        </div>
      </div>
    </PageShell>
  );
}

