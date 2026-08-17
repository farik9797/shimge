import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotalBYN, formatPrice, setRoute } = useApp();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in space-y-4">
        <div className="p-5 bg-orange-50 text-orange-600 rounded-full w-fit mx-auto">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Ваша корзина пуста</h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          В вашей корзине пока нет товаров. Выберите необходимое оборудование в нашем каталоге.
        </p>
        <button
          onClick={() => setRoute('catalog')}
          className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl text-xs shadow-lg"
        >
          Перейти в каталог оборудования
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Корзина покупателя</h1>
          <p className="text-xs text-slate-500 mt-1">
            Проверьте состав заказа, количество и перейдите к оформлению или запросу счета с НДС
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Очистить все
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain bg-slate-50 rounded-xl p-2 border border-slate-100 shrink-0"
                />

                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">
                    {item.product.brand}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {item.product.name}
                  </h3>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Артикул: {item.product.sku}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 mt-1 block">
                    В наличии на складе
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 font-bold text-slate-600 hover:text-black flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 font-bold text-slate-600 hover:text-black flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Сумма:</span>
                  <span className="text-base font-black text-slate-900">
                    {formatPrice(item.product.priceBYN * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-slate-400 hover:text-rose-600"
                  title="Удалить товар"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Side Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 h-fit space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Детали расчета стоимости
          </h2>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Товаров в заказе:</span>
              <span className="font-bold text-slate-900">
                {cart.reduce((s, i) => s + i.quantity, 0)} шт.
              </span>
            </div>
            <div className="flex justify-between">
              <span>Стоимость без НДС:</span>
              <span className="font-bold text-slate-900">
                {formatPrice(cartTotalBYN * 0.8333)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>НДС 20%:</span>
              <span className="font-bold text-orange-600">
                {formatPrice(cartTotalBYN * 0.1667)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Доставка по Минску / РБ:</span>
              <span className="font-bold text-emerald-600">Бесплатно при заказе от 500 BYN</span>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-900">Итого с НДС:</span>
              <span className="text-2xl font-black text-orange-600">
                {formatPrice(cartTotalBYN)}
              </span>
            </div>
          </div>

          <button
            onClick={() => setRoute('checkout')}
            className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-2xl text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all"
          >
            Оформить заказ / Запросить счёт <ArrowRight className="w-4 h-4" />
          </button>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <FileText className="w-4 h-4 text-orange-600" />
              <span>Для юридических лиц и ИП:</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              На этапе оформления вы сможете ввести УНП компании для автоматической генерации счета-фактуры.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
