import React from 'react';

interface TargetVsRealityProps {
  data?: any;
}

export const TargetVsRealityChart: React.FC<TargetVsRealityProps> = ({ data }) => {
  const list: Array<{ month?: string; label?: string; targetSales: number; realitySales: number }> =
    Array.isArray(data)
      ? data
      : data?.data || [
          { month: 'Jan', realitySales: 7500, targetSales: 9200 },
          { month: 'Feb', realitySales: 6200, targetSales: 8100 },
          { month: 'Mar', realitySales: 8900, targetSales: 9800 },
          { month: 'Apr', realitySales: 7100, targetSales: 8500 },
          { month: 'May', realitySales: 9400, targetSales: 10200 },
          { month: 'Jun', realitySales: 8823, targetSales: 12122 },
        ];

  const maxVal = Math.max(
    ...list.map(d => Math.max(d.targetSales || 0, d.realitySales || 0)),
    15
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-start sm:justify-end gap-3 sm:gap-5 text-[11px] sm:text-xs font-medium text-[#737791] mb-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4AB58E] shrink-0" />
          <span>Reality Sales</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFCF00] shrink-0" />
          <span>Target Sales</span>
        </div>
      </div>

      <div className="h-52 w-full flex items-end justify-between gap-3 pt-4 pb-2">
        {list.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
            <div className="flex items-end gap-1.5 h-full">
              <div
                className="w-3 rounded-t-md bg-[#4AB58E] transition-all duration-300 group-hover:brightness-110"
                style={{ height: `${((item.realitySales || 0) / maxVal) * 85}%` }}
                title={`Reality: ${item.realitySales}`}
              />
              <div
                className="w-3 rounded-t-md bg-[#FFCF00] transition-all duration-300 group-hover:brightness-110"
                style={{ height: `${((item.targetSales || 0) / maxVal) * 85}%` }}
                title={`Target: ${item.targetSales}`}
              />
            </div>
            <span className="text-[11px] text-[#737791] mt-3 font-medium">
              {item.month || item.label || `M${i + 1}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
