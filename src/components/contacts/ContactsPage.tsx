import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Building2, ExternalLink } from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { showNotification } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsSent(true);
    showNotification('Ваше сообщение отправлено в отдел продаж!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
          mzvuk.by в Минске
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Контакты и реквизиты ООО «Арт-Медиа Трейд»
        </h1>
        <p className="text-xs text-slate-600">
          Свяжитесь с нами для получения индивидуальной коммерческой спецификации или консультации инженера.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Телефоны отдела продаж</span>
                <a href="tel:+375333772873" className="text-sm font-black text-slate-900 hover:text-orange-600 block">
                  +375 (33) 377-28-73
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Электронная почта</span>
                <a href="mailto:sales@mzvuk.by" className="text-sm font-black text-slate-900 hover:text-orange-600 block">
                  sales@mzvuk.by
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Режим работы</span>
                <span className="text-xs font-bold text-slate-900 block">
                  Пн-Пт: 09:00 - 18:00 (Офис/Склад)
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Сб-Вс: Прием интернет-заявок
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Офис и шоурум в Минске</span>
                <span className="text-xs font-bold text-slate-900 block">
                  г. Минск, Республика Беларусь
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Map & Form Block */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Написать руководителю отдела продаж</h2>
              <p className="text-xs text-slate-300 mt-1">
                Отправьте запрос или список оборудования для быстрой оценки стоимости.
              </p>
            </div>

            {isSent ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">Сообщение отправлено!</h3>
                <p className="text-xs text-slate-300">Инженер связаться с вами в ближайшее рабочее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ваше имя *"
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-orange-500"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Телефон (+375...) *"
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-orange-500"
                  />
                </div>

                <textarea
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Ваш вопрос или техническое задание..."
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-orange-500 resize-none"
                />

                <button
                  type="submit"
                  className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
                >
                  <Send className="w-4 h-4" /> Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
