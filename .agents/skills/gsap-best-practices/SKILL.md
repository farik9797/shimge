---
name: gsap-best-practices
description: >-
  Production guidelines, animation architecture, ScrollTrigger automation,
  pinned section transitions, staggered timeline choreography, and high-performance
  GPU optimizations using GreenSock (GSAP).
---

# GSAP Best Practices & ScrollTrigger Automation

This skill establishes the production standard for integrating GreenSock Animation Platform (GSAP) with modern React, TypeScript, and Vite/Next.js projects.

---

## 1. Core Engineering Rules

1. **Always Use `gsap.context()` in React**:
   - Wrap all selector animations and ScrollTriggers in `gsap.context()` inside `useLayoutEffect` / `useEffect` and return `ctx.revert()` to eliminate memory leaks and hot-reloading duplicate triggers.

2. **Hardware Acceleration (GPU Only)**:
   - Only animate `x`, `y`, `z`, `rotation`, `scale`, `opacity`, and `skew`.
   - Never animate `top`, `left`, `margin`, `padding`, or `width/height` directly (which cause expensive CPU layout thrashing).
   - Use `force3D: true` and `will-change: transform` on animated elements.

3. **Timelines Over Scattered Tweens**:
   - Sequence related animations using `gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })` for predictable choreography.

---

## 2. Standard Production Patterns

### A. React Component with ScrollTrigger & Clean Up
```tsx
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Title and Subtitle
      gsap.from('.reveal-item', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // 2. Parallax Media Scrub
      gsap.to('.parallax-media', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 overflow-hidden">
      <h2 className="reveal-item text-4xl font-black">Interactive Performance</h2>
      <p className="reveal-item text-slate-400 mt-2">Smooth 60/120fps motion engineering</p>
      <div className="parallax-media mt-8 h-96 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-900" />
    </section>
  );
};
```

### B. Pinning and Horizontal Scrub Architecture
```ts
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.horizontal-container',
    pin: true,
    scrub: 1,
    start: 'top top',
    end: () => `+=${document.querySelector('.horizontal-track')?.scrollWidth || 2000}`,
    anticipatePin: 1,
  },
});

tl.to('.horizontal-track', {
  x: () => -(document.querySelector('.horizontal-track')?.scrollWidth! - window.innerWidth),
  ease: 'none',
});
```

---

## 3. Recommended Easing Standards
- UI Entrances: `power3.out`, `power4.out`, or `expo.out` (Snappy start, smooth deceleration).
- Modal Popups: `back.out(1.7)` (Gentle overshoot).
- Continuous Loops: `none` or `sine.inOut`.
- Scroll Scrubbing: `none` combined with ScrollTrigger `scrub: 0.8–1.5` for cinematic inertia.
