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

    // Mouse coordinates & interaction radius
    const mouse = {
      x: null,
      y: null,
      radius: 140, // Repulsion boundary
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

    // Particles Definition
    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 8000), 140);

    const colors = [
      { r: 0, g: 242, b: 254 },   // Neon Cyan
      { r: 79, g: 172, b: 254 },  // Electric Sky Blue
      { r: 139, g: 92, b: 246 },  // Ultra Violet
      { r: 192, g: 132, b: 252 }, // Soft Lilac
      { r: 16, g: 185, b: 129 },  // Emerald Mint
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 1.2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.speed = Math.random() * 0.8 + 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.waveFrequency = Math.random() * 0.008 + 0.003;
        this.waveAmplitude = Math.random() * 25 + 15;
        this.colorObj = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.3;
        this.hovered = false;
      }

      update(time) {
        // Natural sine-wave drift across the screen
        this.baseX += Math.cos(this.angle) * this.speed * 0.4;
        this.baseY += Math.sin(time * this.waveFrequency + this.x * 0.005) * 0.6;

        // Wrap around canvas edges
        if (this.baseX < -20) this.baseX = width + 20;
        if (this.baseX > width + 20) this.baseX = -20;
        if (this.baseY < -20) this.baseY = height + 20;
        if (this.baseY > height + 20) this.baseY = -20;

        // Mouse repulsion physics
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.baseX;
          const dy = mouse.y - this.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            // Push away smoothly
            this.x = this.baseX - forceDirectionX * force * 70;
            this.y = this.baseY - forceDirectionY * force * 70;
            this.hovered = true;
          } else {
            this.x += (this.baseX - this.x) * 0.08;
            this.y += (this.baseY - this.y) * 0.08;
            this.hovered = false;
          }
        } else {
          this.x += (this.baseX - this.x) * 0.08;
          this.y += (this.baseY - this.y) * 0.08;
          this.hovered = false;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.hovered ? this.size * 1.8 : this.size, 0, Math.PI * 2);
        
        // Gradient glow color shift on hover
        if (this.hovered) {
          ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
          ctx.shadowColor = `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, 1)`;
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, ${this.alpha})`;
          ctx.shadowColor = `rgba(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b}, 0.5)`;
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // Subtle connecting constellation lines between nearby particles
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const lineAlpha = (1 - dist / 90) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 242, 254, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
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
