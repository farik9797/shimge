import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle, 
  Clock, 
  FileText, 
  Download, 
  Send, 
  Plus, 
  Check, 
  ShieldCheck, 
  Activity,
  Layers, 
  Cpu, 
  Share2,
  TrendingUp
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, openRfqModal, cart, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'specs' | 'qh' | 'drawings' | 'docs'>('specs');

  if (!selectedProduct) return null;

  const isAlreadyInCart = cart.some(item => item.product.id === selectedProduct.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Ссылка скопирована в буфер обмена');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Clean Light Modal Header in Brand Teal */}
        <div className="bg-[#F0FAFA] text-slate-900 px-6 py-4 flex items-center justify-between border-b border-[#D4F1F4]">
          <div className="flex items-center space-x-3">
            <span className="bg-[#0096A6] text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-2xs">
              SHIMGE • {selectedProduct.series}
            </span>
            <span className="font-mono text-xs text-slate-500 font-bold">
              {selectedProduct.sku}
            </span>
            <span className="text-xs text-slate-400 hidden md:inline">
              | {selectedProduct.categoryName}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="Поделиться"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top Section: Photo & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Image Box */}
            <div className="lg:col-span-5 space-y-3">
              <div className="h-72 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center p-4 relative group">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
                <div className="absolute top-3 left-3">
                  {selectedProduct.inStock ? (
                    <span className="inline-flex items-center text-xs font-bold bg-white/95 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg shadow-2xs">
                      <CheckCircle className="w-3.5 h-3.5 mr-1 text-[#00A859]" />
                      В наличии на складе ({selectedProduct.stockCount || 10} шт.)
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      Под заказ ({selectedProduct.deliveryDays || 3} дн.)
                    </span>
                  )}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                <div>
                  <ShieldCheck className="w-4 h-4 text-[#0096A6] mx-auto" />
                  <span className="font-bold block text-slate-900">Завод</span>
                  <span>Гарантия 100%</span>
                </div>
                <div className="border-x border-slate-200">
                  <Activity className="w-4 h-4 text-emerald-600 mx-auto" />
                  <span className="font-bold block text-slate-900">IE3</span>
                  <span>Энергосбережение</span>
                </div>
                <div>
                  <Layers className="w-4 h-4 text-[#0096A6] mx-auto" />
                  <span className="font-bold block text-slate-900">O'zStandart</span>
                  <span>Сертификат</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Headline & Summary */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {selectedProduct.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {selectedProduct.subCategory} • Серия: <strong className="text-[#0096A6]">{selectedProduct.series}</strong> • Производитель: <strong>SHIMGE Pump Industry</strong>
                </p>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* 4 Main Parameters Box */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-[#EBF8F9] border border-[#B5E7EC] p-2.5 rounded-2xl text-center">
                    <span className="text-[10px] text-[#007682] font-bold block uppercase">Напор H (макс)</span>
                    <span className="text-lg font-black text-[#0096A6]">{selectedProduct.headMeters} м</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl text-center">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Подача Q (макс)</span>
                    <span className="text-lg font-black text-slate-900">{selectedProduct.flowRate} м³/ч</span>
                  </div>

                  <div className="bg-amber-50/70 border border-amber-200 p-2.5 rounded-2xl text-center">
                    <span className="text-[10px] text-amber-800 font-bold block uppercase">Мощность P2</span>
                    <span className="text-lg font-black text-slate-900">{selectedProduct.powerKw} кВт</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl text-center">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Защита</span>
                    <span className="text-lg font-black text-slate-900">{selectedProduct.protectionClass}</span>
                  </div>
                </div>
              </div>

              {/* Price & Primary CTAs */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Оптовая цена (с НДС):</span>
                  <span className="text-xl font-black text-[#0096A6]">
                    {selectedProduct.estimatedPrice || 'По запросу'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">дилерские скидки при оптовом заказе</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs border transition-colors flex items-center space-x-1.5 ${
                      isAlreadyInCart
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                    }`}
                  >
                    {isAlreadyInCart ? <Check className="w-4 h-4 text-[#00A859]" /> : <Plus className="w-4 h-4" />}
                    <span>{isAlreadyInCart ? 'В спецификации' : '+ В спецификацию'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      openRfqModal(selectedProduct);
                    }}
                    className="bg-[#0096A6] hover:bg-[#007682] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Запросить КП</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="border-t border-slate-200 pt-4">
            <div className="flex space-x-4 border-b border-slate-200 text-xs">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 font-bold transition-colors ${
                  activeTab === 'specs'
                    ? 'text-[#0096A6] border-b-2 border-[#0096A6]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Технические характеристики
              </button>
              <button
                onClick={() => setActiveTab('qh')}
                className={`pb-3 font-bold transition-colors ${
                  activeTab === 'qh'
                    ? 'text-[#0096A6] border-b-2 border-[#0096A6]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Гидравлический график (Q-H)
              </button>
              <button
                onClick={() => setActiveTab('drawings')}
                className={`pb-3 font-bold transition-colors ${
                  activeTab === 'drawings'
                    ? 'text-[#0096A6] border-b-2 border-[#0096A6]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Чертежи и габариты
              </button>
              <button
                onClick={() => setActiveTab('docs')}
                className={`pb-3 font-bold transition-colors ${
                  activeTab === 'docs'
                    ? 'text-[#0096A6] border-b-2 border-[#0096A6]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Паспорта и сертификаты
              </button>
            </div>

            <div className="py-4">
              
              {/* Tab 1: Specs Table */}
              {activeTab === 'specs' && (
                <div className="overflow-hidden border border-slate-200 rounded-2xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3">Технический параметр</th>
                        <th className="px-4 py-3">Значение</th>
                        <th className="px-4 py-3">Ед. изм.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="bg-white">
                        <td className="px-4 py-2.5 font-medium text-slate-700">Материал корпуса</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900">{selectedProduct.casingMaterial}</td>
                        <td className="px-4 py-2.5 text-slate-400">—</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="px-4 py-2.5 font-medium text-slate-700">Материал рабочего колеса</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900">{selectedProduct.impellerMaterial}</td>
                        <td className="px-4 py-2.5 text-slate-400">—</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-4 py-2.5 font-medium text-slate-700">Температура перекачиваемой среды</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900">{selectedProduct.liquidTempRange}</td>
                        <td className="px-4 py-2.5 text-slate-400">—</td>
                      </tr>
                      <tr className="bg-slate-50/60">
                        <td className="px-4 py-2.5 font-medium text-slate-700">Диаметр патрубков</td>
                        <td className="px-4 py-2.5 font-bold text-slate-900">{selectedProduct.pipeDiameterInch || 'Стандарт'}</td>
                        <td className="px-4 py-2.5 text-slate-400">—</td>
                      </tr>
                      {selectedProduct.specs.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                          <td className="px-4 py-2.5 font-medium text-slate-700">{spec.name}</td>
                          <td className="px-4 py-2.5 font-bold text-slate-900">{spec.value}</td>
                          <td className="px-4 py-2.5 text-slate-500">{spec.unit || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 2: Q-H Curve in Teal */}
              {activeTab === 'qh' && (
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-[#0096A6]" />
                        <span>Напорно-расходная характеристика (Q-H)</span>
                      </h4>
                      <p className="text-xs text-slate-500">График зависимости напора H (м) от производительности Q (м³/ч)</p>
                    </div>
                    <span className="text-xs bg-[#EBF8F9] text-[#0096A6] border border-[#B5E7EC] px-3 py-1 rounded-full font-mono font-bold">
                      n = 2900 об/мин (50 Гц)
                    </span>
                  </div>

                  <div className="h-56 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden shadow-2xs">
                    <div className="flex justify-between text-[10px] text-slate-400 border-b border-slate-100 pb-1">
                      <span>Напор H (м) ↑</span>
                      <span>Рабочая точка с максимальным КПД (BEP)</span>
                    </div>

                    <div className="relative flex-1 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                        <line x1="0" y1="30" x2="500" y2="30" stroke="#e2e8f0" strokeDasharray="4 4" />
                        <line x1="0" y1="60" x2="500" y2="60" stroke="#e2e8f0" strokeDasharray="4 4" />
                        <line x1="0" y1="90" x2="500" y2="90" stroke="#e2e8f0" strokeDasharray="4 4" />
                        
                        <path
                          d="M 10 20 Q 250 45 490 110"
                          fill="none"
                          stroke="#0096A6"
                          strokeWidth="3"
                        />
                        <circle cx="250" cy="45" r="5" fill="#00A859" />
                      </svg>
                      
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#0096A6] text-white text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold shadow-sm">
                        BEP: {selectedProduct.flowRate} м³/ч @ {selectedProduct.headMeters} м
                      </div>
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-1">
                      <span>0 м³/ч</span>
                      <span>Подача Q (м³/ч) →</span>
                      <span>{selectedProduct.flowRate * 1.5} м³/ч</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Drawings */}
              {activeTab === 'drawings' && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Габаритно-присоединительные размеры</h4>
                      <p className="text-[11px] text-slate-500">Фланцы DIN / ГОСТ, межцентровые расстояния и точки крепления</p>
                    </div>
                    <button
                      onClick={() => showToast('CAD-модель (STEP/DWG) подготовлена к скачиванию')}
                      className="bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Скачать STEP / DWG</span>
                    </button>
                  </div>

                  <div className="h-36 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-4 text-center">
                    <div className="space-y-1">
                      <Cpu className="w-7 h-7 text-[#0096A6] mx-auto" />
                      <p className="text-xs font-mono font-bold text-slate-800">
                        Патрубки: {selectedProduct.pipeDiameterInch || 'DN50'} | Исполнение двигателя: B35
                      </p>
                      <span className="text-[10px] text-slate-400 block">
                        3D-модель верифицирована инженерным департаментом SHIMGE
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Docs */}
              {activeTab === 'docs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(selectedProduct.documents || [
                    { title: 'Паспорт изделия и руководство по монтажу SHIMGE', size: '3.2 МБ', type: 'PDF' },
                    { title: 'Сертификат соответствия O\'zStandart / ЕАС', size: '1.4 МБ', type: 'PDF' }
                  ]).map((doc, idx) => (
                    <div 
                      key={idx}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between hover:bg-[#EBF8F9]/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{doc.title}</h5>
                          <span className="text-[11px] text-slate-500">{doc.type} • {doc.size}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => showToast(`Скачивание файла "${doc.title}"...`)}
                        className="p-2 text-slate-600 hover:text-[#0096A6] rounded-lg hover:bg-white transition-colors"
                        title="Скачать документ"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
