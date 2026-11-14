import React, { useEffect, useRef } from 'react';

/**
 * Site-wide ambient background: a sparse set of thin-line geometric shapes
 * (circles, rings, triangles, squares, dots) drifting and rotating slowly.
 * Monochrome and low-contrast so it reads as texture, not decoration.
 * One fixed canvas, DPR capped, paused when the tab is hidden, and frozen
 * for reduced-motion users.
 */
const KINDS = ['circle', 'ring', 'triangle', 'square', 'dot', 'circle', 'triangle'];

function makeShape(w, h) {
  const kind = KINDS[Math.floor(Math.random() * KINDS.length)];
  const size = kind === 'dot' ? 3 + Math.random() * 4 : 28 + Math.random() * 110;
  const speed = 0.06 + Math.random() * 0.12;
  const dir = Math.random() * Math.PI * 2;
  return {
    kind,
    x: Math.random() * w,
    y: Math.random() * h,
    size,
    vx: Math.cos(dir) * speed,
    vy: Math.sin(dir) * speed,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.0016,
    alpha: kind === 'dot' ? 0.18 + Math.random() * 0.12 : 0.08 + Math.random() * 0.1,
    tone: Math.random() < 0.75 ? '43, 43, 48' : '95, 110, 135',
  };
}

function drawShape(ctx, s) {
  const r = s.size / 2;
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(s.rot);
  ctx.strokeStyle = `rgba(${s.tone}, ${s.alpha})`;
  ctx.fillStyle = `rgba(${s.tone}, ${s.alpha})`;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  switch (s.kind) {
    case 'dot':
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'circle':
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'ring':
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.moveTo(r * 0.62, 0);
      ctx.arc(0, 0, r * 0.62, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'triangle':
      for (let i = 0; i < 3; i++) {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 3;
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.stroke();
      break;
    default:
      ctx.rect(-r * 0.75, -r * 0.75, r * 1.5, r * 1.5);
      ctx.stroke();
  }
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
    let shapes = [];
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
      const count = w < 768 ? 12 : 22;
      shapes = Array.from({ length: count }, () => makeShape(w, h));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of shapes) {
        if (!reduce) {
          s.x += s.vx;
          s.y += s.vy;
          s.rot += s.vr;
          // Wrap around the edges so the field never empties
          const m = s.size;
          if (s.x < -m) s.x = w + m;
          else if (s.x > w + m) s.x = -m;
          if (s.y < -m) s.y = h + m;
          else if (s.y > h + m) s.y = -m;
        }
        drawShape(ctx, s);
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
