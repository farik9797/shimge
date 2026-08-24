---
name: frontend-design
description: >-
  Contextual frontend UI architecture and interface generation tailored for
  React 19, TypeScript, Tailwind CSS v4, Lucide Icons, modular components,
  mobile-first responsive grids, accessible dialogs/drawers, and state management.
---

# Frontend Design Skill

This skill provides guidelines and patterns for generating production-ready, clean, accessible, and high-performance frontend components.

---

## 1. Core Principles

1. **Composition Over Monoliths**: Split pages into atomic components (`Header`, `Sidebar`, `Card`, `Modal`, `Drawer`, `Form`).
2. **Predictable State Architecture**: Use React Context / custom hooks for global state (cart, active filters, search query, modals) and local state for input buffers.
3. **Zero Layout Shifts (CLS)**: Always provide explicit height/aspect-ratio on image containers and skeleton loaders.
4. **Mobile-First Responsiveness**: Use standard Tailwind breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`).

---

## 2. Standard Component Patterns

### A. Responsive Header with Mega Menu & Search
```tsx
import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown, ShoppingBag } from 'lucide-react';

export const ModernHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 font-black text-xl tracking-tight text-slate-900">
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">S</span>
          <span>Brand</span>
        </div>
        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block relative">
          <input 
            type="text" 
            placeholder="Search items..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700">
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
```

### B. Faceted Filter Sidebar & Sorting
```tsx
// Pattern for combining checkboxes, range sliders, and active tags
```

### C. Accessible Slide-Over Drawer & Modals
- Traps focus or closes on `Esc` key and backdrop click.
- Prevents body scroll with `overflow-hidden` on active overlay.
- Smooth CSS entry transitions (`animate-in fade-in slide-in-from-right duration-200`).

---

## 3. Performance & Clean Code Rules
- Use memoization (`useMemo`, `useCallback`) for heavy array filters and sorts.
- Prefer semantic HTML (`<main>`, `<header>`, `<footer>`, `<aside>`, `<nav>`, `<section>`, `<article>`).
- Always include `alt` attributes on `<img>` tags and `aria-label` on icon-only buttons.
