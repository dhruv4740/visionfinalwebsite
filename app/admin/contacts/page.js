"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('vision_admin_auth') === 'true';
    if (!isAuth) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
      fetchContacts();
    }
  }, [router]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/contacts');
      
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      
      const data = await response.json();
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter contacts based on search term
  useEffect(() => {
    if (contacts.length > 0) {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const filtered = contacts.filter(contact => 
          contact.name.toLowerCase().includes(term) || 
          contact.email.toLowerCase().includes(term) ||
          contact.message.toLowerCase().includes(term)
        );
        setFilteredContacts(filtered);
      } else {
        setFilteredContacts(contacts);
      }
    }
  }, [searchTerm, contacts]);

  const viewContactDetails = (contact) => {
    setSelectedContact(contact);
  };

  const closeContactDetails = () => {
    setSelectedContact(null);
  };

  const updateContactStatus = async (id, status) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact status');
      }

      // Update local state
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status } : contact
      ));
      
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (err) {
      console.error(err);
      alert('Error updating contact status: ' + err.message);
    }
  };

  // Fixed reply via email function
  const handleReplyViaEmail = (contact) => {
    const subject = encodeURIComponent(`Re: Your message to Team Vision`);
    const body = encodeURIComponent(`Dear ${contact.name},

Thank you for your message to Team Vision.

Your original message:
"${contact.message}"

Best regards,
Team Vision`);
    
    const mailtoLink = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    
    // Try to open email client
    try {
      window.location.href = mailtoLink;
    } catch (error) {
      // Fallback: copy email to clipboard
      navigator.clipboard.writeText(contact.email).then(() => {
        alert(`Email address copied to clipboard: ${contact.email}`);
      }).catch(() => {
        alert(`Please email: ${contact.email}`);
      });
    }
  };

  // Copy email to clipboard function
  const copyEmailToClipboard = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      alert('Email address copied to clipboard!');
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Email address copied to clipboard!');
    }
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
            <h1 className="text-3xl font-bold" style={{ color: '#FFD700' }}>Contact Messages</h1>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-md text-sm bg-gray-800 text-white"
            >
              Refresh
            </button>
          </div>
        </div>
        
        {/* Contact Search */}
        <div className="mb-8 p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
          <h2 className="text-xl font-medium mb-4" style={{ color: '#FFD700' }}>Search Messages</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or message content"
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                style={{ backgroundColor: '#222', color: 'white', borderColor: 'rgba(255, 215, 0, 0.3)', border: '1px solid' }}
              />
            </div>
            <div>
              <button 
                onClick={() => setSearchTerm('')}
                className="w-full md:w-auto px-4 py-2 rounded-md text-sm"
                style={{ borderColor: '#FFD700', color: '#FFD700', border: '1px solid' }}
              >
                Clear Search
              </button>
            </div>
          </div>
        </div>
        
        {/* Contacts Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-sm text-gray-400">Total Messages</p>
            <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>{contacts.length}</p>
          </div>
          
          <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-sm text-gray-400">Unread Messages</p>
            <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>
              {contacts.filter(contact => contact.status === 'unread').length}
            </p>
          </div>
          
          <div className="p-4 rounded-lg border" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: '#0A0A0A' }}>
            <p className="text-sm text-gray-400">Latest Message</p>
            <p className="text-2xl font-bold" style={{ color: '#FFD700' }}>
              {contacts.length > 0 
                ? new Date(contacts[0].timestamp).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </div>
        
        {/* Contact Messages */}
        {error && (
          <div className="mb-6 bg-red-900 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#FFD700' }}></div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400 text-lg">No messages found</p>
            {searchTerm ? (
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search term</p>
            ) : contacts.length > 0 ? (
              <p className="mt-2 text-sm text-gray-500">No messages match your filter</p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">No messages have been received yet</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y" style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Message Preview</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Received On</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(255, 215, 0, 0.1)' }}>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className={`hover:bg-gray-900 ${contact.status === 'unread' ? 'font-medium' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-block w-3 h-3 rounded-full ${contact.status === 'unread' ? 'bg-amber-400' : 'bg-gray-600'}`}></span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{contact.email}</td>
                    <td className="px-6 py-4 text-sm text-white truncate max-w-xs">
                      {contact.message.length > 50 ? contact.message.substring(0, 50) + '...' : contact.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(contact.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => viewContactDetails(contact)}
                        className="text-sm font-medium hover:underline"
                        style={{ color: '#FFD700' }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-black w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
          >
            <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold" style={{ color: '#FFD700' }}>Message Details</h2>
                  {selectedContact.status === 'unread' && (
                    <span className="ml-3 px-2 py-1 text-xs rounded bg-amber-900 bg-opacity-30 text-amber-300">
                      Unread
                    </span>
                  )}
                </div>
                <button 
                  onClick={closeContactDetails}
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
                <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Sender Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-white">{selectedContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-white">{selectedContact.email}</p>
                      <button
                        onClick={() => copyEmailToClipboard(selectedContact.email)}
                        className="text-xs px-2 py-1 rounded"
                        style={{ borderColor: '#FFD700', color: '#FFD700', border: '1px solid' }}
                        title="Copy email address"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4" style={{ color: '#FFD700' }}>Message</h3>
                <div className="p-4 rounded bg-gray-900 whitespace-pre-wrap">
                  <p className="text-white">{selectedContact.message}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-gray-400">Received on</p>
                <p className="text-white">{new Date(selectedContact.timestamp).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="p-6 border-t" style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <div className="flex justify-between">
                <div>
                  {selectedContact.status === 'unread' ? (
                    <button
                      onClick={() => updateContactStatus(selectedContact.id, 'read')}
                      className="px-4 py-2 rounded-md text-sm"
                      style={{ borderColor: '#FFD700', color: '#FFD700', border: '1px solid' }}
                    >
                      Mark as Read
                    </button>
                  ) : (
                    <button
                      onClick={() => updateContactStatus(selectedContact.id, 'unread')}
                      className="px-4 py-2 rounded-md text-sm"
                      style={{ borderColor: '#FFD700', color: '#FFD700', border: '1px solid' }}
                    >
                      Mark as Unread
                    </button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReplyViaEmail(selectedContact)}
                    className="px-4 py-2 rounded-md text-sm bg-gray-800 text-white hover:bg-gray-700"
                  >
                    Reply via Email
                  </button>
                  <button
                    onClick={closeContactDetails}
                    className="px-4 py-2 rounded-md text-sm"
                    style={{ backgroundColor: '#FFD700', color: 'black' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}