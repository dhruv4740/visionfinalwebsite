"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    events: [],
    registrations: [],
    applications: [],
    contacts: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Check authentication on component mount and when returning to page
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('vision_admin_auth');
      const authTimestamp = localStorage.getItem('vision_admin_timestamp');
      
      if (authStatus === 'true' && authTimestamp) {
        // Check if auth is still valid (24 hours)
        const now = Date.now();
        const authTime = parseInt(authTimestamp);
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (now - authTime < twentyFourHours) {
          setAuthenticated(true);
          fetchDashboardData();
        } else {
          // Auth expired, clear storage and redirect to login
          localStorage.removeItem('vision_admin_auth');
          localStorage.removeItem('vision_admin_timestamp');
          router.push('/admin-login');
          return;
        }
      } else {
        // Not authenticated, redirect to login
        router.push('/admin-login');
        return;
      }
      
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (when user navigates back)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check auth when page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [router]);

  // Fetch dashboard data from APIs
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch events and registrations
      const [eventsRes, registrationsRes, applicationsRes, contactsRes] = await Promise.allSettled([
        fetch('/api/admin/events'),
        fetch('/api/events/register'),
        fetch('/api/applications'),
        fetch('/api/contact')
      ]);

      const newData = {
        events: [],
        registrations: [],
        applications: [],
        contacts: []
      };

      // Handle events
      if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
        const events = await eventsRes.value.json();
        newData.events = Array.isArray(events) ? events : [];
      }

      // Handle registrations
      if (registrationsRes.status === 'fulfilled' && registrationsRes.value.ok) {
        const regData = await registrationsRes.value.json();
        newData.registrations = Array.isArray(regData.registrations) ? regData.registrations : [];
      }

      // Handle applications
      if (applicationsRes.status === 'fulfilled' && applicationsRes.value.ok) {
        const appData = await applicationsRes.value.json();
        newData.applications = Array.isArray(appData.applications) ? appData.applications : [];
      }

      // Handle contacts
      if (contactsRes.status === 'fulfilled' && contactsRes.value.ok) {
        const contactData = await contactsRes.value.json();
        newData.contacts = Array.isArray(contactData.contacts) ? contactData.contacts : [];
      }

      setDashboardData(newData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };
  
  const signOut = () => {
    localStorage.removeItem('vision_admin_auth');
    localStorage.removeItem('vision_admin_timestamp');
    router.push('/admin-login');
  };

  // Navigate to sections
  const navigateToSection = (path) => {
    router.push(`/admin/${path}`);
  };

  // Get statistics from real data
  const getStats = () => {
    const totalRegistrations = dashboardData.registrations.length;
    const activeEvents = dashboardData.events.filter(event => {
      if (!event.date) return false;
      try {
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return eventDate >= today;
      } catch {
        return false;
      }
    }).length;
    const totalApplications = dashboardData.applications.length;
    const totalContacts = dashboardData.contacts.length;

    return {
      totalRegistrations,
      activeEvents,
      totalApplications,
      totalContacts
    };
  };

  const stats = getStats();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#FFD700' }}></div>
          <p style={{ color: '#FFD700' }}>Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFD700' }}>Vision Admin Dashboard</h1>
            <p className="text-gray-400">Manage your AR/VR team platform</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-gray-800"
              style={{ borderColor: '#FFD700', color: '#FFD700', border: '1px solid' }}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <div className="text-sm text-gray-500">
              Session active
            </div>
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-red-900/20"
              style={{ borderColor: '#FFD700', color: '#FFD700', border: '1px solid' }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#FFD700' }}>{stats.totalRegistrations}</div>
            <div className="text-gray-400">Total Registrations</div>
          </div>
          
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <div className="text-3xl font-bold mb-2 text-blue-300">{stats.activeEvents}</div>
            <div className="text-gray-400">Active Events</div>
          </div>
          
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <div className="text-3xl font-bold mb-2 text-green-300">{stats.totalApplications}</div>
            <div className="text-gray-400">Team Applications</div>
          </div>
          
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <div className="text-3xl font-bold mb-2 text-purple-300">{stats.totalContacts}</div>
            <div className="text-gray-400">Contact Messages</div>
          </div>
        </div>

        {/* Recent Activity Overview */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#FFD700' }}>Recent Activity</h2>
            <button
              onClick={() => navigateToSection('events')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:brightness-110"
              style={{ backgroundColor: '#FFD700', color: 'black' }}
            >
              View All
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
            </div>
          ) : dashboardData.registrations.length === 0 ? (
            <div className="rounded-xl border p-12 text-center" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-400 text-lg mb-4">No activity data available yet</p>
              <p className="text-gray-500 text-sm">Activity will appear here as users interact with your platform</p>
            </div>
          ) : (
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-700">
                    <tr>
                      <th className="text-left p-4 text-gray-300 font-semibold">Student</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Event</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Year/Branch</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Registration Date</th>
                      <th className="text-left p-4 text-gray-300 font-semibold">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.registrations.slice(0, 10).map((registration, index) => (
                      <tr key={registration.id || index} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                        <td className="p-4">
                          <div>
                            <div className="font-semibold text-white">{registration.name || 'N/A'}</div>
                            <div className="text-sm text-gray-400">{registration.email || 'N/A'}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-white font-medium">{registration.eventTitle || 'N/A'}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-white">
                            <span className="font-semibold">{registration.year || 'N/A'}</span> - {registration.branch || 'N/A'}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-300">
                            {registration.timestamp ? new Date(registration.timestamp).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            }) : 'N/A'}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            {registration.phone && (
                              <a 
                                href={`tel:${registration.phone}`}
                                className="text-xs px-3 py-1 rounded-lg border transition-all hover:brightness-110"
                                style={{ borderColor: '#FFD700', color: '#FFD700' }}
                              >
                                Call
                              </a>
                            )}
                            {registration.email && (
                              <a 
                                href={`mailto:${registration.email}`}
                                className="text-xs px-3 py-1 rounded-lg border transition-all hover:brightness-110"
                                style={{ borderColor: '#FFD700', color: '#FFD700' }}
                              >
                                Email
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {dashboardData.registrations.length > 10 && (
                <div className="p-4 border-t border-gray-700 text-center">
                  <button
                    onClick={() => navigateToSection('events')}
                    className="text-sm text-gray-400 hover:text-gold transition-colors"
                  >
                    View all {dashboardData.registrations.length} registrations →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Applications Card */}
          <div 
            onClick={() => navigateToSection('applications')}
            className="p-6 rounded-xl border cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl group"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold group-hover:text-yellow-400 transition-colors" style={{ color: '#FFD700' }}>Team Applications</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#FFD700' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-300 mb-4">Manage and review all team applications.</p>
            <div className="text-2xl font-bold mb-2 text-green-300">{stats.totalApplications}</div>
            <div className="flex justify-end">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToSection('applications');
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:brightness-110"
                style={{ backgroundColor: '#FFD700', color: 'black' }}
              >
                View Applications
              </button>
            </div>
          </div>
          
          {/* Contacts Card */}
          <div 
            onClick={() => navigateToSection('contacts')}
            className="p-6 rounded-xl border cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl group"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold group-hover:text-yellow-400 transition-colors" style={{ color: '#FFD700' }}>Contact Messages</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#FFD700' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-300 mb-4">View and respond to contact form submissions.</p>
            <div className="text-2xl font-bold mb-2 text-purple-300">{stats.totalContacts}</div>
            <div className="flex justify-end">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToSection('contacts');
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:brightness-110"
                style={{ backgroundColor: '#FFD700', color: 'black' }}
              >
                View Messages
              </button>
            </div>
          </div>
          
          {/* Events Card */}
          <div 
            onClick={() => navigateToSection('events')}
            className="p-6 rounded-xl border cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl group"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold group-hover:text-yellow-400 transition-colors" style={{ color: '#FFD700' }}>Events Management</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#FFD700' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-300 mb-4">Create and manage upcoming events.</p>
            <div className="text-2xl font-bold mb-2 text-blue-300">{stats.activeEvents}</div>
            <div className="flex justify-end">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToSection('events');
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:brightness-110"
                style={{ backgroundColor: '#FFD700', color: 'black' }}
              >
                Manage Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}