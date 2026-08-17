import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {notifications.map(n => (
        <div
          key={n.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            n.type === 'success'
              ? 'bg-slate-900/95 text-white border-emerald-500/30'
              : n.type === 'error'
              ? 'bg-rose-950/95 text-white border-rose-500/30'
              : 'bg-slate-800/95 text-white border-blue-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            {n.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
            {n.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {n.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
            <span className="text-sm font-medium">{n.message}</span>
          </div>
          <button
            onClick={() => removeNotification(n.id)}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors ml-3"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
