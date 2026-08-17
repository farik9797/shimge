import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_PARTNERS } from '../../data/mockData';
import { Globe, ExternalLink, ArrowRight } from 'lucide-react';

export const PartnersPage: React.FC = () => {
  const { setRoute, setFilters } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
          Партнёры mzvuk.by
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Мировые бренды звукового оборудования
        </h1>
        <p className="text-xs text-slate-600">
          ООО «Арт-Медиа Трейд» имеет прямые дилерские контракты с ведущими зарубежными и отечественными производителями.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PARTNERS.map(brand => (
          <div
            key={brand.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono tracking-widest text-slate-900">
                  {brand.logo}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Globe className="w-3 h-3 text-orange-500" /> {brand.country}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {brand.description}
              </p>

              <div className="text-[11px] font-bold text-orange-600 bg-orange-50 p-2.5 rounded-xl">
                Основная специализация: {brand.featuredCategory}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, selectedBrands: [brand.name] }));
                  setRoute('catalog');
                }}
                className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
              >
                Товары бренда <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={brand.website}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-700"
                title="Официальный сайт"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
