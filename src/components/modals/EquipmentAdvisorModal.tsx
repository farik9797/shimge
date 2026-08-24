import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  SlidersHorizontal, 
  Droplet, 
  Wind, 
  Filter, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Send
} from 'lucide-react';
import { CategoryType } from '../../types';
import { PRODUCTS } from '../../data/equipmentData';

export const EquipmentAdvisorModal: React.FC = () => {
  const { isAdvisorOpen, setIsAdvisorOpen, selectCategory, setSelectedProduct, openRfqModal } = useApp();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDirection, setSelectedDirection] = useState<CategoryType>('pumps');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('food');
  const [powerNeed, setPowerNeed] = useState<string>('mid');
  const [pressureNeed, setPressureNeed] = useState<string>('10');

  if (!isAdvisorOpen) return null;

  const handleReset = () => {
    setStep(1);
    setIsAdvisorOpen(false);
  };

  const getMatchedProducts = () => {
    return PRODUCTS.filter(p => p.category === selectedDirection).slice(0, 2);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <SlidersHorizontal className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">Инженерный онлайн-подбор оборудования</h3>
              <p className="text-xs text-slate-400">Шаг {step} из 3: расчет параметров под ваши производственные задачи</p>
            </div>
          </div>
          <button onClick={handleReset} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: DIRECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  1. Какое направление оборудования необходимо подобрать?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Выберите требуемый технологический узел для вашего объекта
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setSelectedDirection('pumps')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedDirection === 'pumps'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Droplet className={`w-6 h-6 mb-2 ${selectedDirection === 'pumps' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <h5 className="text-sm font-bold text-slate-900">Насосы</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Повышение давления, циркуляция, скважины, химические и пищевые среды
                  </p>
                </div>

                <div
                  onClick={() => setSelectedDirection('compressors')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedDirection === 'compressors'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Wind className={`w-6 h-6 mb-2 ${selectedDirection === 'compressors' ? 'text-amber-500' : 'text-slate-400'}`} />
                  <h5 className="text-sm font-bold text-slate-900">Компрессоры</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Винтовые станции, осушители, питание ЧПУ и пневмоинструмента
                  </p>
                </div>

                <div
                  onClick={() => setSelectedDirection('water-treatment')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedDirection === 'water-treatment'
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Filter className={`w-6 h-6 mb-2 ${selectedDirection === 'water-treatment' ? 'text-cyan-500' : 'text-slate-400'}`} />
                  <h5 className="text-sm font-bold text-slate-900">Водоочистка</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Обратный осмос, умягчение, фильтрация для котельных и цехов
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center space-x-1.5 transition-colors"
                >
                  <span>Далее: Отрасль и параметры</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: INDUSTRY & PARAMETERS */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  2. Отрасль применения и расчетная нагрузка
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Уточните сферу и требуемый масштаб производительности
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Отрасль предприятия:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'food', label: 'Пищевое производство' },
                    { id: 'furniture', label: 'Мебельная фабрика / дерево' },
                    { id: 'apk', label: 'АПК и сельское хозяйство' },
                    { id: 'construction', label: 'Строительство и ЖКХ' },
                  ].map((ind) => (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => setSelectedIndustry(ind.id)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold text-left border transition-all ${
                        selectedIndustry === ind.id
                          ? 'border-blue-600 bg-blue-50 text-blue-800'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {ind.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Требуемая мощность привода:
                  </label>
                  <select
                    value={powerNeed}
                    onChange={(e) => setPowerNeed(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="low">До 7.5 кВт (компактные линии)</option>
                    <option value="mid">11 – 37 кВт (среднее производство)</option>
                    <option value="high">45 – 110 кВт (тяжелая нагрузка 24/7)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Рабочее давление / напор:
                  </label>
                  <select
                    value={pressureNeed}
                    onChange={(e) => setPressureNeed(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="6">До 6–8 бар (стандарт)</option>
                    <option value="10">8 – 12 бар (высокое)</option>
                    <option value="25">16 – 25+ бар (экстремальное)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-slate-600 hover:text-slate-900 text-xs font-bold flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Назад</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center space-x-1.5 transition-colors"
                >
                  <span>Рассчитать подбор</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: RESULTS */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
                <h4 className="text-base font-bold text-slate-900">
                  Подобрано 2 оптимальных решения под ваши параметры:
                </h4>
              </div>

              <div className="space-y-3">
                {getMatchedProducts().map(prod => (
                  <div 
                    key={prod.id} 
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={prod.image} alt={prod.name} className="w-14 h-14 object-cover rounded-lg bg-white border border-slate-200" />
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{prod.sku}</span>
                        <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{prod.name}</h5>
                        <p className="text-[11px] text-slate-500">{prod.brand} • {prod.powerKw} кВт • {prod.estimatedPrice}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setIsAdvisorOpen(false);
                          setSelectedProduct(prod);
                        }}
                        className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300"
                      >
                        ТТХ
                      </button>
                      <button
                        onClick={() => {
                          setIsAdvisorOpen(false);
                          openRfqModal(prod);
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>КП</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                Инженер Stitch может рассчитать полную схему с учетом гидравлических потерь в ваших трубопроводах.
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => setStep(2)}
                  className="text-slate-600 hover:text-slate-900 text-xs font-bold flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Изменить параметры</span>
                </button>
                <button
                  onClick={() => {
                    selectCategory(selectedDirection);
                    setIsAdvisorOpen(false);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors"
                >
                  Смотреть все модели раздела
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
