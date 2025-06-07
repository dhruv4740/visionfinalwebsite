"use client";
import { useState } from 'react';

export default function EventRegistrationModal({ event, isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    year: '',
    branch: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id || event._id,
          eventTitle: event.title,
          ...formData
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // Show success state
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        year: '',
        branch: ''
      });
      
      // Show success message and close after delay
      setTimeout(() => {
        onSuccess && onSuccess('Registration successful! You will receive a confirmation email shortly.');
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    onClose();
  };

  if (!isOpen || !event) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900/95 to-black/90 rounded-2xl border border-gold/40 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success State */}
        {success ? (
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Registration Successful!</h3>
              <p className="text-gray-300 text-sm">
                You have successfully registered for <span className="text-gold font-semibold">{event.title}</span>
              </p>
              <p className="text-gray-400 text-xs mt-2">
                You will receive a confirmation email shortly.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-gray-900/95 to-black/90 backdrop-blur-sm border-b border-gold/30 p-6 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gold mb-1">Register for Event</h2>
                <p className="text-gray-300 text-sm">{event.title}</p>
              </div>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-gold transition-colors text-2xl leading-none p-2 hover:bg-gray-800/50 rounded-lg"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                  placeholder="+91 12345 67890"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">
                    Year *
                  </label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                  >
                    <option value="">Select Year</option>
                    <option value="FY">First Year</option>
                    <option value="SY">Second Year</option>
                    <option value="TY">Third Year</option>
                    <option value="LY">Final Year</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-300 mb-1">
                    Branch *
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                  >
                     <option value="">Select Branch</option>
                    <option value="AIDS">Artificial Intelligence & Data Science</option>
                    <option value="COMP">Computer Engineering</option>
                    <option value="CCE">Computer & Communication Engineering</option>
                    <option value="CSBS">Computer Science & Business Systems</option>
                    <option value="ECE">Electronics & Computer Engineering</option>
                    <option value="EXTC">Electronics & Telecommunication Engineering</option>
                    <option value="VLSI">Electronics Engineering (VLSI Design & Technology)</option>
                    <option value="IT">Information Technology</option>
                    <option value="MECH">Mechanical Engineering</option>
                    <option value="RAI">Robotics & Artificial Intelligence</option>

                  </select>
                </div>
              </div>

              {/* Event Details Preview */}
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-600/50">
                <h3 className="text-gold font-semibold mb-2">Event Details</h3>
                <div className="space-y-1 text-sm text-gray-300">
                  <p><span className="text-gray-400">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
                  {event.time && <p><span className="text-gray-400">Time:</span> {event.time}</p>}
                  {event.location && <p><span className="text-gray-400">Location:</span> {event.location}</p>}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white border border-gray-600/50 hover:border-gray-500/50 rounded-lg font-medium transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-gold/20 to-yellow-500/20 hover:from-gold/30 hover:to-yellow-500/30 text-gold hover:text-yellow-300 border border-gold/40 hover:border-gold/60 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Registering...' : 'Register Now'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}