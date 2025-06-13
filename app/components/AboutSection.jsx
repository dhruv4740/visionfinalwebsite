"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen text-white py-20">
      {/* Header */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <h1 className="text-6xl md:text-7xl font-bold text-gold mb-4">
            ABOUT US
          </h1>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-8">
          {/* Left Side - VR Image */}
          <div className="flex justify-center">
            <div className="w-[520px] h-[520px] relative overflow-hidden rounded-lg group">
              <Image
                src="/images/gif.gif"
                alt="Stylized gold-tinted person wearing VR headset"
                fill
                className="object-cover"
                sizes="520px"
                priority
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gold mb-8 leading-tight">
              Experience<br />
              Immersion
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Student-driven AR/VR research, workshops and collaborative projects shaping the future of immersive technology.
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-4"></div>

        {/* Our Projects Section */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-gold mb-12">
            Our Projects
          </h3>
          
          {/* Projects Grid - With Image, Responsive, Attractive Hover & Flip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Walk the plank */}
            <div className="group perspective">
              <div className="relative w-full h-full min-h-[320px] flex flex-col items-center">
                <div className="flip-card-inner group-hover:rotate-y-180 transition-transform duration-700 w-full h-full">
                  {/* Front Side */}
                  <div className="flip-card-front bg-gradient-to-br from-gray-900/80 to-black/70 border-2 border-gold/20 rounded-2xl shadow-lg flex flex-col items-center justify-center w-full h-full absolute backface-hidden">
                    <div className="p-6 flex-1 flex flex-col justify-center items-center w-full">
                      <h4 className="text-xl font-bold text-gold mb-4 text-center">
                        Walk the plank
                      </h4>
                      <p className="text-gray-300 text-base leading-relaxed font-bold text-center">
                        Experience the thrill of walking the plank on a 200th Storey Building in VR!
                      </p>
                    </div>
                  </div>
                  {/* Back Side (Image) */}
                  <div className="flip-card-back absolute w-full h-full rounded-2xl overflow-hidden backface-hidden rotate-y-180">
                    <Image
                      src="/images/project2.gif"
                      alt="Walk the plank"
                      fill
                      className="object-cover object-center"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roller Coaster Simulation */}
            <div className="group perspective">
              <div className="relative w-full h-full min-h-[320px] flex flex-col items-center">
                <div className="flip-card-inner group-hover:rotate-y-180 transition-transform duration-700 w-full h-full">
                  {/* Front Side */}
                  <div className="flip-card-front bg-gradient-to-br from-gray-900/80 to-black/70 border-2 border-gold/20 rounded-2xl shadow-lg flex flex-col items-center justify-center w-full h-full absolute backface-hidden">
                    <div className="p-6 flex-1 flex flex-col justify-center items-center w-full">
                      <h4 className="text-xl font-bold text-gold mb-4 text-center">
                        Roller Coaster Simulation
                      </h4>
                      <p className="text-gray-300 text-base leading-relaxed font-bold text-center">
                        Ride A Roller Coaster in the comfort of your Home
                      </p>
                    </div>
                  </div>
                  {/* Back Side (Image) */}
                  <div className="flip-card-back absolute w-full h-full rounded-2xl overflow-hidden backface-hidden rotate-y-180">
                    <Image
                      src="/images/project.gif"
                      alt="Roller Coaster Simulation"
                      fill
                      className="object-cover object-center"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tower Crane Simulation */}
            <div className="group perspective">
              <div className="relative w-full h-full min-h-[320px] flex flex-col items-center">
                <div className="flip-card-inner group-hover:rotate-y-180 transition-transform duration-700 w-full h-full">
                  {/* Front Side */}
                  <div className="flip-card-front bg-gradient-to-br from-gray-900/80 to-black/70 border-2 border-gold/20 rounded-2xl shadow-lg flex flex-col items-center justify-center w-full h-full absolute backface-hidden">
                    <div className="p-6 flex-1 flex flex-col justify-center items-center w-full">
                      <h4 className="text-xl font-bold text-gold mb-4 text-center">
                        Tower Crane Simulation
                      </h4>
                      <p className="text-gray-300 text-base leading-relaxed font-bold text-center">
                        Our Industrial level Virtual Simulation for the piloting of a Crane
                      </p>
                    </div>
                  </div>
                  {/* Back Side (Image) */}
                  <div className="flip-card-back absolute w-full h-full rounded-2xl overflow-hidden backface-hidden rotate-y-180">
                    <Image
                      src="/images/projects/crane.jpg"
                      alt="Tower Crane Simulation"
                      fill
                      className="object-cover object-center"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        .group:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0; left: 0;
        }
        .flip-card-front {
          z-index: 2;
          transform: rotateY(0deg);
        }
        .flip-card-back {
          z-index: 1;
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}