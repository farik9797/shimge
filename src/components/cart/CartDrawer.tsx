import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotalBYN,
    formatPrice,
    setRoute,
    clearCart
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-black text-slate-900">Корзина заказа</h2>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="p-4 bg-orange-50 text-orange-600 rounded-full w-fit mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Ваша корзина пуста</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Выберите нужное профессиональное звуковое оборудование из нашего каталога.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setRoute('catalog');
                  }}
                  className="mt-2 px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs shadow"
                >
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center text-xs text-slate-500 pb-2 border-b border-slate-100">
                  <span>Выбранные позиции с НДС 20%</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:underline text-[11px] font-bold"
                  >
                    Очистить корзину
                  </button>
                </div>

                {cart.map(item => (
                  <div
                    key={item.product.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex gap-3 items-center justify-between"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-slate-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 block">
                        Артикул: {item.product.sku}
                      </span>
                      <span className="text-xs font-black text-orange-600 block mt-1">
                        {formatPrice(item.product.priceBYN)}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 font-bold text-xs text-slate-600 flex items-center justify-center hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 font-bold text-xs text-slate-600 flex items-center justify-center hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>НДС (20% включен):</span>
                  <span className="font-bold text-slate-800">
                    {formatPrice(cartTotalBYN * 0.2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                  <span>Итого к оплате:</span>
                  <span className="text-xl text-orange-600">
                    {formatPrice(cartTotalBYN)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setRoute('cart');
                  }}
                  className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors"
                >
                  В корзину
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setRoute('checkout');
                  }}
                  className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-1.5 transition-colors"
                >
                  Оформить <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Безналичный расчет для ЮР лиц с закрывающими ТТН</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
