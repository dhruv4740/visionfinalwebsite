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
  
  // Tab and registration states
  const [activeTab, setActiveTab] = useState('events');
  const [registrations, setRegistrations] = useState([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(false);
  const [selectedEventForRegistrations, setSelectedEventForRegistrations] = useState('all');

  // Event form
  const initialEventForm = {
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    eventType: 'workshop',
    maxAttendees: '',
    price: '',
    tags: ''
  };
  
  const [eventForm, setEventForm] = useState(initialEventForm);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: null });

  // Check authentication and fetch data
  useEffect(() => {
    const isAuth = localStorage.getItem('vision_admin_auth') === 'true';
    if (!isAuth) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
      fetchEvents();
      fetchRegistrations();
    }
  }, [router]);
  
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    try {
      setRegistrationsLoading(true);
      const response = await fetch('/api/events/register');
      if (!response.ok) throw new Error('Failed to fetch registrations');
      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setError('Failed to fetch registrations');
    } finally {
      setRegistrationsLoading(false);
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
      eventType: event.eventType || 'workshop',
      maxAttendees: event.maxAttendees || '',
      price: event.price || '',
      tags: event.tags || ''
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
    const { name, value } = e.target;
    setEventForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });
    
    try {
      const url = '/api/admin/events';
      const method = selectedEvent ? 'PATCH' : 'POST';
      const payload = selectedEvent ? { id: selectedEvent.id, ...eventForm } : eventForm;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save event');
      }
      
      setSubmitStatus({ loading: false, success: true, error: null });
      fetchEvents();
      setTimeout(closeModal, 1000);
      
    } catch (err) {
      setSubmitStatus({ loading: false, success: false, error: err.message });
    }
  };
  
  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`/api/admin/events?id=${selectedEvent.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete event');
      fetchEvents();
      setIsConfirmDeleteOpen(false);
    } catch (err) {
      alert('Failed to delete event: ' + err.message);
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  // Get registrations for a specific event
  const getEventRegistrations = (eventId) => {
    return registrations.filter(reg => reg.eventId === eventId);
  };

  // Get filtered registrations based on selected event
  const getFilteredRegistrations = () => {
    if (selectedEventForRegistrations === 'all') {
      return registrations;
    }
    return registrations.filter(reg => reg.eventId === selectedEventForRegistrations);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div style={{ color: '#FFD700' }}>Redirecting to login...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 p-6 bg-black rounded-lg border-2 border-white">
          <div className="flex items-center mb-4 md:mb-0">
            <button
              onClick={() => router.push('/admin')}
              className="mr-4 p-3 rounded-md hover:bg-yellow-400 transition-colors border-2 font-semibold"
              style={{ backgroundColor: '#FFD700', color: 'black', borderColor: '#FFD700' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-white">Events Management</h1>
          </div>
          
          <div className="flex space-x-3">
            {activeTab === 'events' && (
              <button 
                onClick={openCreateModal} 
                className="px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-lg border-2"
                style={{ backgroundColor: '#FFD700', color: 'black', borderColor: '#FFD700' }}
              >
                Create New Event
              </button>
            )}
            <button 
              onClick={() => {fetchEvents(); fetchRegistrations();}} 
              className="px-6 py-3 rounded-lg font-semibold bg-black border-2 text-white hover:text-black transition-all duration-300"
              style={{ borderColor: '#FFD700' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#FFD700'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'black'}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-black rounded-lg p-2 border-2 border-white">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'events' 
                  ? 'shadow-lg border-2' 
                  : 'hover:text-white hover:bg-gray-900 border-2 border-transparent'
              }`}
              style={activeTab === 'events' 
                ? { backgroundColor: '#FFD700', color: 'black', borderColor: '#FFD700' }
                : { color: 'white', borderColor: 'transparent' }
              }
              onMouseEnter={(e) => {
                if (activeTab !== 'events') {
                  e.target.style.borderColor = '#FFD700';
                  e.target.style.color = '#FFD700';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'events') {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.color = 'white';
                }
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Events Management
              </span>
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`flex-1 px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                activeTab === 'registrations' 
                  ? 'shadow-lg border-2' 
                  : 'hover:text-white hover:bg-gray-900 border-2 border-transparent'
              }`}
              style={activeTab === 'registrations' 
                ? { backgroundColor: '#FFD700', color: 'black', borderColor: '#FFD700' }
                : { color: 'white', borderColor: 'transparent' }
              }
              onMouseEnter={(e) => {
                if (activeTab !== 'registrations') {
                  e.target.style.borderColor = '#FFD700';
                  e.target.style.color = '#FFD700';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'registrations') {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.color = 'white';
                }
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Event Registrations
                {registrations.length > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full font-bold border-2 ${
                    activeTab === 'registrations' 
                      ? 'bg-black border-black' 
                      : 'bg-gold border-gold'
                  }`}
                  style={activeTab === 'registrations' 
                    ? { backgroundColor: 'black', color: '#FFD700', borderColor: 'black' }
                    : { backgroundColor: '#FFD700', color: 'black', borderColor: '#FFD700' }
                  }>
                    {registrations.length}
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-lg border-2 border-white bg-black hover:bg-gray-900 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Total Events</p>
                <p className="text-3xl font-bold" style={{ color: '#FFD700' }}>{events.length}</p>
              </div>
              <div className="text-white">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg border-2 border-white bg-black hover:bg-gray-900 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Upcoming Events</p>
                <p className="text-3xl font-bold" style={{ color: '#FFD700' }}>
                  {events.filter(event => new Date(event.date) >= new Date()).length}
                </p>
              </div>
              <div className="text-white">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg border-2 border-white bg-black hover:bg-gray-900 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Total Registrations</p>
                <p className="text-3xl font-bold" style={{ color: '#FFD700' }}>{registrations.length}</p>
              </div>
              <div className="text-white">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg border-2 border-white bg-black hover:bg-gray-900 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Events with Registrations</p>
                <p className="text-3xl font-bold" style={{ color: '#FFD700' }}>
                  {events.filter(event => getEventRegistrations(event.id || event._id).length > 0).length}
                </p>
              </div>
              <div className="text-white">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-900 border-2 border-red-500 text-red-300 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'events' ? (
          // Events Management Tab
          loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#FFD700' }}></div>
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 text-center border-2 border-white bg-black rounded-lg">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-lg mb-4 text-white">No events have been created yet</p>
              <button 
                onClick={openCreateModal} 
                className="px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-lg border-2"
                style={{ backgroundColor: '#FFD700', color: 'black', borderColor: '#FFD700' }}
              >
                Create Your First Event
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="border-2 border-white rounded-lg p-6 bg-black hover:bg-gray-900 transition-all duration-300 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-white">{event.title}</h3>
                      <p className="text-sm text-white flex items-center mb-1">
                        <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.date)} • {event.time}
                      </p>
                      <p className="text-sm text-white flex items-center mb-3">
                        <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </p>
                      {/* Registration count with better styling */}
                      <div className="flex items-center mb-3">
                        <span className={`px-3 py-1 text-xs rounded-full font-semibold border-2 ${
                          getEventRegistrations(event.id || event._id).length > 0 
                            ? 'bg-green-900 text-green-400 border-green-500' 
                            : 'bg-gray-800 text-gray-400 border-gray-600'
                        }`}>
                          <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {getEventRegistrations(event.id || event._id).length} registrations
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(event)} 
                        className="p-2 rounded hover:bg-yellow-400 transition-colors border-2 font-semibold"
                        style={{ backgroundColor: '#FFD700', color: 'black', borderColor: '#FFD700' }}
                        title="Edit Event"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => { setSelectedEvent(event); setIsConfirmDeleteOpen(true); }} 
                        className="p-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors border-2 border-red-600 font-semibold"
                        title="Delete Event"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                  {event.tags && (
                    <div className="flex flex-wrap gap-1">
                      {event.tags.split(',').map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded bg-white text-black border-2 border-white font-semibold">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          // Improved Registrations Tab
          <div className="bg-black p-6 rounded-lg border-2 border-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-2xl font-bold mb-4 md:mb-0 text-white">Event Registrations</h2>
              
              {/* Event Filter Dropdown */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-white">Filter by Event:</label>
                <select
                  value={selectedEventForRegistrations}
                  onChange={(e) => setSelectedEventForRegistrations(e.target.value)}
                  className="px-4 py-2 bg-black border-2 border-white rounded-lg focus:outline-none hover:border-yellow-400 transition-colors text-white"
                >
                  <option value="all">All Events ({registrations.length})</option>
                  {events.map(event => {
                    const eventRegs = getEventRegistrations(event.id || event._id);
                    return (
                      <option key={event.id} value={event.id || event._id}>
                        {event.title} ({eventRegs.length})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {registrationsLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#FFD700' }}></div>
              </div>
            ) : getFilteredRegistrations().length === 0 ? (
              <div className="p-12 text-center border-2 border-white bg-black rounded-lg">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-lg text-white">
                  {selectedEventForRegistrations === 'all' 
                    ? 'No registrations yet' 
                    : 'No registrations for this event'
                  }
                </p>
                <p className="text-gray-400 text-sm mt-2">Registrations will appear here when users register for events</p>
              </div>
            ) : (
              <div className="border-2 border-white bg-black rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black border-b-2 border-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Event</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Phone</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Year</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Branch</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-white">
                      {getFilteredRegistrations().map((reg, index) => (
                        <tr key={index} className="hover:bg-gray-900 transition-colors">
                          <td className="px-6 py-4 text-sm">
                            <div className="font-medium text-white">{reg.name}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="font-medium text-white">{reg.eventTitle}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">{reg.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">{reg.phone}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full border-2 font-semibold bg-white text-black border-white">
                              {reg.year}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full border-2 font-semibold bg-white text-black border-white">
                              {reg.branch}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {new Date(reg.timestamp).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Create/Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border-2 border-white">
            <div className="p-6 border-b-2 border-white bg-black">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ color: '#FFD700' }}>
                  {selectedEvent ? 'Edit Event' : 'Create New Event'}
                </h2>
                <button onClick={closeModal} className="text-gray-400 transition-colors hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Event Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={eventForm.title}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border-2 border-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Event Type *</label>
                  <select
                    name="eventType"
                    value={eventForm.eventType}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border-2 border-white focus:outline-none"
                    required
                  >
                    <option value="workshop">Workshop</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="seminar">Seminar</option>
                    <option value="conference">Conference</option>
                    <option value="meetup">Meetup</option>
                    <option value="competition">Competition</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={eventForm.date}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border-2 border-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Time *</label>
                  <input
                    type="text"
                    name="time"
                    value={eventForm.time}
                    onChange={handleFormChange}
                    placeholder="e.g., 3:00 PM - 5:00 PM"
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border-2 border-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Max Attendees</label>
                  <input
                    type="number"
                    name="maxAttendees"
                    value={eventForm.maxAttendees}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border-2 border-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={eventForm.location}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border-2 border-white focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Description *</label>
                <textarea
                  name="description"
                  value={eventForm.description}
                  onChange={handleFormChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border-2 border-white focus:outline-none"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Price</label>
                  <input
                    type="text"
                    name="price"
                    value={eventForm.price}
                    onChange={handleFormChange}
                    placeholder="Free, 100, 500"
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border-2 border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={eventForm.tags}
                    onChange={handleFormChange}
                    placeholder="AR, VR, Unity (comma separated)"
                    className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border-2 border-white focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Event Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={eventForm.image}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border-2 border-white focus:outline-none"
                />
              </div>
              
              {submitStatus.error && (
                <div className="bg-red-900 border-2 border-red-500 text-red-300 px-4 py-3 rounded">
                  {submitStatus.error}
                </div>
              )}
              
              {submitStatus.success && (
                <div className="bg-green-900 border-2 border-green-500 text-green-300 px-4 py-3 rounded">
                  Event {selectedEvent ? 'updated' : 'created'} successfully!
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="px-6 py-2 rounded-md font-semibold border-2 text-white hover:text-black transition-all duration-300"
                  style={{ borderColor: '#FFD700' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#FFD700'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md font-semibold hover:bg-yellow-400 transition-all duration-300 flex items-center disabled:opacity-50 border-2"
                  style={{ backgroundColor: '#FFD700', color: 'black', borderColor: '#FFD700' }}
                  disabled={submitStatus.loading}
                >
                  {submitStatus.loading && <div className="mr-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black"></div>}
                  {selectedEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black w-full max-w-lg rounded-lg border-2 border-white">
            <div className="p-6 border-b-2 border-white bg-black">
              <h2 className="text-xl font-bold" style={{ color: '#FFD700' }}>Confirm Delete</h2>
            </div>
            <div className="p-6">
              <p className="text-white mb-4">Are you sure you want to delete:</p>
              <p className="font-medium text-lg mb-4 text-white">{selectedEvent.title}</p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setIsConfirmDeleteOpen(false)} 
                  className="px-6 py-2 rounded-md font-semibold border-2 text-white hover:text-black transition-all duration-300"
                  style={{ borderColor: '#FFD700' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#FFD700'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteEvent} 
                  className="px-6 py-2 rounded-md font-semibold bg-red-600 hover:bg-red-700 text-white transition-all duration-300 border-2 border-red-600"
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