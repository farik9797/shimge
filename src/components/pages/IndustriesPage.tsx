import React from 'react';
import { useApp } from '../../context/AppContext';
import { SHIMGE_INDUSTRY_SOLUTIONS, PRODUCTS } from '../../data/equipmentData';
import { 
  Factory, 
  Wheat, 
  Building2, 
  Droplets, 
  Flame, 
  CheckCircle2, 
  Send
} from 'lucide-react';
import { ProductCard } from '../common/ProductCard';

export const IndustriesPage: React.FC = () => {
  const { selectedIndustryId, setSelectedIndustryId, openRfqModal } = useApp();

  const currentIndustry = SHIMGE_INDUSTRY_SOLUTIONS.find(i => i.id === selectedIndustryId) || SHIMGE_INDUSTRY_SOLUTIONS[0];

  const iconsMap = {
    'water-supply': Building2,
    agriculture: Wheat,
    sewage: Droplets,
    hvac: Flame,
    industry: Factory
  };

  const recommendedProducts = PRODUCTS.filter(p => 
    currentIndustry.recommendedProductIds.includes(p.id)
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Light Header */}
      <div className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider mb-2 bg-[#EBF8F9] px-3 py-1 rounded-full border border-[#B5E7EC]">
            <Factory className="w-4 h-4 text-[#0096A6]" />
            <span>Отраслевые решения</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Насосные решения SHIMGE для промышленности и агросектора Узбекистана
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Готовые насосные узлы для капельного орошения, жилых комплексов, котельных и канализационных станций КНС.
          </p>
        </div>
      </div>

      {/* Industry Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-18 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex space-x-3 overflow-x-auto">
          {SHIMGE_INDUSTRY_SOLUTIONS.map((ind) => {
            const Icon = iconsMap[ind.id] || Factory;
            const isSelected = ind.id === currentIndustry.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustryId(ind.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#0096A6] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-[#EBF8F9] hover:text-[#0096A6]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Industry Hero Detail */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0096A6]">
                Спецификация применения
              </span>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                {currentIndustry.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentIndustry.description}
              </p>

              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Инженерные задачи, решаемые насосами SHIMGE:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentIndustry.challenges.map((ch, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#00A859] flex-shrink-0 mt-0.5" />
                      <span>{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => openRfqModal()}
                  className="bg-[#0096A6] hover:bg-[#007682] text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-xs transition-all flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Запросить проектный расчет оборудования</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <img
                  src={currentIndustry.image}
                  alt={currentIndustry.name}
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Real Case Study */}
        <div className="bg-gradient-to-r from-[#EBF8F9] via-white to-emerald-50 border border-[#B5E7EC] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0096A6]">
              Реализованный объект
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <h3 className="text-xl font-bold text-slate-900">
                {currentIndustry.caseStudy.client} ({currentIndustry.caseStudy.location})
              </h3>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
                Безаварийная эксплуатация
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
              <div className="space-y-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Задача:</span>
                <p className="text-slate-700">{currentIndustry.caseStudy.task}</p>
              </div>
              <div className="space-y-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">Поставлено:</span>
                <p className="text-slate-700">{currentIndustry.caseStudy.solution}</p>
              </div>
              <div className="space-y-1 bg-[#EBF8F9] p-4 rounded-2xl border border-[#B5E7EC] text-[#007682] font-bold">
                <span className="text-[#0096A6] font-semibold block uppercase text-[10px]">Эффект:</span>
                <p>{currentIndustry.caseStudy.result}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0096A6]">
                Складские модели
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Рекомендованное оборудование SHIMGE в наличии
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} mode="grid" />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
