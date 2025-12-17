import React, { useEffect, useRef } from 'react';

// Simple physics-based smooth cursor using requestAnimationFrame
const SmoothCursor = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  // target (real mouse) position
  const target = useRef({ x: 0, y: 0 });
  // current (smoothed) position
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointermove', handleMove);

    let rafId;

    const animate = () => {
      const speed = 0.18; // smaller = smoother/slower
      current.current.x += (target.current.x - current.current.x) * speed;
      current.current.y += (target.current.y - current.current.y) * speed;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400"
      />
      {/* outer glow */}
      <div
        ref={outlineRef}
        className="pointer-events-none fixed left-0 top-0 z-[59] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/70 bg-violet-500/10 backdrop-blur-sm"
      />
    </>
  );
};

export default SmoothCursor;
