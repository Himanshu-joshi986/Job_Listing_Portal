const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    firstName: {
      type: String,
      required: [true, 'Please provide a first name'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Please provide a last name'],
      trim: true
    },
    role: {
      type: String,
      enum: ['seeker', 'employer'],
      required: [true, 'Please specify a role']
    },
    // For job seekers
    resume: {
      type: String,
      default: null
    },
    skills: [
      {
        type: String,
        trim: true
      }
    ],
    experience: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: null
    },
    profileStrength: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    // For employers
    companyName: {
      type: String,
      default: null
    },
    companyDescription: {
      type: String,
      default: null
    },
    companyWebsite: {
      type: String,
      default: null
    },
    companySize: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-500', '500+'],
      default: null
    },
    industry: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      default: null
    },
    profileImage: {
      type: String,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
