# Dashboard Implementation Guide

## Overview
The Job Listing Portal now has fully functional dashboards for both job seekers and employers with complete backend integration for job tracking and management.

## What's Been Implemented

### 1. **Backend Models**
Located in `server/models/`:

- **userModel.js** - Extended user schema with role-based fields
  - Seeker fields: resume, skills, experience, bio, profileStrength
  - Employer fields: companyName, companyDescription, companyWebsite, industry, companySize, location

- **applicationModel.js** - Track job applications
  - Stores jobId, seekerId, employerId, status, coverLetter, resume
  - Status enums: Applied, In Review, Shortlisted, Rejected, Accepted

- **savedJobModel.js** - Track saved jobs for seekers
  - Ensures unique constraint (one seeker can't save same job twice)
  - Stores notes and metadata for each saved job

### 2. **Backend API Routes**
Located in `server/routes/`:

#### User Routes (`/api/users`)
```
GET /profile/:userId
PUT /profile/:userId
POST /resume/:userId
GET /dashboard/seeker/:seekerId
GET /dashboard/employer/:employerId
```

#### Application Routes (`/api/applications`)
```
POST /apply
GET /seeker/:seekerId
GET /employer/:employerId
PUT /:applicationId
GET /:applicationId
DELETE /:applicationId
```

#### Saved Jobs Routes (`/api/saved-jobs`)
```
POST /save
GET /seeker/:seekerId
DELETE /:savedJobId
PUT /:savedJobId
GET /check/:jobId/:seekerId
```

### 3. **Frontend Services**
Located in `client/src/services/dashboard.js`:

- **dashboardService** - Fetch dashboard data for users
- **applicationService** - Manage job applications
- **savedJobService** - Manage saved jobs

### 4. **Updated Components**

#### Seeker Dashboard (`/dashboard/seeker`)
Features:
- Profile strength indicator with dynamic calculation
- Resume upload functionality
- Applied jobs tracking with status updates
- Saved jobs with "Remove" and "Apply" actions
- Real-time statistics (application count, saved count)

Data fetched from backend:
- User profile information
- List of applied jobs with details and status
- List of saved jobs with details

#### Employer Dashboard (`/dashboard/employer`)
Features:
- Company profile management
- Dashboard statistics (posted jobs, applicants, response rate)
- Job listing creation form
- Posted jobs management with edit/delete/view options
- Recent applications with status update dropdown
- Applicant information and contact options

Data fetched from backend:
- Company profile information
- Posted jobs list
- All applications for those jobs
- Calculated statistics

## Database Schema Relationships

```
User (1) -----> (Many) Application
User (1) -----> (Many) SavedJob
Job (1) -----> (Many) Application
Job (1) -----> (Many) SavedJob
```

## How to Use

### For Developers

1. **Starting the Server:**
```bash
cd server
npm start
```
The API will be available at `http://localhost:5000/api`

2. **Starting the Client:**
```bash
cd client
npm start
```

3. **Environment Variables (server/.env):**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
```

4. **API Base URL (client):**
Add to `.env` in client folder:
```
REACT_APP_API_BASE=http://localhost:5000/api
```

### For End Users

**Job Seekers:**
1. Sign up/login with seeker role
2. Go to `/dashboard/seeker`
3. Upload resume
4. View applied jobs and their status
5. Save jobs for later
6. Apply for new jobs from job listings

**Employers:**
1. Sign up/login with employer role
2. Go to `/dashboard/employer`
3. Update company profile
4. Create new job listings
5. View all posted jobs
6. Review and manage applications
7. Update applicant status

## API Request Examples

### Apply for a Job
```javascript
POST /api/applications/apply
{
  "jobId": "507f1f77bcf86cd799439011",
  "seekerId": "507f1f77bcf86cd799439012",
  "employerId": "507f1f77bcf86cd799439013",
  "coverLetter": "I'm very interested..."
}
```

### Save a Job
```javascript
POST /api/saved-jobs/save
{
  "jobId": "507f1f77bcf86cd799439011",
  "seekerId": "507f1f77bcf86cd799439012",
  "notes": "Follow up next week"
}
```

### Update Application Status
```javascript
PUT /api/applications/:applicationId
{
  "status": "Shortlisted",
  "notes": "Passed initial screening"
}
```

### Get Seeker Dashboard
```javascript
GET /api/users/dashboard/seeker/:seekerId
Response:
{
  "user": { ... },
  "appliedJobs": [ ... ],
  "savedJobs": [ ... ],
  "stats": {
    "applicationCount": 5,
    "savedCount": 3,
    "inReviewCount": 2,
    "shortlistedCount": 1
  }
}
```

## Features Summary

### ✅ Implemented
- [x] User profiles with role-based attributes
- [x] Job application tracking
- [x] Saved jobs functionality
- [x] Dashboard data fetching
- [x] Real-time statistics
- [x] Application status management
- [x] Resume upload (backend ready)
- [x] Profile strength indicator
- [x] Application history tracking

### 📋 Future Enhancements
- [ ] Email notifications on application updates
- [ ] Bulk operations (mass accept/reject applications)
- [ ] Advanced search and filtering
- [ ] Interview scheduling
- [ ] Offer management
- [ ] Analytics and reporting
- [ ] File upload to cloud storage (S3/CloudStorage)
- [ ] Real-time notifications with WebSockets

## Testing

### Manual Testing Checklist
1. Open seeker dashboard and verify data loads
2. Apply for a job and check application appears in dashboard
3. Save a job and verify in saved jobs section
4. Remove a saved job
5. Open employer dashboard and verify job and applicant data
6. Update an applicant status and verify change persists
7. Check profile strength calculation updates

### API Testing
Use Postman or similar tools to test endpoints:
1. Create test user accounts
2. Post jobs as employer
3. Apply for jobs as seeker
4. Save and manage applications
5. Verify all CRUD operations

## Troubleshooting

**Dashboard shows no data:**
- Ensure MongoDB connection is working
- Check browser console for API errors
- Verify userId is correctly set in localStorage

**API endpoints return 404:**
- Ensure server.js is importing all route files
- Check routes folder exists with all files

**Resume upload fails:**
- Verify file upload handling is implemented
- Consider adding file size validation
- Test with different file types

## File Structure
```
server/
├── models/
│   ├── jobModel.js (existing)
│   ├── userModel.js (new)
│   ├── applicationModel.js (new)
│   └── savedJobModel.js (new)
├── routes/
│   ├── userRoutes.js (new)
│   ├── applicationRoutes.js (new)
│   └── savedJobRoutes.js (new)
└── server.js (updated)

client/
├── src/
│   ├── services/
│   │   └── dashboard.js (new)
│   └── pages/
│       ├── SeekerDashboardPage.js (updated)
│       └── EmployerDashboardPage.js (updated)
```
