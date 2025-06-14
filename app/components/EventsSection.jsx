"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import EventRegistrationModal from "./EventRegistrationModal";

export default function EventsSection({ maxEvents = 6 }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Registration modal state
  const [registrationEvent, setRegistrationEvent] = useState(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState('');

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/events");
        if (!res.ok) throw new Error(`Status ${res.status}`);
        let data = await res.json();
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        if (maxEvents) data = data.slice(0, maxEvents);
        setEvents(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [maxEvents]);

  // Fixed Intersection Observer - only reset when completely out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // Make section visible first
            e.target.classList.add("visible");
            
            // Trigger events section animations
            if (e.target.id === "events") {
              const title = e.target.querySelector(".events-title");
              const subtitle = e.target.querySelector(".events-subtitle");
              
              // Reset title animation (simple fade up)
              if (title) {
                title.classList.remove("animate-fade-up");
                setTimeout(() => {
                  title.classList.add("animate-fade-up");
                }, 200);
              }
              
              // Reset subtitle animation (typewriter effect)
              if (subtitle) {
                subtitle.classList.remove("animate-typewriter");
                setTimeout(() => {
                  subtitle.classList.add("animate-typewriter");
                }, 800);
              }
              
              // Professional card animations
              const animateEventCards = () => {
                let eventCards = e.target.querySelectorAll(".event-card");
                
                if (eventCards.length === 0) {
                  eventCards = e.target.querySelectorAll(".event-cards-wrapper [class*='grid'] > div");
                  eventCards.forEach(card => {
                    card.classList.add('event-card');
                  });
                }
                
                if (eventCards.length > 0) {
                  // Reset all animations
                  eventCards.forEach(card => {
                    card.classList.remove('animate-card-fade-up');
                  });
                  
                  // Apply simple staggered fade-up animation
                  eventCards.forEach((card, index) => {
                    setTimeout(() => {
                      card.classList.add('animate-card-fade-up');
                    }, 1000 + (index * 100)); // Stagger by 100ms
                  });
                }
              };
              
              animateEventCards();
              setTimeout(animateEventCards, 100);
            }
          }
        });
      },
      { 
        threshold: 0.01,
        rootMargin: "0px 0px -50px 0px"
      }
    );
    
    const eventsSection = document.getElementById("events");
    if (eventsSection) observer.observe(eventsSection);
    
    return () => observer.disconnect();
  }, [events]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const isUpcoming = (d) => new Date(d) >= new Date().setHours(0, 0, 0, 0);

  const openModal = (evt, index) => {
    const cardElement = document.getElementById(`event-card-${index}`);
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      setCardPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      });
    }
    setClosing(false);
    setSelectedEvent(evt);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setSelectedEvent(null);
      setIsModalOpen(false);
      setClosing(false);
      document.body.style.overflow = "unset";
    }, 400);
  };

  // Registration modal functions
  const openRegistrationModal = (evt, e) => {
    e.stopPropagation();
    setRegistrationEvent(evt);
    setIsRegistrationOpen(true);
  };

  const closeRegistrationModal = () => {
    setIsRegistrationOpen(false);
    setTimeout(() => {
      setRegistrationEvent(null);
    }, 300);
  };

  const handleRegistrationSuccess = (message) => {
    setRegistrationSuccess(message);
    setTimeout(() => {
      setRegistrationSuccess('');
    }, 5000);
  };

  const handleRegister = (evt, e) => {
    e.stopPropagation();
    openRegistrationModal(evt, e);
  };

  if (loading) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="h-12 bg-gradient-to-r from-transparent via-gold/20 to-transparent rounded-full mb-6 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-transparent via-gray-700 to-transparent rounded-full max-w-md mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gradient-to-br from-gray-900/40 to-black/20 rounded-2xl p-8 border border-gold/30">
                  <div className="h-48 bg-gray-700/50 rounded-xl mb-6"></div>
                  <div className="h-6 bg-gray-700/50 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700/50 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="bg-gradient-to-br from-gray-900/40 to-black/20 border border-gold/30 rounded-2xl p-8 max-w-md mx-auto backdrop-blur-sm">
              <div className="text-gold text-5xl mb-4">⚠️</div>
              <h3 className="text-gold font-semibold mb-2">Error Loading Events</h3>
              <p className="text-gray-300 text-sm mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-gold hover:bg-gold/90 text-black rounded-lg font-semibold transition-all duration-300"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!events.length) {
    return (
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="bg-gradient-to-br from-gray-900/40 to-black/20 border border-gold/30 rounded-2xl p-12 max-w-md mx-auto backdrop-blur-sm">
              <div className="text-6xl mb-6 animate-bounce">📅</div>
              <h3 className="text-gold font-semibold text-xl mb-3">No Events Available</h3>
              <p className="text-gray-400">Check back soon for upcoming events and workshops!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Success Message */}
      {registrationSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-br from-gray-900/95 to-black/90 border border-gold/50 text-gold px-6 py-3 rounded-lg shadow-xl backdrop-blur-sm">
          ✅ {registrationSuccess}
        </div>
      )}

      {/* Events Section */}
      <section id="events" className="py-32 relative opacity-0 transform translate-y-8 transition-all duration-1000 ease-out overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="events-title text-5xl md:text-6xl font-bold text-gold mb-8 opacity-0 transform translate-y-6">
              Our Events
            </h2>
            <p className="events-subtitle text-gray-200 text-lg max-w-2xl mx-auto overflow-hidden">
              <span className="inline-block">Discover our latest workshops, hackathons, and AR/VR experiences</span>
            </p>
          </div>
          <div className="event-cards-wrapper">
            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {events.map((evt, index) => (
                <div
                  key={evt.id || evt._id}
                  id={`event-card-${index}`}
                  className="event-card group cursor-pointer"
                  onClick={() => openModal(evt, index)}
                >
                  {/* Enhanced Card Container - NO BORDERS */}
                  <div className="relative bg-gradient-to-br from-gray-900/60 to-black/40 backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-gold/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden h-full flex flex-col">
                    
                    {/* Card Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    {/* PROPERLY RESPONSIVE Image Container */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-t-2xl">
                      {evt.image ? (
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-full h-full object-contain bg-gray-900/50 transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      
                      {/* Enhanced Fallback Icon */}
                      <div className="w-full h-full flex items-center justify-center text-6xl text-gold/60 bg-gradient-to-br from-gray-800/30 to-gray-900/30" style={{display: evt.image ? 'none' : 'flex'}}>
                        📅
                      </div>
                      
                      {/* Enhanced Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      
                      {/* Enhanced Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-md transition-all duration-300 group-hover:scale-105 ${
                          isUpcoming(evt.date) 
                            ? 'bg-gradient-to-r from-emerald-500/30 to-green-600/30 text-emerald-200 shadow-lg shadow-emerald-500/25' 
                            : 'bg-gradient-to-r from-gold/30 to-yellow-500/30 text-gold shadow-lg shadow-gold/25'
                        }`}>
                          {isUpcoming(evt.date) ? '🔴 LIVE' : '📅 PAST'}
                        </span>
                      </div>

                      {/* Corner Accent */}
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-gold/20 to-transparent opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="p-6 flex flex-col flex-grow relative">
                      {/* Decorative Border */}
                      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300 line-clamp-2 leading-tight mt-2">
                        {evt.title}
                      </h3>
                      
                      {/* Date with Enhanced Styling */}
                      <div className="flex items-center text-gray-400 text-sm mb-4 group-hover:text-gold/80 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mr-3 group-hover:bg-gold/30 transition-colors">
                          <span className="text-gold text-sm">📅</span>
                        </div>
                        <span className={`font-medium ${isUpcoming(evt.date) ? 'text-emerald-400' : 'text-gray-300'}`}>
                          {formatDate(evt.date)}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-300 text-sm leading-relaxed flex-grow mb-6 line-clamp-3 group-hover:text-gray-200 transition-colors">
                        {evt.description}
                      </p>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(evt, index);
                          }}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-700/60 to-gray-800/60 hover:from-gray-600/60 hover:to-gray-700/60 text-gray-200 hover:text-white rounded-lg font-semibold transition-all duration-300 text-sm backdrop-blur-sm hover:shadow-lg transform hover:scale-105"
                        >
                          View Details
                        </button>
                        
                        {isUpcoming(evt.date) && (
                          <button 
                            onClick={(e) => handleRegister(evt, e)}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-gold/20 to-yellow-500/20 hover:from-gold/30 hover:to-yellow-500/30 text-gold hover:text-yellow-300 rounded-lg font-semibold transition-all duration-300 text-sm backdrop-blur-sm hover:shadow-lg hover:shadow-gold/25 transform hover:scale-105"
                          >
                            Register
                          </button>
                        )}
                      </div>

                      {/* Bottom Accent Line */}
                      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal remains the same */}
      {isModalOpen && selectedEvent && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
            closing ? "fade-out" : "fade-in"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-gradient-to-br from-gray-900/95 to-black/90 rounded-2xl border border-gold/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative ${
              closing ? "modal-scale-out" : "modal-scale-in"
            }`}
            style={{ 
              '--card-x': `${cardPosition.x}px`,
              '--card-y': `${cardPosition.y}px`,
              '--card-width': `${cardPosition.width}px`,
              '--card-height': `${cardPosition.height}px`
            }}
          >
            <div className="sticky top-0 bg-gradient-to-r from-gray-900/95 to-black/90 backdrop-blur-sm border-b border-gold/30 p-6 flex justify-between items-start">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent pr-8">
                {selectedEvent.title}
              </h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gold transition-colors text-2xl leading-none p-2 hover:bg-gray-800/50 rounded-lg"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {selectedEvent.image && (
                <div className="mb-6 rounded-xl overflow-hidden shadow-lg bg-gray-900/50">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title}
                    className="w-full h-auto max-h-80 object-contain"
                  />
                </div>
              )}

              <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${
                  isUpcoming(selectedEvent.date) 
                    ? 'bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/25' 
                    : 'bg-gold/20 text-gold shadow-lg shadow-gold/25'
                }`}>
                  {isUpcoming(selectedEvent.date) ? '🔴 Upcoming Event' : '📅 Past Event'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-300 bg-gray-800/30 rounded-lg p-3">
                  <span className="mr-3 text-xl">📅</span>
                  <div>
                    <span className="font-semibold block text-sm text-gray-400">Date</span>
                    <span className={isUpcoming(selectedEvent.date) ? 'text-emerald-400' : 'text-gray-300'}>
                      {formatDate(selectedEvent.date)}
                    </span>
                  </div>
                </div>
                
                {selectedEvent.time && (
                  <div className="flex items-center text-gray-300 bg-gray-800/30 rounded-lg p-3">
                    <span className="mr-3 text-xl">⏰</span>
                    <div>
                      <span className="font-semibold block text-sm text-gray-400">Time</span>
                      <span>{selectedEvent.time}</span>
                    </div>
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div className="flex items-center text-gray-300 bg-gray-800/30 rounded-lg p-3 md:col-span-2">
                    <span className="mr-3 text-xl">📍</span>
                    <div>
                      <span className="font-semibold block text-sm text-gray-400">Location</span>
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gold mb-4 flex items-center">
                  <span className="mr-2">📋</span>
                  About this Event
                </h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                >
                  Close
                </button>
                {isUpcoming(selectedEvent.date) && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegister(selectedEvent, e);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-gold/20 to-yellow-500/20 hover:from-gold/30 hover:to-yellow-500/30 text-gold hover:text-yellow-300 rounded-lg font-semibold transition-all duration-300 text-center backdrop-blur-sm hover:shadow-lg hover:shadow-gold/25"
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Registration Modal */}
      <EventRegistrationModal
        event={registrationEvent}
        isOpen={isRegistrationOpen}
        onClose={closeRegistrationModal}
        onSuccess={handleRegistrationSuccess}
      />
            
      {/* Enhanced CSS */}
      <style jsx global>{`
        /* Section visibility */
        #events {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease, transform 1s ease;
        }
        
        #events.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Title simple fade up */
        @keyframes fadeUp {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .events-title.animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }

        /* Professional typewriter effect for subtitle */
        @keyframes typewriter {
          0% { width: 0; }
          100% { width: 100%; }
        }

        @keyframes blinkCursor {
          0%, 50% { border-right: 3px solid #ffd700; }
          51%, 100% { border-right: 3px solid transparent; }
        }

        /* Subtitle typewriter effect */
        .events-subtitle span {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          border-right: 3px solid transparent;
        }

        .events-subtitle.animate-typewriter span {
          animation: typewriter 2s steps(60) forwards, blinkCursor 0.75s infinite;
        }

        /* Professional card fade-up animation */
        @keyframes cardFadeUp {
          0% { 
            opacity: 0; 
            transform: translateY(40px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }

        /* Event cards base state - stay visible once animated */
        .event-card {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: none;
        }

        .event-cards-wrapper [class*='grid'] > div {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: none;
        }

        /* Professional card animation - maintains visibility */
        .event-card.animate-card-fade-up,
        .event-cards-wrapper [class*='grid'] > div.animate-card-fade-up {
          animation: cardFadeUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
          animation-fill-mode: forwards;
        }

        /* Enhanced Modal Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes modalScaleIn {
          0% {
            transform: translate(calc(var(--card-x) - 50vw + var(--card-width) / 2), calc(var(--card-y) - 50vh + var(--card-height) / 2)) scale(0.2);
            opacity: 0;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
        }
        @keyframes modalScaleOut {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(var(--card-x) - 50vw + var(--card-width) / 2), calc(var(--card-y) - 50vh + var(--card-height) / 2)) scale(0.2);
            opacity: 0;
          }
        }
        .fade-in { 
          animation: fadeIn 400ms ease-out forwards; 
        }
        .fade-out { 
          animation: fadeOut 400ms ease-in forwards; 
        }
        .modal-scale-in { 
          animation: modalScaleIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards; 
        }
        .modal-scale-out { 
          animation: modalScaleOut 400ms cubic-bezier(0.36, 0, 0.66, -0.56) forwards; 
        }

        /* Custom Scrollbar */
        .modal-scale-in::-webkit-scrollbar,
        .modal-scale-out::-webkit-scrollbar {
          width: 4px;
        }

        .modal-scale-in::-webkit-scrollbar-track,
        .modal-scale-out::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 2px;
        }

        .modal-scale-in::-webkit-scrollbar-thumb,
        .modal-scale-out::-webkit-scrollbar-thumb {
          background: rgba(255, 215, 0, 0.2);
          border-radius: 2px;
          transition: background 0.3s ease;
        }

        .modal-scale-in::-webkit-scrollbar-thumb:hover,
        .modal-scale-out::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 215, 0, 0.4);
        }

        /* Remove scrollbar arrow buttons */
        .modal-scale-in::-webkit-scrollbar-button,
        .modal-scale-out::-webkit-scrollbar-button {
          display: none;
          width: 0;
          height: 0;
        }

        /* Firefox scrollbar */
        .modal-scale-in,
        .modal-scale-out {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 215, 0, 0.2) transparent;
        }
        
        /* Text utilities */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Enhanced hover effects */
        .event-card:hover .w-8 {
          background-color: rgba(255, 215, 0, 0.4);
          transform: scale(1.1);
        }

        .event-card:hover h3 {
          color: #ffd700;
        }
      `}</style>
    </>
  );
}