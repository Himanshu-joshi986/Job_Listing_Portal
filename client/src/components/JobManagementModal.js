import React, { useState, useEffect } from 'react';
import { jobService } from '../services/dashboard';

export function JobManagementModal({ isOpen, onClose, onJobSaved, editingJob = null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    jobType: 'Full-time',
    description: '',
    responsibilities: [],
    qualifications: [],
    requirements: []
  });

  const [respInput, setRespInput] = useState('');
  const [qualInput, setQualInput] = useState('');
  const [reqInput, setReqInput] = useState('');

  const employerId = localStorage.getItem('userId') || 'demo-employer-id';

  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title || '',
        company: editingJob.company || '',
        location: editingJob.location || '',
        salaryMin: editingJob.salaryMin || '',
        salaryMax: editingJob.salaryMax || '',
        jobType: editingJob.jobType || 'Full-time',
        description: editingJob.description || '',
        responsibilities: editingJob.responsibilities || [],
        qualifications: editingJob.qualifications || [],
        requirements: editingJob.requirements || []
      });
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addResponsibility = () => {
    if (respInput.trim()) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, respInput.trim()]
      }));
      setRespInput('');
    }
  };

  const removeResponsibility = (index) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const addQualification = () => {
    if (qualInput.trim()) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, qualInput.trim()]
      }));
      setQualInput('');
    }
  };

  const removeQualification = (index) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const addRequirement = () => {
    if (reqInput.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, reqInput.trim()]
      }));
      setReqInput('');
    }
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.company || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const jobData = {
        ...formData,
        postedBy: employerId,
        salary: `$${formData.salaryMin}-$${formData.salaryMax}`
      };

      if (editingJob) {
        await jobService.updateJob(editingJob._id, jobData);
      } else {
        await jobService.createJob(jobData);
      }

      onJobSaved();
      onClose();
      setFormData({
        title: '',
        company: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        jobType: 'Full-time',
        description: '',
        responsibilities: [],
        qualifications: [],
        requirements: []
      });
    } catch (err) {
      setError(err.message || 'Failed to save job');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="glass rounded-3xl p-6 max-w-2xl w-full my-8">
        <div className="text-2xl font-bold mb-4">
          {editingJob ? 'Edit Job Listing' : 'Create Job Listing'}
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 max-h-[80vh] overflow-y-auto">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-semibold mb-2">Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior React Developer"
              className="input w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="input w-full"
              />
            </div>
          </div>

          {/* Job Type & Salary */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="input w-full"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Freelance</option>
                <option>Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Salary Min ($)</label>
              <input
                type="number"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleChange}
                placeholder="50000"
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Salary Max ($)</label>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleChange}
                placeholder="120000"
                className="input w-full"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the job role and responsibilities in detail..."
              className="input min-h-[120px] w-full resize-none"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-semibold mb-2">Responsibilities</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={respInput}
                onChange={(e) => setRespInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                placeholder="Add responsibility and press Enter"
                className="input flex-1"
              />
              <button
                type="button"
                onClick={addResponsibility}
                className="btn-primary px-4"
              >
                Add
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {formData.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                  <span className="text-sm text-white/80">{resp}</span>
                  <button
                    type="button"
                    onClick={() => removeResponsibility(idx)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-sm font-semibold mb-2">Required Qualifications</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={qualInput}
                onChange={(e) => setQualInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQualification())}
                placeholder="Add qualification and press Enter"
                className="input flex-1"
              />
              <button
                type="button"
                onClick={addQualification}
                className="btn-primary px-4"
              >
                Add
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {formData.qualifications.map((qual, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                  <span className="text-sm text-white/80">{qual}</span>
                  <button
                    type="button"
                    onClick={() => removeQualification(idx)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-semibold mb-2">Additional Requirements</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                placeholder="Add requirement and press Enter"
                className="input flex-1"
              />
              <button
                type="button"
                onClick={addRequirement}
                className="btn-primary px-4"
              >
                Add
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {formData.requirements.map((req, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                  <span className="text-sm text-white/80">{req}</span>
                  <button
                    type="button"
                    onClick={() => removeRequirement(idx)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-ghost flex-1 py-3 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 py-3 disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingJob ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
