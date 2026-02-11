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
    salaryMin: {
      type: Number,
      default: 0
    },
    salaryMax: {
      type: Number,
      default: 0
    },
    salary: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    responsibilities: [
      {
        type: String,
        trim: true
      }
    ],
    qualifications: [
      {
        type: String,
        trim: true
      }
    ],
    requirements: [
      {
        type: String,
        trim: true
      }
    ],
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
      default: 'Full-time'
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide employer ID']
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
