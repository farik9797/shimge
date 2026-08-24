---
name: spatial-ui-visionos
description: >-
  Design guidelines and component architecture for Spatial UI and Apple visionOS
  interfaces: frosted glass materials, volumetric depth layers, ornaments,
  hover gaze highlights, and spatial interaction paradigms.
---

# Spatial UI & visionOS Design Guidelines

This skill provides the design tokens, layout mechanics, and component patterns for constructing spatial, volumetric, and visionOS-inspired interfaces.

---

## 1. Core Principles of Spatial UI

1. **Dynamic Glass as the Fundamental Material**:
   - The UI does not use opaque colored backgrounds. Instead, it relies on thick, adaptive translucent glass that adjusts its luminance based on the environment behind it.
   - **Spec**: High background blur (`backdrop-blur-3xl`), dynamic specular highlights on top edges, dark ambient shadow beneath.

2. **Ornaments & Floating Toolbars**:
   - Primary navigation (tab bars, toolbars, search bars) floats outside the main window bounds as an independent glass "ornament" pinned to the bottom or side edge.

3. **Gaze & Focus Highlights (Visual Affordance)**:
   - When hovering over an interactive element, the element does not just change color; it gently illuminates from within with a soft radial white sheen (`radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)`) and expands by 2–4px.

---

## 2. visionOS Glass Tokens (Tailwind & CSS)

```css
/* visionOS Glass Panel */
.vision-glass-panel {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-top: 1px solid rgba(255, 255, 255, 0.35); /* Top specular bevel */
  box-shadow: 
    0 24px 60px -12px rgba(0, 0, 0, 0.45),
    0 0 1px 1px rgba(255, 255, 255, 0.1) inset;
  border-radius: 28px;
}

/* visionOS Floating Ornament */
.vision-ornament {
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(28px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
  border-radius: 9999px;
  padding: 8px 16px;
}

/* Hover Gaze Sheen */
.vision-item-interactive {
  position: relative;
  transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  border-radius: 16px;
}

.vision-item-interactive:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.03);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.3);
}
```

---

## 3. Spatial Component Architecture (React)

```tsx
import React from 'react';
import { Home, Layers, Settings, Compass } from 'lucide-react';

export const VisionOSWindow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="relative max-w-4xl mx-auto my-12 p-8 vision-glass-panel text-slate-100 min-h-[500px] flex flex-col justify-between">
      {/* Window Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-6 flex-1">
        {children}
      </div>

      {/* Floating Bottom Ornament */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 vision-ornament flex items-center space-x-3 z-30">
        <button className="p-2.5 rounded-full hover:bg-white/20 text-white transition-colors">
          <Home className="w-5 h-5" />
        </button>
        <button className="p-2.5 rounded-full hover:bg-white/20 text-white transition-colors">
          <Layers className="w-5 h-5" />
        </button>
        <button className="p-2.5 rounded-full hover:bg-white/20 text-white transition-colors">
          <Compass className="w-5 h-5" />
        </button>
        <button className="p-2.5 rounded-full hover:bg-white/20 text-white transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
```
