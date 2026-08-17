import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CERTIFICATES } from '../../data/mockData';
import { CertificateItem } from '../../types';
import { Download, Eye, Award, X, FileText, CheckCircle2 } from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const { showNotification } = useApp();
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  const handleDownloadPdf = (title: string) => {
    showNotification(`Загрузка PDF документа «${title}» началась...`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
          Официальная документация mzvuk.by
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Сертификаты и документы соответствия
        </h1>
        <p className="text-xs md:text-sm text-slate-600">
          ООО «Арт-Медиа Трейд» поставляет исключительно сертифицированное оборудование ЕАЭС со всеми разрешительными документами.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CERTIFICATES.map(cert => (
          <div
            key={cert.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-orange-500 hover:shadow-xl transition-all p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div
                onClick={() => setActiveCert(cert)}
                className="relative h-56 bg-slate-100 rounded-xl overflow-hidden cursor-pointer group flex items-center justify-center p-4 border border-slate-200"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5">
                  <Eye className="w-4 h-4" /> Увеличить
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">
                  {cert.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mt-0.5">{cert.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Орган: {cert.issuer}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">Действителен до: {cert.validUntil}</span>
              <button
                onClick={() => handleDownloadPdf(cert.title)}
                className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Download Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Типовой договор поставки с НДС 20%</h3>
          <p className="text-xs text-slate-300">
            Скачайте шаблон договора поставки ООО «Арт-Медиа Трейд» для согласования с вашей юридической службой.
          </p>
        </div>

        <button
          onClick={() => handleDownloadPdf('Типовой договор поставки ООО Арт-Медиа Трейд')}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shrink-0"
        >
          <Download className="w-4 h-4" /> Скачать Договор (PDF)
        </button>
      </div>

      {/* Modal Zoom */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden p-6 border border-slate-200">
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-4">{activeCert.title}</h3>
            <img src={activeCert.image} alt={activeCert.title} className="w-full h-auto max-h-[70vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};
