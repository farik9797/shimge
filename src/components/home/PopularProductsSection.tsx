import React, { useState } from 'react';
import { PRODUCTS } from '../../data/equipmentData';
import { ProductCard } from '../common/ProductCard';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Flame } from 'lucide-react';
import { ShimgeCategoryType } from '../../types';

export const PopularProductsSection: React.FC = () => {
  const { selectCategory } = useApp();
  const [activeFilter, setActiveFilter] = useState<ShimgeCategoryType>('all');

  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS.slice(0, 6)
    : PRODUCTS.filter(p => p.category === activeFilter).slice(0, 6);

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with neatly aligned single-row filter tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider mb-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Популярные позиции на складе</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Складские позиции насосов SHIMGE в Ташкенте
            </h2>
          </div>

          {/* Clean Horizontal Filter Bar (Все в один аккуратный ряд без переносов) */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto max-w-full flex-shrink-0">
            {[
              { id: 'all' as ShimgeCategoryType, label: 'Все серии' },
              { id: 'multistage-vertical' as ShimgeCategoryType, label: 'BLT (Многоступенчатые)' },
              { id: 'submersible-wells' as ShimgeCategoryType, label: '4SGm (Скважинные)' },
              { id: 'drainage-sewage' as ShimgeCategoryType, label: 'WQ (Фекальные)' },
              { id: 'circulation-hvac' as ShimgeCategoryType, label: 'APM (Циркуляционные)' },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                    isActive
                      ? 'bg-[#0096A6] text-white shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Clean Light Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} mode="grid" />
          ))}
        </div>

        {/* Bottom Catalog Redirect CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => selectCategory('all')}
            className="inline-flex items-center space-x-2 bg-white hover:bg-[#EBF8F9] text-[#0096A6] border border-[#B5E7EC] font-bold text-xs px-6 py-3 rounded-2xl transition-all shadow-2xs hover:shadow-md group"
          >
            <span>Смотреть весь каталог насосного оборудования SHIMGE (24+ модели)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
