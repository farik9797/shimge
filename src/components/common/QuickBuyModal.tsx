import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Zap, Phone, User, CheckCircle2, ShoppingBag } from 'lucide-react';

export const QuickBuyModal: React.FC = () => {
  const { quickBuyProduct, setQuickBuyProduct, formatPrice, showNotification } = useApp();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!quickBuyProduct) return null;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      showNotification('Укажите контактный номер телефона', 'error');
      return;
    }
    setIsSuccess(true);
    showNotification('Быстрый заказ оформлен! Наш специалист свяжется с вами.', 'success');
    setTimeout(() => {
      setIsSuccess(false);
      setQuickBuyProduct(null);
      setPhone('');
      setName('');
      setQty(1);
    }, 2500);
  };

  const totalPrice = quickBuyProduct.priceBYN * qty;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={() => setQuickBuyProduct(null)}
            className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-full bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase mb-2">
            <Zap className="w-3.5 h-3.5" /> Быстрый заказ в 1 клик
          </div>
          <h3 className="text-lg font-bold line-clamp-1">{quickBuyProduct.name}</h3>
          <p className="text-slate-300 text-xs mt-1">
            Артикул: {quickBuyProduct.sku} • В наличии на складе
          </p>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
              <h4 className="text-lg font-bold text-slate-900">Заказ успешно принят!</h4>
              <p className="text-sm text-slate-600 mt-2">
                Номер заказа: <strong className="text-slate-900">#BY-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Мы позвоним на {phone} в течение 10 минут для уточнения адреса доставки.
              </p>
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <img
                  src={quickBuyProduct.image}
                  alt={quickBuyProduct.name}
                  className="w-16 h-16 object-cover rounded-lg bg-white shrink-0 border"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-slate-900 line-clamp-2">{quickBuyProduct.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold text-orange-600">{formatPrice(quickBuyProduct.priceBYN)}</span>
                    <div className="flex items-center gap-2 bg-white border rounded-lg px-2 py-0.5">
                      <button
                        type="button"
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="text-slate-500 font-bold px-1"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(qty + 1)}
                        className="text-slate-500 font-bold px-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Имя
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Александр"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Телефон *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+375 (33) 377-28-73"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Итого к оплате:</span>
                <span className="text-lg font-extrabold text-orange-600">{formatPrice(totalPrice)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Подтвердить заказ ({formatPrice(totalPrice)})
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
