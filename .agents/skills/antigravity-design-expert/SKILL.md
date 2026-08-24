---
name: antigravity-design-expert
description: >-
  Expert guidelines for designing weightless floating interfaces, advanced 3D depth,
  multi-layered Glassmorphism, refractive materials, luminous ambient lighting,
  and anti-gravity motion dynamics.
---

# Antigravity Design Expert Skill

This skill provides the comprehensive architectural patterns, design tokens, shaders, and CSS/Three.js techniques for creating "weightless" (anti-gravity) user interfaces with multi-layered depth, refractive glass, and floating spatial physics.

---

## 1. Core Philosophy: The Weightless Aesthetic

1. **Atmospheric Depth (Z-Axis Elevation)**:
   - UI elements do not sit flat on a 2D plane; they hover at distinct gravitational strata (`z-0` background, `z-10` canvas, `z-20` floating cards, `z-30` interactive overlays, `z-40` HUD navigation).
   - Shadows are not solid drops; they are diffused ambient occlusion colored by the background light sources.

2. **Liquid Glass & Refraction**:
   - High-density backdrops with dynamic blur (`backdrop-blur-2xl`), subtle border inner glow (`inset 0 1px 1px rgba(255,255,255,0.2)`), and chromatic aberration highlights.

3. **Luminous Ambient Backlights**:
   - Soft, moving radial light orbs behind floating cards that create realistic light bleed around semi-transparent edges.

---

## 2. Design Tokens & CSS Formulas

### Floating Glassmorphic Slab
```css
.antigravity-slab {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(24px) saturate(190%);
  -webkit-backdrop-filter: blur(24px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top: 1px solid rgba(255, 255, 255, 0.25); /* Light catching the top bevel */
  box-shadow: 
    0 20px 50px -10px rgba(0, 0, 0, 0.4),
    0 0 30px -5px rgba(56, 189, 248, 0.15), /* Subtle ambient cyan glow */
    inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  transform: translateZ(0);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.antigravity-slab:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 
    0 30px 70px -15px rgba(0, 0, 0, 0.5),
    0 0 45px -5px rgba(56, 189, 248, 0.25),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.35);
}
```

### Floating Levitating Animation
```css
@keyframes antigravity-float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(0.5deg);
  }
}

.levitate {
  animation: antigravity-float 6s ease-in-out infinite;
}
```

---

## 3. React / Three.js 3D Floating Canvas Component

```tsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export const AntigravityCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    x.set(clientX / width - 0.5);
    y.set(clientY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/15 p-8 shadow-2xl transition-shadow hover:shadow-cyan-500/20"
    >
      <div style={{ transform: 'translateZ(40px)' }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
```
