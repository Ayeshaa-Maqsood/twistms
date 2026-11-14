import React, { useEffect, useRef } from 'react';

/**
 * Site-wide ambient background: soft dots drifting slowly upward plus a few
 * twinkling four-point sparkles. One fixed canvas, capped particle count and
 * DPR, paused when the tab is hidden, and frozen for reduced-motion users.
 */
const TONES = ['70, 72, 80', '110, 140, 180', '140, 120, 190', '90, 90, 95'];

function makeParticle(w, h, sparkle, anywhere = true) {
  return {
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : h + 20,
    r: sparkle ? 3 + Math.random() * 4 : 0.8 + Math.random() * 2.2,
    vx: (Math.random() - 0.5) * 0.12,
    vy: -(0.08 + Math.random() * 0.22),
    alpha: sparkle ? 0.5 + Math.random() * 0.4 : 0.15 + Math.random() * 0.3,
    tone: TONES[Math.floor(Math.random() * TONES.length)],
    phase: Math.random() * Math.PI * 2,
    twinkle: 0.6 + Math.random() * 1.4,
    sparkle,
  };
}

function drawSparkle(ctx, p, a) {
  const { x, y, r } = p;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(p.phase * 0.2);
  ctx.shadowColor = `rgba(${p.tone}, ${a})`;
  ctx.shadowBlur = r * 3;
  ctx.fillStyle = `rgba(${p.tone}, ${a})`;
  ctx.beginPath();
  // Four-point star: long tips, pinched waist
  for (let i = 0; i < 8; i++) {
    const ang = (i * Math.PI) / 4;
    const len = i % 2 === 0 ? r * 2.2 : r * 0.45;
    ctx.lineTo(Math.cos(ang) * len, Math.sin(ang) * len);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function SparkleField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let particles = [];
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobile = w < 768;
      const dots = mobile ? 28 : 60;
      const sparkles = mobile ? 8 : 16;
      particles = [
        ...Array.from({ length: dots }, () => makeParticle(w, h, false)),
        ...Array.from({ length: sparkles }, () => makeParticle(w, h, true)),
      ];
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          p.phase += 0.01 * p.twinkle;
          if (p.y < -20 || p.x < -20 || p.x > w + 20) Object.assign(p, makeParticle(w, h, p.sparkle, false));
        }
        const flicker = 0.55 + 0.45 * Math.sin(p.phase * 2 + t * 0.001 * p.twinkle);
        const a = p.alpha * (p.sparkle ? flicker : 0.75 + 0.25 * flicker);
        if (p.sparkle) {
          drawSparkle(ctx, p, a);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.tone}, ${a})`;
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 -z-[1] pointer-events-none" />;
}
