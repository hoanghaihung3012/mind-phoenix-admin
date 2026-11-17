import React from 'react';
import { clsx } from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeLabel?: string;
  icon: React.ReactNode;
  variant: 'pink' | 'orange' | 'green' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeLabel = 'from yesterday',
  icon,
  variant,
}) => {
  const styles = {
    pink: {
      bg: 'bg-[#FFE2E5]',
      iconBg: 'bg-[#FA5A7D]',
      text: 'text-[#151D48]',
      sub: 'text-[#737791]',
      change: 'text-[#4079ED]',
    },
    orange: {
      bg: 'bg-[#FFF4DE]',
      iconBg: 'bg-[#FF947A]',
      text: 'text-[#151D48]',
      sub: 'text-[#737791]',
      change: 'text-[#4079ED]',
    },
    green: {
      bg: 'bg-[#DCFCE7]',
      iconBg: 'bg-[#3CD856]',
      text: 'text-[#151D48]',
      sub: 'text-[#737791]',
      change: 'text-[#4079ED]',
    },
    purple: {
      bg: 'bg-[#F3E8FF]',
      iconBg: 'bg-[#BF83FF]',
      text: 'text-[#151D48]',
      sub: 'text-[#737791]',
      change: 'text-[#4079ED]',
    },
  }[variant];

  return (
    <div className={clsx('rounded-[20px] p-5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5', styles.bg)}>
      <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center text-white mb-4 shadow-sm', styles.iconBg)}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-[#151D48] tracking-tight">{value}</div>
        <div className="text-xs font-medium text-[#425166] mt-1">{title}</div>
        <div className="text-[11px] font-normal text-[#4079ED] mt-2 flex items-center gap-1">
          <span className="font-semibold">{change}</span>
          <span className="text-[#737791]">{changeLabel}</span>
        </div>
      </div>
    </div>
  );
};
