"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Mock data for event registrations
  const eventRegistrations = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@student.kjsce.edu.in",
      phone: "+91 9876543210",
      year: "SY",
      branch: "COMP",
      event: "AR Workshop Series",
      registeredAt: "2024-01-15",
      attended: false
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@student.kjsce.edu.in",
      phone: "+91 8765432109",
      year: "TY",
      branch: "IT",
      event: "VR Development Bootcamp",
      registeredAt: "2024-01-14",
      attended: true
    },
    {
      id: 3,
      name: "Arjun Kumar",
      email: "arjun.kumar@student.kjsce.edu.in",
      phone: "+91 7654321098",
      year: "FY",
      branch: "EXTC",
      event: "AR Workshop Series",
      registeredAt: "2024-01-13",
      attended: false
    },
    {
      id: 4,
      name: "Sneha Desai",
      email: "sneha.desai@student.kjsce.edu.in",
      phone: "+91 6543210987",
      year: "LY",
      branch: "MECH",
      event: "Innovation Hackathon",
      registeredAt: "2024-01-12",
      attended: true
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@student.kjsce.edu.in",
      phone: "+91 5432109876",
      year: "SY",
      branch: "CIVIL",
      event: "VR Development Bootcamp",
      registeredAt: "2024-01-11",
      attended: false
    },
    {
      id: 6,
      name: "Anisha Joshi",
      email: "anisha.joshi@student.kjsce.edu.in",
      phone: "+91 4321098765",
      year: "TY",
      branch: "COMP",
      event: "AR Workshop Series",
      registeredAt: "2024-01-10",
      attended: true
    },
    {
      id: 7,
      name: "Rohan Gupta",
      email: "rohan.gupta@student.kjsce.edu.in",
      phone: "+91 3210987654",
      year: "FY",
      branch: "IT",
      event: "Innovation Hackathon",
      registeredAt: "2024-01-09",
      attended: false
    },
    {
      id: 8,
      name: "Kavya Nair",
      email: "kavya.nair@student.kjsce.edu.in",
      phone: "+91 2109876543",
      year: "SY",
      branch: "EXTC",
      event: "VR Development Bootcamp",
      registeredAt: "2024-01-08",
      attended: true
    }
  ];
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
    };  }, [router]);
  
  const signOut = () => {
    localStorage.removeItem('vision_admin_auth');
    localStorage.removeItem('vision_admin_timestamp');
    router.push('/admin-login');
  };

  // Navigate to sections
  const navigateToSection = (path) => {
    router.push(`/admin/${path}`);
  };

  // Get attendance badge
  const getAttendanceBadge = (attended) => {
    if (attended) {
      return 'bg-green-900/30 text-green-300 border-green-500/50';
    } else {
      return 'bg-gray-900/30 text-gray-300 border-gray-500/50';
    }
  };

  // Get statistics
  const totalRegistrations = eventRegistrations.length;
  const attendedEvents = eventRegistrations.filter(reg => reg.attended).length;
  const pendingAttendance = eventRegistrations.filter(reg => !reg.attended).length;
  const uniqueEvents = [...new Set(eventRegistrations.map(reg => reg.event))].length;
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#FFD700' }}></div>
          <p style={{ color: '#FFD700' }}>Loading...</p>
        </div>
      </div>
    );  }
  
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFD700' }}>Vision Admin Dashboard</h1>
            <p className="text-gray-400">Manage your AR/VR team platform</p>
          </div>
          <div className="flex items-center space-x-4">
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

        {/* Event Registration Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#FFD700' }}>{totalRegistrations}</div>
            <div className="text-gray-400">Total Registrations</div>
          </div>
          
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <div className="text-3xl font-bold mb-2 text-blue-300">{uniqueEvents}</div>
            <div className="text-gray-400">Active Events</div>
          </div>
          
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <div className="text-3xl font-bold mb-2 text-green-300">{attendedEvents}</div>
            <div className="text-gray-400">Attended</div>
          </div>
          
          <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <div className="text-3xl font-bold mb-2 text-gray-300">{pendingAttendance}</div>
            <div className="text-gray-400">Upcoming</div>
          </div>
        </div>

        {/* Event Registrations List */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#FFD700' }}>Event Registrations</h2>
            <button
              onClick={() => navigateToSection('events')}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:brightness-110"
              style={{ backgroundColor: '#FFD700', color: 'black' }}
            >
              Manage Events
            </button>
          </div>
          
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="text-left p-4 text-gray-300 font-semibold">Student</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Event</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Year/Branch</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Registration Date</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Attendance</th>
                    <th className="text-left p-4 text-gray-300 font-semibold">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {eventRegistrations.map((registration) => (
                    <tr key={registration.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="font-semibold text-white">{registration.name}</div>
                          <div className="text-sm text-gray-400">{registration.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">{registration.event}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white">
                          <span className="font-semibold">{registration.year}</span> - {registration.branch}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-gray-300">
                          {new Date(registration.registeredAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getAttendanceBadge(registration.attended)}`}>
                          {registration.attended ? 'Attended' : 'Upcoming'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <a 
                            href={`tel:${registration.phone}`}
                            className="text-xs px-3 py-1 rounded-lg border transition-all hover:brightness-110"
                            style={{ borderColor: '#FFD700', color: '#FFD700' }}
                          >
                            Call
                          </a>
                          <a 
                            href={`mailto:${registration.email}`}
                            className="text-xs px-3 py-1 rounded-lg border transition-all hover:brightness-110"
                            style={{ borderColor: '#FFD700', color: '#FFD700' }}
                          >
                            Email
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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