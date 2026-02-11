const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Please provide a job ID']
    },
    seekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a seeker ID']
    },
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide an employer ID']
    },
    status: {
      type: String,
      enum: ['Applied', 'In Review', 'Shortlisted', 'Rejected', 'Accepted'],
      default: 'Applied'
    },
    coverLetter: {
      type: String,
      default: null
    },
    resume: {
      type: String,
      default: null
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
