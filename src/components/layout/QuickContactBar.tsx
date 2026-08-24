import React from 'react';
import { Phone, Send, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickContactBar: React.FC = () => {
  const { openRfqModal } = useApp();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end space-y-2">
      {/* Telegram Floating Link */}
      <a
        href="https://t.me/shimge_uz"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 bg-[#229ED9] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        title="Telegram orqali bog'lanish"
      >
        <Send className="w-5 h-5 -translate-x-0.5 translate-y-0.5" />
      </a>

      {/* Direct Phone Call */}
      <a
        href="tel:+998712000055"
        className="w-12 h-12 bg-[#00A859] hover:bg-[#009639] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform animate-bounce"
        title="Telefon: +998 (71) 200-00-55"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
};
