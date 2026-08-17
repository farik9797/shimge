import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import { 
  Phone, Mail, MapPin, Clock, Search, ShoppingCart, Heart, 
  ArrowLeftRight, Menu, X, ChevronDown, Database, Volume2, 
  Sparkles, ShieldCheck, Zap, Speaker, Mic, Sliders, Radio, Headphones, Cable, ArrowRight
} from 'lucide-react';
import { MOCK_CATEGORIES } from '../../data/mockData';

export const Header: React.FC = () => {
  const { 
    route, 
    setRoute, 
    cartTotalCount, 
    cartTotalBYN, 
    wishlist, 
    compareList, 
    currency, 
    toggleCurrency, 
    formatPrice, 
    setIsCartOpen, 
    setIsDataSyncOpen, 
    setIsCallbackOpen, 
    products, 
    setSelectedProductId, 
    filters, 
    setFilters 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogDropdownOpen, setIsCatalogDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const catalogTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Filter products for search auto-complete
  const searchResults = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
      if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
        setIsCatalogDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (catalogTimeoutRef.current) clearTimeout(catalogTimeoutRef.current);
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
    };
  }, []);

  const handleCatalogMouseEnter = () => {
    if (catalogTimeoutRef.current) {
      clearTimeout(catalogTimeoutRef.current);
      catalogTimeoutRef.current = null;
    }
    setIsCatalogDropdownOpen(true);
  };

  const handleCatalogMouseLeave = () => {
    catalogTimeoutRef.current = setTimeout(() => {
      setIsCatalogDropdownOpen(false);
    }, 200);
  };

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current);
      aboutTimeoutRef.current = null;
    }
    setIsAboutDropdownOpen(true);
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setIsAboutDropdownOpen(false);
    }, 200);
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setRoute('product');
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleCategoryClick = (catId: string) => {
    setFilters(prev => ({ ...prev, category: catId }));
    setRoute('catalog');
    setIsCatalogDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Speaker':
        return <Speaker className="w-4 h-4 text-orange-500" />;
      case 'Mic':
        return <Mic className="w-4 h-4 text-orange-500" />;
      case 'Sliders':
        return <Sliders className="w-4 h-4 text-orange-500" />;
      case 'Radio':
        return <Radio className="w-4 h-4 text-orange-500" />;
      case 'Headphones':
        return <Headphones className="w-4 h-4 text-orange-500" />;
      case 'Volume2':
        return <Volume2 className="w-4 h-4 text-orange-500" />;
      case 'Cable':
        return <Cable className="w-4 h-4 text-orange-500" />;
      default:
        return <Volume2 className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-slate-200">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center flex-wrap gap-4 text-slate-300">
            <a href="tel:+375333772873" className="flex items-center gap-1.5 hover:text-orange-400 font-semibold transition-colors">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              +375 (33) 377-28-73
            </a>
            <a href="mailto:sales@mzvuk.by" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              sales@mzvuk.by
            </a>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5" />
              г. Минск • Пн-Пт: 09:00 - 18:00
            </span>
            <span className="hidden lg:inline-block px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[11px] font-bold border border-orange-500/20">
              Работаем с НДС 20% для Юридических Лиц
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDataSyncOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium rounded-lg transition-colors border border-slate-700 text-[11px]"
              title="1C Синхронизация и экспорт номенклатуры"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              1С / Экспорт XLS
            </button>

            <button
              onClick={toggleCurrency}
              className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded text-[11px] transition-colors border border-slate-700"
            >
              Валюта: <span className="text-orange-400">{currency}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-orange-600 rounded-lg hover:bg-slate-100"
          aria-label="Открыть меню"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div 
          onClick={() => setRoute('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-none">
              Арт-Медиа <span className="text-orange-600">Трейд</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase block mt-0.5">
              mzvuk.by • Аудио системный интегратор
            </span>
          </div>
        </div>

        {/* Search Bar with Autocomplete */}
        <div ref={searchRef} className="flex-1 max-w-2xl relative hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Поиск по каталогу (например: Yamaha, Shure, микрофон)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 focus:bg-white border border-slate-200 focus:border-orange-500 rounded-xl text-sm outline-none transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                Очистить
              </button>
            )}
          </div>

          {/* Autocomplete Popup */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
              <div className="p-2 divide-y divide-slate-100">
                {searchResults.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod.id)}
                    className="p-2.5 hover:bg-orange-50 cursor-pointer rounded-xl flex items-center gap-3 transition-colors"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 object-cover rounded-lg bg-slate-100 border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-orange-600">{prod.brand}</div>
                      <div className="text-sm font-semibold text-slate-900 truncate">{prod.name}</div>
                      <div className="text-xs text-slate-500">Артикул: {prod.sku}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900 block">
                        {formatPrice(prod.priceBYN)}
                      </span>
                      {prod.inStock ? (
                        <span className="text-[10px] text-emerald-600 font-bold">В наличии</span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Под заказ</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Wishlist */}
          <button
            onClick={() => setRoute('catalog')}
            className="relative p-2.5 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
            title="Избранное"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Comparison */}
          <button
            onClick={() => setRoute('catalog')}
            className="relative p-2.5 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors hidden sm:block"
            title="Сравнение"
          >
            <ArrowLeftRight className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-3.5 py-2 bg-orange-50 border border-orange-200 hover:border-orange-500 rounded-xl transition-all group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-5 h-5 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                  {cartTotalCount}
                </span>
              )}
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">Корзина</span>
              <span className="text-xs font-extrabold text-slate-900 block mt-0.5">
                {cartTotalBYN > 0 ? formatPrice(cartTotalBYN) : 'Пусто'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Nav Menu Bar (Desktop) */}
      <nav className="hidden lg:block bg-slate-100 border-t border-slate-200 relative z-30">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setRoute('home')}
              className={`px-4 py-3 hover:text-orange-600 transition-colors border-b-2 ${
                route === 'home' ? 'border-orange-600 text-orange-600 bg-white' : 'border-transparent'
              }`}
            >
              Главная
            </button>

          {/* Каталог с выпадающим меню всех категорий при наведении */}
          <div 
            className="relative" 
            ref={catalogRef}
            onMouseEnter={handleCatalogMouseEnter}
            onMouseLeave={handleCatalogMouseLeave}
          >
            <button
              onClick={() => {
                setRoute('catalog');
                setIsCatalogDropdownOpen(prev => !prev);
              }}
              className={`px-4 py-3 hover:text-orange-600 transition-colors border-b-2 font-bold flex items-center gap-1.5 ${
                route === 'catalog' ? 'border-orange-600 text-orange-600 bg-white shadow-xs' : 'border-transparent text-slate-700'
              }`}
            >
              <span>Каталог</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCatalogDropdownOpen ? 'rotate-180 text-orange-600' : 'text-slate-400'}`} />
            </button>

            {isCatalogDropdownOpen && (
              <div 
                className="absolute top-full left-0 pt-1 w-[560px] z-50 animate-fade-in"
                onMouseEnter={handleCatalogMouseEnter}
                onMouseLeave={handleCatalogMouseLeave}
              >
                <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-4 divide-y divide-slate-100">
                  <div className="pb-3 px-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Категории оборудования
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {products.length} товаров в наличии
                    </span>
                  </div>

                  <div className="py-3 grid grid-cols-2 gap-2">
                    {MOCK_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="group flex items-start gap-3 p-2.5 rounded-2xl hover:bg-orange-50/80 transition-all text-left border border-transparent hover:border-orange-200/80"
                      >
                        <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-white group-hover:shadow-xs transition-colors shrink-0 mt-0.5">
                          {getCategoryIcon(cat.iconName)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 truncate transition-colors">
                              {cat.name}
                            </h4>
                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-orange-500 bg-slate-50 group-hover:bg-orange-100/70 px-1.5 py-0.5 rounded-full shrink-0">
                              {cat.productCount}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-normal leading-tight">
                            {cat.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 px-1 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-normal">
                      Официальный дистрибьютор в Беларуси (с НДС 20%)
                    </span>
                    <button
                      onClick={() => {
                        setFilters(prev => ({ ...prev, category: 'all' }));
                        setRoute('catalog');
                        setIsCatalogDropdownOpen(false);
                      }}
                      className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>Весь каталог</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setRoute('services')}
            className={`px-4 py-3 hover:text-orange-600 transition-colors border-b-2 font-bold ${
              route === 'services' ? 'border-orange-600 text-orange-600 bg-white shadow-xs' : 'border-transparent text-slate-700'
            }`}
          >
            Услуги
          </button>

          {/* О компании с выпадающим подменю */}
          <div 
            className="relative" 
            ref={aboutRef}
            onMouseEnter={handleAboutMouseEnter}
            onMouseLeave={handleAboutMouseLeave}
          >
            <button
              onClick={() => {
                setRoute('about');
                setIsAboutDropdownOpen(prev => !prev);
              }}
              className={`px-4 py-3 hover:text-orange-600 transition-colors border-b-2 flex items-center gap-1 font-bold ${
                ['about', 'certificates', 'news', 'faq', 'partners'].includes(route)
                  ? 'border-orange-600 text-orange-600 bg-white'
                  : 'border-transparent text-slate-700'
              }`}
            >
              <span>О компании</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180 text-orange-600' : 'text-slate-400'}`} />
            </button>

            {isAboutDropdownOpen && (
              <div 
                className="absolute top-full left-0 pt-1 w-60 z-50 animate-fade-in"
                onMouseEnter={handleAboutMouseEnter}
                onMouseLeave={handleAboutMouseLeave}
              >
                <div className="bg-white border border-slate-200 rounded-2xl shadow-xl py-2 divide-y divide-slate-100">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setRoute('about');
                        setIsAboutDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between text-xs ${
                        route === 'about' ? 'text-orange-600 font-bold bg-orange-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>О нас и история</span>
                      <span className="text-[10px] text-slate-400 font-normal">mzvuk.by</span>
                    </button>
                    <button
                      onClick={() => {
                        setRoute('certificates');
                        setIsAboutDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between text-xs ${
                        route === 'certificates' ? 'text-orange-600 font-bold bg-orange-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>Сертификаты и документы</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    </button>
                    <button
                      onClick={() => {
                        setRoute('partners');
                        setIsAboutDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between text-xs ${
                        route === 'partners' ? 'text-orange-600 font-bold bg-orange-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>Бренды и партнеры</span>
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setRoute('news');
                        setIsAboutDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between text-xs ${
                        route === 'news' ? 'text-orange-600 font-bold bg-orange-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>Новости и статьи</span>
                      <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-1.5 py-0.5 rounded">NEW</span>
                    </button>
                    <button
                      onClick={() => {
                        setRoute('faq');
                        setIsAboutDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center justify-between text-xs ${
                        route === 'faq' ? 'text-orange-600 font-bold bg-orange-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>Вопрос-ответ (FAQ)</span>
                      <span className="text-[10px] text-slate-400 font-normal">Помощь</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setRoute('delivery')}
            className={`px-4 py-3 hover:text-orange-600 transition-colors border-b-2 font-bold ${
              route === 'delivery' ? 'border-orange-600 text-orange-600 bg-white' : 'border-transparent text-slate-700'
            }`}
          >
            Оплата и доставка
          </button>

          <button
            onClick={() => setRoute('contacts')}
            className={`px-4 py-3 hover:text-orange-600 transition-colors border-b-2 font-bold ${
              route === 'contacts' ? 'border-orange-600 text-orange-600 bg-white' : 'border-transparent text-slate-700'
            }`}
          >
            Контакты
          </button>
        </div>

        {/* Call Back Request Button in Nav Bar */}
        <button
          onClick={() => setIsCallbackOpen(true)}
          className="my-1.5 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs shadow-sm shadow-orange-500/20 transition-all active:scale-95 shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Заказать звонок</span>
        </button>
      </div>
    </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white p-4 border-t border-slate-800 space-y-3 animate-fade-in">
          <div className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Поиск по сайту..."
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="grid grid-cols-1 gap-1 text-sm font-semibold">
            <button
              onClick={() => {
                setRoute('home');
                setIsMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                route === 'home' ? 'bg-orange-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              Главная
            </button>

            <button
              onClick={() => {
                setRoute('catalog');
                setIsMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                route === 'catalog' ? 'bg-orange-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              Каталог
            </button>

            <button
              onClick={() => {
                setRoute('services');
                setIsMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                route === 'services' ? 'bg-orange-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              Услуги
            </button>

            {/* О компании с подпунктами в мобильном меню */}
            <div className="bg-slate-800/60 rounded-xl p-2 my-1 border border-slate-700/50 space-y-1">
              <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider px-2 block py-1">
                О компании
              </span>
              {[
                { id: 'about', label: 'О компании' },
                { id: 'certificates', label: 'Сертификаты и документы' },
                { id: 'partners', label: 'Бренды и партнеры' },
                { id: 'news', label: 'Новости и статьи' },
                { id: 'faq', label: 'Вопрос-ответ (FAQ)' },
              ].map(subItem => (
                <button
                  key={subItem.id}
                  onClick={() => {
                    setRoute(subItem.id as PageRoute);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                    route === subItem.id ? 'bg-orange-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {subItem.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setRoute('delivery');
                setIsMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                route === 'delivery' ? 'bg-orange-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              Оплата и доставка
            </button>

            <button
              onClick={() => {
                setRoute('contacts');
                setIsMobileMenuOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded-lg transition-colors ${
                route === 'contacts' ? 'bg-orange-600 text-white font-bold' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              Контакты
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsCallbackOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-center text-xs"
            >
              Заказать звонок
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
