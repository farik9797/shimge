import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sliders, Sparkles, Building2, Mic2, Home, School, Music, Check, ArrowRight, Phone } from 'lucide-react';

const VENUES = [
  {
    id: 'restaurant',
    name: 'Ресторан / Кафе / Бар',
    icon: <Building2 className="w-5 h-5" />,
    areaRange: '50 - 300 м²',
    recommendedType: '100В Фоновый звук',
    estimateBYN: 1800,
    items: ['Усилитель 120 Вт Pasystems', '8 х Потолочные динамики 100В', 'Микрофон диктора', 'Коммутационный кабель']
  },
  {
    id: 'conference',
    name: 'Конференц-зал / Офис',
    icon: <Mic2 className="w-5 h-5" />,
    areaRange: '30 - 150 м²',
    recommendedType: 'Конгресс-система + Радиомикрофоны',
    estimateBYN: 3400,
    items: ['Радиосистема Shure SLX-D', 'Активная акустика JBL 12"', 'Микшерный пульт 8 каналов', 'Акустические стойки']
  },
  {
    id: 'studio',
    name: 'Студия звукозаписи',
    icon: <Home className="w-5 h-5" />,
    areaRange: '15 - 50 м²',
    recommendedType: 'Студийный мониторинг',
    estimateBYN: 3550,
    items: ['Пара мониторов Yamaha HS8', 'Микрофон Shure SM7B', 'Студийные наушники Sennheiser', 'Микрофонная пантограф-стойка']
  },
  {
    id: 'school',
    name: 'Школа / Актовый зал',
    icon: <School className="w-5 h-5" />,
    areaRange: '100 - 500 м²',
    recommendedType: 'Концертная акустическая система',
    estimateBYN: 5200,
    items: ['2 х Акустические системы JBL EON715 1300 Вт', 'Микшерный пульт Behringer', '4 х Вокальные микрофоны', 'Стойки и коммутация']
  }
];

export const AudioConfigurator: React.FC = () => {
  const { formatPrice, setIsCallbackOpen, setRoute, setFilters } = useApp();
  const [selectedVenueId, setSelectedVenueId] = useState('restaurant');

  const selectedVenue = VENUES.find(v => v.id === selectedVenueId) || VENUES[0];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-6 md:p-10 text-white shadow-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Онлайн-Конфигуратор комплекта
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Подобрать готовый комплект звука под ваш объект
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Выберите тип помещения для мгновенного расчета базового состава оборудования и стоимости.
            </p>
          </div>

          <button
            onClick={() => setIsCallbackOpen(true)}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2 transition-colors shrink-0"
          >
            <Phone className="w-4 h-4" /> Индивидуальное ТЗ
          </button>
        </div>

        {/* Venue Selection */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {VENUES.map(venue => (
            <button
              key={venue.id}
              onClick={() => setSelectedVenueId(venue.id)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                selectedVenueId === venue.id
                  ? 'bg-orange-600 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="mb-2">{venue.icon}</div>
              <h3 className="text-sm font-bold line-clamp-1">{venue.name}</h3>
              <p className="text-[11px] opacity-80 mt-0.5">{venue.areaRange}</p>
            </button>
          ))}
        </div>

        {/* Configuration Result Preview Card */}
        <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="inline-block text-xs font-extrabold text-orange-400 uppercase tracking-wide">
              Рекомендуемое решение: {selectedVenue.recommendedType}
            </div>
            <h3 className="text-xl font-bold text-white">
              Базовый сетап для объекта «{selectedVenue.name}»
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {selectedVenue.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700 text-center shrink-0 w-full lg:w-72 space-y-3">
            <span className="text-xs text-slate-400 uppercase font-bold block">Ориентировочная стоимость</span>
            <span className="text-2xl font-black text-orange-400 block">
              {formatPrice(selectedVenue.estimateBYN)}
            </span>
            <span className="text-[10px] text-slate-400 block">с НДС 20% • Гарантия 24 мес</span>

            <button
              onClick={() => setIsCallbackOpen(true)}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              Запросить спецификацию <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
