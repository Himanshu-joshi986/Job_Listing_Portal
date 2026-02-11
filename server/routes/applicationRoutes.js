const express = require('express');
const router = express.Router();
const Application = require('../models/applicationModel');
const SavedJob = require('../models/savedJobModel');
const Job = require('../models/jobModel');

// Apply for a job
router.post('/apply', async (req, res) => {
  try {
    const { jobId, seekerId, employerId, coverLetter } = req.body;

    if (!jobId || !seekerId || !employerId) {
      return res.status(400).json({ message: 'Please provide jobId, seekerId, and employerId' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({ jobId, seekerId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      jobId,
      seekerId,
      employerId,
      coverLetter,
      status: 'Applied'
    });

    const savedApplication = await application.save();
    const populatedApplication = await savedApplication
      .populate('jobId')
      .populate('seekerId', '-password')
      .execPopulate ? await savedApplication.populate('jobId').populate('seekerId', '-password') : savedApplication;

    res.status(201).json(populatedApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get applications for a seeker
router.get('/seeker/:seekerId', async (req, res) => {
  try {
    const applications = await Application.find({ seekerId: req.params.seekerId })
      .populate('jobId')
      .populate('employerId', '-password')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get applications for an employer
router.get('/employer/:employerId', async (req, res) => {
  try {
    const applications = await Application.find({ employerId: req.params.employerId })
      .populate('jobId')
      .populate('seekerId', '-password')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update application status
router.put('/:applicationId', async (req, res) => {
  try {
    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Please provide a status' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      { status, notes, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('jobId').populate('seekerId', '-password');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single application
router.get('/:applicationId', async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId)
      .populate('jobId')
      .populate('seekerId', '-password')
      .populate('employerId', '-password');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete application
router.delete('/:applicationId', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
