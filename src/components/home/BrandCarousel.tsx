import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PARTNERS } from '../../data/mockData';
import { Globe } from 'lucide-react';

export const BrandCarousel: React.FC = () => {
  const { setRoute, setFilters } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Бренды и мировые производители</h2>
          <p className="text-xs text-slate-500 mt-1">Официальные дилерские соглашения и прямая гарантия</p>
        </div>
        <button
          onClick={() => setRoute('partners')}
          className="text-xs font-bold text-orange-600 hover:text-orange-700"
        >
          Все бренды ({MOCK_PARTNERS.length})
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {MOCK_PARTNERS.map(brand => (
          <div
            key={brand.id}
            onClick={() => {
              setFilters(prev => ({ ...prev, selectedBrands: [brand.name] }));
              setRoute('catalog');
            }}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center text-center group"
          >
            <div className="text-xl font-black tracking-widest text-slate-800 group-hover:text-orange-600 transition-colors font-mono uppercase">
              {brand.logo}
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1">
              <Globe className="w-2.5 h-2.5" /> {brand.country}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
