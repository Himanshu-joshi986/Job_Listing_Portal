const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
      maxlength: [100, 'Job title cannot be more than 100 characters']
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      trim: true,
      maxlength: [100, 'Company name cannot be more than 100 characters']
    },
    location: {
      type: String,
      required: [true, 'Please provide a job location'],
      trim: true
    },
    salary: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      default: 'Full-time'
    },
    requirements: [
      {
        type: String,
        trim: true
      }
    ],
    postedBy: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['Active', 'Closed', 'On Hold'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Job', jobSchema);
