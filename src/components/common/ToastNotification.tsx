import React from 'react';
import { useLearning } from '../../context/LearningContext';
import { Bell, BookOpen, FileCheck, Award, AlertCircle, X } from 'lucide-react';

export const ToastNotification: React.FC<{
  onNavigate?: (tab: string, contextId?: string) => void;
}> = ({ onNavigate }) => {
  const { activeToast, dismissToast } = useLearning();

  if (!activeToast) return null;

  const getIcon = () => {
    switch (activeToast.type) {
      case 'COURSE':
        return <BookOpen className="w-5 h-5 text-[#588157]" />;
      case 'ASSESSMENT':
        return <FileCheck className="w-5 h-5 text-[#B27D26]" />;
      case 'CERTIFICATE':
        return <Award className="w-5 h-5 text-[#A3B18A]" />;
      default:
        return <Bell className="w-5 h-5 text-[#588157]" />;
    }
  };

  const handleClick = () => {
    if (activeToast.actionUrl && onNavigate) {
      onNavigate(activeToast.actionUrl);
    }
    dismissToast();
  };

  return (
    <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-md w-full animate-in slide-in-from-top-4 fade-in duration-200">
      <div className="bg-[#343F35] text-[#E8EDEA] rounded-2xl p-4 shadow-xl border border-[#4A5D4E] flex items-start gap-3 relative backdrop-blur-xs">
        <div className="p-2 rounded-xl bg-[#262E27] shrink-0">
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3B18A] bg-[#262E27] px-2 py-0.5 rounded-full">
              {activeToast.type} Alert
            </span>
            <span className="text-[10px] text-[#E8EDEA]/70">Just now</span>
          </div>

          <h4 className="text-xs font-bold text-white leading-snug">
            {activeToast.title}
          </h4>
          <p className="text-[11px] text-[#E8EDEA]/80 mt-1 leading-relaxed line-clamp-2">
            {activeToast.message}
          </p>

          {activeToast.actionUrl && (
            <button
              onClick={handleClick}
              className="mt-2 text-[11px] font-bold text-[#DDE5B6] hover:text-white underline cursor-pointer inline-flex items-center gap-1"
            >
              Open & Review Now →
            </button>
          )}
        </div>

        <button
          onClick={dismissToast}
          aria-label="Dismiss notification"
          className="absolute top-3 right-3 text-[#E8EDEA]/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
