import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/equipmentData';
import { 
  X, 
  Gauge, 
  Activity, 
  Droplets, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  Check,
  Plus
} from 'lucide-react';
import { Product } from '../../types';

export const PumpSelectorModal: React.FC = () => {
  const { isPumpSelectorOpen, setIsPumpSelectorOpen, setSelectedProduct, openRfqModal, addToCart, cart } = useApp();
  
  const [requiredFlow, setRequiredFlow] = useState<number>(16); // m3/h
  const [requiredHead, setRequiredHead] = useState<number>(85); // m

  if (!isPumpSelectorOpen) return null;

  // Algorithm to find matched SHIMGE pumps
  const matches = PRODUCTS.filter(p => {
    const isFlowSuitable = p.flowRate >= requiredFlow * 0.75;
    const isHeadSuitable = p.headMeters >= requiredHead * 0.85;
    return isFlowSuitable && isHeadSuitable;
  }).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Light Modal Header */}
        <div className="bg-slate-50 text-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#005CB9] flex items-center justify-center">
              <Gauge className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">SHIMGE nasoslarini ishchi nuqta bo'yicha tanlash</h3>
              <p className="text-[11px] text-slate-500">Q suv sarfi (m³/soat) va H bosim (metr) bo'yicha aniq mos keluvchi model</p>
            </div>
          </div>

          <button
            onClick={() => setIsPumpSelectorOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Sliders Input in Light Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            {/* Flow Q */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Talab qilinadigan suv sarfi (Q):</span>
                <span className="font-mono font-black text-sm text-[#005CB9]">{requiredFlow} m³/soat</span>
              </div>
              <input
                type="range"
                min="1"
                max="60"
                step="1"
                value={requiredFlow}
                onChange={(e) => setRequiredFlow(Number(e.target.value))}
                className="w-full accent-[#005CB9] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 m³/soat (xususiy uy)</span>
                <span>30 m³/soat</span>
                <span>60 m³/soat (sanoat)</span>
              </div>
            </div>

            {/* Head H */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Talab qilinadigan bosim (H):</span>
                <span className="font-mono font-black text-sm text-[#005CB9]">{requiredHead} m (~{(requiredHead / 10).toFixed(1)} bar)</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={requiredHead}
                onChange={(e) => setRequiredHead(Number(e.target.value))}
                className="w-full accent-[#005CB9] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10 m (1 bar)</span>
                <span>100 m (10 bar)</span>
                <span>200 m (20 bar)</span>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>Parametrlarga mos keluvchi modellar: <strong>{matches.length}</strong></span>
              <span className="text-emerald-700 font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00A859]" />
                <span>BEP maksimal FIK zonasida</span>
              </span>
            </div>

            {matches.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                Ushbu parametrlar bo'yicha mos model topilmadi. Qiymatlarni o'zgartirib ko'ring.
              </div>
            ) : (
              <div className="space-y-3">
                {matches.map((product) => {
                  const isAlreadyInCart = cart.some(item => item.product.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className="p-4 bg-white hover:bg-blue-50/30 border border-slate-200 hover:border-[#005CB9] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-2xs"
                    >
                      <div className="flex items-center space-x-3.5">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-slate-50 flex-shrink-0"
                        />
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-[10px] font-bold uppercase bg-blue-100 text-[#005CB9] px-2 py-0.5 rounded">
                              {product.series}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-500">{product.sku}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                            {product.name}
                          </h4>
                          <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap gap-x-3">
                            <span>Maksimal H: <strong className="text-slate-800">{product.headMeters} m</strong></span>
                            <span>Maksimal Q: <strong className="text-slate-800">{product.flowRate} m³/s</strong></span>
                            <span>Quvvat: <strong className="text-slate-800">{product.powerKw} kVt</strong></span>
                            <span className="text-[#005CB9] font-bold">{product.estimatedPrice}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setIsPumpSelectorOpen(false);
                            setSelectedProduct(product);
                          }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                        >
                          Xususiyatlar
                        </button>
                        
                        <button
                          onClick={() => addToCart(product)}
                          className={`p-2 rounded-xl border transition-colors ${
                            isAlreadyInCart
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                          title="Savatga qo'shish"
                        >
                          {isAlreadyInCart ? <Check className="w-4 h-4 text-[#00A859]" /> : <Plus className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => {
                            setIsPumpSelectorOpen(false);
                            openRfqModal(product);
                          }}
                          className="px-4 py-2 bg-[#005CB9] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center space-x-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Narx olish</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
