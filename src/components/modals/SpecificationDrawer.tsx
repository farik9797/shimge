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
  ShoppingBag,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';

export const SpecificationDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, clearCart, openRfqModal, showToast } = useApp();

  if (!isCartOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Реальный экспорт спецификации в файл Excel (CSV с UTF-8 BOM для корректного открытия в Microsoft Excel)
  const handleExportSpecification = () => {
    if (cart.length === 0) {
      showToast('Спецификация пуста, добавьте товары');
      return;
    }

    const dateStr = new Date().toLocaleDateString('ru-RU').replace(/\./g, '_');
    const timeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    // Формируем структуру Excel-совместимого CSV файла
    const rows = [
      ['СПЕЦИФИКАЦИЯ НАСОСНОГО ОБОРУДОВАНИЯ SHIMGE UZBEKISTAN'],
      [`Дата формирования: ${new Date().toLocaleDateString('ru-RU')} ${timeStr}`],
      ['Поставщик: Официальный каталог SHIMGE (ООО «Gidromaks Pro»), г. Ташкент'],
      ['Контакты: +998 (71) 200-00-55 | info@shimge.uz | https://shimge-uz.vercel.app'],
      [], // Пустая строка
      [
        '№',
        'Серия',
        'Артикул (SKU)',
        'Наименование оборудования',
        'Категория применения',
        'Напор H (м)',
        'Подача Q (м³/ч)',
        'Мощность (кВт)',
        'Материал проточной части',
        'Количество (шт)',
        'Оптовая цена за ед. (сум)',
        'Гарантия'
      ]
    ];

    cart.forEach((item, index) => {
      rows.push([
        (index + 1).toString(),
        `"${item.product.series}"`,
        `"${item.product.sku}"`,
        `"${item.product.name.replace(/"/g, '""')}"`,
        `"${item.product.subCategory || item.product.categoryName}"`,
        `"${item.product.headMeters}"`,
        `"${item.product.flowRate}"`,
        `"${item.product.powerKw}"`,
        `"${item.product.casingMaterial}"`,
        item.quantity.toString(),
        `"${item.product.estimatedPrice || 'По запросу'}"`,
        `"${item.product.warrantyYears} года"`
      ]);
    });

    // Строка ИТОГО
    rows.push([]);
    rows.push([
      'ИТОГО',
      '',
      '',
      `Всего позиций: ${cart.length}, Единиц оборудования: ${totalItemsCount} шт.`,
      '',
      '',
      '',
      '',
      '',
      totalItemsCount.toString(),
      '',
      ''
    ]);
    rows.push([
      'ПРИМЕЧАНИЕ',
      '',
      '',
      'Цены включают НДС 12%. Доставка со склада в г. Ташкент по всем регионам Узбекистана.',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ]);

    // Преобразуем массив в CSV с разделителем точка с запятой (стандарт для Excel в RU регионе) и UTF-8 BOM
    const csvContent = '\uFEFF' + rows.map(row => row.join(';')).join('\r\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SHIMGE_Specifikaciya_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Файл «SHIMGE_Specifikaciya_${dateStr}.csv» успешно выгружен!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Light Header in Brand Teal */}
        <div className="bg-[#F0FAFA] px-6 py-4 border-b border-[#D4F1F4] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EBF8F9] text-[#0096A6] border border-[#B5E7EC] flex items-center justify-center shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Спецификация & Корзина</h3>
              <p className="text-[11px] text-slate-500">Выбрано позиций: {totalItemsCount} шт.</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
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
                <span className="font-semibold">Список оборудования к заказу:</span>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:underline flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Очистить все</span>
                </button>
              </div>

              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-2xs hover:bg-white transition-colors"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-contain rounded-xl bg-white border border-slate-200 p-1 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[9px] font-black uppercase text-[#007682] bg-[#EBF8F9] border border-[#B5E7EC] px-1.5 py-0.5 rounded">
                          {product.series}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold truncate">
                          {product.sku}
                        </span>
                      </div>
                      
                      <h5 className="text-xs font-bold text-slate-900 truncate mt-1">
                        {product.name}
                      </h5>
                      <span className="text-[11px] font-bold text-[#0096A6] block">
                        {product.estimatedPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className="flex items-center border border-slate-300 rounded-xl bg-white p-0.5 shadow-2xs">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                        title="Уменьшить"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-black text-slate-900">{quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                        title="Увеличить"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      title="Удалить"
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
          <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3.5 flex-shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Всего единиц оборудования:</span>
              <span className="text-base font-black text-[#0096A6]">{totalItemsCount} шт.</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Реальный экспорт в Excel */}
              <button
                onClick={handleExportSpecification}
                className="py-3 px-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-2xs hover:shadow-md hover:border-slate-400"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Скачать в Excel</span>
              </button>

              {/* Запрос КП */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  openRfqModal();
                }}
                className="py-3 px-3 bg-[#0096A6] hover:bg-[#007682] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Запросить КП</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
