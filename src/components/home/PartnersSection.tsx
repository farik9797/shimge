import React from 'react';
import { BRANDS } from '../../data/equipmentData';
import { Award, ShieldCheck } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Официальный дистрибьютор и прямой импортер</span>
          </div>
          <span className="text-xs text-slate-400">
            Оригинальное оборудование с заводской гарантией и сертификатами
          </span>
        </div>

        {/* Logos / Brand badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {BRANDS.map((brand, idx) => (
            <div
              key={idx}
              className="h-16 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-slate-400 transition-all flex items-center justify-center p-3 group cursor-default"
            >
              <span className="text-sm font-black tracking-wider text-slate-600 group-hover:text-slate-900 group-hover:scale-105 transition-all">
                {brand}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
