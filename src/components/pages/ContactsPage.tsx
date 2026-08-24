import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building2, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck
} from 'lucide-react';

export const ContactsPage: React.FC = () => {
  const { showToast } = useApp();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      showToast(`${label} скопирован в буфер обмена`);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    showToast('Сообщение отправлено инженеру SHIMGE!');
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setPhone('');
      setEmail('');
      setMsg('');
    }, 3000);
  };

  const branches = [
    {
      city: 'Ташкент (Центральный склад & Офис)',
      address: 'г. Ташкент, Алмазарский район (ООО «Gidromaks Pro»)',
      phone: '+998 (71) 200-00-55',
      email: 'info@shimge.uz',
      schedule: 'Пн-Пт: 9:00 – 18:00',
      isMain: true
    },
    {
      city: 'Самарканд (Региональный представитель)',
      address: 'г. Самарканд, ул. Гагарина',
      phone: '+998 (90) 555-40-30',
      email: 'samarkand@shimge.uz',
      schedule: 'Пн-Пт: 9:00 – 18:00'
    },
    {
      city: 'Ферганская долина (Андижан, Наманган, Фергана)',
      address: 'г. Фергана, ул. Аль-Фергани',
      phone: '+998 (93) 444-20-10',
      email: 'fergana@shimge.uz',
      schedule: 'Пн-Пт: 9:00 – 18:00'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Light Header */}
      <div className="bg-white py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0096A6] uppercase tracking-wider mb-2 bg-[#EBF8F9] px-3 py-1 rounded-full border border-[#B5E7EC]">
            <MapPin className="w-4 h-4 text-[#0096A6]" />
            <span>SHIMGE PUMP UZBEKISTAN</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Контакты, склад и отдел оптовых поставок
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Прямая связь с инженерным департаментом SHIMGE для подбора насосов и согласования отгрузок со склада в Ташкенте.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* 3 Regional Branches */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((b, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-3xl p-6 shadow-xs space-y-3 relative ${
                b.isMain ? 'border-[#0096A6] ring-2 ring-[#0096A6]/15' : 'border-slate-200'
              }`}
            >
              {b.isMain && (
                <span className="absolute top-4 right-4 bg-[#EBF8F9] text-[#0096A6] border border-[#B5E7EC] text-[10px] font-bold px-2 py-0.5 rounded">
                  Главный офис и склад
                </span>
              )}
              <h3 className="text-sm font-bold text-slate-900">{b.city}</h3>
              
              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#0096A6] flex-shrink-0" />
                  <a href={`tel:${b.phone}`} className="font-bold text-slate-900 hover:text-[#0096A6]">
                    {b.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <a href={`mailto:${b.email}`} className="text-slate-700 hover:text-[#0096A6]">
                    {b.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{b.schedule}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form & Legal Requisites */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Feedback Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Задайте вопрос инженеру SHIMGE
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Консультация по подбору насосов под рабочую точку и проверка наличия на складе.
            </p>

            {isSent ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#00A859] mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Ваше сообщение принято!</h3>
                <p className="text-xs text-slate-600">Инженер SHIMGE свяжется с вами в течение 15 минут.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Алексей"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Телефон для связи *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 (90) ___ - __ - __"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="proekt@company.uz"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Текст вопроса или требуемая модель</label>
                  <textarea
                    rows={3}
                    required
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Интересуют насосы серии BLT 16-8 или скважинные 4SGm..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0096A6] focus:border-[#0096A6]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#0096A6] hover:bg-[#007682] text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-xs transition-all flex items-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Отправить обращение</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Legal Requisites */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-[#0096A6] uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" />
                <span>Реквизиты дистрибьютора</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-4">
                ООО «GIDROMAKS PRO» (Официальный дилер SHIMGE)
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ИНН (СТИР):</span>
                    <span className="font-mono font-bold text-slate-900">308 192 450</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('308192450', 'ИНН')}
                    className="text-slate-400 hover:text-[#0096A6] p-1"
                  >
                    {copiedField === 'ИНН' ? <Check className="w-4 h-4 text-[#00A859]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 block">МФО:</span>
                    <span className="font-mono font-bold text-slate-900">00840</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('00840', 'МФО')}
                    className="text-slate-400 hover:text-[#0096A6] p-1"
                  >
                    {copiedField === 'МФО' ? <Check className="w-4 h-4 text-[#00A859]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Банк:</span>
                    <span className="font-semibold text-slate-900">АКБ «Kapitalbank» г. Ташкент</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Расчетный счет:</span>
                    <span className="font-mono font-bold text-slate-900 text-[11px]">2020 8000 9054 1234 5001</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-2 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-[#00A859] flex-shrink-0" />
              <span>Электронный документооборот (ЭСФ) через Didox / Soliq</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
