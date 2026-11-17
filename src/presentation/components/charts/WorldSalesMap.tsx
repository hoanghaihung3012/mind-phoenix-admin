import React from 'react';

interface WorldSalesProps {
  data: Array<{
    country: string;
    percentage: number;
    color: string;
  }>;
}

export const WorldSalesMap: React.FC<WorldSalesProps> = ({ data = [] }) => {
  return (
    <div className="w-full">
      <div className="relative h-44 w-full bg-[#F9FAFB] rounded-xl flex items-center justify-center overflow-hidden border border-[#EFF1F6] mb-4">
        <svg viewBox="0 0 600 300" className="w-full h-full opacity-30 text-[#A0A4B8]">
          <ellipse cx="300" cy="150" rx="260" ry="120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 80 120 Q 150 80, 220 140 T 360 160 T 500 110" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="160" cy="110" r="14" fill="#5D5FEF" fillOpacity="0.4" />
          <circle cx="160" cy="110" r="6" fill="#5D5FEF" />
          <circle cx="380" cy="140" r="18" fill="#3CD856" fillOpacity="0.4" />
          <circle cx="380" cy="140" r="8" fill="#3CD856" />
          <circle cx="480" cy="180" r="12" fill="#FFA800" fillOpacity="0.4" />
          <circle cx="480" cy="180" r="5" fill="#FFA800" />
        </svg>
      </div>

      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-xs font-semibold text-[#151D48]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span>{item.country}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 bg-[#EFF1F6] h-1.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
              </div>
              <span className="w-8 text-right text-[#737791] font-medium">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
