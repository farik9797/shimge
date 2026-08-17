import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles, ArrowRight, Zap, Volume2 } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    badge: 'Специальное предложение B2B',
    title: 'Студийная и концертная акустика с НДС 20%',
    desc: 'Официальные поставки оборудования Yamaha, JBL, Shure по Беларуси. Гарантийное обслуживание и проектный расчет.',
    ctaText: 'Смотреть каталог',
    route: 'catalog',
    bgImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80',
    highlight: 'Скидки до -25%'
  },
  {
    id: 2,
    badge: 'Услуга инсталляции',
    title: 'Проектирование и акустический расчет помещений',
    desc: 'Озвучивание ресторанов, спортивных залов, конференц-комнат и ТРЦ «под ключ». Выезд специалиста в Минске и областях.',
    ctaText: 'Заказать проект',
    route: 'services',
    bgImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80',
    highlight: 'Моделирование EASE'
  },
  {
    id: 3,
    badge: 'Новое поступление',
    title: 'Легендарные микрофоны Shure и радиосистемы',
    desc: 'Вокальные микрофоны SM7B, BETA 58A и цифровая радиосистема SLX-D уже на складе ООО «Арт-Медиа Трейд» в Минске.',
    ctaText: 'Перейти к микрофонам',
    route: 'catalog',
    bgImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80',
    highlight: 'Гарантия 24 мес'
  }
];

export const HeroSlider: React.FC = () => {
  const { setRoute, setFilters } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative h-[400px] bg-slate-100/90 text-slate-900 overflow-hidden rounded-3xl my-6 mx-4 max-w-7xl lg:mx-auto shadow-lg border border-slate-200/80">
      <div className="h-full flex flex-col md:flex-row items-stretch">
        {/* Left Content Column */}
        <div className="relative z-10 w-full md:w-7/12 lg:w-3/5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-gradient-to-r from-white via-white/95 to-white/80">
          <div className="space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-black uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>{slide.badge}</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight leading-tight text-slate-900">
              {slide.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 max-w-xl">
              {slide.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                if (slide.route === 'catalog') {
                  setFilters(prev => ({ ...prev, category: 'all' }));
                }
                setRoute(slide.route as any);
              }}
              className="px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold rounded-2xl shadow-md shadow-orange-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200/90 rounded-2xl text-xs font-bold text-slate-800 shadow-xs">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{slide.highlight}</span>
            </div>
          </div>

          {/* Dots & Nav controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-8 bg-orange-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Перейти к слайду ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setCurrentSlide((currentSlide - 1 + SLIDES.length) % SLIDES.length)}
                className="p-1.5 rounded-lg hover:bg-orange-600 text-slate-700 hover:text-white transition-colors"
                aria-label="Предыдущий слайд"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-black text-slate-700 px-1">
                0{currentSlide + 1} / 0{SLIDES.length}
              </span>
              <button
                onClick={() => setCurrentSlide((currentSlide + 1) % SLIDES.length)}
                className="p-1.5 rounded-lg hover:bg-orange-600 text-slate-700 hover:text-white transition-colors"
                aria-label="Следующий слайд"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Image Column - 100% Bright, Crisp & Clear */}
        <div className="relative w-full md:w-5/12 lg:w-2/5 h-48 md:h-full overflow-hidden bg-slate-900">
          <img
            key={slide.id}
            src={slide.bgImage}
            alt={slide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 transform scale-100 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none"></div>

          {/* Floating badge over image */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/60 shadow-lg text-[11px] font-black text-slate-900 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-orange-600" />
            <span>mzvuk.by</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 md:left-4 md:right-auto bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/60 text-white text-xs font-semibold shadow-lg flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Гарантия и сервис в РБ</span>
          </div>
        </div>
      </div>
    </section>
  );
};
