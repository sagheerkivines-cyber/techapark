import React from 'react';
import { TICKER_ITEMS } from '../data/articles';
import { Flame, Radio } from 'lucide-react';

interface TickerTapeProps {
  onTagClick?: (tag: string) => void;
}

export const TickerTape: React.FC<TickerTapeProps> = ({ onTagClick }) => {
  // Duplicate array to ensure seamless infinite looping marquee
  const stream = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative w-full overflow-hidden bg-[#071714] border-y border-[#5fdee7]/30 shadow-[0_0_15px_rgba(95,222,231,0.07)]">
      {/* Dynamic left and right fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#071714] via-[#071714]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#071714] via-[#071714]/80 to-transparent z-10" />

      <div className="flex items-center">
        {/* Static badge indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#0b2721] border-r border-[#5fdee7]/25 shrink-0 z-20 text-[#5fdee7]">
          <Radio className="w-3.5 h-3.5 animate-pulse text-[#5fdee7]" />
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase whitespace-nowrap">
            DISPATCH WIRE
          </span>
        </div>

        {/* Scrolling marquee */}
        <div className="overflow-hidden whitespace-nowrap py-2 flex items-center">
          <div className="animate-ticker flex items-center gap-8">
            {stream.map((item, idx) => (
              <div 
                key={idx} 
                className="inline-flex items-center gap-3 text-xs tracking-wide shrink-0 transition-opacity hover:opacity-100 opacity-90 cursor-default"
              >
                <button
                  type="button"
                  onClick={() => onTagClick?.(item.tag)}
                  className="px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider rounded bg-[#10362e] border border-[#5fdee7]/30 text-[#5fdee7] hover:bg-[#5fdee7] hover:text-[#081c18] transition-colors"
                >
                  {item.tag}
                </button>
                <span className="text-slate-300 font-sans text-[13px] hover:text-white transition-colors">
                  {item.text}
                </span>
                <span className="text-[#5fdee7]/40 font-mono select-none" aria-hidden="true">
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
