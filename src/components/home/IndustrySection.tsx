import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Wheat, 
  Utensils, 
  Armchair, 
  ArrowRight, 
  CheckCircle2, 
  Send,
  Factory
} from 'lucide-react';
import { INDUSTRY_SOLUTIONS } from '../../data/equipmentData';

export const IndustrySection: React.FC = () => {
  const { setActiveTab, setSelectedIndustryId, openRfqModal } = useApp();
  const [activeIndIndex, setActiveIndIndex] = useState(0);

  const currentIndustry = INDUSTRY_SOLUTIONS[activeIndIndex];

  const iconsMap = {
    apk: Wheat,
    food: Utensils,
    furniture: Armchair,
    construction: Building2
  };

  const handleDeepDive = (id: 'apk' | 'food' | 'furniture' | 'construction') => {
    setSelectedIndustryId(id);
    setActiveTab('industries');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            <Factory className="w-4 h-4" />
            <span>Инженерные компетенции</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Отраслевые решения и типовые спецификации
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Учитываем отраслевые стандарты (ХАССП, ГОСТ, ТР ТС) и особенности технологических циклов каждого производства.
          </p>
        </div>

        {/* Industry Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {INDUSTRY_SOLUTIONS.map((ind, idx) => {
            const Icon = iconsMap[ind.id] || Factory;
            const isSelected = activeIndIndex === idx;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveIndIndex(idx)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-slate-500'}`} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Info & Challenges */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Отраслевой профиль
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {currentIndustry.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentIndustry.description}
              </p>

              {/* Challenges solved */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Ключевые инженерные задачи:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentIndustry.challenges.map((ch, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleDeepDive(currentIndustry.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Посмотреть типовые комплекты</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => openRfqModal()}
                  className="bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-lg border border-slate-300 transition-colors flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-orange-500" />
                  <span>Запросить расчет под проект</span>
                </button>
              </div>

            </div>

            {/* Right: Real Case Study Thumbnail */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 relative">
                <div className="relative h-44 rounded-lg overflow-hidden mb-3">
                  <img
                    src={currentIndustry.image}
                    alt={currentIndustry.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Реализованный кейс
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="font-bold text-slate-900">{currentIndustry.caseStudy.client}</span>
                    <span>{currentIndustry.caseStudy.location}</span>
                  </div>
                  <p className="text-slate-600 font-medium line-clamp-2">
                    <strong className="text-slate-800">Решение:</strong> {currentIndustry.caseStudy.solution}
                  </p>
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded font-semibold text-[11px] mt-2 border border-emerald-200">
                    🏆 Результат: {currentIndustry.caseStudy.result}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
