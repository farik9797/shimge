import React from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, ShieldCheck, CreditCard, Percent, Clock, CheckCircle2, Building2 } from 'lucide-react';

export const DeliveryPage: React.FC = () => {
  const { setRoute } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
          Логистика mzvuk.by
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Доставка и Оплата по Республике Беларусь
        </h1>
        <p className="text-xs text-slate-600">
          Оперативная отгрузка профессионального аудиооборудования со склада в Минске
        </p>
      </div>

      {/* Delivery Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl w-fit">
            <Truck className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Доставка по Минску</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Курьерская доставка собственной службой mzvuk.by день-в-день при оформлении заказа до 12:00.
          </p>
          <div className="text-xs font-bold text-emerald-600 bg-emerald-50 p-2.5 rounded-xl">
            Бесплатно при заказе от 300 BYN
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Экспресс по Беларуси</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Доставка службой DPD или Autolight Express до двери вашего предприятия или объекта в любой точке РБ за 24-48 часов.
          </p>
          <div className="text-xs font-bold text-slate-900 bg-slate-100 p-2.5 rounded-xl">
            Бесплатно при заказе от 500 BYN
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Самовывоз со склада</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Выдача заказов в складском комплексе ООО «Арт-Медиа Трейд» в Минске с 09:00 до 18:00 с проверкой комплектации.
          </p>
          <div className="text-xs font-bold text-emerald-600 bg-emerald-50 p-2.5 rounded-xl">
            Бесплатно для любых сумм
          </div>
        </div>
      </div>

      {/* Payment Options Grid */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-1">
            Финансовые условия
          </span>
          <h2 className="text-2xl font-black text-white">Способы оплаты и закрывающие документы</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Percent className="w-5 h-5 text-orange-400" />
              <span>Безналичный расчет с НДС 20% (ЮР лица и ИП)</span>
            </div>
            <p className="leading-relaxed">
              Выставляем счёт-фактуру на любой e-mail или мессенджер. При отгрузке предоставляется полный пакет закрывающих бухгалтерских документов (ТТН, ТН, Акт выполненных работ).
            </p>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span>ЕРИП, Банковские карты и Онлайн-оплата</span>
            </div>
            <p className="leading-relaxed">
              Для физических лиц доступна оплата через систему «Расчет» (ЕРИП), банковскими картами Visa / Mastercard / БЕЛКАРТ при получении или на сайте.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
