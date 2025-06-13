"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Background from "./Background";

export default function HeroSection({ onOpenModal }) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] py-24 px-4 text-center overflow-hidden">
      {/* Remove tracing beam */}

      <div className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Main Title */}
          <div className="mb-8">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black text-gold transition-all duration-1000 ease-out`} style={{ animationDelay: "200ms" }}>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">T</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">E</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">A</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">M</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default ml-4">V</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">I</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">S</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">I</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">O</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">N</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default ml-4">K</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">J</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">S</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">S</span>
              <span className="inline-block hover:scale-110 hover:text-yellow-400 transition-all duration-300 cursor-default">E</span>
            </h1>
          </div>

          {/* Animated Subtitle */}
          <div className={`mb-12 transition-all duration-1000 ease-out`} style={{ animationDelay: "600ms" }}>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              <span className="typewriter-text">
                Pioneering AR/VR innovation at KJ Somaiya School of Engineering
              </span>
            </p>
          </div>

          {/* Enhanced Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 ease-out`} style={{ animationDelay: "800ms" }}>
            
            {/* Primary Button */}
            <button
              onClick={onOpenModal}
              className="group relative px-8 py-4 bg-gold text-black rounded-xl font-bold text-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gold/50 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join Our Vision
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            {/* Secondary Button */}
            <Link href="#about">
              <button className="group relative px-8 py-4 border-2 border-gold text-gold rounded-xl font-bold text-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gold/30 hover:-translate-y-1">
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black">
                  Discover More
                  <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gold transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
              </button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out`} style={{ animationDelay: '1000ms' }}>
            <div className="flex flex-col items-center text-gold/60 hover:text-gold transition-colors duration-300 cursor-pointer group">
              <div className="w-px h-8 bg-gold/40 group-hover:bg-gold transition-colors duration-300"></div>
              <div className="w-2 h-2 bg-gold/60 rounded-full mt-2 group-hover:bg-gold transition-all duration-300 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        .typewriter-text {
          overflow: hidden;
          border-right: 3px solid #B8860B;
          white-space: nowrap;
          animation: typing 3s steps(70) 1.2s forwards, blink-caret 0.75s step-end infinite;
          width: 0;
          display: inline-block;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #B8860B; }
        }

        /* Enhanced hover effects */
        .group:hover {
          filter: drop-shadow(0 0 20px rgba(184, 134, 11, 0.4));
        }
      `}</style>
    </section>
  );
}