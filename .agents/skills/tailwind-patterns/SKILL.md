---
name: tailwind-patterns
description: >-
  Comprehensive library of production-ready Tailwind CSS patterns: responsive
  bento grids, metric cards, faceted filter bars, sticky navbars, glassmorphism,
  animated interactive buttons, data tables, and lead forms.
---

# Tailwind CSS Patterns Library

Ready-to-use utility classes and component patterns for modern, high-converting web applications.

---

## 1. Metric / Stat Cards (Industrial B2B)

```html
<div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all">
  <div class="flex items-center justify-between text-slate-500 mb-2">
    <span class="text-xs font-bold uppercase tracking-wider">Мощность</span>
    <span class="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
      <!-- Icon -->
    </span>
  </div>
  <div class="text-2xl font-black text-slate-900 tracking-tight">37.0 кВт</div>
  <p class="text-xs text-slate-500 mt-1">Класс IE3 с прямым приводом</p>
</div>
```

---

## 2. Product Card with Hover Zoom & Floating Badges

```html
<div class="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group">
  <div class="relative h-48 bg-slate-100 overflow-hidden flex items-center justify-center p-3">
    <img src="..." alt="..." class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg" />
    <span class="absolute top-2.5 left-2.5 text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded shadow">
      В наличии
    </span>
    <span class="absolute top-2.5 right-2.5 text-[10px] font-black uppercase bg-slate-900/80 text-white px-2 py-0.5 rounded">
      BRAND
    </span>
  </div>
  <div class="p-4 space-y-2">
    <span class="text-[10px] font-mono text-slate-400">SKU-1029</span>
    <h3 class="text-sm font-bold text-slate-900 line-clamp-2">Product Title</h3>
  </div>
  <div class="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between">
    <span class="text-xs font-bold text-slate-900">По запросу</span>
    <button class="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
      Запросить КП
    </button>
  </div>
</div>
```

---

## 3. High-Conversion Hero Section

```html
<section class="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 border-b border-slate-800 overflow-hidden">
  <div class="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
    <!-- Hero content -->
  </div>
</section>
```

---

## 4. Modern Glass Card

```html
<div class="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl text-white">
  <!-- Content inside frosted glass -->
</div>
```

---

## 5. Responsive Data Table

```html
<div class="overflow-x-auto border border-slate-200 rounded-xl">
  <table class="w-full text-xs text-left">
    <thead class="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
      <tr>
        <th class="px-4 py-3">Параметр</th>
        <th class="px-4 py-3">Значение</th>
        <th class="px-4 py-3">Ед. изм.</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
      <tr class="bg-white hover:bg-slate-50">
        <td class="px-4 py-2.5 font-medium text-slate-700">Мощность</td>
        <td class="px-4 py-2.5 font-bold text-slate-900">15.0</td>
        <td class="px-4 py-2.5 text-slate-500">кВт</td>
      </tr>
    </tbody>
  </table>
</div>
```
