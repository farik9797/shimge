import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { Droplet, Plus, Minus, Trophy, Sparkles } from 'lucide-react';

export const WaterTracker: React.FC = () => {
  const { profile, getTodayWater, logWater } = useFitness();
  const [pulse, setPulse] = useState(false);

  const todayWater = getTodayWater();
  const target = profile.waterTarget;
  const percentage = Math.min(100, Math.round((todayWater / target) * 100));

  const handleAddWater = (amount: number) => {
    logWater(amount);
    setPulse(true);
    setTimeout(() => setPulse(false), 500);
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* HEADER */}
      <div className="mt-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-sans">ОТВЕТСТВЕННОСТЬ</span>
        <h1 className="text-3xl font-black tracking-tight text-white mt-1">Трекер воды</h1>
      </div>

      {/* SUMMARY DISPLAY CARD */}
      <div className="glass-card rounded-3xl p-5 border border-slate-800/80 shadow-md relative overflow-hidden flex justify-between items-center">
        {/* Glow */}
        <div className="absolute -left-12 -top-12 w-28 h-28 rounded-full bg-sky-500/10 blur-[30px] pointer-events-none" />
        
        <div>
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" /> Дневной прогресс
          </span>
          <p className="text-3xl font-black text-white mt-2 font-mono">
            {todayWater} <span className="text-sm font-normal text-slate-400">/ {target} мл</span>
          </p>
          <p className="text-xs text-slate-400 mt-1 font-semibold">
            {percentage === 100 ? (
              <span className="text-lime-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 animate-bounce" /> Цель достигнута!
              </span>
            ) : (
              `Выполнено на ${percentage}%`
            )}
          </p>
        </div>

        {/* Circular Progress (Visual Percentage) */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="34" fill="none" stroke="#1e293b" strokeWidth="5.5" />
            <circle 
              cx="40" cy="40" r="34" fill="none" stroke="#38bdf8" strokeWidth="5.5" 
              strokeDasharray={2 * Math.PI * 34}
              strokeDashoffset={2 * Math.PI * 34 * (1 - percentage / 100)}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm font-black text-sky-400 font-mono">
            {percentage}%
          </span>
        </div>
      </div>

      {/* ANIMATED WAVE GLASS CONTAINER */}
      <div className="flex justify-center items-center my-6">
        <div className="relative w-44 h-64 bg-slate-900/60 rounded-b-[40px] rounded-t-[20px] border-4 border-slate-800 shadow-[inset_0_4px_30px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col justify-end">
          
          {/* Glass measurements marks */}
          <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-between py-8 text-[9px] font-mono text-slate-600 font-bold select-none z-10 pointer-events-none">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
          </div>

          {/* Water level fill wrapper */}
          <div 
            className={`w-full relative transition-all duration-1000 ease-out bg-sky-500/80 ${
              pulse ? 'animate-pulse scale-y-105' : ''
            }`}
            style={{ 
              height: `${percentage}%`,
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)' 
            }}
          >
            {/* Wave effect overlay path */}
            {percentage > 0 && percentage < 100 && (
              <div className="absolute left-0 right-0 -top-4 h-5 overflow-hidden pointer-events-none">
                <svg 
                  viewBox="0 0 200 20" 
                  className="w-[400px] h-5 fill-sky-500/80 water-wave"
                  preserveAspectRatio="none"
                >
                  <path d="M 0 10 Q 50 5, 100 10 T 200 10 T 300 10 T 400 10 L 400 20 L 0 20 Z" />
                </svg>
              </div>
            )}
            
            {/* Highlight bubble reflections in the water */}
            {percentage > 10 && (
              <div className="absolute inset-0 flex flex-col items-center justify-around pointer-events-none py-4 opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-1 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.6s' }} />
              </div>
            )}
          </div>

          {/* Empty glass icon placeholder when water is 0 */}
          {percentage === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 select-none">
              <Droplet className="w-12 h-12 stroke-[1.2] mb-1 animate-bounce" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Пусто</span>
            </div>
          )}
        </div>
      </div>

      {/* QUICK LOGGING BUTTONS */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Добавить воду</span>
        
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleAddWater(250)}
            className="glass-card border border-slate-800 rounded-2xl p-4 hover:border-sky-500/40 hover:bg-sky-950/10 active:scale-95 transition-all text-center flex flex-col items-center gap-1.5 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">🥛</span>
            <span className="text-xs font-bold text-slate-200">250 мл</span>
            <span className="text-[8px] text-slate-505 uppercase tracking-wider font-semibold">Стакан</span>
          </button>

          <button
            onClick={() => handleAddWater(500)}
            className="glass-card border border-slate-800 rounded-2xl p-4 hover:border-sky-500/40 hover:bg-sky-950/10 active:scale-95 transition-all text-center flex flex-col items-center gap-1.5 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">💧</span>
            <span className="text-xs font-bold text-slate-200">500 мл</span>
            <span className="text-[8px] text-slate-505 uppercase tracking-wider font-semibold">Бутылка</span>
          </button>

          <button
            onClick={() => handleAddWater(750)}
            className="glass-card border border-slate-800 rounded-2xl p-4 hover:border-sky-500/40 hover:bg-sky-950/10 active:scale-95 transition-all text-center flex flex-col items-center gap-1.5 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">🥤</span>
            <span className="text-xs font-bold text-slate-200">750 мл</span>
            <span className="text-[8px] text-slate-505 uppercase tracking-wider font-semibold">Шейкер</span>
          </button>
        </div>

        {/* Adjustments row */}
        <div className="flex gap-3 mt-1">
          <button
            onClick={() => handleAddWater(-250)}
            disabled={todayWater === 0}
            className={`flex-1 py-3 rounded-xl border border-slate-800 bg-slate-900/50 flex items-center justify-center gap-1 text-slate-400 hover:text-red-400 hover:border-red-950/20 active:scale-95 transition-all text-xs font-bold ${
              todayWater === 0 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <Minus className="w-4 h-4" /> Убрать 250 мл
          </button>
          <button
            onClick={() => handleAddWater(100)}
            className="flex-1 py-3 rounded-xl border border-slate-800 bg-slate-900/50 flex items-center justify-center gap-1 text-slate-400 hover:text-sky-400 hover:border-sky-950/20 active:scale-95 transition-all text-xs font-bold"
          >
            <Plus className="w-4 h-4" /> Добавить 100 мл
          </button>
        </div>
      </div>
    </div>
  );
};
