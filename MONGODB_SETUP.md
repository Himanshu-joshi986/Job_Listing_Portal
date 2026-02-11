# MongoDB Setup Guide for Job Listing Portal

## Overview
Your Job Listing Portal is now configured to use MongoDB Atlas for online data storage. Here's how to get it running:

---

## Step 1: Install Dependencies

In the `server` directory, install the new MongoDB dependencies:

```bash
npm install
```

This will install:
- **mongoose**: MongoDB object modeling for Node.js
- All other existing dependencies

---

## Step 2: Set Up MongoDB Atlas (Free)

### Create a MongoDB Account:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and create a new account
3. Verify your email

### Create a Cluster:
1. After login, click "Create a Deployment"
2. Choose the **FREE** M0 tier (always free)
3. Select your preferred region (e.g., us-east-1)
4. Click "Create Deployment"
5. Wait 5-10 minutes for the cluster to be created

### Get Your Connection String:
1. In Atlas, click "Databases" on the left sidebar
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Select "Node.js" and version 4.1 or later
5. Copy the connection string

---

## Step 3: Configure Environment Variables

1. Open `server/.env`
2. Replace the placeholder with your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@clustername.mongodb.net/jobportal?retryWrites=true&w=majority
```

**Important:**
- Replace `yourUsername` and `yourPassword` with credentials you created in Atlas
- Replace `clustername` with your actual cluster name
- Keep `jobportal` as the database name

---

## Step 4: Seed Initial Data

To populate your database with sample jobs:

```bash
npm run seed
```

This will:
- Connect to your MongoDB database
- Clear any existing jobs
- Add 6 sample job listings

---

## Step 5: Start Your Server

Run the development server:

```bash
npm run dev
```

Or for production:

```bash
npm start
```

You should see:
```
MongoDB Connected: clustername.mongodb.net
Server is running on port 5000
```

---

## API Endpoints

Your server now supports the following MongoDB-powered endpoints:

### GET /api/jobs
- **Description**: Fetch all active jobs
- **Response**: Array of job objects

### GET /api/jobs/:id
- **Description**: Fetch a specific job by ID
- **URL Parameter**: `id` (MongoDB ObjectId)
- **Response**: Single job object

### POST /api/jobs
- **Description**: Create a new job listing
- **Body**: 
```json
{
  "title": "Job Title",
  "company": "Company Name",
  "location": "City, State",
  "salary": "$X - $Y",
  "description": "Job description",
  "jobType": "Full-time|Part-time|Contract|Freelance|Internship",
  "requirements": ["Skill 1", "Skill 2"],
  "postedBy": "Hiring Manager Name"
}
```

### PUT /api/jobs/:id
- **Description**: Update a job listing
- **URL Parameter**: `id` (MongoDB ObjectId)
- **Body**: Any fields to update

### DELETE /api/jobs/:id
- **Description**: Delete a job listing
- **URL Parameter**: `id` (MongoDB ObjectId)

---

## File Structure

New files created:
```
server/
├── .env                    # MongoDB connection string
├── db.js                   # Database connection logic
├── seed.js                 # Sample data seeder
├── models/
│   └── jobModel.js        # Job schema definition
└── server.js               # Updated with MongoDB queries
```

---

## Troubleshooting

### Connection Error?
1. Verify your MONGODB_URI in `.env` is correct
2. Check that IP address is whitelisted in MongoDB Atlas:
   - In Atlas → Security → Network Access
   - Add IP address or allow all (0.0.0.0/0)

### "Cannot find module 'mongoose'"?
```bash
npm install mongoose
```

### Database Empty?
```bash
npm run seed
```

### Need to Reset Database?
Just run `npm run seed` again - it clears old data first.

---

## Next Steps

You can now:
1. Update your React client to use these API endpoints
2. Add authentication for job posting (employer features)
3. Add user accounts and applicant management
4. Implement filtering and search functionality

Happy coding! 🚀
