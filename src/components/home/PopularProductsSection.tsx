import React, { useState } from 'react';
import { PRODUCTS } from '../../data/equipmentData';
import { ProductCard } from '../common/ProductCard';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Layers, Flame } from 'lucide-react';
import { ShimgeCategoryType } from '../../types';

export const PopularProductsSection: React.FC = () => {
  const { selectCategory } = useApp();
  const [activeFilter, setActiveFilter] = useState<ShimgeCategoryType>('all');

  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS.slice(0, 6)
    : PRODUCTS.filter(p => p.category === activeFilter).slice(0, 6);

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with instant filter tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Популярные позиции</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Складские позиции насосов SHIMGE в Ташкенте
            </h2>
          </div>

          {/* Clean Filter Tabs in Light Background */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {[
              { id: 'all' as ShimgeCategoryType, label: 'Все серии' },
              { id: 'multistage-vertical' as ShimgeCategoryType, label: 'BLT (Вертикальные)' },
              { id: 'submersible-wells' as ShimgeCategoryType, label: '4SGm / 200QJ (Скважинные)' },
              { id: 'drainage-sewage' as ShimgeCategoryType, label: 'WQ (Фекальные)' },
              { id: 'circulation-hvac' as ShimgeCategoryType, label: 'APM (Отопление)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-white text-[#0096A6] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Clean Light Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} mode="grid" />
          ))}
        </div>

        {/* Action button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => selectCategory(activeFilter)}
            className="inline-flex items-center space-x-2 bg-[#0096A6] hover:bg-[#007682] text-white font-bold px-7 py-3.5 rounded-2xl transition-all text-xs shadow-md"
          >
            <Layers className="w-4 h-4" />
            <span>Открыть полный каталог с фильтрами</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
