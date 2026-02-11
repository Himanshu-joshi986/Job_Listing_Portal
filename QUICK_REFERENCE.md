# Quick Reference: Job Application & Management System

## 🎯 **What Can Job Seekers Do?**

| Action | Location | Button | Result |
|--------|----------|--------|--------|
| **Browse Jobs** | `/jobs` | Browse listing page | See all job cards |
| **Apply for Job** | Job Card | "Apply" button | Modal → Cover Letter → Submit |
| **View Job Details** | Job Card | "View Details" | Full job information |
| **Save Job** | `/jobs/:jobId` | "Save Job" button | Appears in saved list |
| **Track Applications** | `/dashboard/seeker` | (Auto-loaded) | See all applied jobs + status |
| **View Saved Jobs** | `/dashboard/seeker` | (Auto-loaded) | See all saved jobs |
| **Unsave Job** | `/dashboard/seeker` | "Remove" button | Remove from saved list |

---

## 🎯 **What Can Employers Do?**

| Action | Location | Button | Result |
|--------|----------|--------|--------|
| **View Applications** | `/dashboard/employer` | (Auto-loaded) | See all incoming applications |
| **Change Status** | Applications section | Status dropdown | Update: Applied → In Review → Shortlisted → etc |
| **View Applicant Profile** | Application card | "View Profile" button | See seeker's full details |
| **Contact Applicant** | Application card | "Message" button | (Ready for chat integration) |
| **Post Jobs** | `/dashboard/employer` | Job form | Create new job listings |
| **Manage Jobs** | Posted Jobs section | Edit/Delete/View | Modify existing listings |
| **View Stats** | Dashboard top | (Auto-calculated) | See applicant count, response rate |

---

## 📊 **Data Flow Diagram**

```
SEEKER SIDE                    DATABASE                 EMPLOYER SIDE
─────────────────────────────────────────────────────────────────────

Job Seeker
   ↓
Browse `/jobs`
   ↓
Click "Apply"
   ↓
Fill Cover Letter
   ↓
Submit Application ──────→ Applications Collection ──────→ Employer Dashboard
                              └─ jobId                      ├─ View all apps
                              └─ seekerId                    ├─ Update status
                              └─ status                      └─ Contact seeker
                              └─ coverLetter

Seeker Dashboard
   ├─ Applied Jobs      ←──── Applications Collection + Job Details
   └─ Saved Jobs        ←──── SavedJobs Collection
   
"Save Job"
   ↓                    
Save Job Button ──────→ SavedJobs Collection
                           └─ jobId
                           └─ seekerId
                           └─ (unique constraint)
```

---

## 🔌 **API Quick Reference**

### **Apply for a Job**
```bash
POST /api/applications/apply
Content-Type: application/json

{
  "jobId": "507f1f77bcf86cd799439011",
  "seekerId": "507f1f77bcf86cd799439012",
  "employerId": "507f1f77bcf86cd799439013",
  "coverLetter": "I'm very interested in this role..."
}
```

### **Update Application Status**
```bash
PUT /api/applications/applicationId123
Content-Type: application/json

{
  "status": "Shortlisted",
  "notes": "Passed initial screening"
}
```

### **Save a Job**
```bash
POST /api/saved-jobs/save
Content-Type: application/json

{
  "jobId": "507f1f77bcf86cd799439011",
  "seekerId": "507f1f77bcf86cd799439012",
  "notes": "Follow up next week"
}
```

### **Get Dashboard Data**
```bash
# Seeker
GET /api/users/dashboard/seeker/seekerId123

# Employer
GET /api/users/dashboard/employer/employerId456
```

---

## 📱 **Key Pages & Routes**

| Route | Role | Purpose |
|-------|------|---------|
| `/jobs` | Both | Browse job listings |
| `/jobs/:jobId` | Both | View job details |
| `/dashboard/seeker` | Seeker | Track applications & saved jobs |
| `/dashboard/employer` | Employer | Manage applications & applicants |
| `/profile` | Both | Edit profile (coming soon) |

---

## 🗄️ **Database Collections**

**Applications**
- Fields: jobId, seekerId, employerId, status, coverLetter, appliedAt, updatedAt, notes
- Indexes: seekerId, employerId, jobId

**SavedJobs**
- Fields: jobId, seekerId, savedAt, notes
- Indexes: seekerId, (jobId + seekerId) unique

**Users** (Extended)
- Seeker fields: resume, skills, experience, profileStrength
- Employer fields: companyName, companyDescription, industry, companySize

**Jobs** (Existing)
- Fields: title, company, location, salary, jobType, requirements, postedBy, status

---

## ⚙️ **Setup Instructions**

### **1. Start Backend**
```bash
cd server
npm install
npm start
# Runs on http://localhost:5000
```

### **2. Start Frontend**
```bash
cd client
npm install
REACT_APP_API_BASE=http://localhost:5000/api npm start
# Runs on http://localhost:3000
```

### **3. Set Test User IDs**
In browser console:
```javascript
localStorage.setItem('userId', 'demo-seeker-id');
localStorage.setItem('employerId', 'demo-employer-id');
```

### **4. Verify MongoDB Connection**
Check server logs:
```
Connected to MongoDB
```

---

## ✨ **Feature Checklist**

### Job Seeker Features:
- [x] Browse jobs
- [x] Apply with cover letter
- [x] Save jobs
- [x] View applied jobs in dashboard
- [x] Track application status
- [x] View saved jobs
- [x] Unsave jobs
- [x] Real-time status updates

### Employer Features:
- [x] View incoming applications
- [x] Change applicant status
- [x] View applicant profiles
- [x] See response statistics
- [x] Contact applicants (ready)
- [x] Post jobs
- [x] Manage job listings
- [x] Real-time applicant count

---

## 🐛 **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| Applications not showing | Check MongoDB connection in server logs |
| API errors (404) | Ensure backend running on port 5000 |
| Cannot apply | Set userId in localStorage |
| Status not updating | Refresh page or check browser DevTools network tab |
| Saved jobs not persisting | Check MongoDB SavedJobs collection |

---

## 📚 **Complete Documentation Files**

1. **DASHBOARD_IMPLEMENTATION.md** - Full dashboard overview
2. **APPLY_AND_MANAGE_GUIDE.md** - Detailed workflows & testing
3. **FEATURE_VERIFICATION.md** - Complete feature list
4. **This file** - Quick reference guide

---

## 🚀 **Next Steps (Optional Enhancements)**

- [ ] Email notifications on status changes
- [ ] Real-time chat messaging
- [ ] File upload for resumes/portfolios
- [ ] Advanced filtering & search
- [ ] Bulk operations for employers
- [ ] Interview scheduling
- [ ] Offer management
- [ ] Analytics dashboard
- [ ] JWT authentication
- [ ] Role-based access control
- [ ] Email verification
- [ ] Job recommendations
- [ ] Social login (Google, LinkedIn)

---

**Everything is ready to test! 🎉**
