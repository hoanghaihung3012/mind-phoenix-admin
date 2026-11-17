import React from 'react';

interface CustomerSatisfactionProps {
  data: Array<{
    month: string;
    lastMonth: number;
    thisMonth: number;
  }>;
}

export const CustomerSatisfactionChart: React.FC<CustomerSatisfactionProps> = ({ data = [] }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-5 text-xs font-medium text-[#737791] mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E096]" />
          <span>Last Month</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0095FF]" />
          <span>This Month</span>
        </div>
      </div>

      <div className="h-52 w-full flex items-center justify-center relative">
        <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0095FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0095FF" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="gradGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00E096" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00E096" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area 1 */}
          <path
            d="M 10 120 Q 100 60, 200 90 T 390 30 L 390 150 L 10 150 Z"
            fill="url(#gradBlue)"
          />
          <path
            d="M 10 120 Q 100 60, 200 90 T 390 30"
            fill="none"
            stroke="#0095FF"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Area 2 */}
          <path
            d="M 10 140 Q 100 100, 200 110 T 390 70 L 390 150 L 10 150 Z"
            fill="url(#gradGreen)"
          />
          <path
            d="M 10 140 Q 100 100, 200 110 T 390 70"
            fill="none"
            stroke="#00E096"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex justify-between items-center text-[11px] text-[#737791] font-medium pt-2 border-t border-[#EFF1F6]">
        {data.map((d, i) => (
          <span key={i}>{d.month}</span>
        ))}
      </div>
    </div>
  );
};
