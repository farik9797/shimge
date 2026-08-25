import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Share2, 
  ShieldCheck, 
  Check, 
  Plus, 
  Send, 
  Download, 
  FileText, 
  CheckCircle2, 
  Zap, 
  Activity, 
  Gauge, 
  Sparkles,
  Layers
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, openRfqModal, cart, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'specs' | 'qh' | 'drawings' | 'docs'>('specs');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!selectedProduct) return null;

  const isAlreadyInCart = cart.some(item => item.product.id === selectedProduct.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Ссылка на товар скопирована в буфер обмена');
    }
  };

  const allPhotos = selectedProduct.gallery && selectedProduct.gallery.length > 0 
    ? [selectedProduct.image, ...selectedProduct.gallery]
    : [selectedProduct.image];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="bg-white px-6 py-3.5 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-black uppercase tracking-wider bg-[#0096A6] text-white px-2.5 py-1 rounded-lg">
              SHIMGE • {selectedProduct.series}
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">
              {selectedProduct.sku}
            </span>
            <span className="hidden sm:inline text-xs text-slate-400">|</span>
            <span className="hidden sm:inline text-xs text-slate-500 font-medium">
              {selectedProduct.categoryName}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              title="Поделиться карточкой товара"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              title="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Info 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Product Images & Quality Badges */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative bg-slate-50 border border-slate-200 rounded-3xl p-6 flex items-center justify-center h-80 overflow-hidden shadow-2xs">
                {selectedProduct.inStock && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center space-x-1.5 shadow-2xs z-10">
                    <span className="w-2 h-2 rounded-full bg-[#00A859] animate-pulse" />
                    <span>В наличии на складе ({selectedProduct.stockCount || 14} шт.)</span>
                  </div>
                )}

                <img
                  src={allPhotos[selectedPhotoIndex] || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Gallery Thumbs */}
              {allPhotos.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {allPhotos.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`w-16 h-16 rounded-xl border p-1 bg-slate-50 flex-shrink-0 transition-all ${
                        selectedPhotoIndex === idx ? 'border-[#0096A6] ring-2 ring-[#0096A6]/20' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality Badges Row */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl">
                  <ShieldCheck className="w-4 h-4 text-[#00A859] mx-auto mb-1" />
                  <span className="font-bold text-slate-800 block text-[11px]">Завод</span>
                  <span className="text-[10px] text-slate-400">Гарантия 100%</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl">
                  <Activity className="w-4 h-4 text-[#0096A6] mx-auto mb-1" />
                  <span className="font-bold text-slate-800 block text-[11px]">IE3</span>
                  <span className="text-[10px] text-slate-400">Энергосбережение</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl">
                  <Sparkles className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                  <span className="font-bold text-slate-800 block text-[11px]">O'zStandart</span>
                  <span className="text-[10px] text-slate-400">Сертификат</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Specs & Pricing Actions */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {selectedProduct.name}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedProduct.subCategory} • Серия: <strong className="text-[#0096A6]">{selectedProduct.series}</strong> • Производитель: <strong>SHIMGE Pump Industry</strong>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* 4 Key Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-[#EBF8F9] border border-[#B5E7EC] p-3 rounded-2xl text-center">
                  <span className="text-[10px] text-[#007682] font-bold block uppercase tracking-tight">Напор H (макс)</span>
                  <span className="text-xl font-black text-[#0096A6]">{selectedProduct.headMeters} м</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-tight">Подача Q (макс)</span>
                  <span className="text-xl font-black text-slate-900">{selectedProduct.flowRate} м³/ч</span>
                </div>

                <div className="bg-amber-50/60 border border-amber-200 p-3 rounded-2xl text-center">
                  <span className="text-[10px] text-amber-800 font-bold block uppercase tracking-tight">Мощность P2</span>
                  <span className="text-xl font-black text-slate-900">{selectedProduct.powerKw} кВт</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-tight">Защита</span>
                  <span className="text-xl font-black text-slate-900">{selectedProduct.protectionClass}</span>
                </div>
              </div>

              {/* Price & Primary CTAs (Исправленная компоновка кнопок в одну линию без переносов) */}
              <div className="pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  
                  {/* Price */}
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                      Оптовая цена (с НДС):
                    </span>
                    <span className="text-2xl font-black text-[#0096A6] block leading-tight">
                      {selectedProduct.estimatedPrice || 'По запросу'}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      дилерские скидки при оптовом заказе
                    </span>
                  </div>

                  {/* Actions Buttons: Строго горизонтальный ряд с аккуратными отступами */}
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    
                    {/* Кнопка в спецификацию */}
                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className={`h-11 px-5 rounded-xl font-bold text-xs border transition-all flex items-center justify-center space-x-2 whitespace-nowrap ${
                        isAlreadyInCart
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                          : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-2xs hover:border-slate-400'
                      }`}
                    >
                      {isAlreadyInCart ? (
                        <Check className="w-4 h-4 text-[#00A859] flex-shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#0096A6] flex-shrink-0" />
                      )}
                      <span>{isAlreadyInCart ? 'В спецификации' : 'В спецификацию'}</span>
                    </button>

                    {/* Кнопка Запросить КП */}
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        openRfqModal(selectedProduct);
                      }}
                      className="h-11 px-6 bg-[#0096A6] hover:bg-[#007682] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
                    >
                      <Send className="w-4 h-4 flex-shrink-0" />
                      <span>Запросить КП</span>
                    </button>

                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Bottom Tabs */}
          <div className="border-t border-slate-200 pt-4">
            <div className="flex space-x-4 border-b border-slate-200 text-xs overflow-x-auto">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 font-bold whitespace-nowrap transition-colors ${
                  activeTab === 'specs'
                    ? 'text-[#0096A6] border-b-2 border-[#0096A6]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Технические характеристики
              </button>
              <button
                onClick={() => setActiveTab('qh')}
                className={`pb-3 font-bold whitespace-nowrap transition-colors ${
                  activeTab === 'qh'
                    ? 'text-[#0096A6] border-b-2 border-[#0096A6]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Гидравлический график (Q-H)
              </button>
              <button
                onClick={() => setActiveTab('drawings')}
                className={`pb-3 font-bold whitespace-nowrap transition-colors ${
                  activeTab === 'drawings'
                    ? 'text-[#0096A6] border-b-2 border-[#0096A6]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Чертежи и габариты
              </button>
              <button
                onClick={() => setActiveTab('docs')}
                className={`pb-3 font-bold whitespace-nowrap transition-colors ${
                  activeTab === 'docs'
                    ? 'text-[#0096A6] border-b-2 border-[#0096A6]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Документация и сертификаты
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-4">
              
              {/* Tab 1: Specs Table */}
              {activeTab === 'specs' && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="bg-white">
                        <td className="py-2.5 px-4 text-slate-500 font-semibold w-1/2">Номинальная подача (Q)</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{selectedProduct.flowRate} м³/ч</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-500 font-semibold">Номинальный напор (H)</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{selectedProduct.headMeters} м</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="py-2.5 px-4 text-slate-500 font-semibold">Мощность электродвигателя (P2)</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{selectedProduct.powerKw} кВт</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-500 font-semibold">Материал проточной части</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{selectedProduct.casingMaterial}</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="py-2.5 px-4 text-slate-500 font-semibold">Материал рабочего колеса</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{selectedProduct.impellerMaterial}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-500 font-semibold">Температура перекачиваемой жидкости</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{selectedProduct.liquidTempRange}</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="py-2.5 px-4 text-slate-500 font-semibold">Класс защиты двигателя</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{selectedProduct.protectionClass}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-slate-500 font-semibold">Класс изоляции</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{selectedProduct.isolationClass}</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="py-2.5 px-4 text-slate-500 font-semibold">Диаметр патрубков (вход/выход)</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{selectedProduct.pipeDiameterInch || 'DN50 (2")'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 2: Hydraulic Q-H Curve */}
              {activeTab === 'qh' && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Гидравлическая рабочая кривая Q [м³/ч] - H [м]
                    </span>
                    <span className="text-[11px] font-bold text-[#007682] bg-[#EBF8F9] border border-[#B5E7EC] px-3 py-1 rounded-full">
                      Номинал: {selectedProduct.flowRate} м³/ч при {selectedProduct.headMeters} м
                    </span>
                  </div>

                  {/* SVG Diagram */}
                  <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
                    <svg viewBox="0 0 500 160" className="w-full h-44">
                      {/* Grid Lines */}
                      <line x1="40" y1="20" x2="480" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <line x1="40" y1="60" x2="480" y2="60" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <line x1="40" y1="100" x2="480" y2="100" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <line x1="40" y1="140" x2="480" y2="140" stroke="#94A3B8" />
                      <line x1="40" y1="20" x2="40" y2="140" stroke="#94A3B8" />

                      {/* Smooth Hydraulic Q-H Curve */}
                      <path
                        d="M 40 30 Q 240 60, 480 135"
                        fill="none"
                        stroke="#0096A6"
                        strokeWidth="3.5"
                      />

                      {/* Operating Point */}
                      <circle cx="260" cy="72" r="6" fill="#0096A6" stroke="#FFFFFF" strokeWidth="2" />
                      <text x="270" y="70" fill="#007682" fontSize="11" fontWeight="bold">
                        Рабочая точка (H={selectedProduct.headMeters}м, Q={selectedProduct.flowRate}м³/ч)
                      </text>

                      {/* Axis Labels */}
                      <text x="15" y="25" fill="#64748B" fontSize="10" fontWeight="bold">H (м)</text>
                      <text x="450" y="155" fill="#64748B" fontSize="10" fontWeight="bold">Q (м³/ч)</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* Tab 3: Drawings */}
              {activeTab === 'drawings' && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-4">
                  <Layers className="w-10 h-10 text-[#0096A6] mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">
                    Габаритный и монтажный чертеж SHIMGE {selectedProduct.sku}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Чертежи для проектировщиков и монтажных организаций в форматах DWG / STEP / PDF.
                  </p>
                  <button
                    onClick={() => showToast('Файл чертежей DWG загружен')}
                    className="inline-flex items-center space-x-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-5 py-2.5 rounded-xl text-xs font-bold shadow-2xs"
                  >
                    <Download className="w-4 h-4 text-[#0096A6]" />
                    <span>Скачать габаритный чертеж (DWG/PDF)</span>
                  </button>
                </div>
              )}

              {/* Tab 4: Docs */}
              {activeTab === 'docs' && (
                <div className="space-y-2.5">
                  {[
                    { name: 'Руководство по эксплуатации и паспорт SHIMGE', size: '4.2 МБ', type: 'PDF' },
                    { name: 'Сертификат соответствия O\'zStandart', size: '1.1 МБ', type: 'PDF' },
                    { name: 'Сертификат ISO 9001 / ISO 14001 / CE', size: '890 КБ', type: 'PDF' }
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between hover:bg-white transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-[#0096A6]" />
                        <div>
                          <span className="font-bold text-slate-800 text-xs block">{doc.name}</span>
                          <span className="text-[10px] text-slate-400">{doc.size} • {doc.type}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => showToast(`Документ «${doc.name}» загружен`)}
                        className="p-2 text-slate-600 hover:text-[#0096A6] hover:bg-[#EBF8F9] rounded-xl border border-slate-200"
                        title="Скачать"
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
