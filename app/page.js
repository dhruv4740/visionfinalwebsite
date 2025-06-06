"use client";
import { useState, useEffect } from "react";
import ApplicationModal from "./components/ApplicationModal";
import Header from "./components/Header";
import Background from "./components/Background";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EventsSection from "./components/EventsSection";
import TeamSection from "./components/TeamSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.classList.contains("animate-on-scroll")) {
              entry.target.classList.add("animate-enhanced");
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="font-sans text-white overflow-x-hidden relative min-h-screen">
      <Background />

      <div className="relative z-10">
        <Header />
        <ApplicationModal isOpen={isModalOpen} onClose={closeModal} />

        <HeroSection onOpenModal={openModal} />
        <AboutSection />
        <EventsSection />
        <TeamSection />
        <ContactSection />

        {/* CTA Section */}
        <section className="py-32 text-center relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-gray-900/40 to-black/20 rounded-3xl border border-gold/40 shadow-xl backdrop-blur-sm">
              <h2 className="text-5xl md:text-6xl font-bold text-gold mb-8">
                Ready to Shape the Future?
              </h2>
              <p className="text-gray-200 mb-12 text-xl leading-relaxed max-w-2xl mx-auto">
                Join Team Vision and become part of the next generation of AR/VR innovators. The future is immersive.
              </p>
              <button
                onClick={openModal}
                className="px-12 py-4 bg-gold text-black font-bold text-lg rounded-lg hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105"
              >
                Apply Today
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        :root {
          --gold: #B8860B;
          --gold-light: #DAA520;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          scroll-behavior: smooth;
        }
        .text-gold { color: var(--gold); }
        .text-gold-light { color: var(--gold-light); }
        .bg-gold { background-color: var(--gold); }

        /* General fade-up */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }

        /* On-scroll reveal */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .animate-enhanced {
          transform: translateY(0) scale(1.01);
          transition: transform 1.5s ease;
        }

        /* Events title & subtitle animations */
        @keyframes typewriter { 0% { width: 0; } 100% { width: 100%; } }
        @keyframes blinkCursor { 
          0%,50% { border-right: 3px solid var(--gold); }
          51%,100% { border-right: 3px solid transparent; }
        }
        @keyframes fadeUpDelayed {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .events-title span {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          border-right: 3px solid transparent;
        }
        .events-title.animate-typewriter span {
          animation: typewriter 1.5s steps(40) forwards, blinkCursor 0.75s infinite;
        }
        .events-subtitle.animate-fade-up-delayed {
          animation: fadeUpDelayed 0.8s ease-out forwards;
        }

        /* Curtain-open animation for event cards */
        @keyframes eventCardCurtainOpen {
          0%   { clip-path: inset(0 100% 0 0); opacity: 0; }
          40%  { clip-path: inset(0  80% 0 0); opacity: 0.4; }
          80%  { clip-path: inset(0  20% 0 0); opacity: 0.8; }
          100% { clip-path: inset(0   0% 0 0); opacity: 1; }
        }

        /* Base state for event cards */
        .event-card,
        .event-cards-wrapper [class*='grid'] > div {
          opacity: 0;
          transform: translateY(60px) rotateX(20deg) scale(0.8);
          transition: none;
        }

        /* Apply curtain-open to each animate-event-card class */
        .event-card.animate-event-card-left,
        .event-card.animate-event-card-top,
        .event-card.animate-event-card-right,
        .event-card.animate-event-card-bottom,
        .event-card.animate-event-card-spin,
        .event-cards-wrapper [class*='grid'] > div.animate-event-card-left,
        .event-cards-wrapper [class*='grid'] > div.animate-event-card-top,
        .event-cards-wrapper [class*='grid'] > div.animate-event-card-right,
        .event-cards-wrapper [class*='grid'] > div.animate-event-card-bottom,
        .event-cards-wrapper [class*='grid'] > div.animate-event-card-spin {
          animation: eventCardCurtainOpen 1.2s ease-out forwards;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--gold-light); }
      `}</style>
    </div>
  );
}