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

  // Настоящий экспорт в Excel (.xls) с четким разделением по отдельным колонкам и ячейкам
  const handleExportSpecification = () => {
    if (cart.length === 0) {
      showToast('Спецификация пуста, добавьте товары');
      return;
    }

    const dateStr = new Date().toLocaleDateString('ru-RU');
    const timeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const fileNameDate = dateStr.replace(/\./g, '_');

    // Формируем полноценную разметку Excel-книги с точным разделением по колонкам и стилями SHIMGE
    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Спецификация SHIMGE</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                  <x:FitToPage/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #1E293B; }
          .header-title { font-size: 16pt; font-weight: bold; color: #007682; text-align: left; height: 35px; }
          .meta-info { font-size: 10pt; color: #475569; }
          table { border-collapse: collapse; width: 100%; }
          th { 
            background-color: #0096A6; 
            color: #FFFFFF; 
            font-weight: bold; 
            text-align: center; 
            border: 1px solid #007682; 
            padding: 10px 8px;
            font-size: 10pt;
          }
          td { 
            border: 1px solid #CBD5E1; 
            padding: 8px 6px; 
            font-size: 10pt; 
            vertical-align: middle; 
          }
          .num-col { text-align: center; font-weight: bold; }
          .series-col { text-align: center; font-weight: bold; color: #007682; }
          .sku-col { text-align: left; font-family: Consolas, monospace; font-weight: bold; }
          .name-col { text-align: left; font-weight: 500; }
          .spec-col { text-align: center; }
          .qty-col { text-align: center; font-weight: bold; font-size: 11pt; color: #0F172A; }
          .price-col { text-align: right; font-weight: bold; color: #007682; }
          .total-row { 
            background-color: #EBF8F9; 
            font-weight: bold; 
            border-top: 2px solid #0096A6; 
            border-bottom: 2px solid #0096A6; 
          }
          .total-label { text-align: right; font-size: 11pt; color: #007682; padding-right: 15px; }
          .total-value { text-align: center; font-size: 12pt; font-weight: bold; color: #007682; }
          .notice-row { font-size: 9pt; color: #64748B; font-style: italic; background-color: #F8FAFC; }
        </style>
      </head>
      <body>
        <table>
          <!-- Шапка документа -->
          <tr>
            <td colspan="11" class="header-title">
              СПЕЦИФИКАЦИЯ НАСОСНОГО ОБОРУДОВАНИЯ SHIMGE UZBEKISTAN
            </td>
          </tr>
          <tr>
            <td colspan="11" class="meta-info">
              Дата выгрузки: <b>${dateStr} в ${timeStr}</b> | Официальный каталог: <b>https://shimge-uz.vercel.app</b>
            </td>
          </tr>
          <tr>
            <td colspan="11" class="meta-info">
              Поставщик: <b>ООО «Gidromaks Pro»</b>, г. Ташкент | Тел: <b>+998 (71) 200-00-55</b> | Email: <b>info@shimge.uz</b>
            </td>
          </tr>
          <tr><td colspan="11" style="height: 10px; border: none;"></td></tr>

          <!-- Заголовки колонок таблицы (строго раздельные столбцы) -->
          <thead>
            <tr>
              <th style="width: 40px;">№</th>
              <th style="width: 70px;">Серия</th>
              <th style="width: 140px;">Артикул (SKU)</th>
              <th style="width: 280px;">Наименование оборудования</th>
              <th style="width: 170px;">Категория</th>
              <th style="width: 80px;">Напор H (м)</th>
              <th style="width: 90px;">Подача Q (м³/ч)</th>
              <th style="width: 90px;">Мощность (кВт)</th>
              <th style="width: 150px;">Материал корпуса</th>
              <th style="width: 80px;">Кол-во (шт)</th>
              <th style="width: 130px;">Оптовая цена (сум)</th>
            </tr>
          </thead>

          <!-- Строки с товарами -->
          <tbody>
            ${cart.map((item, index) => `
              <tr>
                <td class="num-col">${index + 1}</td>
                <td class="series-col">${item.product.series}</td>
                <td class="sku-col">${item.product.sku}</td>
                <td class="name-col">${item.product.name}</td>
                <td>${item.product.subCategory || item.product.categoryName}</td>
                <td class="spec-col">${item.product.headMeters}</td>
                <td class="spec-col">${item.product.flowRate}</td>
                <td class="spec-col">${item.product.powerKw}</td>
                <td>${item.product.casingMaterial}</td>
                <td class="qty-col">${item.quantity}</td>
                <td class="price-col">${item.product.estimatedPrice || 'По запросу'}</td>
              </tr>
            `).join('')}

            <!-- Итоговая строка -->
            <tr class="total-row">
              <td colspan="9" class="total-label">ИТОГО ЕДИНИЦ ОБОРУДОВАНИЯ К ОТГРУЗКЕ:</td>
              <td class="total-value">${totalItemsCount} шт.</td>
              <td style="text-align: right; color: #007682; font-weight: bold;">(с НДС 12%)</td>
            </tr>

            <!-- Примечания к спецификации -->
            <tr class="notice-row">
              <td colspan="11">
                * Условия поставки: со склада в г. Ташкент. Гарантия завода-изготовителя SHIMGE Pump Industry — 24 месяца.
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
    `;

    // Создаем Blob для Excel-файла
    const blob = new Blob(['\uFEFF' + excelHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SHIMGE_Specifikaciya_${fileNameDate}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Спецификация выгружена в Excel: «SHIMGE_Specifikaciya_${fileNameDate}.xls»`);
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
              
              {/* Скачать в Excel с четкими колонками */}
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
