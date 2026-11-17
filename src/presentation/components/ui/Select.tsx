import React from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: Array<{ value: string | number; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  children,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-semibold text-[#151D48] mb-1.5">{label}</label>}
      <div className="relative">
        <select
          className={clsx(
            'w-full appearance-none bg-[#F9FAFB] border border-[#EFF1F6] text-[#151D48] text-sm rounded-xl py-2.5 pl-4 pr-10 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/30 focus:border-[#5D5FEF]',
            error && 'border-[#FA5A7D]',
            className
          )}
          {...props}
        >
          {options
            ? options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737791] pointer-events-none" />
      </div>
      {error && <p className="text-[11px] text-[#FA5A7D] mt-1 font-medium">{error}</p>}
    </div>
  );
};
