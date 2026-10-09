import React from 'react';
import { METRICS_DATA } from '../data/articles';
import { FileCheck, Activity, Users, Award, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const MetricsBar: React.FC = () => {
  const icons = [FileCheck, Activity, Users, Award];

  return (
    <section className="w-full bg-[#071916] border-b border-[#5fdee7]/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS_DATA.map((item, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={index}
                className="group relative p-5 rounded-xl bg-[#0b2721]/80 border border-[#5fdee7]/20 hover:border-[#5fdee7] hover:bg-[#0f342c] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(95,222,231,0.15)] flex flex-col justify-between"
              >
                {/* Pointer icon and delta badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[#081c18] border border-[#5fdee7]/30 flex items-center justify-center text-[#5fdee7] group-hover:scale-110 group-hover:border-[#5fdee7] transition-all">
                    <IconComponent className="w-4 h-4 text-[#5fdee7]" />
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/25">
                    <span>{item.change}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#10b981]" />
                  </div>
                </div>

                {/* Animated value and label */}
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white flex items-baseline gap-1 group-hover:text-[#5fdee7] transition-colors">
                    <span className="font-mono tabular-nums">{item.value}</span>
                    {item.suffix && <span className="text-[#5fdee7]">{item.suffix}</span>}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-sans font-medium line-clamp-1">
                    {item.label}
                  </div>
                </div>

                {/* Bottom subtle indicator line */}
                <div className="mt-4 pt-3 border-t border-[#5fdee7]/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-slate-400">VERIFIED METRIC</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
