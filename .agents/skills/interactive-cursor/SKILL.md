---
name: interactive-cursor
description: >-
  Design and engineering patterns for custom interactive cursors, magnetic button
  physics, mix-blend-mode transformations, context-aware cursor states (view, drag,
  zoom), and touch-device bypass logic.
---

# Interactive Cursor Skill

Guidelines for building modern, high-framerate custom cursor systems that enhance interaction feedback without degrading web performance or accessibility.

---

## 1. Ergonomic Principles

1. **Automatic Touch Bypass**: Custom cursors must instantly disable on touch-enabled devices (`@media (pointer: coarse)`) or when `window.matchMedia('(hover: none)')` evaluates to true.
2. **Lag-Free Tracking**: Use a dual-ring architecture:
   - **Dot (Immediate)**: Coordinates follow mouse directly with zero lag (`transform: translate3d(x, y, 0)`).
   - **Ring / Follower (Spring Inertia)**: Smoothly interpolates via lerp / spring physics with 0.15–0.2 damping.
3. **Mix Blend Mode Difference**: Allows the cursor to remain legible across white, dark, or multicolored backdrops.

---

## 2. Interactive Cursor States

| State | Cursor Visual Transformation | Trigger Selector |
| :--- | :--- | :--- |
| **Default** | 8px solid dot + 32px outline ring | Standard body hovering |
| **Hover Link/Button** | Ring expands to 56px, opacity increases, magnetic snap | `a, button, [data-cursor="pointer"]` |
| **Image/Project Card** | Ring expands to 80px with centered label text ("VIEW / КП") | `[data-cursor="view"]` |
| **Draggable Slider** | Left-Right arrows icon inside enlarged cursor | `[data-cursor="drag"]` |
| **Text Select** | Cursor narrows into a vertical pill or hides | `input, textarea, [data-cursor="text"]` |

---

## 3. Production React Component Implementation

```tsx
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'drag'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Touch screen detection
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor]') as HTMLElement | null;

      if (interactiveEl) {
        const type = interactiveEl.getAttribute('data-cursor') as any;
        setCursorType(type || 'pointer');
        setCursorText(interactiveEl.getAttribute('data-cursor-text') || '');
      } else if (target?.closest('button, a, input, select')) {
        setCursorType('pointer');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* 1. Fast Center Dot */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-orange-500 pointer-events-none"
      />

      {/* 2. Inertial Follower Ring */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{
          scale: cursorType === 'pointer' ? 1.6 : cursorType === 'view' ? 2.5 : 1,
          width: cursorType === 'view' ? 64 : 32,
          height: cursorType === 'view' ? 64 : 32,
          marginLeft: cursorType === 'view' ? -32 : -16,
          marginTop: cursorType === 'view' ? -32 : -16,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="fixed top-0 left-0 rounded-full border border-orange-400/80 bg-orange-500/10 backdrop-blur-xs flex items-center justify-center pointer-events-none mix-blend-difference"
      >
        {cursorText && (
          <span className="text-[10px] font-black text-white uppercase tracking-wider scale-75">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
```
