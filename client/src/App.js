import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch message from backend
    fetch('/api')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('Error:', err));

    // Fetch jobs from backend
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Listing Portal</h1>
        <p>{message}</p>
        <div className="jobs-container">
          <h2>Available Jobs</h2>
          {jobs.length > 0 ? (
            <ul className="jobs-list">
              {jobs.map(job => (
                <li key={job.id} className="job-item">
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                  <p className="salary">{job.salary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading jobs...</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
