import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Gauge, ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../../data/equipmentData';

export const PumpCurveCalculatorSection: React.FC = () => {
  const { setSelectedProduct, openRfqModal, selectCategory } = useApp();
  const [qValue, setQValue] = useState<number>(16);
  const [hValue, setHValue] = useState<number>(75);

  const matched = PRODUCTS.filter(p => p.flowRate >= qValue * 0.7 && p.headMeters >= hValue * 0.8).slice(0, 2);

  return (
    <section className="py-12 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Input sliders */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-[#005CB9] px-3 py-1 rounded-full text-xs font-bold">
                <Gauge className="w-4 h-4" />
                <span>Tezkor muhandislik kalkulyatori</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Ishchi nuqta (Q suv sarfi & H bosim) bo'yicha nasos tanlash
              </h3>

              <p className="text-xs text-slate-500">
                Kerakli suv sarfi va bosim balandligini kiriting. Algoritm optimal samaradorlikka (BEP) ega SHIMGE nasosini topib beradi.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Flow Q */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-600">Suv sarfi (Q):</span>
                    <span className="font-mono font-bold text-sm text-[#005CB9]">{qValue} m³/soat</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={qValue}
                    onChange={(e) => setQValue(Number(e.target.value))}
                    className="w-full accent-[#005CB9] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1 m³/soat</span>
                    <span>50 m³/soat</span>
                  </div>
                </div>

                {/* Head H */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-600">Bosim balandligi (H):</span>
                    <span className="font-mono font-bold text-sm text-[#005CB9]">{hValue} metr</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="180"
                    step="5"
                    value={hValue}
                    onChange={(e) => setHValue(Number(e.target.value))}
                    className="w-full accent-[#005CB9] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>5 m</span>
                    <span>180 m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Matched Pump Cards */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Tavsiya etilgan SHIMGE nasoslari:</span>
                <span className="text-emerald-700 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00A859]" />
                  <span>100% mos keladi</span>
                </span>
              </div>

              <div className="space-y-3">
                {matched.map((pump) => (
                  <div
                    key={pump.id}
                    className="p-3.5 bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#005CB9] rounded-2xl flex items-center justify-between gap-3 transition-all shadow-2xs hover:shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={pump.image}
                        alt={pump.name}
                        className="w-14 h-14 object-cover rounded-xl bg-white border border-slate-200 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold uppercase bg-blue-100 text-[#005CB9] px-2 py-0.5 rounded">
                            {pump.series}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-500">{pump.sku}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">
                          {pump.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          H: <strong className="text-slate-800">{pump.headMeters} m</strong> • Q: <strong className="text-slate-800">{pump.flowRate} m³/soat</strong> • <strong className="text-[#005CB9]">{pump.estimatedPrice}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedProduct(pump)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition-colors"
                      >
                        Parametrlar
                      </button>
                      <button
                        onClick={() => openRfqModal(pump)}
                        className="px-3.5 py-1.5 bg-[#005CB9] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-2xs flex items-center space-x-1 transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        <span>Narx</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
