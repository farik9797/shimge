import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Database, Download, Upload, CheckCircle2, RefreshCw, FileSpreadsheet, Package, FileText } from 'lucide-react';

export const DataSyncModal: React.FC = () => {
  const {
    isDataSyncOpen,
    setIsDataSyncOpen,
    products,
    setProducts,
    placedOrders,
    showNotification,
    formatPrice
  } = useApp();

  const [activeTab, setActiveTab] = useState<'sync' | 'orders' | 'manage'>('sync');
  const [jsonText, setJsonText] = useState('');

  if (!isDataSyncOpen) return null;

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mzvuk_catalog_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Экспорт каталога mzvuk.by выполнен успешно!', 'success');
  };

  const handle1CSyncSimulation = () => {
    showNotification('Синхронизация с 1С:Предприятие 8.3 Управление торговлей завершена!', 'success');
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setProducts(parsed);
        showNotification(`Импортировано ${parsed.length} товаров в каталог!`, 'success');
        setJsonText('');
      } else {
        showNotification('Неверный формат JSON массива товаров', 'error');
      }
    } catch {
      showNotification('Ошибка синтаксиса JSON', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-600 text-white rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Синхронизация и Панель B2B Заказов
              </h2>
              <p className="text-xs text-slate-500">
                Интеграция с 1С:УТ, Экспорт прайс-листов и история выставленных счетов
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDataSyncOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 gap-4 text-xs font-bold pt-4 pb-2">
          <button
            onClick={() => setActiveTab('sync')}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
              activeTab === 'sync'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-500'
            }`}
          >
            <RefreshCw className="w-4 h-4" /> 1С Интеграция & Имспорт/Экспорт
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-500'
            }`}
          >
            <FileText className="w-4 h-4" /> Реестр выписанных счетов ({placedOrders.length})
          </button>
        </div>

        {/* Tab 1: Sync & Export/Import */}
        {activeTab === 'sync' && (
          <div className="py-6 space-y-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <span>Экспорт в JSON / Excel</span>
                </div>
                <p className="text-xs text-slate-600">
                  Скачать текущую базу данных ({products.length} товаров) со всеми ценами в BYN, характеристиками и остатками.
                </p>
                <button
                  onClick={handleExportJson}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-orange-400" /> Скачать базу данных
                </button>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <RefreshCw className="w-5 h-5 text-orange-600" />
                  <span>Синхронизация с 1С:Предприятие</span>
                </div>
                <p className="text-xs text-slate-600">
                  Обновление остатков на складе в Минске и цен с НДС через CommerceML 2.0 API.
                </p>
                <button
                  onClick={handle1CSyncSimulation}
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Запустить обход 1С
                </button>
              </div>
            </div>

            {/* Custom Import Box */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">
                Импорт новых позиций в базу (JSON Format)
              </h3>
              <textarea
                rows={4}
                value={jsonText}
                onChange={e => setJsonText(e.target.value)}
                placeholder='[{"id":"p-99","name":"Новый микрофон","priceBYN":500,...}]'
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:border-orange-500 resize-none"
              />
              <button
                onClick={handleImportJson}
                disabled={!jsonText}
                className="px-6 py-2 bg-emerald-600 disabled:opacity-50 text-white font-bold rounded-xl text-xs inline-flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" /> Загрузить товары
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Registry */}
        {activeTab === 'orders' && (
          <div className="py-6 space-y-4 overflow-y-auto flex-1">
            {placedOrders.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                Реестр выписанных счетов пока пуст. Оформите заказ на сайте.
              </div>
            ) : (
              placedOrders.map(ord => (
                <div
                  key={ord.orderId}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900 text-sm">
                      Счёт № {ord.orderId} ({ord.customerType.toUpperCase()})
                    </span>
                    <span className="text-slate-400">{ord.date}</span>
                  </div>
                  <div className="text-slate-600">
                    Клиент: <strong className="text-slate-800">{ord.companyName || ord.fullName}</strong>{' '}
                    {ord.unp && `(УНП: ${ord.unp})`}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Позиций: {ord.items.length}</span>
                    <span className="font-black text-orange-600 text-sm">
                      Сумма: {formatPrice(ord.totalBYN)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
