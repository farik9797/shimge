import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../catalog/ProductCard';
import { QuickViewModal } from '../catalog/QuickViewModal';
import { Product } from '../../types';
import { ArrowRight, Sparkles, Flame, Percent, Sparkle } from 'lucide-react';

export const ProductShowcase: React.FC = () => {
  const { products, setRoute, setFilters } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'DISCOUNT' | 'HIT' | 'NEW'>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => {
    if (activeTab === 'all') return true;
    return p.badge === activeTab;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Популярное оборудование</h2>
          <p className="text-xs text-slate-500 mt-1">Официальные поставки со склада в Минске</p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Все товары
          </button>
          <button
            onClick={() => setActiveTab('DISCOUNT')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'DISCOUNT'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Percent className="w-3.5 h-3.5" /> Скидки %
          </button>
          <button
            onClick={() => setActiveTab('HIT')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'HIT'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Хиты продаж
          </button>
          <button
            onClick={() => setActiveTab('NEW')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'NEW'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkle className="w-3.5 h-3.5" /> Новинки
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={p => setQuickViewProduct(p)}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => {
            setFilters(prev => ({ ...prev, category: 'all' }));
            setRoute('catalog');
          }}
          className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs inline-flex items-center gap-2 transition-colors"
        >
          Перейти в полный каталог ({products.length} товаров) <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
