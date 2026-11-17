import React from 'react';

interface VisitorInsightsProps {
  data: Array<{
    month: string;
    loyalCustomers: number;
    newCustomers: number;
    uniqueVisitors: number;
  }>;
}

export const VisitorInsightsChart: React.FC<VisitorInsightsProps> = ({ data = [] }) => {
  const maxVal = Math.max(...data.map(d => Math.max(d.loyalCustomers, d.newCustomers, d.uniqueVisitors)), 400);

  return (
    <div className="w-full">
      <div className="flex items-center justify-end gap-5 text-xs font-medium text-[#737791] mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#A700FF]" />
          <span>Loyal Customer</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
          <span>New Customer</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3CD856]" />
          <span>Unique Visitor</span>
        </div>
      </div>

      <div className="h-56 w-full flex items-end justify-between gap-2 pt-6 pb-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
            <div className="w-full max-w-[28px] flex items-end justify-center gap-1 h-full">
              <div
                className="w-1.5 rounded-t-full bg-[#A700FF] transition-all duration-300 group-hover:opacity-80"
                style={{ height: `${(item.loyalCustomers / maxVal) * 85}%` }}
                title={`Loyal: ${item.loyalCustomers}`}
              />
              <div
                className="w-1.5 rounded-t-full bg-[#EF4444] transition-all duration-300 group-hover:opacity-80"
                style={{ height: `${(item.newCustomers / maxVal) * 85}%` }}
                title={`New: ${item.newCustomers}`}
              />
              <div
                className="w-1.5 rounded-t-full bg-[#3CD856] transition-all duration-300 group-hover:opacity-80"
                style={{ height: `${(item.uniqueVisitors / maxVal) * 85}%` }}
                title={`Unique: ${item.uniqueVisitors}`}
              />
            </div>
            <span className="text-[11px] text-[#737791] mt-3 font-medium">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
