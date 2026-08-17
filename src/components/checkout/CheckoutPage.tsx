import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderData } from '../../types';
import { Building2, User, FileText, CheckCircle2, ShieldCheck, Printer, ArrowRight, Truck, Phone, Mail } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotalBYN, formatPrice, addPlacedOrder, setRoute, showNotification } = useApp();

  const [customerType, setCustomerType] = useState<'b2b' | 'b2c'>('b2b');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+375 ');
  const [email, setEmail] = useState('');

  // B2B Details
  const [companyName, setCompanyName] = useState('ООО ');
  const [unp, setUnp] = useState('');
  const [bik, setBik] = useState('AKBBBY2X');
  const [bankAccount, setBankAccount] = useState('BY00AKBB30120000000000000000');

  // Address & Delivery
  const [city, setCity] = useState('Минск');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [comment, setComment] = useState('');

  const [placedOrderSuccess, setPlacedOrderSuccess] = useState<OrderData | null>(null);

  if (cart.length === 0 && !placedOrderSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Корзина пуста</h2>
        <button
          onClick={() => setRoute('catalog')}
          className="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !fullName) return;

    const newOrder: OrderData = {
      orderId: `BY-MZVUK-${Math.floor(100000 + Math.random() * 900000)}`,
      customerType,
      fullName,
      phone,
      email,
      companyName: customerType === 'b2b' ? companyName : undefined,
      unp: customerType === 'b2b' ? unp : undefined,
      bik: customerType === 'b2b' ? bik : undefined,
      bankAccount: customerType === 'b2b' ? bankAccount : undefined,
      address,
      city,
      deliveryMethod,
      paymentMethod,
      comment,
      items: [...cart],
      totalBYN: cartTotalBYN,
      discountBYN: 0,
      date: new Date().toLocaleDateString('ru-RU')
    };

    addPlacedOrder(newOrder);
    setPlacedOrderSuccess(newOrder);
    showNotification(`Заказ ${newOrder.orderId} успешно создан!`, 'success');
  };

  if (placedOrderSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in space-y-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4">
          <div className="p-4 bg-emerald-500 text-white rounded-full w-fit mx-auto shadow-lg">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-black text-emerald-900">
            Заказ успешно принят в обработку!
          </h1>
          <p className="text-xs text-emerald-800 max-w-lg mx-auto leading-relaxed">
            Номер вашего заказа: <strong className="font-mono text-slate-900">{placedOrderSuccess.orderId}</strong>. Наш менеджер свяжется с вами по телефону {placedOrderSuccess.phone} в течение 15 минут для подтверждения.
          </p>

          <button
            onClick={() => window.print()}
            className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2 shadow"
          >
            <Printer className="w-4 h-4 text-orange-400" /> Распечатать счёт-фактуру
          </button>
        </div>

        {/* Commercial Invoice Preview Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-6 shadow-sm printable-invoice">
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <span className="text-xl font-black text-slate-900 font-mono tracking-wider">
                mzvuk.by
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Поставщик: ООО «Арт-Медиа Трейд», УНП 193... <br />
                220000, Республика Беларусь, г. Минск
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-orange-600 block">
                Счёт-фактура № {placedOrderSuccess.orderId}
              </span>
              <span className="text-[11px] text-slate-400 block">
                Дата счета: {placedOrderSuccess.date}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="font-bold text-slate-800 block">Покупатель:</span>
              <p className="text-slate-600">
                {placedOrderSuccess.companyName || placedOrderSuccess.fullName} <br />
                {placedOrderSuccess.unp && `УНП: ${placedOrderSuccess.unp}`} <br />
                Адрес: {placedOrderSuccess.city}, {placedOrderSuccess.address}
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="font-bold text-slate-800 block">Контакты:</span>
              <p className="text-slate-600">
                Телефон: {placedOrderSuccess.phone} <br />
                Email: {placedOrderSuccess.email || '—'}
              </p>
            </div>
          </div>

          {/* Invoice Items Table */}
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">№</th>
                <th className="p-3">Наименование товара / услуги</th>
                <th className="p-3 text-center">Кол-во</th>
                <th className="p-3 text-right">Цена с НДС</th>
                <th className="p-3 text-right">Сумма с НДС</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {placedOrderSuccess.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-3 text-slate-400 font-mono">{idx + 1}</td>
                  <td className="p-3 font-bold text-slate-900">{item.product.name}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">{formatPrice(item.product.priceBYN)}</td>
                  <td className="p-3 text-right font-bold">
                    {formatPrice(item.product.priceBYN * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-slate-200 pt-4 flex flex-col items-end space-y-1 text-xs">
            <div className="flex justify-between w-64">
              <span className="text-slate-500">Сумма без НДС:</span>
              <span className="font-bold">{formatPrice(placedOrderSuccess.totalBYN * 0.8333)}</span>
            </div>
            <div className="flex justify-between w-64">
              <span className="text-slate-500">Ставка НДС:</span>
              <span className="font-bold text-orange-600">20%</span>
            </div>
            <div className="flex justify-between w-64 text-sm font-black pt-2 border-t border-slate-200">
              <span>Всего к оплате:</span>
              <span className="text-orange-600">{formatPrice(placedOrderSuccess.totalBYN)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Оформление заказа</h1>
        <p className="text-xs text-slate-500 mt-1">
          Заполнение данных для физических лиц и плательщиков НДС Республики Беларусь
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Type Selector */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Выберите тип плательщика
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setCustomerType('b2b')}
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                  customerType === 'b2b'
                    ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-5 h-5 shrink-0" />
                <div className="text-left">
                  <span className="text-xs font-extrabold block">Юридическое лицо / ИП</span>
                  <span className="text-[10px] opacity-80 block">Безналичный расчет с НДС 20%</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCustomerType('b2c')}
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                  customerType === 'b2c'
                    ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <User className="w-5 h-5 shrink-0" />
                <div className="text-left">
                  <span className="text-xs font-extrabold block">Частное лицо</span>
                  <span className="text-[10px] opacity-80 block">ЕРИП / Карта / Наличные</span>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Details Block */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Контактная информация
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  ФИО Контактного лица *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Иванов Иван Иванович"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Номер телефона *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+375 (29) 123-45-67"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  Электронная почта (Email для счета)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="b2b@company.by"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* B2B Requisites (if b2b) */}
          {customerType === 'b2b' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  3. Реквизиты организации для Счёта
                </h2>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Авто-генерация ТТН и ЭСЧФ
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Наименование организации / ИП *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="ООО «АудиоТехно»"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    УНП (9 цифр) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={9}
                    value={unp}
                    onChange={e => setUnp(e.target.value)}
                    placeholder="193123456"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Расчетный счет IBAN
                  </label>
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={e => setBankAccount(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    БИК банка (BIC)
                  </label>
                  <input
                    type="text"
                    value={bik}
                    onChange={e => setBik(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Delivery & Payment Options */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              {customerType === 'b2b' ? '4. Доставка и Комментарий' : '3. Доставка и Способ оплаты'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Город назначения</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Минск"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Адрес доставки / объекта</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="ул. Немига, д. 5"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Комментарий к заказу</label>
                <textarea
                  rows={2}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Укажите особые условия по доставке или монтажу..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 resize-none font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Review Sidebar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 h-fit space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Ваш заказ ({cart.length})
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map(item => (
              <div key={item.product.id} className="flex justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block truncate max-w-[180px]">
                    {item.product.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.quantity} x {formatPrice(item.product.priceBYN)}
                  </span>
                </div>
                <span className="font-bold text-slate-900">
                  {formatPrice(item.product.priceBYN * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Сумма с НДС 20%:</span>
              <span className="text-lg font-black text-orange-600">{formatPrice(cartTotalBYN)}</span>
            </div>
            <p className="text-[10px] text-slate-400">
              * Доставка по Беларуси бесплатна при заказе от 500 BYN
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-2xl text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" /> Сформировать и отправить счёт
          </button>
        </div>
      </form>
    </div>
  );
};
