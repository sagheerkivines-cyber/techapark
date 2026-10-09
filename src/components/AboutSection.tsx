import React from 'react';
import { ShieldCheck, Cpu, Code2, Users, Flame, Award, BookOpen, CheckCircle } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/categories';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Masthead Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-md bg-[#0b2721] border border-[#5fdee7]/30 text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>EDITORIAL MANIFESTO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          About TechAPark Journal
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          An independent daily journal dedicated to advancing technical literacy, cryptographic sovereignty, distributed cloud engineering, and high-performance computing cultures.
        </p>
      </div>

      {/* 3 Pillar Statements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-[#5fdee7] mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-white mb-2">
            First-Principles Engineering
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            We reject marketing buzzwords and surface-level rehashes. Every investigation published on TechAPark unpacks underlying kernel system calls, cryptographic formulas, and reproducible benchmarks.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-[#10b981] mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-white mb-2">
            Strict Peer-Review Protocol
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Before an investigation goes live on our daily wire, technical claims are scrutinized by specialized domain architects across threat intelligence, hypervisor telemetry, and distributed networking.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-sky-400 mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-white mb-2">
            Visual Infographic Rigor
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Complex multi-layered architectures require crystal-clear visual schematics. Every single article incorporates a dedicated 6-panel technical infographic blueprint designed for immediate reference.
          </p>
        </div>
      </div>

      {/* The 5 Disciplines Grid */}
      <div className="p-8 rounded-3xl bg-[#071916] border border-[#5fdee7]/30 shadow-2xl mb-16">
        <h3 className="text-2xl font-bold font-display text-white mb-2 text-center">
          Our Five Core Disciplines
        </h3>
        <p className="text-xs text-slate-400 font-mono text-center mb-8 uppercase tracking-wider">
          Curated Daily Across 20 Flagship Deep-Dive Investigation Tracks
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES_LIST.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-xl bg-[#0b2721] border border-[#5fdee7]/20 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono text-[#5fdee7] font-semibold mb-1 block">
                  CATEGORY 0{cat.num}
                </span>
                <h4 className="text-base font-bold text-white font-display mb-2">
                  {cat.id}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#5fdee7]/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>4 In-Depth Guides</span>
                <span className="text-[#10b981]">Active Track</span>
              </div>
            </div>
          ))}
          
          {/* Sixth Special Institutional Card */}
          <div className="p-5 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-[#10b981] font-semibold mb-1 block">
                EDITORIAL GOVERNANCE
              </span>
              <h4 className="text-base font-bold text-white font-display mb-2">
                TechAPark Research Desk
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Operating under strict ethical independence, verified laboratory benchmarks, and open-source verification pipelines.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#5fdee7]/10 text-[11px] font-mono text-[#5fdee7]">
              Continuous 2026 Daily Publication
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
