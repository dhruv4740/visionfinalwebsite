"use client";
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ApplicationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    year: '',
    branch: '',
    team: '',
    whyJoin: '',
    skills: '',
    experience: '',
    resume: null
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  // EmailJS notification function with simplified parameters
  const sendEmailNotification = async (applicationData) => {
    try {
      console.log('🔍 Attempting to send email notification...');
      
      // Initialize EmailJS
      emailjs.init("tISC2MZ5Yqbq_-56-");
      
      // Match the template variables exactly as configured in EmailJS
      const result = await emailjs.send(
        "service_too91xe", // UPDATED: Use the correct service ID from EmailJS
        "template_qrgibsd",
        {
          // Simplified template variables
          title: `New Application from ${applicationData.name}`,
          name: "Vision KJSCE Team",
          applicant_name: applicationData.name,
          applicant_email: applicationData.email,
          applicant_phone: applicationData.phone,
          applicant_year: applicationData.year,
          applicant_branch: applicationData.branch,
          applicant_team: applicationData.team || 'Not specified',
          email: applicationData.email, // Backup in case template uses email instead of applicant_email
          
          // Add any other variables your template uses
        }
      );
      
      console.log('✅ Email notification sent successfully!', result);
    } catch (error) {
      console.error('❌ Email notification failed:', error);
      // Don't fail the entire submission if email fails
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'resume' && formData[key]) {
          submitData.append(key, formData[key]);
        } else if (key !== 'resume') {
          submitData.append(key, formData[key]);
        }
      });
      
      const response = await fetch('/api/apply', {
        method: 'POST',
        body: submitData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      
      // Send email notification using EmailJS
      await sendEmailNotification(result.applicationData || formData);
      
      // Show success message
      setSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          year: '',
          branch: '',
          team: '',
          whyJoin: '',
          skills: '',
          experience: '',
          resume: null
        });
        onClose();
      }, 3000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-black w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border"
        style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
      >
        {/* Modal Header */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold" style={{ color: '#FFD700' }}>Apply to Join Vision KJSCE</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4" style={{ color: '#FFD700' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium mb-2" style={{ color: '#FFD700' }}>Application Submitted!</h3>
              <p className="text-gray-300">Thank you for your interest in the <strong>{formData.team}</strong>.</p>
              <p className="text-gray-300 mt-2">We'll review your application and get back to you at <strong>{formData.email}</strong> soon.</p>
              </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name*</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md focus:outline-none"
                      style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md focus:outline-none"
                      style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md focus:outline-none"
                      style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Rest of the form remains unchanged */}
              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">Year of Study*</label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md focus:outline-none"
                      style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    >
                      <option value="">Select Year</option>
                      <option value="First Year">First Year</option>
                      <option value="Second Year">Second Year</option>
                      <option value="Third Year">Third Year</option>
                      <option value="Fourth Year">Fourth Year</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="branch" className="block text-sm font-medium text-gray-300 mb-1">Branch*</label>
                    <select
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md focus:outline-none"
                      style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    >
                      <option value="">Select Branch</option>
                      <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                      <option value="Computer Engineering">Computer Engineering</option>
                      <option value="Computer & Communication Engineering">Computer & Communication Engineering</option>
                      <option value="Computer Science & Business Systems">Computer Science & Business Systems</option>
                      <option value="Electronics & Computer Engineering">Electronics & Computer Engineering</option>
                      <option value="Electronics & Telecommunication Engineering">Electronics & Telecommunication Engineering</option>
                      <option value="Electronics Engineering (VLSI Design & Technology)">Electronics Engineering (VLSI Design & Technology)</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Robotics & Artificial Intelligence">Robotics & Artificial Intelligence</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Team Selection */}
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Team Preference</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="team" className="block text-sm font-medium text-gray-300 mb-1">Which team would you like to join?*</label>
                    <select
                      id="team"
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md focus:outline-none"
                      style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    >
                      <option value="">Select Team</option>
                      <option value="Tech Team">Tech Team</option>
                      <option value="Creative Team">Creative Team</option>
                      <option value="Marketing Team">Marketing Team</option>
                      <option value="PR Team">PR Team</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Motivation & Skills */}
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Motivation & Skills</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="whyJoin" className="block text-sm font-medium text-gray-300 mb-1">Why do you want to join Vision KJSCE?*</label>
                    <textarea
                      id="whyJoin"
                      name="whyJoin"
                      value={formData.whyJoin}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full px-4 py-2 rounded-md focus:outline-none"
                      style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-300 mb-1">Technical Skills*</label>
                    <textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      rows="2"
                      placeholder="List your technical skills (e.g., programming languages, tools, etc.)"
                      className="w-full px-4 py-2 rounded-md focus:outline-none"
                      style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">Relevant Experience</label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Any previous committee experience or projects (optional)"
                      className="w-full px-4 py-2 rounded-md focus:outline-none"
                      style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Resume Upload */}
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Resume</h3>
                <div className="space-y-2">
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-1">Upload your Resume (PDF, max 2MB)</label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold hover:file:bg-amber-900"
                    style={{ 
                      backgroundColor: '#222', 
                      borderColor: 'rgba(255, 215, 0, 0.3)', 
                      border: '1px solid',
                      borderRadius: '0.375rem',
                      padding: '0.5rem'
                    }}
                  />
                  <p className="text-xs text-gray-400">Optional but recommended</p>
                </div>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 mr-2 rounded-md border"
                  style={{ borderColor: '#FFD700', color: '#FFD700' }}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md font-medium"
                  style={{ backgroundColor: '#FFD700', color: 'black' }}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}