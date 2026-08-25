import React from 'react';
import { Phone, Send, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickContactBar: React.FC = () => {
  const { openRfqModal } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end space-y-2.5">
      
      {/* Telegram Direct Link to Rustam */}
      <a
        href="https://t.me/Rustamshimge"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#229ED9] hover:bg-[#1D8BC0] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        title="Написать в Telegram (Рустам)"
      >
        <Send className="w-5 h-5 -translate-x-0.5 translate-y-0.5" />
      </a>

      {/* Quick RFQ Quote Modal trigger */}
      <button
        onClick={() => openRfqModal()}
        className="w-12 h-12 bg-[#0096A6] hover:bg-[#007682] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        title="Запросить расчет и коммерческое предложение"
      >
        <MessageCircle className="w-5 h-5" />
      </button>

      {/* Direct Phone Call */}
      <a
        href="tel:+998977433738"
        className="w-12 h-12 bg-[#00A859] hover:bg-[#009639] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform animate-bounce"
        title="Позвонить: +998 97 743 37 38"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
};
