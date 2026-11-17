import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
}) => {
  const variants = {
    success: 'bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]',
    warning: 'bg-[#FFF4DE] text-[#B45309] border border-[#FDE68A]',
    danger: 'bg-[#FFE2E5] text-[#B91C1C] border border-[#FECDD3]',
    info: 'bg-[#E0E7FF] text-[#4338CA] border border-[#C7D2FE]',
    neutral: 'bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 rounded-full font-semibold',
    md: 'text-xs px-2.5 py-1 rounded-full font-semibold',
  };

  return (
    <span className={clsx('inline-flex items-center gap-1 leading-none', variants[variant], sizes[size])}>
      {children}
    </span>
  );
};
