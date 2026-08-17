import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_SERVICES } from '../../data/mockData';
import { Compass, Wrench, ShieldCheck, Calendar, CheckCircle2, ArrowRight, Send, Phone } from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-8 h-8" />,
  Wrench: <Wrench className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  Calendar: <Calendar className="w-8 h-8" />
};

export const ServicesPage: React.FC = () => {
  const { formatPrice, setIsCallbackOpen, showNotification } = useApp();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
          Проектно-инсталляционный отдел ООО «Арт-Медиа Трейд»
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Услуги по акустическому проектированию и монтажу
        </h1>
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
          Мы разрабатываем и реализуем проекты акустического оснащения любой сложности для коммерческих, государственных и частных объектов по Беларуси.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_SERVICES.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl w-fit">
                {SERVICE_ICONS[service.iconName] || <Wrench className="w-8 h-8" />}
              </div>

              <h2 className="text-xl font-bold text-slate-900">{service.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{service.fullDesc}</p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-900 block">Что входит в услугу:</span>
                <ul className="space-y-2 text-xs text-slate-600">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Стоимость</span>
                <span className="text-lg font-black text-slate-900">от {formatPrice(service.priceStartBYN)}</span>
              </div>

              <button
                onClick={() => setIsCallbackOpen(true)}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-2 transition-all"
              >
                <Phone className="w-3.5 h-3.5" /> Заказать услугу
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
