import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CatalogFilterSidebar } from './CatalogFilterSidebar';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { Product } from '../../types';
import { MOCK_CATEGORIES } from '../../data/mockData';
import { LayoutGrid, List, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { products, filters, setFilters, resetFilters } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Apply Filters
  let filtered = products.filter(product => {
    // Category filter
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    // Search query filter
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const match =
        product.name.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Price range
    if (
      product.priceBYN < filters.priceRange[0] ||
      product.priceBYN > filters.priceRange[1]
    ) {
      return false;
    }
    // Selected Brands
    if (
      filters.selectedBrands.length > 0 &&
      !filters.selectedBrands.includes(product.brand)
    ) {
      return false;
    }
    // Badges
    if (
      filters.badges.length > 0 &&
      (!product.badge || !filters.badges.includes(product.badge))
    ) {
      return false;
    }
    // In Stock Only
    if (filters.onlyInStock && !product.inStock) {
      return false;
    }
    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.priceBYN - b.priceBYN;
    if (filters.sortBy === 'price-desc') return b.priceBYN - a.priceBYN;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return (b.reviewsCount || 0) - (a.reviewsCount || 0); // default popularity
  });

  const activeCategoryName =
    filters.category === 'all'
      ? 'Весь каталог оборудования'
      : MOCK_CATEGORIES.find(c => c.id === filters.category)?.name || 'Каталог';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Breadcrumb & Header Title */}
      <div className="mb-6">
        <div className="text-xs text-slate-400 mb-2">
          <span>Главная</span> <span className="mx-1.5">•</span>{' '}
          <span className="text-slate-700 font-bold">Каталог оборудования</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeCategoryName}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Найдено позиций: <strong className="text-slate-900">{filtered.length}</strong>
            </p>
          </div>

          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-orange-400" />
            Фильтры поиска
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <CatalogFilterSidebar />
        </div>

        {/* Mobile Filter Modal/Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto lg:hidden">
            <div className="bg-white rounded-2xl p-4 max-w-md mx-auto relative">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
              <CatalogFilterSidebar />
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full mt-4 py-3 bg-orange-600 text-white font-bold rounded-xl text-xs"
              >
                Показать {filtered.length} товаров
              </button>
            </div>
          </div>
        )}

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-bold text-slate-700 hidden sm:inline">Сортировка:</span>
              <select
                value={filters.sortBy}
                onChange={e =>
                  setFilters(prev => ({
                    ...prev,
                    sortBy: e.target.value as any
                  }))
                }
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-800 outline-none focus:border-orange-500"
              >
                <option value="popularity">По популярности</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
                <option value="rating">По рейтингу</option>
                <option value="newest">По новизне</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'
                }`}
                title="Сетка"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500'
                }`}
                title="Список"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(filters.category !== 'all' ||
            filters.selectedBrands.length > 0 ||
            filters.badges.length > 0 ||
            filters.onlyInStock) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Активные фильтры:</span>
              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-orange-100 text-orange-800 px-2.5 py-1 rounded-lg">
                  {activeCategoryName}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                  />
                </span>
              )}
              {filters.selectedBrands.map(b => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg"
                >
                  Бренд: {b}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() =>
                      setFilters(prev => ({
                        ...prev,
                        selectedBrands: prev.selectedBrands.filter(x => x !== b)
                      }))
                    }
                  />
                </span>
              ))}
              <button
                onClick={resetFilters}
                className="text-xs text-rose-600 font-bold hover:underline ml-2"
              >
                Сбросить всё
              </button>
            </div>
          )}

          {/* Catalog Results Grid */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
              <h3 className="text-lg font-bold text-slate-800">Товары не найдены</h3>
              <p className="text-xs text-slate-500">
                Попробуйте изменить параметры фильтрации или поисковый запрос.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs shadow"
              >
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={p => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
