const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'Active' })
      .populate('postedBy', 'companyName email')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'companyName email location');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get jobs posted by employer
router.get('/employer/:employerId', async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.employerId })
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new job
router.post('/', async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salaryMin,
      salaryMax,
      salary,
      description,
      jobType,
      requirements,
      qualifications,
      responsibilities,
      postedBy
    } = req.body;

    // Validate required fields
    if (!title || !company || !location || !postedBy) {
      return res.status(400).json({
        message: 'Please provide title, company, location, and postedBy (employer ID)'
      });
    }

    const newJob = new Job({
      title,
      company,
      location,
      salaryMin: salaryMin || 0,
      salaryMax: salaryMax || 0,
      salary: salary || `$${salaryMin}-$${salaryMax}`,
      description,
      jobType: jobType || 'Full-time',
      requirements: requirements || [],
      qualifications: qualifications || [],
      responsibilities: responsibilities || [],
      postedBy,
      status: 'Active'
    });

    const savedJob = await newJob.save();
    await savedJob.populate('postedBy', 'companyName email');

    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salaryMin,
      salaryMax,
      salary,
      description,
      jobType,
      requirements,
      qualifications,
      responsibilities,
      status
    } = req.body;

    // Build update object
    const updateData = {
      title,
      company,
      location,
      description,
      jobType,
      requirements,
      qualifications,
      responsibilities,
      status
    };

    // Handle salary
    if (salaryMin !== undefined && salaryMax !== undefined) {
      updateData.salaryMin = salaryMin;
      updateData.salaryMax = salaryMax;
      updateData.salary = salary || `$${salaryMin}-$${salaryMax}`;
    } else if (salary) {
      updateData.salary = salary;
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('postedBy', 'companyName email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully', job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change job status (Active, Closed, On Hold)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Active', 'Closed', 'On Hold'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status. Must be Active, Closed, or On Hold'
      });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search jobs
router.get('/search', async (req, res) => {
  try {
    const { keyword, location, jobType, minSalary, maxSalary } = req.query;

    let filter = { status: 'Active' };

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (minSalary || maxSalary) {
      filter.$and = [
        { salaryMax: { $gte: minSalary || 0 } },
        { salaryMin: { $lte: maxSalary || 999999 } }
      ];
    }

    const jobs = await Job.find(filter)
      .populate('postedBy', 'companyName')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
