const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile/:userId', async (req, res) => {
  try {
    // Don't allow direct password updates through this route
    const { password, ...updateData } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get seeker dashboard stats
router.get('/dashboard/seeker/:seekerId', async (req, res) => {
  try {
    const Application = require('../models/applicationModel');
    const SavedJob = require('../models/savedJobModel');

    const appliedJobs = await Application.find({ seekerId: req.params.seekerId })
      .populate('jobId')
      .sort({ appliedAt: -1 });

    const savedJobs = await SavedJob.find({ seekerId: req.params.seekerId })
      .populate('jobId')
      .sort({ savedAt: -1 });

    const user = await User.findById(req.params.seekerId).select('-password');

    res.json({
      user,
      appliedJobs,
      savedJobs,
      stats: {
        applicationCount: appliedJobs.length,
        savedCount: savedJobs.length,
        inReviewCount: appliedJobs.filter(app => app.status === 'In Review').length,
        shortlistedCount: appliedJobs.filter(app => app.status === 'Shortlisted').length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get employer dashboard stats
router.get('/dashboard/employer/:employerId', async (req, res) => {
  try {
    const Job = require('../models/jobModel');
    const Application = require('../models/applicationModel');

    const postedJobs = await Job.find({ postedBy: req.params.employerId }).sort({ createdAt: -1 });

    const applications = await Application.find({ employerId: req.params.employerId })
      .populate('jobId')
      .populate('seekerId', '-password')
      .sort({ appliedAt: -1 });

    const totalApplicants = applications.length;
    const totalApplications = applications.length;

    // Calculate response rate (percentage of applications reviewed or more)
    const reviewedApplications = applications.filter(
      app => ['In Review', 'Shortlisted', 'Rejected', 'Accepted'].includes(app.status)
    ).length;
    const responseRate = totalApplications > 0 
      ? Math.round((reviewedApplications / totalApplications) * 100)
      : 0;

    const user = await User.findById(req.params.employerId).select('-password');

    res.json({
      user,
      postedJobs,
      applications,
      stats: {
        postedJobsCount: postedJobs.length,
        applicantsCount: totalApplicants,
        responseRate,
        activeJobsCount: postedJobs.filter(job => job.status === 'Active').length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload resume
router.post('/resume/:userId', async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    if (!resumeUrl) {
      return res.status(400).json({ message: 'Please provide a resume URL' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { resume: resumeUrl, updatedAt: new Date() },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Resume uploaded successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
