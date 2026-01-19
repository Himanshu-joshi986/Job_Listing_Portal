const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample data - In production, this would come from a database
const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    salary: '$80,000 - $100,000'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Software Solutions',
    location: 'San Francisco, CA',
    salary: '$90,000 - $120,000'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'Web Innovations',
    location: 'Remote',
    salary: '$85,000 - $110,000'
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    location: 'Austin, TX',
    salary: '$95,000 - $125,000'
  }
];

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Job Listing Portal API' });
});

app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.json(job);
});

app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: jobs.length + 1,
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    salary: req.body.salary
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
