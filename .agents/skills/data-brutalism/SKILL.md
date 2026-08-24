---
name: data-brutalism
description: >-
  High-density engineering and data-driven brutalist aesthetics: sharp 1px gridlines,
  raw monospace telemetry, monochromatic high-contrast palettes, dense matrix tables,
  unadorned data visualizations, and industrial instrumentation controls.
---

# Data Brutalism Design Skill

This skill provides layout rules, typography standards, and data visualization tokens for crafting high-density, authoritative, and unapologetic "Data Brutalist" interfaces.

---

## 1. Core Principles of Data Brutalism

1. **Information Density Over Blank Space**:
   - Every square pixel serves data communication. Zero generic decorative fluff; beauty emerges from structured precision, raw parameters, and high-frequency telemetry.
2. **Sharp 1px Structural Gridlines**:
   - Pure black/white or high-contrast slate grids (`border border-slate-800`, `divide-y divide-slate-800`).
   - Zero rounded corners (`rounded-none` or strict `rounded-xs`).
3. **Monospaced Data Dominance**:
   - Numbers, timestamps, SKU codes, sensor outputs, and formulas are always rendered in strict monospaced type (`JetBrains Mono`, `IBM Plex Mono`, `Geist Mono`).
4. **Signal Status Indicators**:
   - Raw binary and status cues (`[OK]`, `[ERR 404]`, `[SYNC 99.8%]`, high-saturation phosphor green `#00FF66` or industrial amber `#FFB800`).

---

## 2. Design Tokens & CSS Standards

```css
/* Data Brutalist Canvas */
.brutalist-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  border: 1px solid #1e293b;
  background-color: #020617;
  color: #f8fafc;
  font-family: 'JetBrains Mono', monospace;
}

/* Dense Data Cell */
.brutalist-cell {
  border-right: 1px solid #1e293b;
  border-bottom: 1px solid #1e293b;
  padding: 8px 12px;
}

.brutalist-header {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
  border-bottom: 1px solid #334155;
  background: #0f172a;
}
```

---

## 3. Production React Telemetry Component

```tsx
import React from 'react';
import { Activity, ShieldAlert, Cpu, Terminal } from 'lucide-react';

export const TelemetryConsole: React.FC = () => {
  const telemetry = [
    { metric: 'FLOW_RATE_INSTANT', value: '142.8', unit: 'M3/H', status: 'NOMINAL', hex: '#00FF66' },
    { metric: 'PRESSURE_DELTA_P', value: '16.42', unit: 'BAR', status: 'CRITICAL_HIGH', hex: '#FF3366' },
    { metric: 'MOTOR_KW_CONSUMPTION', value: '36.88', unit: 'KW', status: 'OPTIMAL', hex: '#00FF66' },
    { metric: 'MEMBRANE_TDS_REJECTION', value: '99.44', unit: '%', status: 'ACTIVE', hex: '#00FF66' },
    { metric: 'VIBRATION_RMS_AXIS_Z', value: '1.14', unit: 'MM/S', status: 'CALIBRATED', hex: '#FFB800' },
  ];

  return (
    <div className="bg-black text-slate-100 font-mono text-xs border-2 border-slate-700 rounded-none overflow-hidden">
      {/* Console Header */}
      <div className="bg-slate-900 px-4 py-2 border-b-2 border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white tracking-widest uppercase">SYS_LOG // INDUSTRIAL_TELEMETRY</span>
        </div>
        <div className="flex items-center space-x-3 text-[10px]">
          <span className="text-emerald-400">[CONNECTED]</span>
          <span className="text-slate-400">LATENCY: 12ms</span>
        </div>
      </div>

      {/* Dense Matrix Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <th className="p-3 border-r border-slate-800">PARAMETER_ID</th>
            <th className="p-3 border-r border-slate-800">READOUT</th>
            <th className="p-3 border-r border-slate-800">UNIT</th>
            <th className="p-3">STATUS_FLAG</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {telemetry.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-900/80 transition-colors">
              <td className="p-3 border-r border-slate-800 text-slate-300 font-bold">{row.metric}</td>
              <td className="p-3 border-r border-slate-800 text-white font-black text-sm">{row.value}</td>
              <td className="p-3 border-r border-slate-800 text-slate-500">{row.unit}</td>
              <td className="p-3">
                <span 
                  style={{ color: row.hex, borderColor: row.hex }}
                  className="px-2 py-0.5 border text-[10px] font-bold tracking-wider"
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```
