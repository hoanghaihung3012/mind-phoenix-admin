import React from 'react';

interface TotalRevenueProps {
  data: Array<{
    day: string;
    onlineSales: number;
    offlineSales: number;
  }>;
}

export const TotalRevenueChart: React.FC<TotalRevenueProps> = ({ data = [] }) => {
  const maxVal = Math.max(...data.map(d => Math.max(d.onlineSales, d.offlineSales)), 30);

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-5 text-xs font-medium text-[#737791] mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0095FF]" />
          <span>Online Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E096]" />
          <span>Offline Sales</span>
        </div>
      </div>

      <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 pb-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
            <div className="flex items-end gap-1.5 h-full">
              <div
                className="w-3 rounded-t-md bg-[#0095FF] transition-all duration-300 group-hover:brightness-110"
                style={{ height: `${(item.onlineSales / maxVal) * 85}%` }}
                title={`Online: $${item.onlineSales}k`}
              />
              <div
                className="w-3 rounded-t-md bg-[#00E096] transition-all duration-300 group-hover:brightness-110"
                style={{ height: `${(item.offlineSales / maxVal) * 85}%` }}
                title={`Offline: $${item.offlineSales}k`}
              />
            </div>
            <span className="text-[11px] text-[#737791] mt-3 font-medium">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
