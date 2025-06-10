"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Add scroll detection - keep header pinned in compact mode
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled beyond threshold for compact mode
      const isScrolled = currentScrollY > 20;
      
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle smooth scrolling for anchor links
  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // If we're not on the homepage, navigate there first
    if (pathname !== '/') {
      router.push('/');
      
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      // We're already on the homepage, just scroll to the section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <header 
      className="fixed w-full z-50 transition-all duration-500 ease-in-out translate-y-0"
      style={{ 
        backgroundColor: scrolled ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)', 
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 2px 20px rgba(255,215,0,0.1)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,215,0,0.15)' : 'none',
        top: 0,
        left: 0
      }}
    >
      <nav 
        className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-3 px-4 lg:px-8' : 'py-8 px-6 lg:px-8'
        }`} 
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="-m-1.5 p-1.5 group flex items-center gap-3">
            <span className="sr-only">Team Vision KJSSE</span>
            <img 
              src="/logo.png" 
              alt="Team Vision Logo" 
              className={`transition-all duration-300 group-hover:scale-105 drop-shadow-lg ${
                scrolled ? 'h-8 w-8' : 'h-12 w-12'
              }`}
            />
            <div className={`font-bold transition-all duration-300 group-hover:text-amber-400 drop-shadow-lg ${
              scrolled ? 'text-lg' : 'text-xl lg:text-2xl'
            }`} style={{ color: '#FFD700' }}>
              TEAM VISION KJSSE
              <span className="block h-0.5 max-w-0 bg-amber-400 transition-all duration-500 group-hover:max-w-full drop-shadow-sm"></span>
            </div>
          </a>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-transform hover:scale-110 drop-shadow-lg"
            onClick={() => setMobileMenuOpen(true)}
            style={{ color: '#FFD700' }}
          >
            <span className="sr-only">Open main menu</span>
            <svg className={`transition-all duration-300 ${scrolled ? 'h-6 w-6' : 'h-7 w-7'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className={`font-semibold leading-6 text-white hover:text-amber-400 transition-all duration-300 relative group drop-shadow-md ${
                scrolled ? 'text-sm py-1' : 'text-base py-3'
              }`}
            >
              {item.name}
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-400 drop-shadow-sm"></span>
            </a>
          ))}
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm" 
             style={{ 
               background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))', 
               backdropFilter: 'blur(20px)',
               borderLeft: '1px solid rgba(255,215,0,0.1)'
             }}>
          <div className="flex items-center justify-between">
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="-m-1.5 p-1.5 flex items-center gap-3">
              <span className="sr-only">Team Vision KJSSE</span>
              <img 
                src="/logo.png" 
                alt="Team Vision Logo" 
                className="h-10 w-10 drop-shadow-lg"
              />
              <div className="text-lg font-bold drop-shadow-lg" style={{ color: '#FFD700' }}>
                TEAM VISION KJSSE
              </div>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 transition-all duration-300 hover:rotate-90 drop-shadow-lg" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#FFD700' }}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-white/10 transition-all duration-300 hover:translate-x-2 drop-shadow-md"
                    style={{ 
                      color: 'white',
                      animationDelay: `${index * 100}ms`,
                      animation: mobileMenuOpen ? 'fadeInRight 0.5s forwards' : 'none'
                    }}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
}