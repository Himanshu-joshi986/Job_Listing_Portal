const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export const dashboardService = {
  // Seeker Dashboard
  getSeekerDashboard: async (seekerId) => {
    try {
      const response = await fetch(`${API_BASE}/users/dashboard/seeker/${seekerId}`);
      if (!response.ok) throw new Error('Failed to fetch seeker dashboard');
      return await response.json();
    } catch (error) {
      console.error('Error fetching seeker dashboard:', error);
      throw error;
    }
  },

  // Employer Dashboard
  getEmployerDashboard: async (employerId) => {
    try {
      const response = await fetch(`${API_BASE}/users/dashboard/employer/${employerId}`);
      if (!response.ok) throw new Error('Failed to fetch employer dashboard');
      return await response.json();
    } catch (error) {
      console.error('Error fetching employer dashboard:', error);
      throw error;
    }
  },

  // User Profile
  getUserProfile: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/users/profile/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user profile');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update User Profile
  updateUserProfile: async (userId, profileData) => {
    try {
      const response = await fetch(`${API_BASE}/users/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Upload Resume
  uploadResume: async (userId, resumeUrl) => {
    try {
      const response = await fetch(`${API_BASE}/users/resume/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resumeUrl })
      });
      if (!response.ok) throw new Error('Failed to upload resume');
      return await response.json();
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error;
    }
  }
};

export const applicationService = {
  // Apply for a job
  applyForJob: async (jobId, seekerId, employerId, coverLetter) => {
    try {
      const response = await fetch(`${API_BASE}/applications/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobId,
          seekerId,
          employerId,
          coverLetter
        })
      });
      if (!response.ok) throw new Error('Failed to apply for job');
      return await response.json();
    } catch (error) {
      console.error('Error applying for job:', error);
      throw error;
    }
  },

  // Get seeker applications
  getSeekerApplications: async (seekerId) => {
    try {
      const response = await fetch(`${API_BASE}/applications/seeker/${seekerId}`);
      if (!response.ok) throw new Error('Failed to fetch applications');
      return await response.json();
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Get employer applications
  getEmployerApplications: async (employerId) => {
    try {
      const response = await fetch(`${API_BASE}/applications/employer/${employerId}`);
      if (!response.ok) throw new Error('Failed to fetch applications');
      return await response.json();
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Update application status
  updateApplicationStatus: async (applicationId, status, notes) => {
    try {
      const response = await fetch(`${API_BASE}/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, notes })
      });
      if (!response.ok) throw new Error('Failed to update application');
      return await response.json();
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  },

  // Delete application
  deleteApplication: async (applicationId) => {
    try {
      const response = await fetch(`${API_BASE}/applications/${applicationId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete application');
      return await response.json();
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }
};

export const savedJobService = {
  // Save a job
  saveJob: async (jobId, seekerId, notes) => {
    try {
      const response = await fetch(`${API_BASE}/saved-jobs/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobId,
          seekerId,
          notes
        })
      });
      if (!response.ok) throw new Error('Failed to save job');
      return await response.json();
    } catch (error) {
      console.error('Error saving job:', error);
      throw error;
    }
  },

  // Get saved jobs
  getSavedJobs: async (seekerId) => {
    try {
      const response = await fetch(`${API_BASE}/saved-jobs/seeker/${seekerId}`);
      if (!response.ok) throw new Error('Failed to fetch saved jobs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      throw error;
    }
  },

  // Remove saved job
  removeSavedJob: async (savedJobId) => {
    try {
      const response = await fetch(`${API_BASE}/saved-jobs/${savedJobId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to remove saved job');
      return await response.json();
    } catch (error) {
      console.error('Error removing saved job:', error);
      throw error;
    }
  },

  // Check if job is saved
  checkIfSaved: async (jobId, seekerId) => {
    try {
      const response = await fetch(`${API_BASE}/saved-jobs/check/${jobId}/${seekerId}`);
      if (!response.ok) throw new Error('Failed to check saved status');
      return await response.json();
    } catch (error) {
      console.error('Error checking saved status:', error);
      throw error;
    }
  }
};

export const jobService = {
  // Get all jobs
  getAllJobs: async () => {
    try {
      const response = await fetch(`${API_BASE}/jobs`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  // Get single job
  getJob: async (jobId) => {
    try {
      const response = await fetch(`${API_BASE}/jobs/${jobId}`);
      if (!response.ok) throw new Error('Failed to fetch job');
      return await response.json();
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  },

  // Get jobs by employer
  getEmployerJobs: async (employerId) => {
    try {
      const response = await fetch(`${API_BASE}/jobs/employer/${employerId}`);
      if (!response.ok) throw new Error('Failed to fetch employer jobs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching employer jobs:', error);
      throw error;
    }
  },

  // Create job
  createJob: async (jobData) => {
    try {
      const response = await fetch(`${API_BASE}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });
      if (!response.ok) throw new Error('Failed to create job');
      return await response.json();
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  // Update job
  updateJob: async (jobId, jobData) => {
    try {
      const response = await fetch(`${API_BASE}/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });
      if (!response.ok) throw new Error('Failed to update job');
      return await response.json();
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  // Delete job
  deleteJob: async (jobId) => {
    try {
      const response = await fetch(`${API_BASE}/jobs/${jobId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete job');
      return await response.json();
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },

  // Change job status
  updateJobStatus: async (jobId, status) => {
    try {
      const response = await fetch(`${API_BASE}/jobs/${jobId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update job status');
      return await response.json();
    } catch (error) {
      console.error('Error updating job status:', error);
      throw error;
    }
  },

  // Search jobs
  searchJobs: async (query) => {
    try {
      const params = new URLSearchParams(query);
      const response = await fetch(`${API_BASE}/jobs/search?${params}`);
      if (!response.ok) throw new Error('Failed to search jobs');
      return await response.json();
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  }
};
