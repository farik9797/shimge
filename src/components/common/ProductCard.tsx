import React from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { 
  Check, 
  Plus, 
  Send, 
  Eye, 
  Zap, 
  Activity, 
  Gauge, 
  ShieldCheck, 
  ArrowUpRight
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  mode?: 'grid' | 'table';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, mode = 'grid' }) => {
  const { setSelectedProduct, addToCart, openRfqModal, cart } = useApp();

  const isAlreadyInCart = cart.some(item => item.product.id === product.id);

  // Table / List Mode (Responsive Row)
  if (mode === 'table') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 hover:border-[#0096A6] p-4 transition-all duration-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs hover:shadow-md group">
        
        {/* Left: Product Info */}
        <div className="flex items-center space-x-4 w-full md:w-5/12">
          <div 
            onClick={() => setSelectedProduct(product)}
            className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 flex-shrink-0 cursor-pointer overflow-hidden group-hover:scale-105 transition-transform"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#EBF8F9] text-[#007682] border border-[#B5E7EC] px-2 py-0.5 rounded">
                {product.series}
              </span>
              <span className="text-[11px] font-mono text-slate-500 font-bold">
                {product.sku}
              </span>
            </div>

            <h4 
              onClick={() => setSelectedProduct(product)}
              className="text-xs font-bold text-slate-900 group-hover:text-[#0096A6] transition-colors line-clamp-1 cursor-pointer mt-0.5"
            >
              {product.name}
            </h4>
            <span className="text-[11px] text-slate-500 line-clamp-1 block">
              {product.subCategory}
            </span>
          </div>
        </div>

        {/* Center: Technical Parameters */}
        <div className="grid grid-cols-4 gap-3 text-center text-xs w-full md:w-4/12 border-y md:border-y-0 md:border-x border-slate-100 py-2 md:py-0 px-2">
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold">Напор</span>
            <span className="font-bold text-slate-900">{product.headMeters} м</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold">Подача</span>
            <span className="font-bold text-slate-900">{product.flowRate} м³/ч</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold">Мощность</span>
            <span className="font-bold text-slate-800">{product.powerKw} кВт</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px] uppercase font-bold">Цена</span>
            <span className="font-bold text-[#0096A6] truncate block text-[11px]">
              {product.estimatedPrice}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end space-x-2 w-full md:w-3/12">
          <button
            onClick={() => setSelectedProduct(product)}
            className="p-2.5 text-slate-600 hover:text-[#0096A6] hover:bg-[#EBF8F9] rounded-xl border border-slate-200 transition-colors flex-shrink-0"
            title="Характеристики и чертежи"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => addToCart(product)}
            className={`p-2.5 rounded-xl border transition-colors flex-shrink-0 ${
              isAlreadyInCart
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
            }`}
            title={isAlreadyInCart ? 'В спецификации' : 'Добавить в спецификацию'}
          >
            {isAlreadyInCart ? <Check className="w-4 h-4 text-[#00A859]" /> : <Plus className="w-4 h-4" />}
          </button>

          <button
            onClick={() => openRfqModal(product)}
            className="h-10 bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-4 rounded-xl transition-colors flex items-center space-x-1.5 shadow-2xs whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
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

          {/* Stock Badge */}
          {product.inStock && (
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] animate-pulse" />
              <span>В наличии ({product.stockCount || 10} шт.)</span>
            </div>
          )}

          {/* Series Badge */}
          <div className="absolute top-3 right-3 bg-[#0096A6] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
            {product.series}
          </div>

          {/* Quick Preview Hover Overlay */}
          <div className="absolute inset-0 bg-[#0096A6]/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 text-[#007682] text-xs font-bold px-4 py-2 rounded-xl shadow-lg border border-[#B5E7EC] flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-4 h-4 text-[#0096A6]" />
              <span>Паспорт и Q-H график</span>
            </span>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-5 space-y-3">
          
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 block tracking-tight">
              {product.sku}
            </span>
            <h3 
              onClick={() => setSelectedProduct(product)}
              className="text-sm font-bold text-slate-900 group-hover:text-[#0096A6] transition-colors line-clamp-2 cursor-pointer mt-0.5 min-h-[40px]"
            >
              {product.name}
            </h3>
          </div>

          {/* Specs Micro Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
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
      <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-tight">Оптовая цена</span>
          <span className="text-sm font-black text-[#0096A6] truncate block">{product.estimatedPrice || 'По запросу'}</span>
        </div>

        {/* Action Buttons: Чистый горизонтальный ряд */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          
          {/* Add to Cart Icon Button */}
          <button
            onClick={() => addToCart(product)}
            className={`w-10 h-10 rounded-xl border transition-all flex items-center justify-center ${
              isAlreadyInCart
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
            title={isAlreadyInCart ? 'В спецификации' : 'Добавить в спецификацию'}
          >
            {isAlreadyInCart ? <Check className="w-4 h-4 text-[#00A859]" /> : <Plus className="w-4 h-4 text-[#0096A6]" />}
          </button>

          {/* Request Quote Button */}
          <button
            onClick={() => openRfqModal(product)}
            className="h-10 bg-[#0096A6] hover:bg-[#007682] text-white text-xs font-bold px-4 rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-2xs whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Запрос КП</span>
          </button>

        </div>
      </div>

    </div>
  );
};
