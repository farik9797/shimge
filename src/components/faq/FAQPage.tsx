import React, { useState } from 'react';
import { MOCK_FAQS } from '../../data/mockData';
import { HelpCircle, ChevronDown, Search, MessageSquare, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FAQPage: React.FC = () => {
  const { showNotification } = useApp();
  const [openFaqId, setOpenFaqId] = useState<string | null>(MOCK_FAQS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [userQuestion, setUserQuestion] = useState('');

  const filteredFaqs = MOCK_FAQS.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion) return;
    showNotification('Ваш вопрос отправлен в службу поддержки!', 'success');
    setUserQuestion('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
          База знаний
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Часто задаваемые вопросы (FAQ)
        </h1>
        <p className="text-xs text-slate-600">
          Ответы на вопросы по безналичному расчету с НДС, логистике, гарантии и подбору оборудования.
        </p>

        {/* Live FAQ Search */}
        <div className="relative max-w-lg mx-auto pt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Поиск по вопросам (например: НДС, гарантия, доставка)..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 focus:border-orange-500 rounded-2xl text-xs outline-none shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map(faq => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left font-bold text-sm text-slate-900 hover:text-orange-600 flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-orange-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 mt-1 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ask Question Form */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Не нашли ответ на свой вопрос?</h3>
        <p className="text-xs text-slate-300">
          Задайте вопрос напрямую нашему главному инженеру по продажам.
        </p>

        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <input
            type="text"
            required
            value={userQuestion}
            onChange={e => setUserQuestion(e.target.value)}
            placeholder="Напишите ваш вопрос..."
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Задать вопрос
          </button>
        </form>
      </div>
    </div>
  );
};
