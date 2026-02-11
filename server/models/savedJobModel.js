const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema(
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
    savedAt: {
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

// Ensure a seeker can't save the same job twice
savedJobSchema.index({ jobId: 1, seekerId: 1 }, { unique: true });

module.exports = mongoose.model('SavedJob', savedJobSchema);
