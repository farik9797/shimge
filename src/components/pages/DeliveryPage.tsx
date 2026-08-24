import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Truck, 
  CreditCard, 
  Clock, 
  Boxes, 
  ShieldCheck
} from 'lucide-react';

export const DeliveryPage: React.FC = () => {
  const { openRfqModal } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Light Header */}
      <div className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider mb-2 bg-[#EBF8F9] px-3 py-1 rounded-full border border-[#B5E7EC]">
            <Truck className="w-4 h-4 text-[#0096A6]" />
            <span>Логистика и оплата</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Доставка насосов SHIMGE по Узбекистану и условия гарантии
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Отгрузки с центрального склада в Ташкенте по всем областям (Самарканд, Бухара, Фергана, Андижан, Наманган, Кашкадарья, Сурхандарья, Хорезм, Навои, Каракалпакстан).
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Delivery Modes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF8F9] text-[#0096A6] flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Доставка по регионам</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Отправка через курьерские службы BTS, Fargo, Express или прямым грузовым автотранспортом в жесткой защитной упаковке.
            </p>
            <span className="text-[11px] font-bold text-emerald-700 block">
              ✓ 100% страхование груза в пути
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Boxes className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Прямой транспорт для оптовых партий</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Для крупных партий насосов BLT и скважинных агрегатов 200QJ организуем доставку напрямую на стройплощадку или агрообъект.
            </p>
            <span className="text-[11px] font-bold text-emerald-700 block">
              ✓ Доставка до объекта заказчика
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Самовывоз со склада в Ташкенте</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Оперативная отгрузка день-в-день при наличии на складе (г. Ташкент, Алмазарский район).
            </p>
            <span className="text-[11px] font-bold text-emerald-700 block">
              ✓ Отгрузка от 20 минут
            </span>
          </div>
        </div>

        {/* Payment and Warranty */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider">
                <CreditCard className="w-4 h-4" />
                <span>Оплата и документы</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                Безналичный расчет с НДС 12% и официальная гарантия
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Мы работаем с юридическими и физическими лицами по официальному договору. Оплата по безналичному расчету (перечисление) или банковской картой.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">Гарантия</span>
                  <span className="text-slate-600">Официальная сервисная поддержка</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">Документооборот</span>
                  <span className="text-slate-600">ЭСФ через Didox / Soliq с НДС 12%</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => openRfqModal()}
                  className="bg-[#0096A6] hover:bg-[#007682] text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-xs transition-all flex items-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Запросить счет-фактуру / договор</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#EBF8F9] border border-[#B5E7EC] p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-[#007682] flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#00A859]" />
                <span>Сервисные обязательства SHIMGE:</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] mt-1.5 flex-shrink-0" />
                  <span>Постоянное наличие оригинальных запчастей на складе в Ташкенте</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] mt-1.5 flex-shrink-0" />
                  <span>Технические консультации инженеров по подбору и пусконаладке</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] mt-1.5 flex-shrink-0" />
                  <span>Оперативное гарантийное обслуживание и замена агрегатов</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
