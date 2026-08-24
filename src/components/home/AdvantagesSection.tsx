import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Cpu, 
  Factory, 
  Globe2, 
  Warehouse 
} from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const advantages = [
    {
      icon: Factory,
      title: '40 лет опыта в насосостроении',
      desc: 'SHIMGE основана в 1984 году и является одним из признанных мировых лидеров по объему производства насосов в мире.',
      tag: 'С 1984 года'
    },
    {
      icon: Cpu,
      title: 'Роботизированные заводы Industry 4.0',
      desc: 'Автоматизированные линии литья, высокоточная обработка на станках с ЧПУ и 100% компьютерный контроль качества каждого узла.',
      tag: 'Производство'
    },
    {
      icon: ShieldCheck,
      title: 'Национальная лаборатория CNAS',
      desc: 'Собственный научно-исследовательский испытательный центр, аккредитованный на международном уровне, гарантирует стандарты ISO 9001 и CE.',
      tag: 'Испытания'
    },
    {
      icon: Globe2,
      title: 'Экспорт в более чем 100 стран',
      desc: 'Насосы SHIMGE успешно эксплуатируются на 5 континентах в коммунальных, сельскохозяйственных и промышленных проектах.',
      tag: 'Мировой бренд'
    },
    {
      icon: Warehouse,
      title: 'Постоянный склад наличия в Ташкенте',
      desc: 'Постоянный неснижаемый запас ходовых серий BLT, WQ, 4SGm, 200QJ, APM и оригинальных торцевых уплотнений и запчастей.',
      tag: 'Складской запас'
    },
    {
      icon: Award,
      title: 'Официальная дилерская поддержка',
      desc: 'Полная техническая поддержка дистрибьютора, подбор аналогов европейских брендов и оперативная сервисная замена.',
      tag: 'Сервис'
    }
  ];

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider mb-2 bg-[#EBF8F9] px-3 py-1 rounded-full border border-[#B5E7EC]">
            <Award className="w-4 h-4 text-[#0096A6]" />
            <span>СТАНДАРТЫ SHIMGE PUMP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Почему инженеры и предприятия Узбекистана выбирают SHIMGE
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Превосходные гидравлические характеристики, энергоэффективность IE3 и официальные цены дистрибьютора.
          </p>
        </div>

        {/* 6 Light Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-[#0096A6] hover:shadow-lg transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF8F9] border border-[#D4F1F4] flex items-center justify-center text-[#0096A6] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {adv.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0096A6] transition-colors">
                  {adv.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
