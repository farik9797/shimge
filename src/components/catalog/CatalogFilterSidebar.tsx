import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../data/mockData';
import { SlidersHorizontal, RotateCcw, Check, ChevronDown } from 'lucide-react';
import { ProductBadge } from '../../types';

const BRANDS = Array.from(new Set(MOCK_PRODUCTS.map(p => p.brand)));

export const CatalogFilterSidebar: React.FC = () => {
  const { filters, setFilters, resetFilters, formatPrice } = useApp();

  const handleCategoryChange = (catId: string) => {
    setFilters(prev => ({ ...prev, category: catId }));
  };

  const handleBrandToggle = (brand: string) => {
    setFilters(prev => {
      const exists = prev.selectedBrands.includes(brand);
      const updated = exists
        ? prev.selectedBrands.filter(b => b !== brand)
        : [...prev.selectedBrands, brand];
      return { ...prev, selectedBrands: updated };
    });
  };

  const handleBadgeToggle = (badge: ProductBadge) => {
    setFilters(prev => {
      const exists = prev.badges.includes(badge);
      const updated = exists
        ? prev.badges.filter(b => b !== badge)
        : [...prev.badges, badge];
      return { ...prev, badges: updated };
    });
  };

  return (
    <aside className="bg-white rounded-2xl p-5 border border-slate-200 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <SlidersHorizontal className="w-4 h-4 text-orange-600" />
          <span>Фильтры каталога</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-[11px] font-bold text-slate-400 hover:text-orange-600 flex items-center gap-1 transition-colors"
          title="Сбросить все фильтры"
        >
          <RotateCcw className="w-3 h-3" /> Сбросить
        </button>
      </div>

      {/* Category List */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Категории</h4>
        <div className="space-y-1 text-xs font-semibold">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
              filters.category === 'all'
                ? 'bg-orange-600 text-white font-bold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Все категории</span>
            <span className="text-[10px] opacity-80">{MOCK_PRODUCTS.length}</span>
          </button>
          {MOCK_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                filters.category === cat.id
                  ? 'bg-orange-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="truncate">{cat.name}</span>
              <span className="text-[10px] opacity-70 ml-2">{cat.productCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Цена (BYN)
        </h4>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={e =>
              setFilters(prev => ({
                ...prev,
                priceRange: [Number(e.target.value), prev.priceRange[1]]
              }))
            }
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-orange-500 font-bold"
            placeholder="От"
          />
          <span className="text-slate-400 font-bold">—</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={e =>
              setFilters(prev => ({
                ...prev,
                priceRange: [prev.priceRange[0], Number(e.target.value)]
              }))
            }
            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-orange-500 font-bold"
            placeholder="До"
          />
        </div>
      </div>

      {/* Brand Checkboxes */}
      <div className="pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Бренд</h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map(brand => {
            const checked = filters.selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer hover:text-orange-600"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleBrandToggle(brand)}
                  className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                />
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Badges Filter */}
      <div className="pt-2 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Метки</h4>
        <div className="space-y-1.5">
          {[
            { id: 'DISCOUNT' as ProductBadge, label: 'Со скидкой (-%)', color: 'text-rose-600' },
            { id: 'HIT' as ProductBadge, label: 'Хиты продаж (HIT)', color: 'text-amber-600' },
            { id: 'NEW' as ProductBadge, label: 'Новинки (NEW)', color: 'text-emerald-600' },
          ].map(badge => {
            const checked = filters.badges.includes(badge.id);
            return (
              <label
                key={badge.id}
                className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer hover:text-orange-600"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleBadgeToggle(badge.id)}
                  className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                />
                <span className={badge.color}>{badge.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* In Stock Only Toggle */}
      <div className="pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer">
          <span>Только в наличии</span>
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={e =>
              setFilters(prev => ({ ...prev, onlyInStock: e.target.checked }))
            }
            className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
          />
        </label>
      </div>
    </aside>
  );
};
