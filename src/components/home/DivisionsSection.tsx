import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Droplet, 
  Wind, 
  Filter, 
  Cpu, 
  ArrowRight, 
  CheckCircle,
  Layers
} from 'lucide-react';
import { CategoryType } from '../../types';

export const DivisionsSection: React.FC = () => {
  const { selectCategory } = useApp();

  const divisions: {
    id: CategoryType;
    title: string;
    subtitle: string;
    items: string[];
    modelsCount: string;
    image: string;
    accentColor: string;
    icon: any;
  }[] = [
    {
      id: 'pumps',
      title: 'Насосное оборудование',
      subtitle: 'Для водоснабжения, отопления, химических и пищевых производств',
      items: [
        'Центробежные консольные и моноблочные насосы',
        'Вертикальные многоступенчатые насосы давления',
        'Скважинные и погружные глубинные насосы',
        'Шнековые и химические дозирующие насосы'
      ],
      modelsCount: '240+ моделей',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-blue-600 to-indigo-700',
      icon: Droplet
    },
    {
      id: 'compressors',
      title: 'Компрессорные станции',
      subtitle: 'Производство сухого и чистого сжатого воздуха для цехов и станков',
      items: [
        'Винтовые стационарные компрессоры (с частотником)',
        'Поршневые компрессоры высокого давления',
        'Рефрижераторные и адсорбционные осушители',
        'Ресиверы и модульные магистральные пневмосети'
      ],
      modelsCount: '180+ моделей',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-amber-500 to-orange-600',
      icon: Wind
    },
    {
      id: 'water-treatment',
      title: 'Системы водоочистки',
      subtitle: 'Обессоливание, деминерализация, умягчение и ультрафильтрация',
      items: [
        'Промышленные установки обратного осмоса (RO)',
        'Автоматические умягчители и станции обезжелезивания',
        'Блочно-модульные станции ультрафильтрации',
        'УФ-обеззараживатели и дозирующие комплексы'
      ],
      modelsCount: '190+ моделей',
      image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-cyan-600 to-blue-700',
      icon: Filter
    },
    {
      id: 'components',
      title: 'Комплектующие и фильтры',
      subtitle: 'Расходные материалы, автоматика и оригинальные запчасти',
      items: [
        'Мембранные элементы 8040 / 4040 (FilmTec, Vontron)',
        'Клапаны управления Clack, Runxin, SIEMENS',
        'Частотные преобразователи Danfoss VLT, INVT',
        'Магистральные картриджи, смолы и реагенты'
      ],
      modelsCount: '420+ позиций',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80',
      accentColor: 'from-emerald-600 to-teal-700',
      icon: Cpu
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Продуктовые дивизионы</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              4 ключевых направления поставок
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Прямая контрактация с заводами-изготовителями гарантирует низкие дилерские цены и наличие оригинальных запчастей.
          </p>
        </div>

        {/* 4 Division Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((div) => {
            const Icon = div.icon;
            return (
              <div
                key={div.id}
                onClick={() => selectCategory(div.id)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group"
              >
                <div>
                  {/* Photo with Overlay & Icon Badge */}
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={div.image}
                      alt={div.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Top Model Badge */}
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {div.modelsCount}
                    </span>

                    {/* Bottom Icon & Name */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center space-x-2 text-white">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${div.accentColor} text-white shadow`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold tracking-tight text-white group-hover:text-orange-300 transition-colors">
                        {div.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {div.subtitle}
                    </p>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                      {div.items.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700 group-hover:text-orange-600 transition-colors">
                  <span>Перейти в раздел</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
