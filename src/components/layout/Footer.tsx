import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  CheckCircle2,
  Send,
  Instagram,
  Navigation
} from 'lucide-react';
import { ShimgeCategoryType } from '../../types';

export const Footer: React.FC = () => {
  const { setActiveTab, selectCategory } = useApp();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-700">
      
      {/* Top Value Strip in Brand Teal Light Tint */}
      <div className="bg-[#EBF8F9] border-b border-[#B5E7EC] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#B5E7EC] flex items-center justify-center text-[#0096A6] shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#0096A6]" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Прямые поставки с завода</span>
              <span className="text-slate-500">100% оригинальное оборудование SHIMGE</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#B5E7EC] flex items-center justify-center text-[#0096A6] shadow-2xs">
              <Award className="w-5 h-5 text-[#0096A6]" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Официальная гарантия 24 месяца</span>
              <span className="text-slate-500">Сервисный центр и запчасти в Ташкенте</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#B5E7EC] flex items-center justify-center text-[#0096A6] shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-[#0096A6]" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Складской запас в наличии</span>
              <span className="text-slate-500">Быстрая отгрузка по всему Узбекистану</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-[#0096A6] tracking-tight">SHIMGE</span>
              <span className="text-xs bg-[#EBF8F9] text-[#007682] border border-[#B5E7EC] font-bold px-2 py-0.5 rounded">
                UZBEKISTAN
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Официальный каталог насосного оборудования SHIMGE в Республике Узбекистан. 
              Промышленные многоступенчатые насосы BLT, скважинные 4SGm, фекальные WQ и энергосберегающие циркуляционные насосы APM.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://t.me/Officialshimge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-[#229ED9] text-white flex items-center justify-center hover:scale-105 transition-transform"
                title="Официальный Telegram SHIMGE"
              >
                <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
              </a>
              <a
                href="https://www.instagram.com/shimge_uzbekistan_rasmiy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:scale-105 transition-transform"
                title="Официальный Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://yandex.uz/maps/-/CTDIrDl7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center hover:scale-105 transition-transform"
                title="Локация на Яндекс.Картах"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Equipment Catalog Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Каталог оборудования
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'multistage-vertical' as ShimgeCategoryType, label: 'Многоступенчатые BLT / BLTE' },
                { id: 'submersible-wells' as ShimgeCategoryType, label: 'Скважинные 4SGm & 200QJ' },
                { id: 'drainage-sewage' as ShimgeCategoryType, label: 'Фекальные и дренажные WQ' },
                { id: 'circulation-hvac' as ShimgeCategoryType, label: 'Циркуляционные APM / XPS' },
                { id: 'surface-centrifugal' as ShimgeCategoryType, label: 'Поверхностные CPM / QB' },
                { id: 'intelligent-booster' as ShimgeCategoryType, label: 'Станции давления BWJ / PZ' },
              ].map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => selectCategory(cat.id)}
                    className="text-slate-600 hover:text-[#0096A6] transition-colors"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Информация
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="text-slate-600 hover:text-[#0096A6] transition-colors"
                >
                  О бренде SHIMGE
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('industries')}
                  className="text-slate-600 hover:text-[#0096A6] transition-colors"
                >
                  Отраслевые решения
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className="text-slate-600 hover:text-[#0096A6] transition-colors"
                >
                  Доставка и гарантия
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className="text-slate-600 hover:text-[#0096A6] transition-colors"
                >
                  Контакты и склад
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Real Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Контакты отдела продаж
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#00A859] flex-shrink-0" />
                  <a href="tel:+998977433738" className="font-bold text-slate-900 hover:text-[#0096A6]">
                    +998 97 743 37 38
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#00A859] flex-shrink-0" />
                  <a href="tel:+998935148014" className="font-bold text-slate-900 hover:text-[#0096A6]">
                    +998 93 514 80 14
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#00A859] flex-shrink-0" />
                  <a href="tel:+998946165159" className="font-bold text-slate-900 hover:text-[#0096A6]">
                    +998 94 616 51 59
                  </a>
                </div>
              </div>

              <div className="pt-1 flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#0096A6] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block">г. Ташкент, Алмазарский район</span>
                  <a 
                    href="https://yandex.uz/maps/-/CTDIrDl7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0096A6] font-bold hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Локация на Яндекс.Картах</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Пн-Сб: 9:00 – 18:00</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            © 1984–{new Date().getFullYear()} SHIMGE PUMP INDUSTRY GROUP. Официальный каталог в Узбекистане.
          </div>
          <div className="flex items-center space-x-4">
            <span>Все права защищены</span>
            <span>•</span>
            <span className="text-[#0096A6] font-bold">SHIMGE Uzbekistan</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
