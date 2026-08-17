import React from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_SERVICES } from '../../data/mockData';
import { Compass, Wrench, ShieldCheck, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />
};

export const ServicesSection: React.FC = () => {
  const { setRoute, formatPrice, setIsCallbackOpen } = useApp();

  return (
    <section className="bg-slate-900 text-white py-16 px-4 my-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-1">
              Проектный отдел mzvuk.by
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Услуги и системная интеграция
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Выполняем полный комплекс работ по оснащению объектов любого масштаба профессиональным звуком по Беларуси.
            </p>
          </div>

          <button
            onClick={() => setRoute('services')}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2 transition-colors shrink-0"
          >
            Все услуги <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_SERVICES.map(srv => (
            <div
              key={srv.id}
              className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 hover:border-orange-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {SERVICE_ICONS[srv.iconName] || <Wrench className="w-6 h-6" />}
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">{srv.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{srv.shortDesc}</p>

                <ul className="space-y-1.5 mb-6 text-xs text-slate-400">
                  {srv.features.slice(0, 2).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Стоимость от</span>
                  <span className="text-sm font-extrabold text-orange-400">{formatPrice(srv.priceStartBYN)}</span>
                </div>
                <button
                  onClick={() => setIsCallbackOpen(true)}
                  className="px-3 py-1.5 bg-slate-700 hover:bg-orange-600 text-white font-bold rounded-lg text-xs transition-colors"
                >
                  Заказать
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
