import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  Search, 
  FileText, 
  Menu, 
  X, 
  Send, 
  MapPin
} from 'lucide-react';
import { PageTab } from '../../types';

export const Header: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cart, 
    setIsCartOpen, 
    openRfqModal, 
    setFilters
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilters(prev => ({
        ...prev,
        searchQuery: searchInput.trim(),
        category: 'all',
        series: []
      }));
      setActiveTab('catalog');
      setSearchInput('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems: { label: string; tab: PageTab }[] = [
    { label: 'Главная', tab: 'home' },
    { label: 'Каталог насосов', tab: 'catalog' },
    { label: 'Отраслевые решения', tab: 'industries' },
    { label: 'О бренде SHIMGE', tab: 'about' },
    { label: 'Доставка и оплата', tab: 'delivery' },
    { label: 'Контакты', tab: 'contacts' },
  ];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      
      {/* Top Light Utility Bar */}
      <div className="bg-[#F0FAFA] text-slate-600 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#D4F1F4]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-slate-800 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00A859]" />
              <span>SHIMGE PUMP UZBEKISTAN • Каталог насосного оборудования</span>
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:flex items-center space-x-1 text-slate-500">
              <MapPin className="w-3 h-3 text-[#0096A6]" />
              <span>г. Ташкент, Алмазарский район</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-semibold">
            <a href="tel:+998712000055" className="text-[#0096A6] hover:text-[#007682] font-bold flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5 text-[#00A859]" />
              <span>+998 (71) 200-00-55</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo with Real SHIMGE Image */}
          <div 
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="cursor-pointer flex items-center space-x-3 select-none flex-shrink-0 group"
          >
            <img 
              src="/images/shimge-logo.png" 
              alt="SHIMGE for better life" 
              className="h-9 sm:h-10 w-auto object-contain group-hover:opacity-95 transition-opacity" 
            />
            <div className="hidden sm:block pl-3 border-l border-slate-200 leading-tight">
              <span className="font-extrabold text-slate-900 text-xs tracking-tight block">УЗБЕКИСТАН</span>
              <span className="text-[10px] text-slate-400 font-semibold">Официальный каталог</span>
            </div>
          </div>

          {/* Search Input in Brand Style */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Поиск по серии или модели (BLT, 4SGm, WQ, 200QJ, APM)..."
                className="w-full pl-9 pr-20 py-2.5 text-xs bg-slate-50 hover:bg-[#F0FAFA] focus:bg-white border border-slate-300 focus:border-[#0096A6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0096A6]/20 transition-all text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#0096A6] text-white text-[11px] font-bold rounded-lg hover:bg-[#007682] transition-colors shadow-2xs"
              >
                Найти
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2.5">
            {/* Cart / Specification Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-[#EBF8F9] hover:text-[#0096A6] text-slate-800 text-xs font-bold transition-colors"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Спецификация</span>
              {totalCartCount > 0 && (
                <span className="bg-[#00A859] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Request Quote Button in SHIMGE Teal */}
            <button
              onClick={() => openRfqModal()}
              className="bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Запросить КП</span>
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Navigation Links in Brand Teal Accent */}
        <nav className="hidden md:flex items-center space-x-8 pt-2.5 mt-1 border-t border-slate-100 text-xs font-semibold text-slate-600">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`pb-1 transition-colors ${
                activeTab === item.tab 
                  ? 'text-[#0096A6] font-bold border-b-2 border-[#0096A6]' 
                  : 'hover:text-[#0096A6]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }}>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Поиск насосов..."
              className="w-full px-3 py-2 text-xs bg-slate-100 rounded-xl focus:border-[#0096A6]"
            />
          </form>
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold ${
                  activeTab === item.tab ? 'bg-[#EBF8F9] text-[#0096A6] font-bold' : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

    </header>
  );
};
