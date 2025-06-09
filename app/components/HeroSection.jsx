// app/components/HeroSection.jsx
import Link from "next/link";
import Background from "./Background";

export default function HeroSection({ onOpenModal }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <Background image="/images/hero-bg.jpg" />
      <div className="relative z-10 w-full container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-6xl md:text-8xl font-black text-gold mb-6 opacity-0 translate-y-8 transition duration-1000 ease-out animate-fade-up tracking-tight"
            style={{ animationDelay: "200ms" }}
          >
            Team Vision KJSSE
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-200 mb-12 opacity-0 translate-y-8 transition duration-1000 ease-out animate-fade-up leading-relaxed"
            style={{ animationDelay: "400ms" }}
          >
            Pioneering AR/VR innovation at KJ Somaiya School of Engineering
          </p>
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 translate-y-8 transition duration-1000 ease-out animate-fade-up"
            style={{ animationDelay: "600ms" }}
          >
            <button
              onClick={onOpenModal}
              className="px-12 py-4 bg-gold text-black rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105"
            >
              Join Our Vision
            </button>
            <Link href="#about">
              <button className="px-12 py-4 border-2 border-gold text-gold rounded-lg font-bold text-lg hover:bg-gold hover:text-black transition-all duration-300 transform hover:scale-105">
                Discover More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}