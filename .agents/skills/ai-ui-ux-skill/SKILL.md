---
name: ai-ui-ux-skill
description: >-
  Comprehensive design system tokens, color harmonies, typography scales,
  component states, accessibility guidelines (WCAG 2.1 AA), and UI design rules.
---

# AI UI/UX Skill & Design System Guide

A standardized specification for crafting cohesive, accessible, and high-converting user interfaces across all digital products.

---

## 1. Design Token Specifications

### Spacing Scale
- `space-1`: 4px (micro padding, icon gaps)
- `space-2`: 8px (badge padding, tight list item gaps)
- `space-3`: 12px (card inner padding, input gaps)
- `space-4`: 16px (standard component padding)
- `space-6`: 24px (grid gutters, section margins)
- `space-8`: 32px (card containers)
- `space-12`: 48px (section vertical spacing)
- `space-16`: 64px (hero spacing)

### Border Radius
- `rounded-md`: 6px (buttons, badges, inputs)
- `rounded-xl`: 12px (inner cards, alert boxes)
- `rounded-2xl`: 16px (main cards, dialogs)
- `rounded-3xl`: 24px (hero containers, featured sections)
- `rounded-full`: 9999px (pills, avatars, floating action triggers)

---

## 2. Color Contrast & Accessibility (A11y)
- **Minimum Contrast Ratio**:
  - Body Text: `4.5:1` against background.
  - Large Headings (>24px): `3:1`.
  - Form Focus Rings: `3:1` against surrounding background.
- **Keyboard Navigation**:
  - All interactive elements (`button`, `a`, `input`, `select`) must support `:focus-visible` with high-contrast outlines (`focus-visible:ring-2 focus-visible:ring-blue-600`).
- **Screen Reader Compatibility**:
  - Always pair icon-only triggers with descriptive `aria-label` or visually hidden text.

---

## 3. Font Pairings & Typographic Hierarchy

| Role | Font Family | Weight | Size (Desktop) | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Heading** | `Inter` / `Plus Jakarta Sans` | 800 / 900 Black | 40px – 56px | 1.15 |
| **Section Title** | `Inter` / `Plus Jakarta Sans` | 700 Bold | 28px – 36px | 1.25 |
| **Card Title** | `Inter` | 700 Bold | 16px – 18px | 1.35 |
| **Body Text** | `Inter` | 400 Regular / 500 Medium | 14px – 15px | 1.55 |
| **Micro / Specs** | `Inter` / `JetBrains Mono` | 600 SemiBold | 11px – 12px | 1.4 |
