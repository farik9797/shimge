import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowUpRight, 
  Send
} from 'lucide-react';
import { PRODUCTS } from '../../data/equipmentData';

export const HeroSection: React.FC = () => {
  const { selectCategory, openRfqModal } = useApp();
  const featuredPump = PRODUCTS[0];

  return (
    <div className="w-full bg-[#F4F6F8] p-2.5 sm:p-4 lg:p-5 border-b border-slate-200">
      
      {/* Чистый парящий холст */}
      <div className="relative mx-auto w-full max-w-[1536px] min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] rounded-[1.75rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/40 shadow-2xl flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16">
        
        {/* Фоновое YouTube видео без элементов управления (масштабирование скрывает верхнюю и нижнюю плашки плеера) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[25%] -bottom-[25%] -left-[25%] -right-[25%] w-[150%] h-[150%] flex items-center justify-center pointer-events-none">
            <iframe
              src="https://www.youtube-nocookie.com/embed/iJ2P0HwvjGA?autoplay=1&mute=1&loop=1&playlist=iJ2P0HwvjGA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&playsinline=1&enablejsapi=1"
              title="SHIMGE Video Background"
              className="w-full h-full min-w-[120vw] min-h-[70vw] pointer-events-none border-0 object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          {/* Легкое прозрачное затемнение */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/55" />
        </div>

        {/* Только Заголовок, Краткое описание и Кнопки */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-6">
          
          {/* Главный заголовок */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight leading-[1.08] text-white drop-shadow-lg">
            Инженерная надежность <br />
            <span className="text-[#00D1E5] drop-shadow-md">
              в каждом метре напора
            </span>
          </h1>

          {/* Краткая подпись */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 font-medium max-w-2xl leading-relaxed drop-shadow-md">
            Официальный каталог насосного оборудования <strong>SHIMGE</strong> в Узбекистане: промышленные, скважинные и циркуляционные насосы.
          </p>

          {/* Кнопки действий */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            
            {/* Основная кнопка в каталог */}
            <button
              onClick={() => selectCategory('all')}
              className="group inline-flex items-center gap-3 rounded-full bg-[#0096A6] hover:bg-[#007682] py-2.5 pe-2.5 ps-7 text-sm font-bold text-white shadow-xl shadow-black/30 hover:scale-103 transition-all duration-200"
            >
              <span>Открыть каталог</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 group-hover:rotate-12 transition-all">
                <ArrowUpRight className="size-4 text-white" />
              </span>
            </button>

            {/* Вторая стеклянная кнопка */}
            <button
              onClick={() => openRfqModal(featuredPump)}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 hover:bg-white/30 text-white px-6 py-3 text-sm font-bold backdrop-blur-md shadow-lg transition-all hover:scale-103"
            >
              <Send className="size-3.5 text-[#00D1E5]" />
              <span>Запросить расчет и КП</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
