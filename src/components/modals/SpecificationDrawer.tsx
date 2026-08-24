import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  Download, 
  FileText, 
  ShoppingBag
} from 'lucide-react';

export const SpecificationDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, clearCart, openRfqModal, showToast } = useApp();

  if (!isCartOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleExportSpecification = () => {
    showToast('Спецификация выгружена в формате Excel/PDF');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Light Header in Brand Teal */}
        <div className="bg-[#F0FAFA] px-6 py-4 border-b border-[#D4F1F4] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EBF8F9] text-[#0096A6] border border-[#B5E7EC] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Спецификация & Корзина</h3>
              <p className="text-[11px] text-slate-500">Выбрано позиций оборудования: {totalItemsCount} шт.</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">Спецификация пуста</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Выберите необходимые насосы SHIMGE в каталоге и добавьте их кнопкой «+».
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 text-xs font-bold text-[#0096A6] hover:underline"
              >
                Перейти в каталог
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-xs text-slate-500">
                <span>Список оборудования:</span>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:underline flex items-center space-x-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Очистить</span>
                </button>
              </div>

              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-contain rounded-xl bg-white border border-slate-200 p-1 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-[#0096A6] bg-[#EBF8F9] border border-[#B5E7EC] px-2 py-0.5 rounded">
                        {product.series}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 line-clamp-1 mt-1">
                        {product.name}
                      </h5>
                      <span className="text-[11px] font-bold text-slate-700 block">
                        {product.estimatedPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center border border-slate-300 rounded-xl bg-white p-0.5">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1 text-slate-500 hover:text-slate-900 rounded-lg"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1 text-slate-500 hover:text-slate-900 rounded-lg"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Всего единиц:</span>
              <span className="text-sm font-black text-[#0096A6]">{totalItemsCount} шт.</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleExportSpecification}
                className="py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Экспорт (PDF/XLS)</span>
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  openRfqModal();
                }}
                className="py-2.5 px-3 bg-[#0096A6] hover:bg-[#007682] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Запросить счет / КП</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
