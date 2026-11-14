import React, { useEffect, useRef } from 'react';

export default function InteractiveWaveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const mouse = {
      x: null,
      y: null,
      radius: 150,
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Architectural Luxury Particle Palette (Champagne Gold, Warm Greige, Soft Slate, Off-White)
    const luxuryColors = [
      { r: 197, g: 168, b: 128 }, // Champagne Gold (#B4B4B4)
      { r: 166, g: 136, b: 94 },  // Deep Sand Bronze (#A6885E)
      { r: 100, g: 116, b: 139 }, // Muted Slate Grey (#6B6B6B)
      { r: 160, g: 174, b: 192 }, // Soft Cool Silver Grey
      { r: 216, g: 194, b: 157 }, // Pale Linen Beige
    ];

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 9000), 120);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 1.2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speed = Math.random() * 0.6 + 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.waveFreq = Math.random() * 0.007 + 0.002;
        this.colorObj = luxuryColors[Math.floor(Math.random() * luxuryColors.length)];
        this.alpha = Math.random() * 0.45 + 0.25;
        this.hovered = false;
      }

      update(time) {
        // Serene, slow organic drift
        this.baseX += Math.cos(this.angle) * this.speed * 0.35;
        this.baseY += Math.sin(time * this.waveFreq + this.x * 0.004) * 0.55;

        // Wrap around boundaries
        if (this.baseX < -20) this.baseX = width + 20;
        if (this.baseX > width + 20) this.baseX = -20;
        if (this.baseY < -20) this.baseY = height + 20;
        if (this.baseY > height + 20) this.baseY = -20;

        // Mouse displacement & repulsion physics
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.baseX;
          const dy = mouse.y - this.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x = this.baseX - forceDirectionX * force * 75;
            this.y = this.baseY - forceDirectionY * force * 75;
            this.hovered = true;
          } else {
            this.x += (this.baseX - this.x) * 0.07;
            this.y += (this.baseY - this.y) * 0.07;
            this.hovered = false;
          }
        } else {
          this.x += (this.baseX - this.x) * 0.07;
          this.y += (this.baseY - this.y) * 0.07;
          this.hovered = false;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.hovered ? this.size * 1.8 : this.size, 0, Math.PI * 2);

        if (this.hovered) {
          // Warm champagne glow highlight
          ctx.fillStyle = `rgba(180, 180, 180, 0.9)`;
          ctx.shadowColor = `rgba(180, 180, 180, 0.6)`;
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, ${this.alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // Subtle champagne constellation webbing
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const lineAlpha = (1 - dist / 85) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(180, 180, 180, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    let time = 0;
    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(time);
        particles[i].draw();
      }
      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
