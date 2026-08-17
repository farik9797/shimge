import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Award, ShieldCheck, Users, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setRoute } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in space-y-12">
      {/* Hero Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-slate-800">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            О компании mzvuk.by
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            ООО «Арт-Медиа Трейд» — Интегратор звуковых систем в Беларуси
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            С 2014 года наша компания поставляет профессиональное звуковое, трансляционное и студийное оборудование для концертных залов, ресторанов, спортивных комплексов и учебных заведений Республики Беларусь.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { number: '12+ лет', label: 'Успешного опыта на рынке РБ' },
          { number: '1500+', label: 'Реализованных проектов' },
          { number: '50+ брендов', label: 'Официальные поставки' },
          { number: '100% НДС', label: 'Работаем с Юридическими лицами' },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-1 shadow-sm">
            <span className="text-3xl font-black text-orange-600 block">{stat.number}</span>
            <span className="text-xs text-slate-600 font-semibold">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* History & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Наша миссия и ценности</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Мы стремимся обеспечивать белорусский рынок самым качественным аудиооборудованием мировых брендов, предлагая честные цены с НДС, гарантийную поддержку и безупречный инженерный сервис.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Прямые поставки от дистрибьюторов Yamaha, Shure, JBL, Sennheiser</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Собственная база монтажников и сертифицированных инженеров</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Собственный сервисный центр по ремонту звукового оборудования в Минске</span>
            </li>
          </ul>
        </div>

        {/* Company Requisites Card */}
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-600 text-white rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Юридические реквизиты</h3>
              <p className="text-xs text-slate-500">Для заключения договоров поставки</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-500">Наименование:</span>
              <span className="font-bold">ООО «Арт-Медиа Трейд»</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">УНП:</span>
              <span className="font-bold">193...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Адрес:</span>
              <span className="font-bold">г. Минск, Республика Беларусь</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Телефон:</span>
              <span className="font-bold text-orange-600">+375 (33) 377-28-73</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email:</span>
              <span className="font-bold">sales@mzvuk.by</span>
            </div>
          </div>

          <button
            onClick={() => setRoute('certificates')}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
          >
            Сертификаты и дилерские письма <ArrowRight className="w-4 h-4 text-orange-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
