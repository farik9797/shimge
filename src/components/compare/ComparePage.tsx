import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeftRight, Trash2, ShoppingCart, Check, X } from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { compareList, products, toggleCompare, addToCart, formatPrice, setRoute } = useApp();

  const comparedProducts = products.filter(p => compareList.includes(p.id));

  // Collect all unique specification keys across compared products
  const allSpecNames = Array.from(
    new Set(
      comparedProducts.flatMap(p => p.specs.map(s => s.name))
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6 text-orange-600" /> Сравнение характеристик
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Сравнение параметров выбранного профессионального оборудования mzvuk.by
          </p>
        </div>

        {comparedProducts.length > 0 && (
          <button
            onClick={() => comparedProducts.forEach(p => toggleCompare(p.id))}
            className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Очистить список
          </button>
        )}
      </div>

      {comparedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-full w-fit mx-auto">
            <ArrowLeftRight className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Нет товаров для сравнения</h2>
          <p className="text-xs text-slate-500">
            Добавляйте до 4 товаров в список сравнения из каталога для сопоставления технических характеристик.
          </p>
          <button
            onClick={() => setRoute('catalog')}
            className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs shadow"
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <table className="w-full min-w-[600px] text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 w-48 text-slate-400 font-bold uppercase text-[10px]">
                  Параметр / Товар
                </th>
                {comparedProducts.map(product => (
                  <th key={product.id} className="p-4 w-64 align-top">
                    <div className="space-y-3 relative">
                      <button
                        onClick={() => toggleCompare(product.id)}
                        className="absolute top-0 right-0 p-1 text-slate-400 hover:text-rose-600"
                        title="Удалить из сравнения"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="h-32 flex items-center justify-center p-2 bg-slate-50 rounded-2xl border border-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-orange-600 uppercase">
                          {product.brand}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5">
                          {product.name}
                        </h3>
                        <span className="text-sm font-black text-slate-900 block mt-1">
                          {formatPrice(product.priceBYN)}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 shadow"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" /> В корзину
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <tr className="bg-slate-50 font-bold">
                <td className="p-4 text-slate-700">Наличие на складе</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4">
                    {p.inStock ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Check className="w-4 h-4" /> В наличии ({p.stockCount} шт.)
                      </span>
                    ) : (
                      <span className="text-slate-400">Под заказ</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr className="font-bold">
                <td className="p-4 text-slate-700">Гарантия в Минске</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-4 font-bold text-slate-900">
                    {p.warrantyMonths} мес.
                  </td>
                ))}
              </tr>

              {/* Dynamic Specs Rows */}
              {allSpecNames.map((specName, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                  <td className="p-4 font-semibold text-slate-600">{specName}</td>
                  {comparedProducts.map(p => {
                    const foundSpec = p.specs.find(s => s.name === specName);
                    return (
                      <td key={p.id} className="p-4 font-bold text-slate-900">
                        {foundSpec ? foundSpec.value : '—'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
