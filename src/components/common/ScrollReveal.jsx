import React, { useRef, useState, useEffect } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 32,
  duration = 700,
  threshold = 0.15,
  once = true,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
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

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' : initialTransform,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
}
