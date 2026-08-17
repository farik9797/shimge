import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { X, ShoppingCart, ShieldCheck, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, formatPrice, setSelectedProductId, setRoute, setQuickBuyProduct } = useApp();

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-800 rounded-full bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="p-8 bg-slate-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-72 object-contain"
            />
          </div>

          {/* Details */}
          <div className="p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600">
                <span>{product.brand}</span>
                <span>•</span>
                <span className="text-slate-400">Арт: {product.sku}</span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mt-1">{product.name}</h2>

              <div className="mt-2">
                <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {product.shortDesc}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                {product.specs.slice(0, 3).map((spec, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-slate-500">{spec.name}:</span>
                    <span className="font-semibold text-slate-800">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-black text-slate-900">
                    {formatPrice(product.priceBYN)}
                  </span>
                  <span className="text-xs text-slate-400 block">в т.ч. НДС 20%</span>
                </div>
                {product.inStock && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> В наличии
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  <ShoppingCart className="w-4 h-4" /> В корзину
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setQuickBuyProduct(product);
                  }}
                  className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1"
                >
                  <Zap className="w-4 h-4 text-amber-500" /> В 1 клик
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedProductId(product.id);
                  setRoute('product');
                  onClose();
                }}
                className="w-full text-center text-xs text-orange-600 font-bold hover:underline flex items-center justify-center gap-1"
              >
                Полная страница товара <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
