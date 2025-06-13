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
          bio: "Visionary founder who established Team Vision Council",
          image: "/images/TEAMS/Deon_Menezes.DNG"
        },
        { 
          name: "Krish Hadkar", 
          role: "Vice Captain", 
          year: "TY EXCP",
          bio: "Supporting leadership and strategic planning",
          image: "/team/krish.jpg"
        },
        { 
          name: "Siddhant Shukla", 
          role: "Project Manager", 
          year: "SY COMPS",
          bio: "Coordinates projects and manages team operations",
          image: "/team/siddhant.jpg"
        },
        { 
          name: "Sanit Dubal", 
          role: "Treasurer", 
          year: "TY IT",
          bio: "Manages finances and budgeting for council activities",
          image: "/team/sanit.jpg"
        }
      ],
      techTeam: [
        { 
          name: "Pradyum Mistry", 
          role: "Tech Head", 
          year: "SY COMPS",
          bio: "Leading technical development and innovation",
          image: "/team/pradyum.jpg"
        },
        { 
          name: "Omkar Bhoir", 
          role: "Tech Team Member", 
          year: "SY COMPS",
          bio: "Contributing to AR/VR development projects",
          image: "/team/omkar.jpg"
        },
        { 
          name: "Omsiddh Rane", 
          role: "Tech Team Member", 
          year: "SY COMPS",
          bio: "Developing cutting-edge technical solutions",
          image: "/team/omsiddh.jpg"
        },
        { 
          name: "Reet Jain", 
          role: "Tech Team Member", 
          year: "FY COMPS",
          bio: "First year enthusiast in immersive technologies",
          image: "/images/TEAMS/ReetJain.jpg"
        },
        { 
          name: "Soniya Vinchurkar", 
          role: "Tech Team Member", 
          year: "FY CCE",
          bio: "Passionate about VR development and innovation",
          image: "/images/TEAMS/soniya vinchurkar .jpg"
        },
        { 
          name: "Mahima Singh", 
          role: "Tech Team Member", 
          year: "FY COMPS",
          bio: "Exploring AR applications and user interfaces",
          image: "/images/TEAMS/Mahima Singh .jpg"
        },
        { 
          name: "Ashvatth Joshi", 
          role: "Tech Team Member", 
          year: "SY COMPS",
          bio: "Focused on immersive experience development",
          image: "/team/ashvatth.jpg"
        },
        { 
          name: "Shlok Tiwari", 
          role: "Tech Team Member", 
          year: "FY COMPS",
          bio: "Learning and contributing to AR/VR projects",
          image: "/team/shlok.jpg"
        },
        { 
          name: "Dhruv Kothari", 
          role: "Tech Team Member", 
          year: "FY IT",
          bio: "IT specialist working on technical infrastructure",
          image: "/team/dhruv.jpg"
        }
      ],
      creativeTeam: [
        { 
          name: "Shrikant Salvi", 
          role: "Creative Head", 
          year: "TY MECH",
          bio: "Leading creative design and visual experiences",
          image: "/team/shrikant.jpg"
        },
        { 
          name: "Richa Suryavanshi", 
          role: "Creative Team Member", 
          year: "TY EXCP",
          bio: "Creating engaging visual content and designs",
          image: "/team/richa.jpg"
        },
        { 
          name: "Shashwat Jain", 
          role: "Creative Team Member", 
          year: "SY COMPS",
          bio: "Blending technology with creative design",
          image: "/team/shashwat.jpg"
        }
      ],
      marketingTeam: [
        { 
          name: "Nishtha Savla", 
          role: "Marketing Head", 
          year: "TY COMPS",
          bio: "Strategic marketing and brand development",
          image: "/team/nishtha.jpg"
        },
        { 
          name: "Shashank Sathish", 
          role: "Marketing Team Member", 
          year: "SY IT",
          bio: "Digital marketing and community outreach",
          image: "/team/shashank.jpg"
        }
      ],
      operationsTeam: [
        { 
          name: "Prathamesh Rawas", 
          role: "Operations Head", 
          year: "TY MECH",
          bio: "Managing day-to-day operations and logistics",
          image: "/team/prathamesh.jpg"
        },
        { 
          name: "Raunak Kumar Gupta", 
          role: "Operations Team Member", 
          year: "SY COMPS",
          bio: "Supporting operational efficiency and coordination",
          image: "/team/raunak.jpg"
        },
        { 
          name: "Shreya Deshmukh", 
          role: "Operations Team Member", 
          year: "FY AIDS",
          bio: "Organizing events and managing resources",
          image: "/team/shreya.jpg"
        },
        { 
          name: "Arshdeep Singh Kohli", 
          role: "Operations Team Member", 
          year: "TY IT",
          bio: "Technical operations and system management",
          image: "/team/arshdeep.jpg"
        }
      ],
      prTeam: [
        { 
          name: "Ketaki Chalke", 
          role: "PRO Head", 
          year: "TY EXCP",
          bio: "Public relations and external communications",
          image: "/team/ketaki.jpg"
        },
        { 
          name: "Pratiksha Mahajan", 
          role: "PR Team Member", 
          year: "FY AIDS",
          bio: "Building community relationships and engagement",
          image: "/team/pratiksha.jpg"
        },
        { 
          name: "Priyal Gurav", 
          role: "PR Team Member", 
          year: "FY RAI",
          bio: "Social media management and outreach",
          image: "/team/pri yal.jpg"
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

  // Team Structure Diagram Component with PROPERLY CONNECTED lines
  const TeamStructure = () => (
    <div className="mb-20">
      <h3 className="text-3xl font-bold text-gold text-center mb-12">Team Structure</h3>
      <div className="max-w-6xl mx-auto">
        {/* Leadership Level */}
        <div className="flex justify-center mb-3">
          <div className="text-center">
            <div className="hover-box bg-gradient-to-br from-gold/40 to-yellow-500/40 border-2 border-gold rounded-xl px-6 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20">
              <h4 className="text-lg font-bold text-gold">Leadership Team</h4>
              <p className="text-xs text-gold/80">Captain, Vice Captain, Project Manager, Treasurer</p>
            </div>
          </div>
        </div>

        {/* Vertical line from Leadership */}
        <div className="flex justify-center mb-3">
          <div className="w-1 h-8 bg-gradient-to-b from-gold via-gold/80 to-gold/60 shadow-lg shadow-gold/30 rounded-full"></div>
        </div>

        {/* Horizontal connecting line */}
        <div className="flex justify-center mb-3">
          <div className="w-4/5 h-1 bg-gradient-to-r from-transparent via-gold/80 to-transparent rounded-full shadow-lg shadow-gold/20"></div>
        </div>

        {/* Vertical lines down to teams */}
        <div className="flex justify-center mb-3">
          <div className="w-4/5 flex justify-between">
            <div className="w-1 h-8 bg-gradient-to-b from-gold to-blue-400/80 shadow-lg shadow-blue-400/30 rounded-full"></div>
            <div className="w-1 h-8 bg-gradient-to-b from-gold to-purple-400/80 shadow-lg shadow-purple-400/30 rounded-full"></div>
            <div className="w-1 h-8 bg-gradient-to-b from-gold to-green-400/80 shadow-lg shadow-green-400/30 rounded-full"></div>
            <div className="w-1 h-8 bg-gradient-to-b from-gold to-orange-400/80 shadow-lg shadow-orange-400/30 rounded-full"></div>
            <div className="w-1 h-8 bg-gradient-to-b from-gold to-pink-400/80 shadow-lg shadow-pink-400/30 rounded-full"></div>
          </div>
        </div>

        {/* Department Teams */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <div className="text-center">
            <div className="hover-box bg-gradient-to-br from-blue-600/30 to-blue-500/30 border-2 border-blue-400/70 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-400/20 hover:border-blue-300">
              <h5 className="text-sm font-bold text-blue-300">Tech Team</h5>
              <p className="text-xs text-blue-200">AR/VR Development</p>
            </div>
          </div>
          <div className="text-center">
            <div className="hover-box bg-gradient-to-br from-purple-600/30 to-purple-500/30 border-2 border-purple-400/70 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-400/20 hover:border-purple-300">
              <h5 className="text-sm font-bold text-purple-300">Creative Team</h5>
              <p className="text-xs text-purple-200">Design & Media</p>
            </div>
          </div>
          <div className="text-center">
            <div className="hover-box bg-gradient-to-br from-green-600/30 to-green-500/30 border-2 border-green-400/70 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-400/20 hover:border-green-300">
              <h5 className="text-sm font-bold text-green-300">Marketing Team</h5>
              <p className="text-xs text-green-200">Outreach & Branding</p>
            </div>
          </div>
          <div className="text-center">
            <div className="hover-box bg-gradient-to-br from-orange-600/30 to-orange-500/30 border-2 border-orange-400/70 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-400/20 hover:border-orange-300">
              <h5 className="text-sm font-bold text-orange-300">Operations Team</h5>
              <p className="text-xs text-orange-200">Logistics & Events</p>
            </div>
          </div>
          <div className="text-center">
            <div className="hover-box bg-gradient-to-br from-pink-600/30 to-pink-500/30 border-2 border-pink-400/70 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-400/20 hover:border-pink-300">
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
        <div className={`hover-box bg-gradient-to-br from-gray-900/80 to-black/60 border-2 ${
          isHead || isLeadership ? 'border-gold/70' : 'border-gray-600/50'
        } rounded-lg p-4 backdrop-blur-sm hover:scale-105 hover:border-gold/60 transition-all duration-300 w-56 min-h-[160px] flex flex-col hover:shadow-xl ${
          isHead || isLeadership ? 'hover:shadow-gold/20' : 'hover:shadow-white/10'
        }`}>
          {/* Member Avatar */}
          <div className={`w-28 h-28 mx-auto rounded-full overflow-hidden mb-3 flex items-center justify-center border-2 ${
            isHead || isLeadership ? 'border-gold/60' : 'border-gray-500/50'
          } transition-all duration-300 group-hover:scale-125`}>
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            ) : (
              <div className={`w-12 h-12 rounded-full ${isHead || isLeadership ? 'bg-gold' : 'bg-gray-300'} transition-all duration-300 group-hover:scale-110`}></div>
            )}
          </div>
          
          {/* Member Info */}
          <div className="text-center flex-1 flex flex-col justify-between">
            <div>
              <h5 className={`text-sm font-bold mb-2 ${isHead || isLeadership ? 'text-gold' : 'text-white'} transition-all duration-300 group-hover:text-gold`}>
                {member.name}
              </h5>
              <p className={`text-xs font-semibold mb-2 ${isHead || isLeadership ? 'text-gold-light' : 'text-gray-300'} transition-all duration-300 group-hover:text-gold-light`}>
                {member.role}
              </p>
              <p className="text-gray-400 text-xs mb-2 transition-all duration-300 group-hover:text-gray-300">{member.year}</p>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 transition-all duration-300 group-hover:text-gray-400">{member.bio}</p>
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
                <div className="absolute -bottom-3 left-1/2 w-1 h-6 bg-gradient-to-b from-gold to-gold/60 -translate-x-1/2 shadow-sm shadow-gold/20 rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Single line emerging from bottom of leadership */}
        <div className="w-1 h-12 bg-gradient-to-b from-gold to-white mb-8 shadow-sm shadow-gold/20 rounded-full"></div>

        {/* Horizontal line connecting to all team headers */}
        <div className="relative w-full mb-8">
          {/* Main horizontal line */}
          <div className="flex justify-center mb-3">
            <div className="w-4/5 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-sm shadow-white/20 rounded-full"></div>
          </div>
          
          {/* Vertical drop lines for each team */}
          <div className="flex justify-center">
            <div className="w-4/5 flex justify-between">
              <div className="w-1 h-8 bg-gradient-to-b from-white to-blue-400/60 shadow-sm shadow-blue-400/20 rounded-full"></div>
              <div className="w-1 h-8 bg-gradient-to-b from-white to-purple-400/60 shadow-sm shadow-purple-400/20 rounded-full"></div>
              <div className="w-1 h-8 bg-gradient-to-b from-white to-green-400/60 shadow-sm shadow-green-400/20 rounded-full"></div>
              <div className="w-1 h-8 bg-gradient-to-b from-white to-orange-400/60 shadow-sm shadow-orange-400/20 rounded-full"></div>
              <div className="w-1 h-8 bg-gradient-to-b from-white to-pink-400/60 shadow-sm shadow-pink-400/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Team Branch Component with Fixed Height
  const TeamBranch = ({ title, members }) => {
    const head = members.find(m => m.role.toLowerCase().includes('head') || m.role.toLowerCase().includes('captain'));
    const teamMembers = members.filter(m => !m.role.toLowerCase().includes('head') && !m.role.toLowerCase().includes('captain'));

    return (
      <div className="relative flex flex-col items-center min-h-[600px] pt-2">
        {/* Team Title (Branch Node) */}
        <div className="flex justify-center mb-6">
          <div className="hover-box bg-gradient-to-br from-gold/30 to-yellow-500/30 border-2 border-gold/70 rounded-xl px-6 py-4 backdrop-blur-sm shadow-lg min-w-[140px] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20 hover:border-gold">
            <h4 className="text-base font-bold text-gold text-center whitespace-nowrap transition-all duration-300 hover:text-yellow-300">
              {title}
            </h4>
          </div>
        </div>

        {/* Connection line from team header to team head */}
        <div className="w-1 h-8 bg-gradient-to-b from-gold to-white mb-4 shadow-sm shadow-gold/20 rounded-full"></div>

        {/* Head Member (if exists) */}
        {head && (
          <div className="mb-6">
            <MemberCard member={head} isHead={true} />
          </div>
        )}

        {/* Connection line to team members */}
        {teamMembers.length > 0 && head && (
          <div className="w-1 h-6 bg-gradient-to-b from-gold to-white mb-4 shadow-sm shadow-gold/20 rounded-full"></div>
        )}

        {/* Team Members in Vertical Layout */}
        {teamMembers.length > 0 && (
          <div className="flex flex-col items-center space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative">
                {/* Connection line to each member */}
                {index > 0 && (
                  <div className="absolute -top-4 left-1/2 w-1 h-4 bg-gradient-to-b from-white to-gray-400 -translate-x-1/2 shadow-sm shadow-white/10 rounded-full"></div>
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
            
            {/* Simplified Year Selection */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-900/80 rounded-2xl p-3 border-2 border-gold/30 backdrop-blur-sm shadow-lg shadow-gold/10">
                {Object.keys(teams).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-8 py-4 mx-1 rounded-xl font-bold text-sm transition-all duration-300 ${
                      selectedYear === year
                        ? 'bg-gold text-black shadow-lg shadow-gold/30'
                        : 'text-gold bg-transparent hover:bg-gold/10 hover:scale-105'
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
              <div className="hover-box bg-gradient-to-br from-gold/40 to-yellow-500/40 border-3 border-gold rounded-2xl px-8 py-6 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:shadow-gold/30">
                <h3 className="text-3xl font-bold text-gold text-center transition-all duration-300 hover:text-yellow-300">
                  Team Vision {selectedYear}
                </h3>
              </div>
            </div>

            {/* Main trunk line from root to leadership */}
            <div className="absolute left-1/2 top-28 w-1 h-16 bg-gradient-to-b from-gold to-white -translate-x-1/2 shadow-sm shadow-gold/20 rounded-full"></div>

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
                <div className="hover-box bg-gray-900/80 border-2 border-gold/50 rounded-xl p-8 max-w-md mx-auto backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/20 hover:border-gold/70">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gold/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gold/30 hover:scale-110">
                    <div className="w-6 h-6 bg-gold/60 rounded-full transition-all duration-300 hover:bg-gold/80"></div>
                  </div>
                  <p className="text-gold font-semibold text-lg mb-2 transition-all duration-300 hover:text-yellow-300">Coming Soon!</p>
                  <p className="text-gray-300 transition-all duration-300 hover:text-gray-200">
                    The 2025-2026 team structure will be announced at the beginning of the new academic year.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Simplified Styles */}
      <style jsx global>{`
        /* Universal hover box animation */
        .hover-box {
          position: relative;
          overflow: hidden;
        }

        .hover-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
          transition: left 0.6s ease;
          z-index: 1;
        }

        .hover-box:hover::before {
          left: 100%;
        }

        .hover-box > * {
          position: relative;
          z-index: 2;
        }

        /* Enhanced member card hover effects */
        .group:hover .bg-gradient-to-br {
          transform: scale(1.05) translateY(-4px);
          box-shadow: 0 15px 35px rgba(255, 215, 0, 0.25);
        }

        /* Text utilities */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Root node special effects */
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(255, 215, 0, 0.4);
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(255, 215, 0, 0.5);
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