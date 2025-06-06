"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const router = useRouter();
  
  // Enhanced event form data
  const initialEventForm = {
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    registrationLink: '',
    registrationCutoffDate: '',
    category: '',
    maxAttendees: '',
    isOnline: false,
    meetingLink: '',
    prerequisites: '',
    contactEmail: '',
    tags: '',
    eventType: 'workshop',
    duration: '',
    price: '',
    organizer: ''
  };
  
  const [eventForm, setEventForm] = useState(initialEventForm);
  const [submitStatus, setSubmitStatus] = useState({ 
    loading: false, 
    success: false, 
    error: null 
  });

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('vision_admin_auth') === 'true';
    if (!isAuth) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
      fetchEvents();
    }
  }, [router]);
  
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/events');
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const openCreateModal = () => {
    setSelectedEvent(null);
    setEventForm(initialEventForm);
    setIsModalOpen(true);
  };
  
  const openEditModal = (event) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      image: event.image || '',
      registrationLink: event.registrationLink || '',
      registrationCutoffDate: event.registrationCutoffDate || '',
      category: event.category || '',
      maxAttendees: event.maxAttendees || '',
      isOnline: event.isOnline || false,
      meetingLink: event.meetingLink || '',
      prerequisites: event.prerequisites || '',
      contactEmail: event.contactEmail || '',
      tags: event.tags || '',
      eventType: event.eventType || 'workshop',
      duration: event.duration || '',
      price: event.price || '',
      organizer: event.organizer || ''
    });
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitStatus({ loading: false, success: false, error: null });
    setTimeout(() => {
      setEventForm(initialEventForm);
      setSelectedEvent(null);
    }, 300);
  };
  
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });
    
    try {
      const url = '/api/admin/events';
      const method = selectedEvent ? 'PATCH' : 'POST';
      
      const payload = selectedEvent 
        ? { id: selectedEvent.id, ...eventForm }
        : eventForm;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save event');
      }
      
      setSubmitStatus({ loading: false, success: true, error: null });
      
      // Refresh the events list
      fetchEvents();
      
      // Close the modal after a delay
      setTimeout(() => {
        closeModal();
      }, 1000);
      
    } catch (err) {
      console.error('Error saving event:', err);
      setSubmitStatus({ loading: false, success: false, error: err.message });
    }
  };
  
  const openDeleteConfirmation = (event) => {
    setSelectedEvent(event);
    setIsConfirmDeleteOpen(true);
  };
  
  const closeDeleteConfirmation = () => {
    setIsConfirmDeleteOpen(false);
    setTimeout(() => {
      setSelectedEvent(null);
    }, 300);
  };
  
  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`/api/admin/events?id=${selectedEvent.id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete event');
      }
      
      // Refresh the events list
      fetchEvents();
      closeDeleteConfirmation();
      
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event: ' + err.message);
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  // Check if registration is still open
  const isRegistrationOpen = (event) => {
    if (!event.registrationCutoffDate) return true; // No cutoff date set
    const cutoffDate = new Date(event.registrationCutoffDate);
    const now = new Date();
    return now <= cutoffDate;
  };
  
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="text-white">Redirecting to login...</div>
      </div>
    );
  }
  
  // Group events by month
  const eventsByMonth = events.reduce((acc, event) => {
    const date = new Date(event.date);
    const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[month]) {
      acc[month] = [];
    }
    
    acc[month].push(event);
    return acc;
  }, {});
  
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <button
              onClick={() => router.push('/admin')}
              className="mr-4 p-2 rounded-md"
              style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)', color: '#FFD700' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold" style={{ color: '#FFD700' }}>Events Management</h1>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={openCreateModal}
              className="px-4 py-2 rounded-md text-sm"
              style={{ backgroundColor: '#FFD700', color: 'black' }}
            >
              Create New Event
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-md text-sm bg-gray-800 text-white"
            >
              Refresh
            </button>
          </div>
        </div>
        
        {/* Events Stats Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-sm text-gray-400">Total Events</p>
            <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>{events.length}</p>
          </div>
          
          <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-sm text-gray-400">Upcoming Events</p>
            <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>
              {events.filter(event => new Date(event.date) >= new Date()).length}
            </p>
          </div>
          
          <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-sm text-gray-400">Open Registration</p>
            <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>
              {events.filter(event => isRegistrationOpen(event) && new Date(event.date) >= new Date()).length}
            </p>
          </div>
        </div>
        
        {/* Events List */}
        {error && (
          <div className="mb-6 bg-red-900 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#FFD700' }}></div>
          </div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center border rounded-lg" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-gray-400 text-lg mb-4">No events have been created yet</p>
            <button
              onClick={openCreateModal}
              className="px-4 py-2 rounded-md text-sm"
              style={{ backgroundColor: '#FFD700', color: 'black' }}
            >
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
              <div key={month} className="border rounded-lg p-6" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
                <h2 className="text-xl font-semibold mb-4" style={{ color: '#FFD700' }}>{month}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {monthEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="border rounded-lg overflow-hidden relative"
                      style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#111' }}
                    >
                      {/* Event content */}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-medium" style={{ color: '#FFD700' }}>{event.title}</h3>
                              {event.eventType && (
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                                  {event.eventType}
                                </span>
                              )}
                              {event.isOnline && (
                                <span className="px-2 py-1 text-xs rounded-full bg-blue-900 text-blue-300">
                                  Online
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-300">{formatDate(event.date)} • {event.time}</p>
                            <p className="text-sm text-gray-300">{event.location}</p>
                            {event.duration && (
                              <p className="text-sm text-gray-400">Duration: {event.duration}</p>
                            )}
                            {event.maxAttendees && (
                              <p className="text-sm text-gray-400">Max Attendees: {event.maxAttendees}</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditModal(event)}
                              className="p-1.5 rounded bg-gray-800 hover:bg-gray-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => openDeleteConfirmation(event)}
                              className="p-1.5 rounded bg-red-900 hover:bg-red-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-gray-300 text-sm line-clamp-2">
                            {event.description}
                          </p>
                        </div>

                        {/* Registration Section */}
                        {event.registrationLink && (
                          <div className="mb-3">
                            {isRegistrationOpen(event) ? (
                              <a 
                                href={event.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium hover:underline inline-flex items-center"
                                style={{ color: '#FFD700' }}
                              >
                                Registration Open
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            ) : (
                              <span className="text-sm font-medium text-red-400">
                                Registration Closed
                              </span>
                            )}
                            {event.registrationCutoffDate && (
                              <p className="text-xs text-gray-500 mt-1">
                                Registration {isRegistrationOpen(event) ? 'closes' : 'closed'}: {formatDate(event.registrationCutoffDate)}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Additional Info */}
                        {event.tags && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {event.tags.split(',').map((tag, index) => (
                              <span key={index} className="px-2 py-1 text-xs rounded bg-gray-800 text-gray-300">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}

                        {event.price && (
                          <p className="text-sm font-medium" style={{ color: '#FFD700' }}>
                            {event.price === '0' || event.price.toLowerCase() === 'free' ? 'Free Event' : `₹${event.price}`}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Create/Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
          >
            <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ color: '#FFD700' }}>
                  {selectedEvent ? 'Edit Event' : 'Create New Event'}
                </h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Event Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={eventForm.title}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-1">Event Type *</label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={eventForm.eventType}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    required
                  >
                    <option value="workshop">Workshop</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="seminar">Seminar</option>
                    <option value="conference">Conference</option>
                    <option value="meetup">Meetup</option>
                    <option value="competition">Competition</option>
                    <option value="demo">Demo Day</option>
                  </select>
                </div>
              </div>
              
              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={eventForm.date}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">Time *</label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    value={eventForm.time}
                    onChange={handleFormChange}
                    placeholder="e.g., 3:00 PM - 5:00 PM"
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-1">Duration</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={eventForm.duration}
                    onChange={handleFormChange}
                    placeholder="e.g., 2 hours, 3 days"
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                  />
                </div>
              </div>

              {/* Location and Online */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={eventForm.location}
                    onChange={handleFormChange}
                    placeholder="e.g., Room 301, Engineering Building"
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                    required
                  />
                </div>

                <div className="flex items-center space-x-4 pt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isOnline"
                      checked={eventForm.isOnline}
                      onChange={handleFormChange}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Online Event</span>
                  </label>
                </div>
              </div>

              {/* Meeting Link for Online Events */}
              {eventForm.isOnline && (
                <div>
                  <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-300 mb-1">Meeting Link</label>
                  <input
                    type="url"
                    id="meetingLink"
                    name="meetingLink"
                    value={eventForm.meetingLink}
                    onChange={handleFormChange}
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                  />
                </div>
              )}
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={eventForm.description}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-md focus:outline-none"
                  style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                  required
                ></textarea>
              </div>

              {/* Registration Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-300 mb-1">Registration Link</label>
                  <input
                    type="url"
                    id="registrationLink"
                    name="registrationLink"
                    value={eventForm.registrationLink}
                    onChange={handleFormChange}
                    placeholder="https://example.com/register"
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                  />
                </div>

                <div>
                  <label htmlFor="registrationCutoffDate" className="block text-sm font-medium text-gray-300 mb-1">Registration Cutoff Date</label>
                  <input
                    type="date"
                    id="registrationCutoffDate"
                    name="registrationCutoffDate"
                    value={eventForm.registrationCutoffDate}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                  />
                  <p className="text-xs text-gray-400 mt-1">Registration will be hidden after this date</p>
                </div>
              </div>

              {/* Capacity and Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-300 mb-1">Max Attendees</label>
                  <input
                    type="number"
                    id="maxAttendees"
                    name="maxAttendees"
                    value={eventForm.maxAttendees}
                    onChange={handleFormChange}
                    placeholder="e.g., 50"
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={eventForm.price}
                    onChange={handleFormChange}
                    placeholder="Free, 100, 500"
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                  />
                  <p className="text-xs text-gray-400 mt-1">Enter 'Free' or amount in rupees</p>
                </div>
              </div>

              {/* Organizer and Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="organizer" className="block text-sm font-medium text-gray-300 mb-1">Organizer</label>
                  <input
                    type="text"
                    id="organizer"
                    name="organizer"
                    value={eventForm.organizer}
                    onChange={handleFormChange}
                    placeholder="Team Vision AR/VR"
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-1">Contact Email</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={eventForm.contactEmail}
                    onChange={handleFormChange}
                    placeholder="events@teamvision.edu"
                    className="w-full px-4 py-2 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                  />
                </div>
              </div>

              {/* Prerequisites and Tags */}
              <div>
                <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-300 mb-1">Prerequisites</label>
                <textarea
                  id="prerequisites"
                  name="prerequisites"
                  value={eventForm.prerequisites}
                  onChange={handleFormChange}
                  rows={2}
                  placeholder="Basic programming knowledge, Unity experience preferred"
                  className="w-full px-4 py-2 rounded-md focus:outline-none"
                  style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                ></textarea>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={eventForm.tags}
                  onChange={handleFormChange}
                  placeholder="AR, VR, Unity, Beginner-friendly (comma separated)"
                  className="w-full px-4 py-2 rounded-md focus:outline-none"
                  style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                />
                <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
              </div>
              
              {/* Image URL */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">Event Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={eventForm.image}
                  onChange={handleFormChange}
                  placeholder="https://example.com/event-image.jpg"
                  className="w-full px-4 py-2 rounded-md focus:outline-none"
                  style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
                />
                <p className="text-xs text-gray-400 mt-1">Direct link to an image (16:9 aspect ratio recommended)</p>
              </div>
              
              {/* Form Status Messages */}
              {submitStatus.error && (
                <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded">
                  {submitStatus.error}
                </div>
              )}
              
              {submitStatus.success && (
                <div className="bg-green-900 bg-opacity-20 border border-green-500 text-green-300 px-4 py-3 rounded">
                  Event {selectedEvent ? 'updated' : 'created'} successfully!
                </div>
              )}
              
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md mr-2 text-sm"
                  style={{ borderColor: '#FFD700', color: '#FFD700', border: '1px solid' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-sm flex items-center"
                  style={{ backgroundColor: '#FFD700', color: 'black' }}
                  disabled={submitStatus.loading}
                >
                  {submitStatus.loading && (
                    <div className="mr-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black"></div>
                  )}
                  {selectedEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-black w-full max-w-lg rounded-lg border"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
          >
            <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <h2 className="text-xl font-bold" style={{ color: '#FFD700' }}>Confirm Delete</h2>
            </div>
            
            <div className="p-6">
              <p className="text-white mb-4">Are you sure you want to delete the event:</p>
              <p className="font-medium text-lg mb-4" style={{ color: '#FFD700' }}>{selectedEvent.title}</p>
              <p className="text-gray-300 mb-4">This action cannot be undone.</p>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeDeleteConfirmation}
                  className="px-4 py-2 rounded-md text-sm"
                  style={{ borderColor: '#FFD700', color: '#FFD700', border: '1px solid' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="px-4 py-2 rounded-md text-sm bg-red-700 hover:bg-red-600 text-white"
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}