import React from 'react';
import { clsx } from 'clsx';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  isOnline?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 'md',
  isOnline,
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  const initials = name
    .split(' ')
    .map(p => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative inline-block shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={clsx('rounded-full object-cover border border-slate-100 shadow-sm', sizes[size])}
        />
      ) : (
        <div
          className={clsx(
            'rounded-full bg-[#5D5FEF]/10 text-[#5D5FEF] font-bold flex items-center justify-center border border-[#5D5FEF]/20',
            sizes[size]
          )}
        >
          {initials}
        </div>
      )}
      {isOnline !== undefined && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full ring-2 ring-white',
            isOnline ? 'bg-[#3CD856]' : 'bg-[#A0A4B8]'
          )}
        />
      )}
    </div>
  );
};
