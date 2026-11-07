import React, { useEffect, useState } from 'react';

export default function AnimatedCounter({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);

  // Extract pure numeric portion from target string (e.g. "500+" -> 500)
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * numericTarget));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericTarget);
      }
    };

    const frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [numericTarget, duration]);

  // If target has no numeric part (e.g. "All 50 States"), display cleanly
  if (isNaN(numericTarget) || numericTarget === 0) {
    return <span>{target}</span>;
  }

  return (
    <span>
      {count.toLocaleString()}
      {target.includes('+') ? '+' : ''}
      {target.includes('%') ? '%' : ''}
      {suffix}
    </span>
  );
}

