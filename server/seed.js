const mongoose = require('mongoose');
require('dotenv').config();
const Job = require('./models/jobModel');
const connectDB = require('./db');

const seedJobs = async () => {
  try {
    await connectDB();

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Cleared existing jobs');

    // Sample jobs data
    const jobs = [
      {
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'New York, NY',
        salary: '$80,000 - $100,000',
        description: 'Looking for an experienced Frontend Developer to join our team.',
        jobType: 'Full-time',
        requirements: ['React', 'JavaScript', 'CSS', 'HTML'],
        postedBy: 'Tech Corp HR',
        status: 'Active'
      },
      {
        title: 'Backend Developer',
        company: 'Software Solutions',
        location: 'San Francisco, CA',
        salary: '$90,000 - $120,000',
        description: 'Seeking a talented Backend Developer with experience in Node.js.',
        jobType: 'Full-time',
        requirements: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
        postedBy: 'Software Solutions HR',
        status: 'Active'
      },
      {
        title: 'Full Stack Developer',
        company: 'Web Innovations',
        location: 'Remote',
        salary: '$85,000 - $110,000',
        description: 'Join our team as a Full Stack Developer. Remote position available.',
        jobType: 'Full-time',
        requirements: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
        postedBy: 'Web Innovations HR',
        status: 'Active'
      },
      {
        title: 'DevOps Engineer',
        company: 'Cloud Systems',
        location: 'Austin, TX',
        salary: '$95,000 - $125,000',
        description: 'We are looking for a DevOps Engineer to maintain our cloud infrastructure.',
        jobType: 'Full-time',
        requirements: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        postedBy: 'Cloud Systems HR',
        status: 'Active'
      },
      {
        title: 'UI/UX Designer',
        company: 'Design Studio',
        location: 'Los Angeles, CA',
        salary: '$75,000 - $95,000',
        description: 'Creative UI/UX Designer needed for innovative projects.',
        jobType: 'Full-time',
        requirements: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        postedBy: 'Design Studio HR',
        status: 'Active'
      },
      {
        title: 'Data Scientist',
        company: 'Analytics Pro',
        location: 'Boston, MA',
        salary: '$100,000 - $130,000',
        description: 'Data Scientist to build machine learning models and analytics solutions.',
        jobType: 'Full-time',
        requirements: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
        postedBy: 'Analytics Pro HR',
        status: 'Active'
      }
    ];

    // Insert jobs into database
    const insertedJobs = await Job.insertMany(jobs);
    console.log(`Successfully inserted ${insertedJobs.length} jobs into the database`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedJobs();
