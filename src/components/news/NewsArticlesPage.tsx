import React, { useState } from 'react';
import { MOCK_NEWS, MOCK_ARTICLES } from '../../data/mockData';
import { NewsItem, ArticleItem } from '../../types';
import { Newspaper, BookOpen, Clock, Calendar, ArrowRight, X, User } from 'lucide-react';

export const NewsArticlesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'articles'>('news');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in space-y-8">
      {/* Title & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Новости и Блог экспертов mzvuk.by
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Анонсы поступлений, обзоры профессионального звукового оборудования и гиды
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'news'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Newspaper className="w-4 h-4" /> Новости компании
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'articles'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Статьи и обзоры
          </button>
        </div>
      </div>

      {/* Tab Content: News */}
      {activeTab === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_NEWS.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-500 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/90 text-white text-[10px] font-bold rounded-lg backdrop-blur">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">{item.date}</span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-0">
                <span className="text-xs font-bold text-orange-600 inline-flex items-center gap-1">
                  Читать новость полностью <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Articles */}
      {activeTab === 'articles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_ARTICLES.map(art => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-500 hover:shadow-xl transition-all cursor-pointer group flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 h-48 md:h-auto overflow-hidden relative shrink-0">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 md:w-3/5 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-1">
                    <User className="w-3 h-3 text-orange-500" />
                    <span>{art.author}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>{art.date}</span>
                  <span className="text-orange-600 font-bold flex items-center gap-1">
                    Читать <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 overflow-hidden max-h-[90vh] overflow-y-auto border border-slate-200 space-y-4">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-orange-600 uppercase">{selectedNews.category} • {selectedNews.date}</span>
            <h2 className="text-xl font-bold text-slate-900">{selectedNews.title}</h2>
            <img src={selectedNews.image} alt="" className="w-full h-64 object-cover rounded-2xl" />
            <p className="text-xs text-slate-700 leading-relaxed font-medium">{selectedNews.content}</p>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 overflow-hidden max-h-[90vh] overflow-y-auto border border-slate-200 space-y-4">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-orange-600 uppercase">Автор: {selectedArticle.author}</span>
            <h2 className="text-xl font-bold text-slate-900">{selectedArticle.title}</h2>
            <img src={selectedArticle.image} alt="" className="w-full h-64 object-cover rounded-2xl" />
            <p className="text-xs text-slate-700 leading-relaxed font-medium">{selectedArticle.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};
