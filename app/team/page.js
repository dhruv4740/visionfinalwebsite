"use client";
import { useState, useEffect } from 'react';
import ApplicationModal from '../../components/ApplicationModal';
// Sample team data
const teamMembers = [
  {
    id: 1,
    name: "Aditya Sharma",
    role: "Chairperson",
    bio: "Computer Engineering student with expertise in AI and Machine Learning.",
    image: "/placeholder-profile.png"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Vice Chairperson",
    bio: "Electronics Engineering student passionate about IoT and embedded systems.",
    image: "/placeholder-profile.png"
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Technical Head",
    bio: "Information Technology student with skills in full-stack development.",
    image: "/placeholder-profile.png"
  },
  {
    id: 4,
    name: "Sneha Verma",
    role: "Events Coordinator",
    bio: "Mechanical Engineering student with interest in robotics and automation.",
    image: "/placeholder-profile.png"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Marketing Head",
    bio: "Computer Science student with expertise in UI/UX design and branding.",
    image: "/placeholder-profile.png"
  },
  {
    id: 6,
    name: "Neha Gupta",
    role: "Content Manager",
    bio: "Electronics and Telecommunication student with creative writing skills.",
    image: "/placeholder-profile.png"
  },
  {
    id: 7,
    name: "Arjun Kumar",
    role: "Treasurer",
    bio: "Information Technology student with financial management skills.",
    image: "/placeholder-profile.png"
  },
  {
    id: 8,
    name: "Ananya Desai",
    role: "Creative Head",
    bio: "Computer Engineering student with graphic design and multimedia skills.",
    image: "/placeholder-profile.png"
  }
];

export default function Team() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
 return (
    <div className="flex flex-col min-h-screen">
      {/* Application Form Modal */}
      <ApplicationModal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* Hero Section */}
      <section className="relative py-24 px-6" style={{ backgroundColor: '#000' }}>
        <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: '#FFD700' }}></div>
        
        <div className={`relative mx-auto max-w-7xl ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: '#FFD700' }}>
              Meet Our Team
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
              Get to know the passionate individuals behind Vision KJSCE who work tirelessly to make our initiatives a success.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 px-6" style={{ backgroundColor: '#111' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="p-6 rounded-lg border"
                style={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(255, 215, 0, 0.2)' }}
              >
                <div className="aspect-square mb-4 relative rounded-md overflow-hidden" style={{ backgroundColor: '#222' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ color: '#FFD700' }}>Photo</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold" style={{ color: '#FFD700' }}>{member.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#000' }}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#FFD700' }}>Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 rounded-lg border" style={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#FFD700' }}>Faculty Advisor</h3>
              <div className="md:flex gap-6">
                <div className="w-32 h-32 rounded-md mb-4 md:mb-0" style={{ backgroundColor: '#222' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span style={{ color: '#FFD700' }}>Photo</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white">Prof. Rajesh Kumar</h4>
                  <p className="text-gray-400 mb-3">Department of Computer Engineering</p>
                  <p className="text-gray-300">
                    With over 15 years of experience in academia and industry, Prof. Rajesh Kumar provides valuable guidance and mentorship to Vision KJSCE.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-lg border" style={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(255, 215, 0, 0.3)' }}>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#FFD700' }}>Committee Advisor</h3>
              <div className="md:flex gap-6">
                <div className="w-32 h-32 rounded-md mb-4 md:mb-0" style={{ backgroundColor: '#222' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span style={{ color: '#FFD700' }}>Photo</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white">Dr. Meera Sharma</h4>
                  <p className="text-gray-400 mb-3">Department of Information Technology</p>
                  <p className="text-gray-300">
                    Dr. Meera Sharma specializes in emerging technologies and helps Vision KJSCE stay at the cutting edge of technological advancements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Join Team CTA */}
      <section className="py-16 px-6" style={{ backgroundColor: '#000' }}>
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#FFD700' }}>Join Our Team</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Interested in becoming a part of Vision KJSCE? We're always looking for passionate individuals to join our team.
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center rounded-md px-6 py-3 text-base font-medium shadow-sm"
            style={{ backgroundColor: '#FFD700', color: '#000' }}
          >
            Apply Now
          </button>
        </div>
      </section>
    </div>
  );
}