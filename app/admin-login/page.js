"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if already authenticated
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
          // Already authenticated, redirect to dashboard
          router.push('/admin');
          return;
        } else {
          // Auth expired, clear storage
          localStorage.removeItem('vision_admin_auth');
          localStorage.removeItem('vision_admin_timestamp');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const authenticate = (e) => {
    e.preventDefault();
    setError('');
    
    if (password === 'vision2024admin') {
      const timestamp = Date.now().toString();
      localStorage.setItem('vision_admin_auth', 'true');
      localStorage.setItem('vision_admin_timestamp', timestamp);
      
      // Redirect to admin dashboard
      router.push('/admin');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

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
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 rounded-lg border backdrop-blur-sm" style={{ borderColor: 'rgba(255, 215, 0, 0.3)', backgroundColor: 'rgba(10, 10, 10, 0.8)' }}>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#FFD700' }}>Vision Admin</h1>
          <p className="text-gray-400">Secure access required</p>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-900/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg animate-pulse">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}
        
        <form onSubmit={authenticate} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Admin Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{ 
                backgroundColor: '#1a1a1a', 
                color: 'white', 
                borderColor: 'rgba(255, 215, 0, 0.3)', 
                border: '1px solid',
                focusRingColor: '#FFD700'
              }}
              placeholder="Enter admin password"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#FFD700', color: 'black' }}
          >
            Access Dashboard
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Authorized access only. Contact admin for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
