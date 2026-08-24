import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, CheckCircle2, Phone, Mail, Building2, User, Paperclip } from 'lucide-react';

export const RfqModal: React.FC = () => {
  const { isRfqOpen, setIsRfqOpen, rfqTargetProduct, showToast } = useApp();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [comment, setComment] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isRfqOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      showToast('Заявка на коммерческое предложение успешно принята!');
    }, 600);
  };

  const handleClose = () => {
    setIsRfqOpen(false);
    setIsSent(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header in Brand Teal */}
        <div className="bg-[#F0FAFA] text-slate-900 px-6 py-4 flex items-center justify-between border-b border-[#D4F1F4]">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {rfqTargetProduct ? `Запрос КП на «${rfqTargetProduct.name}»` : 'Запрос коммерческого предложения'}
            </h3>
            <p className="text-[11px] text-slate-500">
              Официальный расчет цен и сроков поставки оборудования SHIMGE
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {isSent ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#00A859]" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Заявка успешно принята!</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Инженер оптового отдела свяжется с вами по номеру <strong>{phone}</strong> и отправит официальное КП.
              </p>
              <button
                onClick={handleClose}
                className="mt-3 px-6 py-2.5 bg-[#0096A6] text-white text-xs font-bold rounded-xl hover:bg-[#007682] transition-colors"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {rfqTargetProduct && (
                <div className="p-3 bg-[#EBF8F9] border border-[#B5E7EC] rounded-2xl flex items-center space-x-3 text-xs">
                  <img src={rfqTargetProduct.image} alt={rfqTargetProduct.name} className="w-12 h-12 object-contain rounded-xl bg-white p-1" />
                  <div>
                    <span className="font-bold text-slate-900 block">{rfqTargetProduct.name}</span>
                    <span className="text-slate-500 font-mono">{rfqTargetProduct.sku} • Цена: <strong className="text-[#0096A6]">{rfqTargetProduct.estimatedPrice}</strong></span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Компания / Ваше имя *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="ООО или Ф.И.О."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6] focus:outline-none"
                    />
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Телефон для связи *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 (90) ___ - __ - __"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6] focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email для отправки КП</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="zakupki@company.uz"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6] focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Количество или комментарий к заказу</label>
                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Требуемое количество, параметры напора/подачи или город доставки..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6] focus:outline-none"
                />
              </div>

              {/* Attach File */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
                <div className="flex items-center space-x-2 text-xs text-slate-600 truncate max-w-xs">
                  <Paperclip className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{fileName || 'Прикрепить техзадание / реквизиты (PDF, XLS)'}</span>
                </div>
                <label className="cursor-pointer bg-white text-slate-700 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors flex-shrink-0">
                  <span>Обзор</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0096A6] hover:bg-[#007682] text-white font-bold py-3 rounded-2xl shadow-md transition-all text-xs flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Отправка...' : 'Отправить запрос на КП'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
