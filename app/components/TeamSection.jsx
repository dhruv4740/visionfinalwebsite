"use client";
import { useState } from "react";

export default function TeamSection() {
  const [selectedYear, setSelectedYear] = useState("2024-2025");

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

  const currentTeam = teams[selectedYear];

  // Team Structure Diagram Component
  const TeamStructure = () => (
    <div className="mb-20">
      <h3 className="text-3xl font-bold text-gold text-center mb-12">Team Structure</h3>
      <div className="max-w-6xl mx-auto">
        {/* Leadership Level */}
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-gold/40 to-yellow-500/40 border-2 border-gold rounded-xl px-6 py-4 mb-4">
              <h4 className="text-lg font-bold text-gold">Leadership Team</h4>
              <p className="text-xs text-gold/80">Captain, Vice Captain, Project Manager, Treasurer</p>
            </div>
          </div>
        </div>

        {/* Connection Line */}
        <div className="flex justify-center mb-8">
          <div className="w-px h-12 bg-gold/60"></div>
        </div>

        {/* Department Heads Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-600/30 to-blue-500/30 border-2 border-blue-400/70 rounded-xl px-4 py-3">
              <h5 className="text-sm font-bold text-blue-300">Tech Team</h5>
              <p className="text-xs text-blue-200">AR/VR Development</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-600/30 to-purple-500/30 border-2 border-purple-400/70 rounded-xl px-4 py-3">
              <h5 className="text-sm font-bold text-purple-300">Creative Team</h5>
              <p className="text-xs text-purple-200">Design & Media</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-green-600/30 to-green-500/30 border-2 border-green-400/70 rounded-xl px-4 py-3">
              <h5 className="text-sm font-bold text-green-300">Marketing Team</h5>
              <p className="text-xs text-green-200">Outreach & Branding</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-orange-600/30 to-orange-500/30 border-2 border-orange-400/70 rounded-xl px-4 py-3">
              <h5 className="text-sm font-bold text-orange-300">Operations Team</h5>
              <p className="text-xs text-orange-200">Logistics & Events</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-pink-600/30 to-pink-500/30 border-2 border-pink-400/70 rounded-xl px-4 py-3">
              <h5 className="text-sm font-bold text-pink-300">PR Team</h5>
              <p className="text-xs text-pink-200">Public Relations</p>
            </div>
          </div>
        </div>

        {/* Hierarchy Info */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Each team consists of a Head and dedicated team members working collaboratively
          </p>
        </div>
      </div>
    </div>
  );

  // Member Card Component (Leaf)
  const MemberCard = ({ member, isHead = false }) => {
    // Check if it's a leadership role (Captain, Vice Captain, Treasurer, Manager)
    const isLeadership = member.role.toLowerCase().includes('captain') || 
                        member.role.toLowerCase().includes('treasurer') ||
                        member.role.toLowerCase().includes('manager');
    
    return (
      <div className="relative group mb-4">
        <div className={`bg-gradient-to-br from-gray-900/80 to-black/60 border-2 ${
          isHead || isLeadership ? 'border-gold/70' : 'border-gray-600/50'
        } rounded-lg p-4 backdrop-blur-sm hover:scale-105 hover:border-gold/60 transition-all duration-300 w-56 min-h-[160px] flex flex-col`}>
          {/* Member Avatar */}
          <div className={`w-12 h-12 mx-auto rounded-full ${
            isHead || isLeadership ? 'bg-gradient-to-br from-gold/30 to-yellow-500/30' : 'bg-gradient-to-br from-gray-600/30 to-gray-700/30'
          } mb-3 flex items-center justify-center border-2 ${
            isHead || isLeadership ? 'border-gold/60' : 'border-gray-500/50'
          }`}>
            <div className={`w-5 h-5 rounded-full ${isHead || isLeadership ? 'bg-gold' : 'bg-gray-300'}`}></div>
          </div>
          
          {/* Member Info */}
          <div className="text-center flex-1 flex flex-col justify-between">
            <div>
              <h5 className={`text-sm font-bold mb-2 ${isHead || isLeadership ? 'text-gold' : 'text-white'}`}>
                {member.name}
              </h5>
              <p className={`text-xs font-semibold mb-2 ${isHead || isLeadership ? 'text-gold-light' : 'text-gray-300'}`}>
                {member.role}
              </p>
              <p className="text-gray-400 text-xs mb-2">{member.year}</p>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{member.bio}</p>
          </div>
        </div>
      </div>
    );
  };

  // Leadership Section Component - Vertical Layout
  const LeadershipSection = ({ members }) => {
    return (
      <div className="relative mb-20 flex flex-col items-center">
        {/* Leadership Cards Vertically Stacked */}
        <div className="flex flex-col items-center space-y-6 mb-8">
          {members.map((member, index) => (
            <div key={index} className="relative">
              <MemberCard member={member} isHead={true} />
              {/* Connection line between leadership members */}
              {index < members.length - 1 && (
                <div className="absolute -bottom-3 left-1/2 w-px h-6 bg-white -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Single line emerging from bottom of leadership */}
        <div className="w-px h-12 bg-white mb-8"></div>

        {/* Horizontal line connecting to all team headers - responsive positioning */}
        <div className="relative w-full">
          {/* Main horizontal line - responsive width */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-4/5 h-px bg-white"></div>
          
          {/* Vertical drop lines for each team - positioned using CSS Grid fractions */}
          <div className="absolute w-px h-8 bg-white" style={{ left: '10%' }}></div>
          <div className="absolute w-px h-8 bg-white" style={{ left: '30%' }}></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-8 bg-white"></div>
          <div className="absolute w-px h-8 bg-white" style={{ left: '70%' }}></div>
          <div className="absolute w-px h-8 bg-white" style={{ left: '90%' }}></div>
        </div>
      </div>
    );
  };

  // Team Branch Component with Fixed Height
  const TeamBranch = ({ title, members }) => {
    const head = members.find(m => m.role.toLowerCase().includes('head') || m.role.toLowerCase().includes('captain'));
    const teamMembers = members.filter(m => !m.role.toLowerCase().includes('head') && !m.role.toLowerCase().includes('captain'));

    return (
      <div className="relative flex flex-col items-center min-h-[600px] pt-8">
        {/* Team Title (Branch Node) */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-gold/30 to-yellow-500/30 border-2 border-gold/70 rounded-xl px-6 py-4 backdrop-blur-sm shadow-lg min-w-[140px]">
            <h4 className="text-base font-bold text-gold text-center whitespace-nowrap">
              {title}
            </h4>
          </div>
        </div>

        {/* Connection line from team header to team head */}
        <div className="w-px h-8 bg-white mb-4"></div>

        {/* Head Member (if exists) */}
        {head && (
          <div className="mb-6">
            <MemberCard member={head} isHead={true} />
          </div>
        )}

        {/* Connection line to team members */}
        {teamMembers.length > 0 && head && (
          <div className="w-px h-6 bg-white mb-4"></div>
        )}

        {/* Team Members in Vertical Layout */}
        {teamMembers.length > 0 && (
          <div className="flex flex-col items-center space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative">
                {/* Connection line to each member */}
                {index > 0 && (
                  <div className="absolute -top-4 left-1/2 w-px h-4 bg-white -translate-x-1/2"></div>
                )}
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Team Section */}
      <section id="team" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gold mb-8">
              Our Team
            </h2>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-8">
              Meet the passionate individuals driving innovation in AR/VR technology
            </p>
            
            {/* Year Selection */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-900/60 rounded-xl p-2 border border-gold/30 backdrop-blur-sm">
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

          {/* Team Structure Diagram */}
          <TeamStructure />

          {/* Organizational Chart */}
          <div className="relative max-w-7xl mx-auto">
            {/* Root Node */}
            <div className="flex justify-center mb-16">
              <div className="bg-gradient-to-br from-gold/40 to-yellow-500/40 border-3 border-gold rounded-2xl px-8 py-6 backdrop-blur-sm shadow-2xl">
                <h3 className="text-3xl font-bold text-gold text-center">
                  Team Vision {selectedYear}
                </h3>
              </div>
            </div>

            {/* Main trunk line from root to leadership */}
            <div className="absolute left-1/2 top-28 w-px h-16 bg-white -translate-x-1/2"></div>

            {/* Leadership Section with Vertical Layout and Connection Lines */}
            <LeadershipSection members={currentTeam.leadership} />

            {/* Department Branches - Using Flexbox for Better Alignment */}
            <div className="flex justify-between max-w-6xl mx-auto gap-4">
              {/* Tech Team */}
              <div className="flex-1 flex justify-center">
                <TeamBranch 
                  title="Tech Team" 
                  members={currentTeam.techTeam} 
                />
              </div>

              {/* Creative Team */}
              <div className="flex-1 flex justify-center">
                <TeamBranch 
                  title="Creative Team" 
                  members={currentTeam.creativeTeam} 
                />
              </div>

              {/* Marketing Team */}
              <div className="flex-1 flex justify-center">
                <TeamBranch 
                  title="Marketing Team" 
                  members={currentTeam.marketingTeam} 
                />
              </div>

              {/* Operations Team */}
              <div className="flex-1 flex justify-center">
                <TeamBranch 
                  title="Operations Team" 
                  members={currentTeam.operationsTeam} 
                />
              </div>

              {/* PR Team */}
              <div className="flex-1 flex justify-center">
                <TeamBranch 
                  title="Public Relations" 
                  members={currentTeam.prTeam} 
                />
              </div>
            </div>

            {/* Show note for 2025-2026 */}
            {selectedYear === "2025-2026" && (
              <div className="text-center mt-20">
                <div className="bg-gray-900/80 border-2 border-gold/50 rounded-xl p-8 max-w-md mx-auto backdrop-blur-sm">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gold/20 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gold/60 rounded-full"></div>
                  </div>
                  <p className="text-gold font-semibold text-lg mb-2">Coming Soon!</p>
                  <p className="text-gray-300">
                    The 2025-2026 team structure will be announced at the beginning of the new academic year.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Styles */}
      <style jsx global>{`
        /* Member card hover effects */
        .group:hover .bg-gradient-to-br {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
        }

        /* Text utilities */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Connection lines glow effect */
        .bg-gold\/60:hover,
        .bg-gold\/40:hover {
          background: linear-gradient(to bottom, #ffd700, rgba(255, 215, 0, 0.6));
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }

        /* Root node special effects */
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(255, 215, 0, 0.4);
        }

        /* Responsive adjustments for mobile */
        @media (max-width: 1024px) {
          .flex.justify-between {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
          
          .flex-1 {
            width: 100%;
            max-width: 300px;
          }
          
          /* Hide horizontal connector lines on mobile */
          .absolute.w-px.h-8 {
            display: none;
          }
          
          .absolute.h-px {
            display: none;
          }
          
          .w-56 {
            width: 12rem;
          }
        }

        @media (max-width: 768px) {
          .w-56 {
            width: 11rem;
          }
        }
      `}</style>
    </>
  );
}