import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Phone, User, Building, Send, CheckCircle2 } from 'lucide-react';

export const CallbackModal: React.FC = () => {
  const { isCallbackOpen, setIsCallbackOpen, showNotification } = useApp();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isCallbackOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      showNotification('Пожалуйста, укажите ваш номер телефона', 'error');
      return;
    }
    setIsSubmitted(true);
    showNotification('Заявка на звонок отправлена! Менеджер свяжется с вами в течение 10 минут.', 'success');
    setTimeout(() => {
      setIsSubmitted(false);
      setPhone('');
      setName('');
      setCompany('');
      setIsCallbackOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={() => setIsCallbackOpen(false)}
            className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-full bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 mb-3">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Заказать обратный звонок</h3>
          <p className="text-slate-300 text-sm mt-1">
            ООО «Арт-Медиа Трейд» • Подбор оборудования и НДС консультация
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
              <h4 className="text-lg font-bold text-slate-900">Спасибо за обращение!</h4>
              <p className="text-sm text-slate-600 mt-2">
                Наш инженер забронировал ваше время. Мы перезвоним на {phone} в ближайшие минуты.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Ваше имя
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

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Организация / Компания (для ЮР лиц)
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="ООО «Название»"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  Перезвоните мне
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center mt-3">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных. Пн-Пт: 09:00 - 18:00
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
