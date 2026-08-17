import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSlider } from './HeroSlider';
import { CategoriesGrid } from './CategoriesGrid';
import { ProductShowcase } from './ProductShowcase';
import { ServicesSection } from './ServicesSection';
import { WhyUs } from './WhyUs';
import { AudioConfigurator } from './AudioConfigurator';
import { BrandCarousel } from './BrandCarousel';
import { MOCK_NEWS, MOCK_ARTICLES } from '../../data/mockData';
import { Newspaper, BookOpen, ArrowRight, Send, CheckCircle2, Phone, Mail } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setRoute, showNotification } = useApp();
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPhone) return;
    setIsSent(true);
    showNotification('Сообщение успешно отправлено в отдел продаж!', 'success');
    setTimeout(() => {
      setIsSent(false);
      setFormName('');
      setFormPhone('');
      setFormMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <HeroSlider />
      <CategoriesGrid />
      <ProductShowcase />
      <AudioConfigurator />
      <ServicesSection />
      <WhyUs />
      <BrandCarousel />

      {/* News & Articles Teaser */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Новости и полезные статьи
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Обзоры оборудования, рекомендации экспертов mzvuk.by и наши инсталляционные проекты
            </p>
          </div>
          <button
            onClick={() => setRoute('news')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            Все публикации <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* News Item 1 */}
          <div
            onClick={() => setRoute('news')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={MOCK_NEWS[0].image}
                  alt={MOCK_NEWS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/90 text-white text-[10px] font-bold rounded-lg backdrop-blur">
                  {MOCK_NEWS[0].category}
                </span>
              </div>
              <div className="p-5">
                <span className="text-[11px] font-bold text-slate-400 block mb-1">{MOCK_NEWS[0].date}</span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {MOCK_NEWS[0].title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">{MOCK_NEWS[0].summary}</p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-0">
              <span className="text-xs font-bold text-orange-600 inline-flex items-center gap-1">
                Читать далее <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Article Item 1 */}
          <div
            onClick={() => setRoute('articles')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={MOCK_ARTICLES[0].image}
                  alt={MOCK_ARTICLES[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-orange-600 text-white text-[10px] font-bold rounded-lg shadow">
                  Руководство
                </span>
              </div>
              <div className="p-5">
                <span className="text-[11px] font-bold text-slate-400 block mb-1">{MOCK_ARTICLES[0].date}</span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {MOCK_ARTICLES[0].title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">{MOCK_ARTICLES[0].summary}</p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-0">
              <span className="text-xs font-bold text-orange-600 inline-flex items-center gap-1">
                Читать статью <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Article Item 2 */}
          <div
            onClick={() => setRoute('articles')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={MOCK_ARTICLES[1].image}
                  alt={MOCK_ARTICLES[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-lg shadow">
                  Обзор
                </span>
              </div>
              <div className="p-5">
                <span className="text-[11px] font-bold text-slate-400 block mb-1">{MOCK_ARTICLES[1].date}</span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {MOCK_ARTICLES[1].title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">{MOCK_ARTICLES[1].summary}</p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-0">
              <span className="text-xs font-bold text-orange-600 inline-flex items-center gap-1">
                Читать статью <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feedback Form */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-slate-800">
          <div>
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-1">
              Обратная связь
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Остались вопросы по подбору оборудования?
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-3 leading-relaxed">
              Заполните форму, и главный инженер ООО «Арт-Медиа Трейд» проконсультирует вас по наличию, ценам с НДС 20% и поможет подготовить спецификацию.
            </p>

            <div className="space-y-3 mt-6 text-xs text-slate-300">
              <a href="tel:+375333772873" className="flex items-center gap-3 hover:text-orange-400 font-bold">
                <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+375 (33) 377-28-73 (Минск)</span>
              </a>
              <a href="mailto:sales@mzvuk.by" className="flex items-center gap-3 hover:text-orange-400">
                <div className="p-2 bg-slate-800 text-slate-300 rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <span>sales@mzvuk.by</span>
              </a>
            </div>
          </div>

          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700">
            {isSent ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Заявка успешно отправлена!</h3>
                <p className="text-xs text-slate-300">
                  Мы свяжемся с вами в течение 15 минут в рабочее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="Алексей"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={e => setFormPhone(e.target.value)}
                    placeholder="+375 (33) 377-28-73"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Сообщение / Запрос
                  </label>
                  <textarea
                    rows={3}
                    value={formMessage}
                    onChange={e => setFormMessage(e.target.value)}
                    placeholder="Укажите ваш запрос или список оборудования..."
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all"
                >
                  <Send className="w-4 h-4" /> Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
