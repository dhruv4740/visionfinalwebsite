"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplicationsAdmin() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const router = useRouter();
  
  // Filters for applications
  const [filters, setFilters] = useState({
    branch: 'all',
    year: 'all',
    team: 'all',
    searchTerm: ''
  });
  
  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('vision_admin_auth') === 'true';
    if (!isAuth) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
      fetchApplications();
    }
  }, [router]);
  
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/applications');
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const data = await response.json();
      const apps = data.applications || [];
      setApplications(apps);
      setFilteredApplications(apps);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Apply filters for applications
  useEffect(() => {
    if (applications.length > 0) {
      let result = [...applications];
      
      // Filter by branch
      if (filters.branch !== 'all') {
        result = result.filter(app => app.branch === filters.branch);
      }
      
      // Filter by year
      if (filters.year !== 'all') {
        result = result.filter(app => app.year === filters.year);
      }
      
      // Filter by team
      if (filters.team !== 'all') {
        result = result.filter(app => app.team === filters.team);
      }
      
      // Filter by search term (name or email)
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        result = result.filter(app => 
          app.name.toLowerCase().includes(term) || 
          app.email.toLowerCase().includes(term)
        );
      }
      
      setFilteredApplications(result);
    }
  }, [filters, applications]);
  
  // Get unique values for filter dropdowns
  const branches = ['all', ...new Set(applications.map(app => app.branch))].filter(Boolean);
  const years = ['all', ...new Set(applications.map(app => app.year))].filter(Boolean);
  const teams = ['all', ...new Set(applications.map(app => app.team))].filter(Boolean);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      branch: 'all',
      year: 'all',
      team: 'all',
      searchTerm: ''
    });
  };
  
  const viewDetails = (app) => {
    setSelectedApp(app);
  };
  
  const closeDetails = () => {
    setSelectedApp(null);
  };
  
  const downloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    csvContent += "Name,Email,Phone,Year,Branch,Team,Why Join,Skills,Experience,Resume,Submitted On\n";
    
    // Add data rows
    filteredApplications.forEach(app => {
      csvContent += `"${app.name}","${app.email}","${app.phone}","${app.year}","${app.branch}","${app.team || 'Not specified'}","${(app.whyJoin || '').replace(/"/g, '""')}","${(app.skills || '').replace(/"/g, '""')}","${(app.experience || '').replace(/"/g, '""')}","${app.resume || ''}","${new Date(app.timestamp).toLocaleString()}"\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="text-white">Redirecting to login...</div>
      </div>
    );
  }
  
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
            <h1 className="text-3xl font-bold" style={{ color: '#FFD700' }}>Applications Dashboard</h1>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={downloadCsv}
              className="px-4 py-2 rounded-md text-sm"
              style={{ backgroundColor: '#FFD700', color: 'black' }}
            >
              Export to CSV
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-md text-sm bg-gray-800 text-white"
            >
              Refresh
            </button>
          </div>
        </div>
        
        {/* Applications Filters Section */}
        <div className="mb-8 p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
          <h2 className="text-xl font-medium mb-4" style={{ color: '#FFD700' }}>Filter Applications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Branch</label>
              <select
                name="branch"
                value={filters.branch}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch === 'all' ? 'All Branches' : branch}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Year of Study</label>
              <select
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Team</label>
              <select
                name="team"
                value={filters.team}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
              >
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team === 'all' ? 'All Teams' : team}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Search</label>
              <input
                type="text"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
                placeholder="Search by name or email"
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={resetFilters}
              className="px-4 py-2 rounded-md text-sm"
              style={{ borderColor: '#FFD700', color: '#FFD700', border: '1px solid' }}
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Applications Stats Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-sm text-gray-400">Total Applications</p>
            <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>{applications.length}</p>
          </div>
          
          <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-sm text-gray-400">Filtered Results</p>
            <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>{filteredApplications.length}</p>
          </div>
          
          <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-sm text-gray-400">Most Common Branch</p>
            <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>
              {applications.length > 0 
                ? Object.entries(
                    applications.reduce((acc, app) => {
                      acc[app.branch] = (acc[app.branch] || 0) + 1;
                      return acc;
                    }, {})
                  ).sort((a, b) => b[1] - a[1])[0][0]
                : 'N/A'}
            </p>
          </div>
          
          <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-sm text-gray-400">Latest Application</p>
            <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>
              {applications.length > 0 
                ? new Date(
                    applications.reduce((latest, app) => 
                      new Date(app.timestamp) > new Date(latest.timestamp) ? app : latest
                    , applications[0]).timestamp
                  ).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </div>
        
        {/* Applications Table */}
        {error && (
          <div className="mb-6 bg-red-900 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#FFD700' }}></div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400 text-lg">No applications found</p>
            {filters.branch !== 'all' || filters.year !== 'all' || filters.team !== 'all' || filters.searchTerm ? (
              <p className="mt-2 text-sm text-gray-500">Try adjusting your filters</p>
            ) : applications.length > 0 ? (
              <p className="mt-2 text-sm text-gray-500">No applications match your filters</p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">No applications have been submitted yet</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y" style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Year & Branch</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Team</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Submitted On</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                {filteredApplications.map((app, index) => (
                  <tr key={index} className="hover:bg-gray-900">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{app.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{app.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{app.year}, {app.branch}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{app.team || 'Not specified'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(app.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => viewDetails(app)}
                        className="text-sm font-medium mr-2 hover:underline"
                        style={{ color: '#FFD700' }}
                      >
                        View Details
                      </button>
                      {app.resume && (
                        <a 
                          href={app.resume} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:underline"
                          style={{ color: '#FFD700' }}
                        >
                          Resume
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-black w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
          >
            <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ color: '#FFD700' }}>Application Details</h2>
                <button 
                  onClick={closeDetails}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="text-white">{selectedApp.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Address</p>
                    <p className="text-white">{selectedApp.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone Number</p>
                    <p className="text-white">{selectedApp.phone}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Academic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Year of Study</p>
                    <p className="text-white">{selectedApp.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Branch</p>
                    <p className="text-white">{selectedApp.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Team Applied For</p>
                    <p className="text-white">{selectedApp.team || 'Not specified'}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Motivation & Skills</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Why Join Vision KJSCE</p>
                    <p className="text-white mt-1">{selectedApp.whyJoin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Technical Skills</p>
                    <p className="text-white mt-1">{selectedApp.skills}</p>
                  </div>
                  {selectedApp.experience && (
                    <div>
                      <p className="text-sm text-gray-400">Relevant Experience</p>
                      <p className="text-white mt-1">{selectedApp.experience}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedApp.resume && (
                <div>
                  <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Resume</h3>
                  <a 
                    href={selectedApp.resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-md"
                    style={{ backgroundColor: '#FFD700', color: 'black' }}
                  >
                    View Resume
                  </a>
                </div>
              )}
              
              <div className="pt-4">
                <p className="text-sm text-gray-400">Submitted on</p>
                <p className="text-white">{new Date(selectedApp.timestamp).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="p-6 border-t" style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <div className="flex justify-end">
                <button
                  onClick={closeDetails}
                  className="px-4 py-2 rounded-md"
                  style={{ backgroundColor: '#FFD700', color: 'black' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}