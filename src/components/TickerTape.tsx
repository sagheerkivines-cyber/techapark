import React from 'react';
import { TICKER_ITEMS } from '../data/articles';
import { Radio } from 'lucide-react';

interface TickerTapeProps {
  onTagClick?: (tag: string) => void;
}

export const TickerTape: React.FC<TickerTapeProps> = ({ onTagClick }) => {
  // Triple array to guarantee perfectly seamless infinite marquee looping
  const stream = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 border-y-2 border-amber-500/80 shadow-[0_4px_22px_rgba(245,158,11,0.35)] text-slate-950">
      {/* Left and right yellow-amber fade gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-amber-400 via-amber-400/90 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-amber-400 via-amber-400/90 to-transparent z-10" />

      <div className="flex items-center">
        {/* Eye-catching Dispatch Wire badge */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a1f19] border-r-2 border-amber-600 shrink-0 z-20 text-[#facc15] shadow-md">
          <Radio className="w-3.5 h-3.5 animate-pulse text-[#facc15]" />
          <span className="text-[11px] font-mono font-black tracking-widest uppercase whitespace-nowrap">
            DAILY WIRE
          </span>
        </div>

        {/* Continuous scrolling yellow ticker marquee */}
        <div className="overflow-hidden whitespace-nowrap py-2 flex items-center">
          <div className="animate-ticker flex items-center gap-8">
            {stream.map((item, idx) => (
              <div 
                key={idx} 
                className="inline-flex items-center gap-3 text-xs tracking-wide shrink-0 transition-opacity hover:opacity-100 opacity-95 cursor-default"
              >
                <button
                  type="button"
                  onClick={() => onTagClick?.(item.tag)}
                  className="px-2.5 py-0.5 text-[10px] font-mono font-black tracking-wider rounded-md bg-[#0a1f19] text-[#fef08a] border border-[#0a1f19]/40 hover:bg-black hover:text-white transition-all shadow-sm"
                >
                  #{item.tag}
                </button>
                <span className="text-slate-950 font-sans font-bold text-[13px] tracking-tight hover:underline transition-all">
                  {item.text}
                </span>
                <span className="text-amber-800 font-mono font-black select-none text-xs" aria-hidden="true">
                  ◆
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
