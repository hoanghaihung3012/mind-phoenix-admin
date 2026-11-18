import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-[18px] sm:rounded-[20px] p-4 sm:p-6 border border-[#F8F9FA] shadow-[0px_4px_20px_rgba(237,242,246,0.5)] transition-all duration-200',
          className
        )
      )}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5">
          <div className="min-w-0">
            {title && <h3 className="text-base sm:text-lg font-bold text-[#151D48] tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-[#737791] mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
