import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CATEGORIES } from '../../data/mockData';
import { Speaker, Mic, Sliders, Radio, Headphones, Volume2, Cable, ArrowRight } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Speaker: <Speaker className="w-6 h-6" />,
  Mic: <Mic className="w-6 h-6" />,
  Sliders: <Sliders className="w-6 h-6" />,
  Radio: <Radio className="w-6 h-6" />,
  Headphones: <Headphones className="w-6 h-6" />,
  Volume2: <Volume2 className="w-6 h-6" />,
  Cable: <Cable className="w-6 h-6" />
};

export const CategoriesGrid: React.FC = () => {
  const { setRoute, setFilters } = useApp();

  const handleCategorySelect = (catId: string) => {
    setFilters(prev => ({ ...prev, category: catId }));
    setRoute('catalog');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Каталог оборудования</h2>
          <p className="text-xs text-slate-500 mt-1">Официальные категории аудио и звуковой техники</p>
        </div>
        <button
          onClick={() => {
            setFilters(prev => ({ ...prev, category: 'all' }));
            setRoute('catalog');
          }}
          className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
        >
          Весь каталог <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {MOCK_CATEGORIES.map(cat => (
          <div
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className="group relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-orange-500 hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                {ICON_MAP[cat.iconName] || <Volume2 className="w-6 h-6" />}
              </div>
              <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors">
                {cat.productCount} тов.
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
