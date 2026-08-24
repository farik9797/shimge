import React, { useState } from 'react';
import { 
  Send, 
  Paperclip, 
  CheckCircle2, 
  Phone, 
  Mail, 
  User, 
  Building2, 
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LeadFormSection: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [comment, setComment] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      showToast('Заявка на оптовый прайс-лист SHIMGE принята! Инженер свяжется с вами.');
    }, 1000);
  };

  return (
    <section className="py-14 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#EBF8F9]/80 via-slate-50 to-emerald-50/50 border border-[#B5E7EC] rounded-3xl p-6 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Info */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center space-x-2 bg-white border border-[#B5E7EC] text-[#0096A6] px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                <Award className="w-4 h-4 text-[#00A859]" />
                <span>Оптовый отдел дистрибьютора SHIMGE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Запросите оптовый прайс-лист и коммерческое предложение
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Предоставляем официальные дилерские скидки для строительных и монтажных организаций, водоканалов, агрокомплексов и торговых компаний.
              </p>

              <div className="space-y-2.5 pt-1 text-xs text-slate-700 font-medium">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859] flex-shrink-0" />
                  <span>Договор и оплата с НДС 12% (электронные счета-фактуры)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859] flex-shrink-0" />
                  <span>Бесплатный расчет рабочей точки и подбор оборудования</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A859] flex-shrink-0" />
                  <span>Предоставление 3D CAD моделей для проектировщиков</span>
                </div>
              </div>
            </div>

            {/* Right: Light Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-200">
              {isSent ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#00A859]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Заявка успешно отправлена!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Менеджер оптового отдела свяжется с вами по телефону <strong>{phone}</strong> и отправит прайс-лист на <strong>{email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setComment('');
                      setFileName(null);
                    }}
                    className="mt-3 text-xs text-[#0096A6] font-bold hover:underline"
                  >
                    Отправить еще одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                    Получить официальное коммерческое предложение:
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Компания / ИП *</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="ООО «Агро Вод Строй»"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:outline-none"
                        />
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Контактное лицо</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Дмитрий"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:outline-none"
                        />
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Телефон *</label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+998 (90) ___ - __ - __"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:outline-none"
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="zakupki@company.uz"
                          className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:outline-none"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Список серий, моделей или техническое задание
                    </label>
                    <textarea
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Например: нужны 3 штуки SHIMGE BLT 16-8 и 2 скважинных насоса 200QJ..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0096A6] focus:outline-none"
                    />
                  </div>

                  {/* File attach */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
                    <div className="flex items-center space-x-2 text-xs text-slate-600 truncate max-w-xs sm:max-w-md">
                      <Paperclip className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{fileName || 'Прикрепить опросный лист / спецификацию (PDF, XLS)'}</span>
                    </div>
                    <label className="cursor-pointer bg-white text-slate-700 text-xs font-bold px-3 py-1 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors flex-shrink-0">
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
                    <span>{loading ? 'Отправка заявки...' : 'Получить оптовый расчет и прайс-лист'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
