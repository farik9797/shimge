import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { RatingStars } from '../common/RatingStars';
import { ShoppingCart, Heart, ArrowLeftRight, Eye, Zap, CheckCircle2, Clock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { 
    setSelectedProductId, 
    setRoute, 
    addToCart, 
    formatPrice, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare,
    setQuickBuyProduct 
  } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const handleOpenDetail = () => {
    setSelectedProductId(product.id);
    setRoute('product');
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-orange-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Top Badges & Actions */}
      <div className="p-3 pb-0 flex items-start justify-between z-10">
        <div className="flex flex-col gap-1 items-start">
          {product.badge === 'DISCOUNT' && product.discountPercent && (
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
          {product.badge === 'HIT' && (
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
              ХИТ
            </span>
          )}
          {product.badge === 'NEW' && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
              NEW
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 bg-white/90 backdrop-blur rounded-xl p-1 shadow-sm border border-slate-100">
          <button
            onClick={e => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              isWishlisted ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-slate-700'
            }`}
            title="Добавить в избранное"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              isCompared ? 'text-orange-600 bg-orange-50' : 'text-slate-400 hover:text-slate-700'
            }`}
            title="Сравнить"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div 
        onClick={handleOpenDetail}
        className="relative px-4 py-2 cursor-pointer overflow-hidden flex items-center justify-center h-48 group/img"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover/img:scale-105 transition-transform duration-500"
        />

        {/* Quick View Button Hover Overlay */}
        {onQuickView && (
          <button
            onClick={e => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-2 px-3 py-1.5 bg-slate-900/90 hover:bg-orange-600 text-white text-xs font-bold rounded-xl opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1.5 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" /> Быстрый просмотр
          </button>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 pt-2 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-bold text-orange-600">{product.brand}</span>
            <span>Арт: {product.sku}</span>
          </div>

          <h3
            onClick={handleOpenDetail}
            className="text-xs font-bold text-slate-900 hover:text-orange-600 cursor-pointer transition-colors line-clamp-2 mt-1 leading-snug"
          >
            {product.name}
          </h3>
        </div>

        <div className="space-y-2">
          {/* Stock & Rating */}
          <div className="flex items-center justify-between pt-1 text-[11px]">
            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
            {product.inStock ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> В наличии
              </span>
            ) : (
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" /> Под заказ
              </span>
            )}
          </div>

          {/* Pricing Block */}
          <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-black text-slate-900">
                  {formatPrice(product.priceBYN)}
                </span>
                {product.oldPriceBYN && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product.oldPriceBYN)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 block">с НДС 20% для ЮР лиц</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => addToCart(product)}
              className="py-2 px-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> В корзину
            </button>

            <button
              onClick={() => setQuickBuyProduct(product)}
              className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" /> В 1 клик
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
