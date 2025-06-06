"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6" style={{ backgroundColor: '#000' }}>
        <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: '#FFD700' }}></div>
        
        <div className={`relative mx-auto max-w-7xl ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: '#FFD700' }}>
              About Vision kjsse
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
              Learn about our history, mission, and values as the technical committee of K.J. Somaiya College of Engineering.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#111' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#FFD700' }}>Our History</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2008, Vision kjsse began as a small group of enthusiastic engineering students with a passion for technology and innovation. What started as informal technical discussions has grown into one of the most active and respected technical committees at K.J. Somaiya College of Engineering.
                </p>
                <p>
                  Over the years, we have expanded our reach and impact, organizing various technical events, workshops, and competitions that have helped thousands of students enhance their skills and knowledge.
                </p>
                <p>
                  Today, Vision kjsse stands as a testament to student initiative and leadership, continuing to inspire and guide new generations of engineering students toward excellence in their chosen fields.
                </p>
              </div>
            </div>
            <div className="relative h-80 border rounded-lg overflow-hidden" style={{ borderColor: 'rgba(255, 215, 0, 0.2)' }}>
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgba(200, 170, 0, 0.2), rgba(0, 0, 0, 0.5))' }}>
                <span className="text-xl" style={{ color: '#FFD700' }}>History Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#000' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-80 border rounded-lg overflow-hidden" style={{ borderColor: 'rgba(255, 215, 0, 0.2)' }}>
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgba(200, 170, 0, 0.2), rgba(0, 0, 0, 0.5))' }}>
                <span className="text-xl" style={{ color: '#FFD700' }}>Mission Image</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#FFD700' }}>Our Mission</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  At Vision kjsse, our mission is to cultivate technical excellence and innovation among students by providing them with platforms and opportunities to learn, practice, and showcase their skills.
                </p>
                <p>
                  We aim to bridge the gap between theoretical knowledge and practical application by organizing hands-on workshops, technical competitions, and industry interactions.
                </p>
                <p>
                  Our goal is to create a vibrant technical ecosystem that encourages curiosity, creativity, and problem-solving, preparing students for the challenges of the ever-evolving technological landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#111' }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#FFD700' }}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="p-6 rounded-lg border" style={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(255, 215, 0, 0.2)' }}>
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4" style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: '#FFD700' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#FFD700' }}>Innovation</h3>
              <p className="text-gray-300">
                We foster a culture of innovation and creative thinking, encouraging students to explore new ideas and solutions.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-6 rounded-lg border" style={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(255, 215, 0, 0.2)' }}>
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4" style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: '#FFD700' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#FFD700' }}>Collaboration</h3>
              <p className="text-gray-300">
                We believe in the power of teamwork and encourage collaboration across disciplines to achieve common goals.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-6 rounded-lg border" style={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(255, 215, 0, 0.2)' }}>
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4" style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" style={{ color: '#FFD700' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#FFD700' }}>Excellence</h3>
              <p className="text-gray-300">
                We strive for excellence in everything we do, setting high standards and continuously improving our initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 px-6" style={{ backgroundColor: '#000' }}>
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#FFD700' }}>Join Vision kjsse</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            If you're passionate about technology and innovation, we invite you to join Vision kjsse. Together, we can make a difference in the technical landscape of our college.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md px-6 py-3 text-base font-medium shadow-sm"
            style={{ backgroundColor: '#FFD700', color: '#000' }}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}