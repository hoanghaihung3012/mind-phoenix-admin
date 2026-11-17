import React from 'react';

interface TargetVsRealityProps {
  data: Array<{
    month: string;
    targetSales: number;
    realitySales: number;
  }>;
}

export const TargetVsRealityChart: React.FC<TargetVsRealityProps> = ({ data = [] }) => {
  const maxVal = Math.max(...data.map(d => Math.max(d.targetSales, d.realitySales)), 15);

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-5 text-xs font-medium text-[#737791] mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4AB58E]" />
          <span>Reality Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFCF00]" />
          <span>Target Sales</span>
        </div>
      </div>

      <div className="h-52 w-full flex items-end justify-between gap-3 pt-4 pb-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
            <div className="flex items-end gap-1.5 h-full">
              <div
                className="w-3 rounded-t-md bg-[#4AB58E] transition-all duration-300 group-hover:brightness-110"
                style={{ height: `${(item.realitySales / maxVal) * 85}%` }}
                title={`Reality: ${item.realitySales}`}
              />
              <div
                className="w-3 rounded-t-md bg-[#FFCF00] transition-all duration-300 group-hover:brightness-110"
                style={{ height: `${(item.targetSales / maxVal) * 85}%` }}
                title={`Target: ${item.targetSales}`}
              />
            </div>
            <span className="text-[11px] text-[#737791] mt-3 font-medium">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
