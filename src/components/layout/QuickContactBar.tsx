import React from 'react';
import { Phone, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickContactBar: React.FC = () => {
  const { openRfqModal } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end space-y-2.5">
      {/* Quick RFQ Quote Modal trigger (Без внешних ссылок) */}
      <button
        onClick={() => openRfqModal()}
        className="w-12 h-12 bg-[#0096A6] hover:bg-[#007682] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        title="Запросить расчет и коммерческое предложение"
      >
        <Send className="w-5 h-5 -translate-x-0.5 translate-y-0.5" />
      </button>

      {/* Direct Phone Call */}
      <a
        href="tel:+998712000055"
        className="w-12 h-12 bg-[#00A859] hover:bg-[#009639] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform animate-bounce"
        title="Позвонить: +998 (71) 200-00-55"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
};
