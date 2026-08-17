import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import { 
  Volume2, Phone, Mail, MapPin, Clock, Send, ShieldCheck, 
  CreditCard, CheckCircle2, FileText, ArrowUp 
} from 'lucide-react';
import { MOCK_CATEGORIES } from '../../data/mockData';

export const Footer: React.FC = () => {
  const { setRoute, setFilters, setIsCallbackOpen, showNotification } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showNotification('Вы успешно подписались на акции и спецпредложения!', 'success');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Feature Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl border border-orange-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Официальная гарантия</h4>
              <p className="text-xs text-slate-400">Гарантия до 36 месяцев от дилера</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl border border-orange-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Работаем с НДС 20%</h4>
              <p className="text-xs text-slate-400">Полный пакет документов для ЮР лиц</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl border border-orange-500/20">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Быстрая доставка</h4>
              <p className="text-xs text-slate-400">По всей Беларуси за 24-48 часов</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl border border-orange-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Собственный сервис</h4>
              <p className="text-xs text-slate-400">Авторизованный ремонт в Минске</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => setRoute('home')}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white block leading-none">
                  ООО «Арт-Медиа <span className="text-orange-500">Трейд»</span>
                </span>
                <span className="text-xs text-slate-400">Официальный сайт mzvuk.by</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Поставка, проектирование, инсталляция и гарантийное обслуживание профессионального звукового, акустического и музыкального оборудования на территории Республики Беларусь.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <a href="tel:+375333772873" className="flex items-center gap-2 hover:text-orange-400 font-bold">
                <Phone className="w-4 h-4 text-orange-500" />
                +375 (33) 377-28-73
              </a>
              <a href="mailto:sales@mzvuk.by" className="flex items-center gap-2 hover:text-orange-400">
                <Mail className="w-4 h-4 text-slate-400" />
                sales@mzvuk.by
              </a>
              <p className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-400" />
                Республика Беларусь, г. Минск
              </p>
              <p className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-slate-400" />
                Пн-Пт: 09:00 - 18:00 (Сб-Вс: выходной)
              </p>
            </div>
          </div>

          {/* Column 2: Catalog Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Каталог</h4>
            <ul className="space-y-2 text-xs">
              {MOCK_CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setFilters(prev => ({ ...prev, category: cat.id }));
                      setRoute('catalog');
                    }}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Информация</h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'about', label: 'О компании' },
                { id: 'services', label: 'Услуги и монтаж' },
                { id: 'certificates', label: 'Сертификаты' },
                { id: 'news', label: 'Новости и статьи' },
                { id: 'faq', label: 'Частые вопросы (FAQ)' },
                { id: 'partners', label: 'Бренды-партнёры' },
                { id: 'delivery', label: 'Оплата и доставка' },
                { id: 'contacts', label: 'Контакты' },
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setRoute(item.id as PageRoute)}
                    className="hover:text-orange-400 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Callback */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Получать спецпредложения</h4>
            <p className="text-xs text-slate-400">
              Подпишитесь на свежие поступления микрофонов, акустики и акции.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="sales@company.by"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Подписаться
              </button>
            </form>

            <div className="pt-2">
              <button
                onClick={() => setIsCallbackOpen(true)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-orange-400 font-bold rounded-xl text-xs border border-slate-700 transition-colors"
              >
                Запросить консультацию
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar Requisites & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© 2026 ООО «Арт-Медиа Трейд» (mzvuk.by). Все права защищены.</p>
            <p className="text-[11px] mt-0.5">УНП 193... • Зарегистрировано Минским горисполкомом. Цены указаны в BYN с НДС 20%.</p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 text-slate-400 font-mono">ЕРИП</span>
            <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 text-slate-400 font-mono">VISA / MC</span>
            <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 text-slate-400 font-mono">Безнал (НДС)</span>
            
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-orange-600 text-slate-300 hover:text-white rounded-xl border border-slate-800 transition-colors"
              title="Наверх"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
