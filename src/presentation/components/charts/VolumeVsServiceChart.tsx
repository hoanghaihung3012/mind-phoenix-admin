import React from 'react';

interface VolumeVsServiceProps {
  data?: any;
}

export const VolumeVsServiceChart: React.FC<VolumeVsServiceProps> = ({ data }) => {
  const volume = Number(data?.volume ?? data?.totalVolume ?? 1135) || 1135;
  const service = Number(data?.service ?? data?.totalServices ?? 635) || 635;
  const total = volume + service;
  const volPct = Math.round((volume / total) * 100);
  const srvPct = 100 - volPct;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-40 h-40 flex items-center justify-center my-2">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#00E096"
            strokeWidth="10"
            strokeDasharray={`${(volPct / 100) * 238.76} 238.76`}
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#0095FF"
            strokeWidth="10"
            strokeDasharray={`${(srvPct / 100) * 238.76} 238.76`}
            strokeDashoffset={`-${(volPct / 100) * 238.76}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-xl font-bold text-[#151D48]">{total}</span>
          <span className="block text-[10px] text-[#737791]">Total Ratio</span>
        </div>
      </div>

      <div className="w-full flex items-center justify-around text-xs mt-3 pt-3 border-t border-[#EFF1F6]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E096]" />
          <div>
            <p className="text-[#737791] text-[10px]">Volume</p>
            <p className="font-bold text-[#151D48]">{volume}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0095FF]" />
          <div>
            <p className="text-[#737791] text-[10px]">Service</p>
            <p className="font-bold text-[#151D48]">{service}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
