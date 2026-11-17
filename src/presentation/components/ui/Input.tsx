import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold text-[#151D48] mb-1.5">{label}</label>}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3.5 text-[#737791] pointer-events-none">{icon}</span>}
        <input
          className={clsx(
            'w-full bg-[#F9FAFB] border border-[#EFF1F6] text-[#151D48] text-sm rounded-xl py-2.5 transition-all duration-200 placeholder:text-[#A0A4B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/30 focus:border-[#5D5FEF]',
            icon ? 'pl-10 pr-4' : 'px-4',
            error && 'border-[#FA5A7D] focus:ring-[#FA5A7D]/30 focus:border-[#FA5A7D]',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-[#FA5A7D] mt-1 font-medium">{error}</p>}
    </div>
  );
};
