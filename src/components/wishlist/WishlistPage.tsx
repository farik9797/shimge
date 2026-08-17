import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../catalog/ProductCard';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, setRoute } = useApp();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-600 fill-rose-600" /> Избранные товары
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Сохраненные позиции для быстрой покупки или составления спецификации
          </p>
        </div>

        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          Всего: {wishlistedProducts.length}
        </span>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
          <div className="p-4 bg-rose-50 text-rose-600 rounded-full w-fit mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Список избранного пуст</h2>
          <p className="text-xs text-slate-500">
            Нажимайте на сердечко в карточках товаров, чтобы сохранять интересующие позиции.
          </p>
          <button
            onClick={() => setRoute('catalog')}
            className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs shadow"
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
