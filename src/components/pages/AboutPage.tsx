import React from 'react';
import { 
  Building2, 
  Globe2, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const facts = [
    { value: '1984 год', label: 'год основания корпорации SHIMGE Pump' },
    { value: '100+ стран', label: 'география экспорта продукции по всему миру' },
    { value: '50 млн+', label: 'произведенных и установленных насосов' },
    { value: '3 года', label: 'официальная гарантия завода-изготовителя' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Light Header */}
      <div className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider mb-2 bg-[#EBF8F9] px-3 py-1 rounded-full border border-[#B5E7EC]">
            <Building2 className="w-4 h-4 text-[#0096A6]" />
            <span>О бренде SHIMGE PUMP</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Мировой лидер в производстве насосного оборудования
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Официальный дилер корпорации SHIMGE Pump Industry Group в Узбекистане (Gidromaks Pro).
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Facts Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {facts.map((fact, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-[#0096A6]">{fact.value}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{fact.label}</div>
            </div>
          ))}
        </div>

        {/* Brand Heritage & Story */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0096A6]">
                История и масштабы производства
              </span>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                Интеллектуальное производство Industry 4.0 и аккредитация CNAS
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Корпорация <strong>SHIMGE Pump Industry Group</strong> была основана в 1984 году в городе Вэньлин (провинция Чжэцзян) — признанном центре китайского насосостроения. За 40 лет непрерывного инженерного развития компания стала публичной корпорацией, акции которой торгуются на Шэньчжэньской фондовой бирже (SZSE).
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Заводы SHIMGE оснащены автоматическими обрабатывающими центрами, роботами для лазерной сварки рабочих колес из нержавеющей стали AISI 304/316, катафорезными линиями нанесения антикоррозийных покрытий и собственной национальной испытательной лабораторией CNAS.
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859]" />
                  <span>Участие в разработке более 30 национальных и международных стандартов насосостроения</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859]" />
                  <span>Сертификация по международным стандартам ISO 9001, ISO 14001, CE, RoHS и O'zStandart</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859]" />
                  <span>Постоянный складской запас и база запчастей в Ташкенте</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 group">
                <img
                  src="/images/shimge-factory-hq.jpg"
                  alt="Главный производственный комплекс и штаб-квартира SHIMGE Pump Industry"
                  className="w-full h-80 object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF8F9] text-[#0096A6] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">R&D и Лаборатория CNAS</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Более 200 инженеров-исследователей, стенды гидродинамического моделирования CFD и оптического анализа кавитации.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">100% входной и выходной контроль</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Каждый насос проходит стендовые испытания под давлением на герметичность, виброустойчивость и точность параметров Q-H.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Глобальное присутствие</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Поставки насосов в страны Европы, Америки, Азии и Ближнего Востока с сетью сервисных центров.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
