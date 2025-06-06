"use client";
import { useState, useEffect } from "react";

export default function TeamSection() {
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');

  const teams = {
    "2024-2025": {
      leadership: [
        { 
          name: "Deon Menezes", 
          role: "Captain", 
          year: "TY IT",
          bio: "Visionary founder who established Team Vision Council"
        },
        { 
          name: "Krish Hadkar", 
          role: "Vice Captain", 
          year: "TY EXCP",
          bio: "Supporting leadership and strategic planning"
        },
        { 
          name: "Siddhant Shukla", 
          role: "Project Manager", 
          year: "SY COMPS",
          bio: "Coordinates projects and manages team operations"
        },
        { 
          name: "Sanit Dubal", 
          role: "Treasurer", 
          year: "TY IT",
          bio: "Manages finances and budgeting for council activities"
        }
      ],
      techTeam: [
        { 
          name: "Pradyum Mistry", 
          role: "Tech Head", 
          year: "SY COMPS",
          bio: "Leading technical development and innovation"
        },
        { 
          name: "Omkar Bhoir", 
          role: "Tech Team Member", 
          year: "SY COMPS",
          bio: "Contributing to AR/VR development projects"
        },
        { 
          name: "Omsiddh Rane", 
          role: "Tech Team Member", 
          year: "SY COMPS",
          bio: "Developing cutting-edge technical solutions"
        },
        { 
          name: "Reet Jain", 
          role: "Tech Team Member", 
          year: "FY COMPS",
          bio: "First year enthusiast in immersive technologies"
        },
        { 
          name: "Soniya Vinchurkar", 
          role: "Tech Team Member", 
          year: "FY CCE",
          bio: "Passionate about VR development and innovation"
        },
        { 
          name: "Mahima Singh", 
          role: "Tech Team Member", 
          year: "FY COMPS",
          bio: "Exploring AR applications and user interfaces"
        },
        { 
          name: "Ashvatth Joshi", 
          role: "Tech Team Member", 
          year: "SY COMPS",
          bio: "Focused on immersive experience development"
        },
        { 
          name: "Shlok Tiwari", 
          role: "Tech Team Member", 
          year: "FY COMPS",
          bio: "Learning and contributing to AR/VR projects"
        },
        { 
          name: "Dhruv Kothari", 
          role: "Tech Team Member", 
          year: "FY IT",
          bio: "IT specialist working on technical infrastructure"
        }
      ],
      creativeTeam: [
        { 
          name: "Shrikant Salvi", 
          role: "Creative Head", 
          year: "TY MECH",
          bio: "Leading creative design and visual experiences"
        },
        { 
          name: "Richa Suryavanshi", 
          role: "Creative Team Member", 
          year: "TY EXCP",
          bio: "Creating engaging visual content and designs"
        },
        { 
          name: "Shashwat Jain", 
          role: "Creative Team Member", 
          year: "SY COMPS",
          bio: "Blending technology with creative design"
        }
      ],
      marketingTeam: [
        { 
          name: "Nishtha Savla", 
          role: "Marketing Head", 
          year: "TY COMPS",
          bio: "Strategic marketing and brand development"
        },
        { 
          name: "Shashank Sathish", 
          role: "Marketing Team Member", 
          year: "SY IT",
          bio: "Digital marketing and community outreach"
        }
      ],
      operationsTeam: [
        { 
          name: "Prathamesh Rawas", 
          role: "Operations Head", 
          year: "TY MECH",
          bio: "Managing day-to-day operations and logistics"
        },
        { 
          name: "Raunak Kumar Gupta", 
          role: "Operations Team Member", 
          year: "SY COMPS",
          bio: "Supporting operational efficiency and coordination"
        },
        { 
          name: "Shreya Deshmukh", 
          role: "Operations Team Member", 
          year: "FY AIDS",
          bio: "Organizing events and managing resources"
        },
        { 
          name: "Arshdeep Singh Kohli", 
          role: "Operations Team Member", 
          year: "TY IT",
          bio: "Technical operations and system management"
        }
      ],
      prTeam: [
        { 
          name: "Ketaki Chalke", 
          role: "PRO Head", 
          year: "TY EXCP",
          bio: "Public relations and external communications"
        },
        { 
          name: "Pratiksha Mahajan", 
          role: "PR Team Member", 
          year: "FY AIDS",
          bio: "Building community relationships and engagement"
        },
        { 
          name: "Priyal Gurav", 
          role: "PR Team Member", 
          year: "FY RAI",
          bio: "Social media management and outreach"
        }
      ]
    },
    "2025-2026": {
      leadership: [
        { 
          name: "TBA", 
          role: "Captain", 
          year: "TBA",
          bio: "To be announced for the upcoming academic year"
        },
        { 
          name: "TBA", 
          role: "Vice Captain", 
          year: "TBA",
          bio: "To be announced for the upcoming academic year"
        },
        { 
          name: "TBA", 
          role: "Project Manager", 
          year: "TBA",
          bio: "To be announced for the upcoming academic year"
        },
        { 
          name: "TBA", 
          role: "Treasurer", 
          year: "TBA",
          bio: "To be announced for the upcoming academic year"
        }
      ],
      techTeam: [
        { 
          name: "TBA", 
          role: "Tech Head", 
          year: "TBA",
          bio: "To be announced for the upcoming academic year"
        }
      ],
      creativeTeam: [
        { 
          name: "TBA", 
          role: "Creative Head", 
          year: "TBA",
          bio: "To be announced for the upcoming academic year"
        }
      ],
      marketingTeam: [
        { 
          name: "TBA", 
          role: "Marketing Head", 
          year: "TBA",
          bio: "To be announced for the upcoming academic year"
        }
      ],
      operationsTeam: [
        { 
          name: "TBA", 
          role: "Operations Head", 
          year: "TBA",
          bio: "To be announced for the upcoming academic year"
        }
      ],
      prTeam: [
        { 
          name: "TBA", 
          role: "PRO Head", 
          year: "TBA",
          bio: "To be announced for the upcoming academic year"
        }
      ]
    }
  };

  // FIXED: Proper scroll direction tracking with separate effect
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - lastScrollY) < 5) {
        ticking = false;
        return;
      }

      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // FIXED: Intersection observer only for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { 
        threshold: 0.1  ,
        rootMargin: "0px"
      }
    );

    const teamSection = document.getElementById('team');
    if (teamSection) {
      observer.observe(teamSection);
    }

    return () => observer.disconnect();
  }, []);

  // Handle year change animations
  useEffect(() => {
    if (selectedYear && isVisible) {
      // Force re-animation when year changes
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [selectedYear]);

  const currentTeam = teams[selectedYear];

  // FIXED: Calculate delays based on scroll direction
  const getSectionDelay = (sectionIndex) => {
    const totalSections = 6; // 0: Leadership, 1: Tech, 2: Creative, 3: Marketing, 4: Operations, 5: PR
    
    if (scrollDirection === 'up') {
      // Reverse order when scrolling up - PR first, Leadership last
      const reversedIndex = totalSections - 1 - sectionIndex;
      return reversedIndex * 300; // Faster for reverse
    } else {
      // Normal order when scrolling down - Leadership first, PR last
      return sectionIndex * 500; // Normal spacing
    }
  };

  const TeamCard = ({ member, index, sectionDelay = 0 }) => {
    return (
      <div
        className={`team-card group p-6 bg-gradient-to-br from-gray-900/40 to-black/20 rounded-2xl border border-gold/30 hover:border-gold/60 shadow-xl hover:shadow-gold/20 transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm ${
          isVisible ? 'animate-in' : ''
        }`}
        style={{ 
          animationDelay: isVisible ? `${sectionDelay + (index * 100)}ms` : '0ms'
        }}
      >
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gold/20 to-gold-light/20 mb-4 flex items-center justify-center border-2 border-gold/40 group-hover:border-gold/70 transition-all duration-300 group-hover:scale-110">
          <span className="text-gold text-3xl group-hover:scale-110 transition-transform duration-300">👤</span>
        </div>
        <h3 className="text-xl font-bold text-gold mb-1 group-hover:text-gold-light transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-gold-light mb-1 font-semibold group-hover:text-gold transition-colors duration-300">
          {member.role}
        </p>
        <p className="text-gray-300 mb-3 text-sm font-medium group-hover:text-gray-200 transition-colors duration-300">
          {member.year}
        </p>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed text-sm">
          {member.bio}
        </p>
      </div>
    );
  };

  const TeamSubSection = ({ title, members, gridCols = "sm:grid-cols-2 lg:grid-cols-3", sectionIndex }) => (
    <div className="team-section mb-20">
      <h3 className="section-title text-3xl font-bold text-gold text-center mb-12">
        {title}
      </h3>
      <div className={`grid ${gridCols} gap-6 ${gridCols.includes('lg:grid-cols-2') ? 'max-w-2xl mx-auto' : ''}`}>
        {members.map((member, i) => (
          <TeamCard 
            key={`${selectedYear}-${title}-${i}`} 
            member={member} 
            index={i}
            sectionDelay={getSectionDelay(sectionIndex)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Team Section */}
      <section 
        id="team" 
        className="py-32 relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.05),transparent_50%)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="team-title text-5xl md:text-6xl font-bold text-gold mb-8">
              Our Team
            </h2>
            <p className="team-subtitle text-gray-200 text-lg max-w-2xl mx-auto mb-8">
              Meet the passionate individuals driving innovation in AR/VR technology
            </p>
            
            {/* Year Selection */}
            <div className="year-selector flex justify-center mb-8">
              <div className="bg-gray-900/40 rounded-xl p-2 border border-gold/30 backdrop-blur-sm">
                {Object.keys(teams).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      selectedYear === year
                        ? 'bg-gold text-black shadow-lg transform scale-105'
                        : 'text-gold hover:bg-gold/20 hover:scale-105'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Team Content with unique key to force re-render */}
          <div key={`${selectedYear}-${isVisible}-${scrollDirection}`}>
            {/* Leadership - Section 0 */}
            <TeamSubSection 
              title="Leadership" 
              members={currentTeam.leadership} 
              gridCols="sm:grid-cols-2 lg:grid-cols-4"
              sectionIndex={0}
            />

            {/* Tech Team - Section 1 */}
            <TeamSubSection 
              title="Tech Team" 
              members={currentTeam.techTeam} 
              gridCols="sm:grid-cols-2 lg:grid-cols-3"
              sectionIndex={1}
            />

            {/* Creative Team - Section 2 */}
            <TeamSubSection 
              title="Creative Team" 
              members={currentTeam.creativeTeam} 
              gridCols="sm:grid-cols-2 lg:grid-cols-3"
              sectionIndex={2}
            />

            {/* Marketing Team - Section 3 */}
            <TeamSubSection 
              title="Marketing Team" 
              members={currentTeam.marketingTeam} 
              gridCols="sm:grid-cols-2 lg:grid-cols-2"
              sectionIndex={3}
            />

            {/* Operations Team - Section 4 */}
            <TeamSubSection 
              title="Operations Team" 
              members={currentTeam.operationsTeam} 
              gridCols="sm:grid-cols-2 lg:grid-cols-4"
              sectionIndex={4}
            />

            {/* PR Team - Section 5 */}
            <div className="team-section mb-12">
              <h3 className="section-title text-3xl font-bold text-gold text-center mb-12">
                Public Relations Team
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTeam.prTeam.map((member, i) => (
                  <TeamCard 
                    key={`${selectedYear}-pr-${i}`} 
                    member={member} 
                    index={i}
                    sectionDelay={getSectionDelay(5)}
                  />
                ))}
              </div>
            </div>

            {/* Show note for 2025-2026 */}
            {selectedYear === "2025-2026" && (
              <div className="team-section text-center mt-12">
                <div className={`bg-gray-900/60 border border-gold/30 rounded-lg p-6 max-w-md mx-auto backdrop-blur-sm transform hover:scale-105 transition-transform duration-300 ${isVisible ? 'animate-in' : ''}`}
                  style={{ 
                    animationDelay: isVisible ? `${getSectionDelay(5) + 400}ms` : '0ms'
                  }}
                >
                  <p className="text-gold font-semibold mb-2">Coming Soon!</p>
                  <p className="text-gray-300 text-sm">
                    The 2025-2026 team structure will be announced at the beginning of the new academic year.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced animations */}
      <style jsx global>{`
        /* Base state for team cards - start invisible */
        .team-card {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
        }

        /* Animate in when visible */
        .team-card.animate-in {
          animation: slideUpFadeIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Smooth keyframe animation */
        @keyframes slideUpFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
          80% {
            opacity: 0.9;
            transform: translateY(2px) scale(0.995);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Hover effects */
        .team-card:hover {
          transform: translateY(-6px) scale(1.01) !important;
          box-shadow: 0 15px 30px rgba(255, 215, 0, 0.15) !important;
        }

        .team-card:hover .w-24 {
          transform: scale(1.05) rotate(3deg);
        }

        /* Year selector button effects */
        .year-selector button {
          position: relative;
          overflow: hidden;
        }

        .year-selector button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
          transition: left 0.5s;
        }

        .year-selector button:hover::before {
          left: 100%;
        }

        /* Fallback for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .team-card {
            opacity: 1 !important;
            transform: none !important;
          }
          .team-card.animate-in {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}