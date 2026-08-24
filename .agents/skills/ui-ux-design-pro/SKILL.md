---
name: ui-ux-design-pro
description: >-
  Expert UI/UX Design System, modern trendy aesthetics (Liquid Glass, Aurora,
  Bento Grids, Neobrutalism, Dark Luxury, Industrial Precision), color palettes,
  typography pairings, layout tokens, micro-interactions, and accessibility standards.
---

# UI/UX Design Pro Skill

This skill provides an authoritative library of visual styles, design tokens, color theory, font pairings, and UI/UX design patterns for crafting world-class web and mobile interfaces.

---

## 1. Visual Style Archetypes

### A. Industrial & Engineering B2B (Precision & Authority)
- **Palette**: Deep Navy (`#0F172A`, `#0B192C`), Slate Gray (`#1E293B`, `#334155`), Safety Orange (`#FF6B00`, `#EA580C`), Cyan (`#0284C7`), Neutral White (`#FFFFFF`).
- **Typography**: Inter, Roboto, Plus Jakarta Sans, JetBrains Mono (for SKU, specs, measurements).
- **Aesthetic**: Sharp borders, subtle shadows, high contrast, technical metric cards, structured data tables, status badges (EAC, GOST, ISO).
- **Use Cases**: Industrial suppliers, manufacturing portals, B2B SaaS, logistics, telemetry.

### B. Liquid Glass / Glassmorphism (Modern macOS/iOS Aesthetic)
- **CSS Tokens**:
  ```css
  background: rgba(255, 255, 255, 0.08); /* or rgba(15, 23, 42, 0.75) for dark */
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  ```
- **Use Cases**: Floating navigation bars, dashboards, modern SaaS, overlay modals, widgets.

### C. Aurora / Mesh Glow (Vibrant High-Tech & Web3)
- **CSS Tokens**:
  ```css
  background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%),
              radial-gradient(circle at 100% 50%, rgba(236, 72, 153, 0.12), transparent 50%),
              #0B0F19;
  ```
- **Use Cases**: Hero sections, landing pages, AI product showcases.

### D. Bento Grid Layouts (Modular Information Architecture)
- **Pattern**: Asymmetrical grid items (1x1, 2x1, 2x2, 3x1) with uniform `gap-4` or `gap-6` and `rounded-2xl` or `rounded-3xl` cards.
- **Card Hierarchy**: High-contrast icon badge + prominent metric + micro-chart or preview + concise caption.

### E. Neobrutalism (Bold & High Contrast)
- **CSS Tokens**:
  ```css
  border: 2px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  border-radius: 8px;
  ```
- **Colors**: Cyber Yellow (`#FFE600`), Vibrant Lilac (`#C084FC`), Mint (`#6EE7B7`), Pure Black (`#000000`).

---

## 2. Professional Color Palettes

| Theme Name | Primary Brand | Accent / CTA | Background | Card / Surface | Text Muted |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Industrial Pro** | `#0F243E` (Navy) | `#FF6B00` (Orange) | `#F8FAFC` (Slate 50) | `#FFFFFF` (White) | `#64748B` |
| **Deep Cosmos** | `#0F172A` (Slate 900) | `#6366F1` (Indigo) | `#020617` (Slate 950) | `#0F172A` / `#1E293B` | `#94A3B8` |
| **Emerald Fintech** | `#064E3B` (Emerald 900) | `#10B981` (Emerald 500) | `#F0FDF4` | `#FFFFFF` | `#6B7280` |
| **Cyber Luxury** | `#18181B` (Zinc 900) | `#F59E0B` (Amber) | `#09090B` (Zinc 950) | `#18181B` | `#A1A1AA` |

---

## 3. Typography Pairings

1. **Precision & Modern Tech**:
   - Headings: `Inter` (700 / 800 Bold, -0.02em tracking)
   - Body: `Inter` (400 / 500 Regular)
   - Code/Specs: `JetBrains Mono` or `Fira Code`
2. **Editorial & Corporate Trust**:
   - Headings: `Plus Jakarta Sans` or `Cabinet Grotesk`
   - Body: `Plus Jakarta Sans` or `Open Sans`
3. **High-Impact Display**:
   - Headings: `Syne` or `Clash Display`
   - Body: `Satoshi` or `General Sans`

---

## 4. UI/UX Interaction Rules

1. **Touch Targets**: Minimum 44x44px for touchable buttons/inputs on mobile.
2. **Feedback on Click**: Active press states (`active:scale-95 transition-transform duration-100`).
3. **Contrast Ratios**: Minimum 4.5:1 for normal text and 3:1 for large text (WCAG 2.1 AA).
4. **Form Ergonomics**: Floating/clear labels, inline validation states, explicit error cues.
5. **Loading States**: Shimmer skeletons matching the card shapes rather than generic spinners.
