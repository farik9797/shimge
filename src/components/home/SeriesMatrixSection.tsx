import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';
import { ShimgeSeries } from '../../types';

export const SeriesMatrixSection: React.FC = () => {
  const { selectSeries, selectCategory } = useApp();

  const coreSeries: {
    id: ShimgeSeries;
    name: string;
    title: string;
    desc: string;
    image: string;
    tag: string;
    badge: string;
  }[] = [
    {
      id: 'BLT',
      name: 'Серия BLT / BLTE',
      title: 'Вертикальные многоступенчатые',
      desc: 'Нержавеющая сталь AISI 304/316. Напор до 300 м. Системы повышения давления и обратный осмос.',
      image: 'https://files.glotr.uz/company/000/027/167/products/2023/02/17/2023-02-17-21-22-36-552393-238ee32a0a85c96fad061c7123a0b9c7.webp?_=ozauc',
      tag: 'Повышение давления',
      badge: 'Хит продаж'
    },
    {
      id: '4SGm',
      name: 'Серия 4SGm / 200QJ',
      title: 'Скважинные глубинные насосы',
      desc: 'Плавающие рабочие колеса PPO с защитой от песка (до 150 г/м³). Капельный полив, сады и поля.',
      image: 'https://files.glotr.uz/company/000/027/167/products/2023/06/24/2023-06-24-12-23-22-188062-b3b0f41c79048ada0fc9ef2d77f23d15.webp?_=ozauc',
      tag: 'Скважины и полив',
      badge: 'Агро-лидер'
    },
    {
      id: 'WQ',
      name: 'Серия WQ / WQD CUT',
      title: 'Канализационные и фекальные',
      desc: 'Высокопрочный чугун HT200, режущий нож Z-Cut из вольфрама. Канализационные станции КНС.',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
      tag: 'Канализация и КНС',
      badge: 'С измельчителем'
    },
    {
      id: 'APM',
      name: 'Серия APM SMART',
      title: 'Циркуляционные насосы отопления',
      desc: 'Класс энергоэффективности А. Режим Auto-Adapt экономит до 80% электричества. Теплые полы и котельные.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      tag: 'Отопление (HVAC)',
      badge: 'Класс А'
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0096A6] block mb-1">
              Основные направления
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Флагманские линейки насосов SHIMGE
            </h2>
          </div>
          <button
            onClick={() => selectCategory('all')}
            className="text-xs font-bold text-[#0096A6] hover:underline flex items-center space-x-1"
          >
            <span>Все модели в каталоге</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Light Cards Grid with Real Photos & Hover Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreSeries.map((item) => (
            <div
              key={item.id}
              onClick={() => selectSeries(item.id)}
              className="bg-white rounded-3xl border border-slate-200 hover:border-[#0096A6] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group"
            >
              <div>
                <div className="h-48 bg-slate-50 overflow-hidden relative border-b border-slate-100 p-4 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 filter drop-shadow-sm"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#0096A6] border border-[#B5E7EC] text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-2xs">
                    {item.tag}
                  </span>
                  <span className="absolute top-3 right-3 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-2xs">
                    {item.badge}
                  </span>
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-xs font-black text-[#0096A6] font-mono block">
                    {item.name}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#0096A6] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#0096A6] group-hover:text-[#00A859] transition-colors">
                <span>Смотреть модели</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
