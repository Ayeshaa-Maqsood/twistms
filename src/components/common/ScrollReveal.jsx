import React, { useRef, useState, useEffect } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

/**
 * Lightweight IntersectionObserver reveal (no library cost per instance).
 * API unchanged from the original implementation; now honours
 * prefers-reduced-motion and releases `will-change` once revealed so
 * dozens of instances don't hold compositor layers forever.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 700,
  threshold = 0.15,
  once = true,
  blur = false,
}) {
  const [isVisible, setIsVisible] = useState(() => prefersReducedMotion());
  const domRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  // Direction transform logic
  let initialTransform = '';
  switch (direction) {
    case 'up':
      initialTransform = `translate3d(0, ${distance}px, 0)`;
      break;
    case 'down':
      initialTransform = `translate3d(0, -${distance}px, 0)`;
      break;
    case 'left':
      initialTransform = `translate3d(${distance}px, 0, 0)`;
      break;
    case 'right':
      initialTransform = `translate3d(-${distance}px, 0, 0)`;
      break;
    case 'scale':
      initialTransform = 'scale3d(0.92, 0.92, 1)';
      break;
    case 'none':
    default:
      initialTransform = 'none';
      break;
  }

  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : initialTransform,
        filter: blur ? (isVisible ? 'blur(0px)' : 'blur(8px)') : undefined,
        transition: `opacity ${duration}ms ${ease} ${delay}ms, transform ${duration}ms ${ease} ${delay}ms${
          blur ? `, filter ${duration}ms ${ease} ${delay}ms` : ''
        }`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
}
