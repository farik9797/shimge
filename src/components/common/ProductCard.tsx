import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle, 
  Clock, 
  Plus, 
  Eye, 
  Send, 
  Gauge, 
  Zap, 
  Activity, 
  Check, 
  ShieldCheck
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  mode?: 'grid' | 'table';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, mode = 'grid' }) => {
  const { setSelectedProduct, addToCart, openRfqModal, cart } = useApp();

  const isAlreadyInCart = cart.some(item => item.product.id === product.id);

  if (mode === 'table') {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-[#0096A6] hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Photo & Title */}
        <div className="flex items-center space-x-4 w-full md:w-5/12">
          <div 
            onClick={() => setSelectedProduct(product)}
            className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border border-slate-100 p-1.5 flex items-center justify-center group"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-xs" 
            />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-[11px] mb-1">
              <span className="bg-[#EBF8F9] text-[#0096A6] font-bold px-2 py-0.5 rounded font-mono border border-[#B5E7EC]">
                {product.series}
              </span>
              <span className="font-mono text-slate-400 font-semibold">{product.sku}</span>
            </div>
            <h4 
              onClick={() => setSelectedProduct(product)}
              className="text-xs font-bold text-slate-900 hover:text-[#0096A6] cursor-pointer line-clamp-2 leading-snug"
            >
              {product.name}
            </h4>
            <div className="mt-1 flex items-center space-x-2">
              {product.inStock ? (
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-700">
                  <CheckCircle className="w-3 h-3 mr-1 text-[#00A859]" />
                  В наличии ({product.stockCount || 10} шт.)
                </span>
              ) : (
                <span className="inline-flex items-center text-[10px] font-medium text-amber-700">
                  <Clock className="w-3 h-3 mr-1" />
                  Под заказ ({product.deliveryDays || 3} дн.)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Middle: Key Parameters */}
        <div className="grid grid-cols-4 gap-2 text-xs w-full md:w-4/12 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold">Напор H</span>
            <span className="font-black text-[#0096A6] text-sm">{product.headMeters} м</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold">Подача Q</span>
            <span className="font-black text-slate-900 text-sm">{product.flowRate} м³/ч</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold">Мощность</span>
            <span className="font-bold text-slate-800">{product.powerKw} кВт</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold">Цена</span>
            <span className="font-bold text-emerald-700 truncate block text-[11px]">
              {product.estimatedPrice}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end space-x-2 w-full md:w-3/12">
          <button
            onClick={() => setSelectedProduct(product)}
            className="p-2 text-slate-600 hover:text-[#0096A6] hover:bg-[#EBF8F9] rounded-xl border border-slate-200 transition-colors"
            title="Характеристики и чертежи"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => addToCart(product)}
            className={`p-2 rounded-xl border transition-colors ${
              isAlreadyInCart
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Добавить в спецификацию"
          >
            {isAlreadyInCart ? <Check className="w-4 h-4 text-[#00A859]" /> : <Plus className="w-4 h-4" />}
          </button>

          <button
            onClick={() => openRfqModal(product)}
            className="bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center space-x-1"
          >
            <Send className="w-3 h-3" />
            <span>КП</span>
          </button>
        </div>
      </div>
    );
  }

  // Grid Mode (Modern elevated light card with brand teal & real photo)
  return (
    <div className="bg-white rounded-3xl border border-slate-200 hover:border-[#0096A6] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Media & Badges */}
      <div>
        <div 
          onClick={() => setSelectedProduct(product)}
          className="relative h-56 bg-slate-50/70 overflow-hidden cursor-pointer flex items-center justify-center p-4 border-b border-slate-100"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 filter drop-shadow-md"
          />

          {/* Series Badge */}
          <div className="absolute top-3.5 left-3.5">
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#0096A6] text-white px-2.5 py-1 rounded-lg shadow-2xs">
              {product.series}
            </span>
          </div>

          {/* Stock Indicator Badge */}
          <div className="absolute top-3.5 right-3.5">
            {product.inStock ? (
              <span className="inline-flex items-center text-[10px] font-bold bg-white/95 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] mr-1.5 animate-pulse" />
                В наличии ({product.stockCount || 10})
              </span>
            ) : (
              <span className="inline-flex items-center text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
                {product.deliveryDays} дн.
              </span>
            )}
          </div>

          {/* Quick Hover Tooltip */}
          <div className="absolute bottom-2.5 bg-white/90 backdrop-blur-xs text-[#0096A6] text-[10px] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>Подробнее / ТТХ</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>{product.sku}</span>
            <span className="text-slate-600 font-semibold">{product.subCategory}</span>
          </div>

          <h3 
            onClick={() => setSelectedProduct(product)}
            className="text-xs font-bold text-slate-900 hover:text-[#0096A6] cursor-pointer line-clamp-2 leading-snug min-h-[2rem]"
          >
            {product.name}
          </h3>

          {/* 4-Parameter Technical Spec Matrix */}
          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-xs">
            <div className="flex items-center space-x-2">
              <Gauge className="w-3.5 h-3.5 text-[#0096A6] flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Напор H:</span>
                <span className="font-black text-slate-900">{product.headMeters} м</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Activity className="w-3.5 h-3.5 text-[#00A859] flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Подача Q:</span>
                <span className="font-black text-slate-900">{product.flowRate} м³/ч</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Мощность:</span>
                <span className="font-bold text-slate-800">{product.powerKw} кВт</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0096A6] flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Корпус:</span>
                <span className="font-bold text-slate-800 truncate block text-[10px]">
                  {product.casingMaterial.includes('AISI') ? 'AISI 304' : 'Чугун'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[9px] text-slate-400 block uppercase font-bold">Оптовая цена</span>
          <span className="text-xs font-black text-[#0096A6]">{product.estimatedPrice || 'По запросу'}</span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => addToCart(product)}
            className={`p-2 rounded-xl border transition-all ${
              isAlreadyInCart
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title="Добавить в спецификацию"
          >
            {isAlreadyInCart ? <Check className="w-4 h-4 text-[#00A859]" /> : <Plus className="w-4 h-4" />}
          </button>

          <button
            onClick={() => openRfqModal(product)}
            className="bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center space-x-1 shadow-2xs"
          >
            <Send className="w-3 h-3" />
            <span>Запрос КП</span>
          </button>
        </div>
      </div>

    </div>
  );
};
