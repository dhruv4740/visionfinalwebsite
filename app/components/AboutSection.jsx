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
                src="/images/remove bg.png"
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
          
          {/* Projects Grid - No Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Walk the plank */}
            <div>
              <h4 className="text-xl font-bold text-gold mb-4">
                Walk the plank
              </h4>
              <p className="text-gray-300 text-base leading-relaxed">
                Experience the thrill of walking the plank on a 200th Storey Building in VR!
              </p>
            </div>

            {/* Roller Coaster Simulation */}
            <div>
              <h4 className="text-xl font-bold text-gold mb-4">
                Roller Coaster Simulation
              </h4>
              <p className="text-gray-300 text-base leading-relaxed">
                Ride A Roller Coaster in the comfort of your Home
              </p>
            </div>

            {/* Tower Crane Simulation */}
            <div>
              <h4 className="text-xl font-bold text-gold mb-4">
                Tower Crane Simulation
              </h4>
              <p className="text-gray-300 text-base leading-relaxed">
                Our Industrial level Virtual Simulation for the piloting of a Crane
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}