import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Building2, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  MessageCircle,
  Instagram,
  Navigation,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { showToast, openRfqModal } = useApp();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [isSent, setIsSent] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      showToast(`${label} скопирован в буфер обмена`);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    showToast('Сообщение отправлено инженеру SHIMGE!');
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setPhone('');
      setComment('');
    }, 3000);
  };

  const phoneNumbers = [
    {
      number: '+998 97 743 37 38',
      clean: '+998977433738',
      role: 'Отдел продаж и консультации (Рустам)',
      isPrimary: true
    },
    {
      number: '+998 93 514 80 14',
      clean: '+998935148014',
      role: 'Оптовые поставки и склад',
      isPrimary: false
    },
    {
      number: '+998 94 616 51 59',
      clean: '+998946165159',
      role: 'Инженерно-технический расчет',
      isPrimary: false
    }
  ];

  const telegramChannels = [
    {
      name: 'Связь в Telegram (Рустам)',
      handle: '@Rustamshimge',
      url: 'https://t.me/Rustamshimge',
      desc: 'Прямая связь с ведущим специалистом'
    },
    {
      name: 'Официальный канал SHIMGE',
      handle: '@Officialshimge',
      url: 'https://t.me/Officialshimge',
      desc: 'Новости, каталоги, видеообзоры и сертификаты'
    },
    {
      name: 'Telegram-магазин SHIMGE',
      handle: '@Shimgemagazin',
      url: 'https://t.me/Shimgemagazin',
      desc: 'Актуальный складской ассортимент и цены'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Light Header */}
      <div className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider bg-[#EBF8F9] px-3.5 py-1 rounded-full border border-[#B5E7EC]">
            <MapPin className="w-4 h-4 text-[#0096A6]" />
            <span>SHIMGE UZBEKISTAN • КОНТАКТЫ И СКЛАД</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Свяжитесь с официальным отделом SHIMGE
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Прямые консультации по подбору насосов, оптовые отгрузки со склада в Ташкенте и оперативная доставка по всему Узбекистану.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* 1. Главные телефоны и мессенджеры */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Левая колонка: Телефоны и Соцсети */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Карточка с номерами телефонов */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00A859] border border-emerald-200 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Номера телефонов</h3>
                    <p className="text-xs text-slate-400">Прямая связь с отделом продаж и складом</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Пн–Сб 9:00–18:00
                </span>
              </div>

              <div className="space-y-3.5">
                {phoneNumbers.map((p, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-[#F0FAFA] hover:border-[#B5E7EC] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        {p.role}
                      </span>
                      <a 
                        href={`tel:${p.clean}`}
                        className="text-lg sm:text-xl font-black text-slate-900 hover:text-[#0096A6] transition-colors"
                      >
                        {p.number}
                      </a>
                    </div>

                    <div className="flex items-center space-x-2">
                      <a
                        href={`tel:${p.clean}`}
                        className="px-4 py-2 bg-[#00A859] hover:bg-[#009639] text-white text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center space-x-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Позвонить</span>
                      </a>
                      <button
                        onClick={() => copyToClipboard(p.number, p.number)}
                        className="p-2 bg-white text-slate-500 hover:text-slate-900 border border-slate-300 hover:bg-slate-100 rounded-xl transition-colors"
                        title="Скопировать номер"
                      >
                        {copiedField === p.number ? <Check className="w-4 h-4 text-[#00A859]" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Карточка Telegram и Instagram */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#EBF8F9] text-[#0096A6] border border-[#B5E7EC] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Telegram и Instagram</h3>
                  <p className="text-xs text-slate-400">Быстрые консультации, онлайн-чат и обзоры</p>
                </div>
              </div>

              {/* 3 Telegram канала */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {telegramChannels.map((tg, idx) => (
                  <a
                    key={idx}
                    href={tg.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-[#F0F8FF] border border-[#D0E7FF] hover:border-[#229ED9] hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-[#229ED9] text-white flex items-center justify-center mb-2.5">
                        <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#229ED9] transition-colors line-clamp-1">
                        {tg.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {tg.desc}
                      </p>
                    </div>
                    <span className="mt-3 text-xs font-mono font-bold text-[#229ED9] block">
                      {tg.handle} →
                    </span>
                  </a>
                ))}
              </div>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/shimge_uzbekistan_rasmiy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-gradient-to-r from-[#FDF2F8] to-[#FFF1F2] border border-rose-200 hover:border-pink-500 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-2xs">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      Официальный Instagram SHIMGE Uzbekistan
                    </h4>
                    <span className="text-[11px] font-mono font-bold text-slate-600">
                      @shimge_uzbekistan_rasmiy
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
                  Перейти →
                </span>
              </a>

            </div>

          </div>

          {/* Правая колонка: Форма быстрой связи */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 sticky top-24">
              <div>
                <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-[#0096A6] uppercase tracking-wider bg-[#EBF8F9] px-2.5 py-0.5 rounded-md border border-[#B5E7EC] mb-2">
                  <span>Обратная связь</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Задайте вопрос специалисту
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Оставьте контакты, и мы перезвоним в течение 10 минут.
                </p>
              </div>

              {isSent ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#00A859] mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Запрос принят!</h4>
                  <p className="text-xs text-emerald-700">
                    Инженер свяжется с вами по указанному телефону.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Ваше имя или компания *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ООО или Ф.И.О."
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Телефон для связи *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 (9_) ___ - __ - __"
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Вопрос или требуемая модель насоса
                    </label>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Например: нужен скважинный насос на 120м или КП на BLT 16-8..."
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0096A6] hover:bg-[#007682] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Отправить обращение</span>
                  </button>
                </form>
              )}

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-center text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-[#0096A6] mx-auto mb-1" />
                  <span className="font-bold text-slate-800 block text-[11px]">Гарантия</span>
                  <span className="text-[10px] text-slate-400">24 месяца от завода</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <Truck className="w-4 h-4 text-[#00A859] mx-auto mb-1" />
                  <span className="font-bold text-slate-800 block text-[11px]">Доставка</span>
                  <span className="text-[10px] text-slate-400">По всему Узбекистану</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 2. Блок Локация на Яндекс.Картах */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Локация офиса и центрального склада в Ташкенте
                </h3>
                <p className="text-xs text-slate-500">
                  г. Ташкент, Алмазарский район • Точная метка на Яндекс.Картах
                </p>
              </div>
            </div>

            <a
              href="https://yandex.uz/maps/-/CTDIrDl7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#0096A6] hover:bg-[#007682] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex-shrink-0"
            >
              <Navigation className="w-4 h-4" />
              <span>Построить маршрут (Яндекс.Карты)</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>

          {/* Интерактивный встроенный фрейм Яндекс.Карт с точной локацией */}
          <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=69.2401%2C41.3411&z=14&pt=69.2401,41.3411,pm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              title="Локация SHIMGE Узбекистан"
              className="w-full h-full"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
