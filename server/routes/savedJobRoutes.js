const express = require('express');
const router = express.Router();
const SavedJob = require('../models/savedJobModel');

// Save a job
router.post('/save', async (req, res) => {
  try {
    const { jobId, seekerId, notes } = req.body;

    if (!jobId || !seekerId) {
      return res.status(400).json({ message: 'Please provide jobId and seekerId' });
    }

    // Check if already saved
    const existingSavedJob = await SavedJob.findOne({ jobId, seekerId });
    if (existingSavedJob) {
      return res.status(400).json({ message: 'You have already saved this job' });
    }

    const savedJob = new SavedJob({
      jobId,
      seekerId,
      notes
    });

    const saved = await savedJob.save();
    const populatedSavedJob = await saved.populate('jobId');

    res.status(201).json(populatedSavedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get saved jobs for a seeker
router.get('/seeker/:seekerId', async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ seekerId: req.params.seekerId })
      .populate('jobId')
      .sort({ savedAt: -1 });

    res.json(savedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove a saved job
router.delete('/:savedJobId', async (req, res) => {
  try {
    const savedJob = await SavedJob.findByIdAndDelete(req.params.savedJobId);

    if (!savedJob) {
      return res.status(404).json({ message: 'Saved job not found' });
    }

    res.json({ message: 'Job removed from saved', savedJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update saved job notes
router.put('/:savedJobId', async (req, res) => {
  try {
    const { notes } = req.body;

    const savedJob = await SavedJob.findByIdAndUpdate(
      req.params.savedJobId,
      { notes, updatedAt: new Date() },
      { new: true }
    ).populate('jobId');

    if (!savedJob) {
      return res.status(404).json({ message: 'Saved job not found' });
    }

    res.json(savedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check if job is saved
router.get('/check/:jobId/:seekerId', async (req, res) => {
  try {
    const savedJob = await SavedJob.findOne({
      jobId: req.params.jobId,
      seekerId: req.params.seekerId
    });

    res.json({ isSaved: !!savedJob, savedJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
