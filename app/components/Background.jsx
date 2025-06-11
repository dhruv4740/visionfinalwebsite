"use client";
import { useEffect, useRef, useState } from "react";

export default function Background({ image = "/images/radombg.png" }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const lastMouseUpdate = useRef(0);

  // Particle class with improved disperse physics
  class Particle {
    constructor(x, y, pathIndex = 0, progress = 0, isReplacement = false) {
      this.originalX = x;
      this.originalY = y;
      this.x = x;
      this.y = y;
      this.pathIndex = pathIndex;
      this.progress = progress;
      this.size = Math.random() * 1.2 + 0.8;
      this.baseOpacity = Math.random() * 0.3 + 0.4;
      this.opacity = this.baseOpacity;
      this.pulseSpeed = Math.random() * 0.015 + 0.008;
      this.pulseOffset = Math.random() * Math.PI * 2;
      
      // Disperse physics
      this.vx = 0;
      this.vy = 0;
      this.dispersed = false;
      this.disperseTime = 0;
      this.hasBeenDispersed = false; // Track if already dispersed
      this.isFlying = false; // Is currently flying away
      this.isReplacement = isReplacement; // Is a replacement particle
      this.flyDistance = 0;
      this.maxFlyDistance = 200 + Math.random() * 100;
      
      // Enhanced color variations
      const colorVariation = Math.random() * 0.3;
      this.color = {
        r: 255,
        g: Math.floor(210 + colorVariation * 40),
        b: Math.floor(colorVariation * 60)
      };

      // For replacement particles, start with fade-in
      if (isReplacement) {
        this.opacity = 0;
        this.fadeInSpeed = 0.02;
      }
    }

    update(mouseX, mouseY) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influenceRadius = 120;

      // Handle replacement particle fade-in
      if (this.isReplacement && this.opacity < this.baseOpacity) {
        this.opacity += this.fadeInSpeed;
        if (this.opacity >= this.baseOpacity) {
          this.opacity = this.baseOpacity;
          this.isReplacement = false;
        }
      }

      // Handle flying particles
      if (this.isFlying) {
        this.x += this.vx;
        this.y += this.vy;
        this.flyDistance += Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        
        // Fade out as it flies away
        this.opacity *= 0.98;
        
        // Remove when it's flown far enough or faded out
        if (this.flyDistance > this.maxFlyDistance || this.opacity < 0.01) {
          this.shouldRemove = true;
        }
        
        // Calculate current opacity for drawing
        const pulse = Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.15 + 0.85;
        this.currentOpacity = this.opacity * pulse;
        return;
      }

      // Only disperse if mouse is near and hasn't been dispersed before
      if (distance < influenceRadius && !this.hasBeenDispersed && !this.isReplacement) {
        this.disperse(dx, dy, distance, influenceRadius);
        this.hasBeenDispersed = true; // Mark as dispersed
      }

      // Normal state - gentle pulsing
      const pulse = Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.25 + 0.75;
      this.currentOpacity = this.opacity * pulse;
    }

    disperse(dx, dy, distance, influenceRadius) {
      this.isFlying = true;
      
      // Calculate disperse direction (away from mouse)
      const angle = Math.atan2(dy, dx);
      const force = Math.pow((influenceRadius - distance) / influenceRadius, 1.2);
      
      // Add random variation for natural look
      const disperseAngle = angle + (Math.random() - 0.5) * 0.6;
      const disperseMagnitude = (3 + Math.random() * 5) * force;
      
      this.vx = -Math.cos(disperseAngle) * disperseMagnitude;
      this.vy = -Math.sin(disperseAngle) * disperseMagnitude;
      
      // Add some random drift
      this.vx += (Math.random() - 0.5) * 2;
      this.vy += (Math.random() - 0.5) * 2;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.currentOpacity;
      
      // Glow effect
      const glowSize = this.isFlying ? this.size * 3 : this.size * 2.5;
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, glowSize
      );
      gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.currentOpacity * 0.8})`);
      gradient.addColorStop(0.3, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.currentOpacity * 0.4})`);
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Core particle
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.currentOpacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }

  // Circuit paths (same as before)
  const getCircuitPaths = (width, height) => {
    return [
      // Main horizontal traces
      { start: { x: 0, y: height * 0.12 }, end: { x: width * 0.4, y: height * 0.12 } },
      { start: { x: width * 0.5, y: height * 0.12 }, end: { x: width, y: height * 0.12 } },
      
      { start: { x: 0, y: height * 0.25 }, end: { x: width * 0.5, y: height * 0.25 } },
      { start: { x: width * 0.65, y: height * 0.25 }, end: { x: width, y: height * 0.25 } },
      
      { start: { x: 0, y: height * 0.38 }, end: { x: width * 0.45, y: height * 0.38 } },
      { start: { x: width * 0.6, y: height * 0.38 }, end: { x: width, y: height * 0.38 } },
      
      { start: { x: 0, y: height * 0.52 }, end: { x: width * 0.35, y: height * 0.52 } },
      { start: { x: width * 0.55, y: height * 0.52 }, end: { x: width, y: height * 0.52 } },
      
      { start: { x: 0, y: height * 0.65 }, end: { x: width * 0.5, y: height * 0.65 } },
      { start: { x: width * 0.7, y: height * 0.65 }, end: { x: width, y: height * 0.65 } },
      
      { start: { x: 0, y: height * 0.78 }, end: { x: width * 0.4, y: height * 0.78 } },
      { start: { x: width * 0.6, y: height * 0.78 }, end: { x: width, y: height * 0.78 } },
      
      { start: { x: 0, y: height * 0.88 }, end: { x: width * 0.3, y: height * 0.88 } },
      { start: { x: width * 0.5, y: height * 0.88 }, end: { x: width, y: height * 0.88 } },

      // Vertical connection traces
      { start: { x: width * 0.15, y: 0 }, end: { x: width * 0.15, y: height * 0.45 } },
      { start: { x: width * 0.15, y: height * 0.55 }, end: { x: width * 0.15, y: height } },
      
      { start: { x: width * 0.3, y: 0 }, end: { x: width * 0.3, y: height * 0.4 } },
      { start: { x: width * 0.3, y: height * 0.5 }, end: { x: width * 0.3, y: height } },
      
      { start: { x: width * 0.45, y: 0 }, end: { x: width * 0.45, y: height * 0.35 } },
      { start: { x: width * 0.45, y: height * 0.45 }, end: { x: width * 0.45, y: height } },
      
      { start: { x: width * 0.6, y: 0 }, end: { x: width * 0.6, y: height * 0.5 } },
      { start: { x: width * 0.6, y: height * 0.6 }, end: { x: width * 0.6, y: height } },
      
      { start: { x: width * 0.75, y: 0 }, end: { x: width * 0.75, y: height * 0.3 } },
      { start: { x: width * 0.75, y: height * 0.4 }, end: { x: width * 0.75, y: height } },
      
      { start: { x: width * 0.85, y: 0 }, end: { x: width * 0.85, y: height * 0.6 } },
      { start: { x: width * 0.85, y: height * 0.7 }, end: { x: width * 0.85, y: height } },

      // Diagonal connections
      { start: { x: width * 0.4, y: height * 0.12 }, end: { x: width * 0.5, y: height * 0.22 } },
      { start: { x: width * 0.5, y: height * 0.25 }, end: { x: width * 0.65, y: height * 0.35 } },
      { start: { x: width * 0.45, y: height * 0.38 }, end: { x: width * 0.6, y: height * 0.48 } },
      { start: { x: width * 0.35, y: height * 0.52 }, end: { x: width * 0.55, y: height * 0.62 } },
      { start: { x: width * 0.5, y: height * 0.65 }, end: { x: width * 0.7, y: height * 0.75 } },
    ];
  };

  // Store particle positions for replacement
  const particlePositions = useRef([]);

  // Initialize particles
  const initializeParticles = (canvas) => {
    const particles = [];
    const positions = [];
    const { width, height } = canvas;
    const paths = getCircuitPaths(width, height);

    paths.forEach((path, pathIndex) => {
      const distance = Math.sqrt(
        Math.pow(path.end.x - path.start.x, 2) + 
        Math.pow(path.end.y - path.start.y, 2)
      );
      
      const particleSpacing = 25 + Math.random() * 10;
      const particleCount = Math.floor(distance / particleSpacing);
      
      for (let i = 0; i <= particleCount; i++) {
        const progress = i / Math.max(particleCount, 1);
        const x = path.start.x + (path.end.x - path.start.x) * progress;
        const y = path.start.y + (path.end.y - path.start.y) * progress;
        
        const offsetX = (Math.random() - 0.5) * 4;
        const offsetY = (Math.random() - 0.5) * 4;
        
        const finalX = x + offsetX;
        const finalY = y + offsetY;
        
        particles.push(new Particle(finalX, finalY, pathIndex, progress));
        positions.push({ x: finalX, y: finalY, pathIndex, progress });
      }
    });

    // Junction points
    const junctions = [
      { x: width * 0.15, y: height * 0.25 },
      { x: width * 0.3, y: height * 0.12 },
      { x: width * 0.45, y: height * 0.38 },
      { x: width * 0.6, y: height * 0.25 },
      { x: width * 0.75, y: height * 0.52 },
      { x: width * 0.85, y: height * 0.65 },
    ];

    junctions.forEach(junction => {
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 3 + Math.random() * 5;
        const x = junction.x + Math.cos(angle) * radius;
        const y = junction.y + Math.sin(angle) * radius;
        
        const particle = new Particle(x, y);
        particle.size *= 1.2;
        particle.baseOpacity *= 1.3;
        particles.push(particle);
        positions.push({ x, y, pathIndex: -1, progress: 0 });
      }
    });

    particlePositions.current = positions;
    return particles;
  };

  // Animation loop with particle management
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update particles
    particlesRef.current.forEach(particle => {
      particle.update(mouseRef.current.x, mouseRef.current.y);
      particle.draw(ctx);
    });

    // Remove particles that should be removed and create replacements
    const removedCount = particlesRef.current.length;
    particlesRef.current = particlesRef.current.filter(particle => !particle.shouldRemove);
    const actuallyRemoved = removedCount - particlesRef.current.length;

    // Create replacement particles
    if (actuallyRemoved > 0) {
      for (let i = 0; i < actuallyRemoved && i < particlePositions.current.length; i++) {
        const pos = particlePositions.current[Math.floor(Math.random() * particlePositions.current.length)];
        const replacementParticle = new Particle(pos.x, pos.y, pos.pathIndex, pos.progress, true);
        if (pos.pathIndex === -1) { // Junction particle
          replacementParticle.size *= 1.2;
          replacementParticle.baseOpacity *= 1.3;
        }
        particlesRef.current.push(replacementParticle);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  // Mouse movement handler (same as before)
  const handleMouseMove = (e) => {
    const now = Date.now();
    if (now - lastMouseUpdate.current < 16) return;
    lastMouseUpdate.current = now;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    mouseRef.current.x = (e.clientX - rect.left) * scaleX;
    mouseRef.current.y = (e.clientY - rect.top) * scaleY;
  };

  // Resize handler (same as before)
  const handleResize = () => {
    clearTimeout(handleResize.timeoutId);
    handleResize.timeoutId = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particlesRef.current = initializeParticles(canvas);
    }, 250);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    particlesRef.current = initializeParticles(canvas);
    setIsLoaded(true);

    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(handleResize.timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('${image}')`
        }}
      ></div>
      
      <div className="absolute inset-0 bg-black/40"></div>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      />
    </div>
  );
}