import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink,
  Clock
} from 'lucide-react';
import { PageTab, ShimgeSeries } from '../../types';

export const Footer: React.FC = () => {
  const { setActiveTab, selectSeries } = useApp();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-700">
      
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/images/shimge-logo.png"
                alt="SHIMGE for better life"
                className="h-10 w-auto object-contain"
              />
              <div className="pl-3 border-l border-slate-200 leading-tight">
                <span className="font-extrabold text-slate-900 text-xs tracking-tight block">SHIMGE UZBEKISTAN</span>
                <span className="text-[10px] text-slate-400 font-semibold">Каталог насосного оборудования</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Поставки насосного оборудования SHIMGE в Узбекистане. Вертикальные, скважинные, дренажные, канализационные и циркуляционные насосы.
            </p>

            <div className="pt-1 flex items-center space-x-3 text-xs text-slate-600">
              <span className="inline-flex items-center text-[11px] font-bold text-[#007682] bg-[#EBF8F9] px-2.5 py-1 rounded-lg border border-[#B5E7EC]">
                ✓ CNAS Lab Certified
              </span>
              <span className="inline-flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                ✓ O'zStandart
              </span>
            </div>
          </div>

          {/* Column 2: Popular Series */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Популярные серии
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { s: 'BLT' as ShimgeSeries, label: 'BLT (Вертикальные AISI 304/316)' },
                { s: '4SGm' as ShimgeSeries, label: '4SGm (Скважинные насосы 4")' },
                { s: '6SG' as ShimgeSeries, label: '200QJ / 6SG (Глубинные насосы)' },
                { s: 'WQ' as ShimgeSeries, label: 'WQ / WQD (Канализационные)' },
                { s: 'APM' as ShimgeSeries, label: 'APM Smart (Отопление класс А)' },
                { s: 'BWJ' as ShimgeSeries, label: 'BWJ (Инверторные станции)' },
              ].map((item) => (
                <li key={item.s}>
                  <button
                    onClick={() => selectSeries(item.s)}
                    className="text-slate-600 hover:text-[#0096A6] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Site Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Меню
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Главная', tab: 'home' as PageTab },
                { label: 'Каталог насосов', tab: 'catalog' as PageTab },
                { label: 'Отраслевые решения', tab: 'industries' as PageTab },
                { label: 'О бренде SHIMGE', tab: 'about' as PageTab },
                { label: 'Доставка и оплата', tab: 'delivery' as PageTab },
                { label: 'Контакты', tab: 'contacts' as PageTab },
              ].map((item) => (
                <li key={item.tab}>
                  <button
                    onClick={() => { setActiveTab(item.tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-slate-600 hover:text-[#0096A6] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Контакты
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#0096A6] flex-shrink-0 mt-0.5" />
                <span>г. Ташкент, Алмазарский район</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#00A859] flex-shrink-0" />
                <a href="tel:+998712000055" className="font-bold text-slate-900 hover:text-[#0096A6]">
                  +998 (71) 200-00-55
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <a href="mailto:info@shimge.uz" className="text-slate-600 hover:text-[#0096A6]">
                  info@shimge.uz
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>Пн-Пт: 9:00 – 18:00</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            © 1984–{new Date().getFullYear()} SHIMGE PUMP INDUSTRY GROUP. Каталог насосного оборудования.
          </div>
          <div className="flex items-center space-x-4">
            <span>Все права защищены</span>
            <span>•</span>
            <a href="https://ru.shimgepump.com/" target="_blank" rel="noopener noreferrer" className="text-[#0096A6] hover:underline flex items-center space-x-1">
              <span>ru.shimgepump.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};
