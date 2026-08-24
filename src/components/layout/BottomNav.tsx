import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { TabRoute } from '../../types';
import { Dumbbell, PlusCircle, TrendingUp, Droplets, Settings } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useFitness();

  const navItems = [
    { id: 'home' as TabRoute, label: 'Тренировки', icon: Dumbbell },
    { id: 'custom' as TabRoute, label: 'Свой план', icon: PlusCircle },
    { id: 'progress' as TabRoute, label: 'Отчеты', icon: TrendingUp },
    { id: 'water' as TabRoute, label: 'Вода', icon: Droplets },
    { id: 'settings' as TabRoute, label: 'Настройки', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-slate-800/80 px-2 pt-2 flex justify-around items-center max-w-md mx-auto rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.4)]" style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))' }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center justify-center flex-1 py-1.5 transition-all relative active:scale-95"
          >
            {/* Active Highlight Dot indicator */}
            {isActive && (
              <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_#a3e635]" />
            )}

            <div 
              className={`p-1.5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-lime-400 bg-lime-950/20' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5.5 h-5.5" />
            </div>

            <span 
              className={`text-[10px] mt-0.5 font-medium tracking-tight transition-all duration-300 ${
                isActive ? 'text-lime-400 font-bold' : 'text-slate-400'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
