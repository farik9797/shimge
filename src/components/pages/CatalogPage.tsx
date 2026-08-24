import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/equipmentData';
import { ProductCard } from '../common/ProductCard';
import { 
  Search, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  ChevronRight, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { ShimgeCategoryType, ShimgeSeries } from '../../types';

export const CatalogPage: React.FC = () => {
  const { filters, setFilters, resetFilters, setActiveTab } = useApp();

  const categories: { id: ShimgeCategoryType; name: string; count: number }[] = [
    { id: 'all', name: 'Все категории', count: PRODUCTS.length },
    { id: 'multistage-vertical', name: 'Вертикальные (BLT/BLTE)', count: PRODUCTS.filter(p => p.category === 'multistage-vertical').length },
    { id: 'submersible-wells', name: 'Скважинные (4SGm/200QJ)', count: PRODUCTS.filter(p => p.category === 'submersible-wells').length },
    { id: 'drainage-sewage', name: 'Канализационные & Фекальные (WQ)', count: PRODUCTS.filter(p => p.category === 'drainage-sewage').length },
    { id: 'circulation-hvac', name: 'Отопление (APM Smart/XPS)', count: PRODUCTS.filter(p => p.category === 'circulation-hvac').length },
    { id: 'intelligent-booster', name: 'Автоматические станции (BWJ)', count: PRODUCTS.filter(p => p.category === 'intelligent-booster').length },
    { id: 'surface-centrifugal', name: 'Поверхностные (CPM)', count: PRODUCTS.filter(p => p.category === 'surface-centrifugal').length },
  ];

  // Filtering Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    if (filters.series.length > 0 && !filters.series.includes(product.series)) {
      return false;
    }
    if (filters.inStockOnly && !product.inStock) {
      return false;
    }
    if (product.powerKw > filters.maxPowerKw) {
      return false;
    }
    if (product.headMeters > filters.maxHeadMeters) {
      return false;
    }
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchSku = product.sku.toLowerCase().includes(q);
      const matchSeries = product.series.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchSeries && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === 'power-asc') return a.powerKw - b.powerKw;
    if (filters.sortBy === 'power-desc') return b.powerKw - a.powerKw;
    if (filters.sortBy === 'head-desc') return b.headMeters - a.headMeters;
    if (filters.sortBy === 'flow-desc') return b.flowRate - a.flowRate;
    if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleSeriesToggle = (seriesName: ShimgeSeries) => {
    setFilters(prev => {
      const exists = prev.series.includes(seriesName);
      const newSeries = exists
        ? prev.series.filter(s => s !== seriesName)
        : [...prev.series, seriesName];
      return { ...prev, series: newSeries };
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Light Catalog Header & Breadcrumbs */}
      <div className="bg-white py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-3">
            <button onClick={() => setActiveTab('home')} className="hover:text-[#0096A6] transition-colors">
              Главная
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-semibold">Каталог насосов SHIMGE</span>
            {filters.category !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-[#0096A6] font-bold">
                  {categories.find(c => c.id === filters.category)?.name}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Каталог насосного оборудования SHIMGE
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Официальные серии: <strong>BLT, WQ, 4SGm, 200QJ, APM Smart, XPS, BWJ, CPM</strong>
              </p>
            </div>

            {/* Quick Search within Catalog */}
            <div className="w-full md:w-80">
              <div className="relative">
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="Поиск по модели (BLT, 4SGm, WQ)..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Category Pills Bar in Brand Teal Theme */}
      <div className="bg-white border-b border-slate-200 sticky top-18 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto flex space-x-2">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilters(prev => ({ ...prev, category: cat.id, series: [] }))}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-[#0096A6] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-[#EBF8F9] hover:text-[#0096A6]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white text-[#0096A6] font-bold' : 'bg-slate-200 text-slate-600'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Catalog Content: Sidebar + Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Faceted Filter Sidebar in Light Style */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#0096A6]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Параметры подбора
                  </span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-slate-400 hover:text-red-600 flex items-center space-x-1"
                  title="Сбросить"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Сброс</span>
                </button>
              </div>

              {/* In Stock Toggle */}
              <div>
                <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#0096A6] focus:ring-[#0096A6]"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Только в наличии на складе
                  </span>
                </label>
              </div>

              {/* Series Checklist Filter */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 block">
                  Серии насосов SHIMGE:
                </span>
                <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {(['BLT', 'WQ', '4SGm', '6SG', 'XPS', 'APM', 'BWJ', 'CPM', 'QDX', 'PZ'] as ShimgeSeries[]).map((s) => {
                    const isChecked = filters.series.includes(s);
                    return (
                      <label key={s} className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer hover:text-[#0096A6] select-none p-1 rounded hover:bg-[#EBF8F9]">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSeriesToggle(s)}
                          className="w-3.5 h-3.5 rounded text-[#0096A6] focus:ring-[#0096A6]"
                        />
                        <span className="font-mono font-bold">{s}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Max Head H Filter (m) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Максимальный напор H:</span>
                  <span className="text-[#0096A6] font-mono">до {filters.maxHeadMeters} м</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={filters.maxHeadMeters}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxHeadMeters: Number(e.target.value) }))}
                  className="w-full accent-[#0096A6] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>10 м</span>
                  <span>100 м</span>
                  <span>200 м</span>
                </div>
              </div>

              {/* Max Power P Filter (kW) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Мощность двигателя:</span>
                  <span className="text-[#0096A6] font-mono">до {filters.maxPowerKw} кВт</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="25"
                  step="1"
                  value={filters.maxPowerKw}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPowerKw: Number(e.target.value) }))}
                  className="w-full accent-[#0096A6] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0.5 кВт</span>
                  <span>25 кВт</span>
                </div>
              </div>

              {/* Light Helper Info in Brand Style */}
              <div className="p-3.5 bg-[#EBF8F9] border border-[#B5E7EC] rounded-2xl space-y-1 text-xs text-[#007682]">
                <div className="flex items-center space-x-1.5 font-bold">
                  <Info className="w-3.5 h-3.5 text-[#0096A6]" />
                  <span>Помощь инженера</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Подберем точный аналог европейских насосов Grundfos, Wilo, Pedrollo или Calpeda.
                </p>
              </div>

            </div>
          </aside>

          {/* Right: Products List / Grid */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Sorting & View Controls Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-2xs">
              <div className="text-slate-600 font-medium">
                Найдено моделей: <strong className="text-slate-900">{sortedProducts.length}</strong>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500">Сортировка:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-800 font-bold focus:outline-none"
                  >
                    <option value="popular">По популярности</option>
                    <option value="head-desc">По напору (H, макс)</option>
                    <option value="flow-desc">По подаче (Q, макс)</option>
                    <option value="power-asc">Мощность: по возрастанию</option>
                    <option value="power-desc">Мощность: по убыванию</option>
                    <option value="name">По названию (А-Я)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-xl">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, viewMode: 'grid' }))}
                    className={`p-1.5 rounded-lg ${filters.viewMode === 'grid' ? 'bg-white shadow-xs text-[#0096A6]' : 'text-slate-500 hover:text-slate-800'}`}
                    title="Сетка"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, viewMode: 'table' }))}
                    className={`p-1.5 rounded-lg ${filters.viewMode === 'table' ? 'bg-white shadow-xs text-[#0096A6]' : 'text-slate-500 hover:text-slate-800'}`}
                    title="Список ТТХ"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products List / Grid */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  По выбранным параметрам модели не найдены
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Попробуйте изменить параметры диапазона или сбросить фильтры.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors inline-flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Сбросить фильтры</span>
                </button>
              </div>
            ) : (
              <div className={filters.viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-3'}>
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    mode={filters.viewMode}
                  />
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

    </div>
  );
};
