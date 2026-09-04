import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendPositive?: boolean;
  icon: LucideIcon;
  variant?: 'emerald' | 'amber' | 'stone' | 'rose';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendPositive,
  icon: Icon,
  variant = 'emerald',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'amber':
        return {
          iconBg: 'bg-[#FDF8EE] text-[#B27D26] border-[#F2CC8F]',
          accent: 'text-[#B27D26]',
        };
      case 'rose':
        return {
          iconBg: 'bg-[#FDF0ED] text-[#E2725B] border-[#E2725B]/30',
          accent: 'text-[#E2725B]',
        };
      case 'stone':
        return {
          iconBg: 'bg-[#F4F1EA] text-[#586358] border-[#E5E1D8]',
          accent: 'text-[#586358]',
        };
      case 'emerald':
      default:
        return {
          iconBg: 'bg-[#F0EDE6] text-[#588157] border-[#E5E1D8]',
          accent: 'text-[#588157]',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs hover:border-[#A3B18A] transition-all">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-tight text-[#6D756D]">
            {title}
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1F241F] mt-1 tracking-tight">
            {value}
          </div>
        </div>
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${styles.iconBg} shadow-2xs`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 flex items-center gap-2 text-xs text-[#6D756D] pt-2.5 border-t border-[#F0EDE6]">
          {trend && (
            <span
              className={`font-semibold ${
                trendPositive ? 'text-[#588157]' : 'text-[#E2725B]'
              }`}
            >
              {trend}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
