import React from 'react';
import { 
  ShieldCheck, Cpu, Code2, Users, Flame, Award, BookOpen, 
  CheckCircle, ArrowRight, Server, Microscope, FileText, Mail, Phone 
} from 'lucide-react';
import { CATEGORIES_LIST } from '../data/categories';
import { OFFICIAL_CONTACT, EDITORIAL_BOARD } from '../data/editors';

interface AboutSectionProps {
  onNavigateTab?: (tab: 'feed' | 'about' | 'editors' | 'contact' | 'privacy' | 'terms' | 'editorial-standards') => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateTab }) => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Masthead Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-md bg-[#0b2721] border border-[#5fdee7]/30 text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>EDITORIAL MANIFESTO & INSTITUTIONAL PROFILE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          About TechAPark Journal
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          An independent technical journal and testing laboratory founded in Technology Park. Dedicated to empirical benchmarking, cybersecurity defensibility, cloud systems architecture, and deep engineering literacy.
        </p>

        {/* Fact Sheet Ribbon */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px]">FOUNDED</span>
            <span className="text-white font-bold">Volume I · 2026</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">FREQUENCY</span>
            <span className="text-[#5fdee7] font-bold">Published Daily</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">HEADQUARTERS</span>
            <span className="text-white font-bold">Technology Park</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">EDITOR-IN-CHIEF</span>
            <span className="text-[#10b981] font-bold">Sagheer Ahmad</span>
          </div>
        </div>
      </div>

      {/* 3 Pillar Statements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-[#5fdee7] mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold font-display text-white mb-2">
            First-Principles Engineering
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            We reject marketing buzzwords, speculative hype, and superficial rehashes. Every investigation published on TechAPark dissects underlying kernel system calls, cryptographic formulas, microarchitectures, and reproducible benchmarks.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-[#10b981] mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold font-display text-white mb-2">
            Strict Peer-Review Protocol
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Before an investigation goes live on our daily wire, technical claims undergo dual-blind peer review by qualified domain architects spanning threat intelligence, hypervisor telemetry, distributed networking, and silicon thermals.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-sky-400 mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold font-display text-white mb-2">
            Visual Infographic Rigor
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Complex distributed topologies require crystal-clear visual schematics. Every single article incorporates a dedicated 6-panel technical infographic blueprint engineered for immediate practical reference in enterprise environments.
          </p>
        </div>
      </div>

      {/* Institutional Story & Laboratory Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch">
        <div className="p-8 rounded-3xl bg-[#071916] border border-[#5fdee7]/30 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5fdee7] font-semibold mb-3">
              <Server className="w-4 h-4" />
              <span>THE TECHNOLOGY PARK HERITAGE</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mb-4">
              Born to Fill the Engineering Trust Vacuum
            </h2>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
              <p>
                In an era where technology journalism has increasingly devolved into syndicated press releases and unverified AI summaries, TechAPark was founded at Cyber Systems Tower 4 in Technology Park to restore academic-grade engineering critique.
              </p>
              <p>
                Under the editorial direction of <strong>Sagheer Ahmad</strong>, our newsroom functions simultaneously as a news wire and an experimental computing laboratory. We do not write about security protocols we have not audited, cloud clusters we have not load-tested, or hardware we have not run through oscilloscope verification.
              </p>
              <p>
                Our readers are senior software engineers, enterprise CTOs, cloud architects, infosec analysts, and ambitious developers who demand precise, executable facts over fluff.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#5fdee7]/15 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Air-Gapped Lab Facilities</span>
            <span className="text-[#10b981]">100% Independent</span>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#071916] border border-[#5fdee7]/30 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10b981] font-semibold mb-3">
              <Microscope className="w-4 h-4" />
              <span>EMPIRICAL BENCHMARK METHODOLOGY</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mb-4">
              How We Test & Validate Every Finding
            </h2>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
              <p>
                All benchmarks published on TechAPark are generated inside our controlled physical laboratory. We maintain isolated 10GbE network racks, bare-metal hypervisor testbeds, and calibrated thermal probes to record:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs">
                <li><strong className="text-white">Kernel-Level Latency:</strong> P99 and P99.9 response timings under simulated 100,000 req/sec load.</li>
                <li><strong className="text-white">Silicon Thermals & Wattage:</strong> Real-time clamp-meter electrical power draw and junction thermals.</li>
                <li><strong className="text-white">Cryptographic Throughput:</strong> Hardware AES-NI and SHA-512 acceleration vector metrics.</li>
              </ul>
              <p>
                All scripts and terminal benchmarks are open-sourced so readers can replicate our results in their own development clusters.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#5fdee7]/15 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Reproducible Commands</span>
            <span className="text-[#5fdee7]">Open Methodology</span>
          </div>
        </div>
      </div>

      {/* The 5 Disciplines Grid */}
      <div className="p-8 rounded-3xl bg-[#071916] border border-[#5fdee7]/30 shadow-2xl mb-16">
        <h2 className="text-2xl font-bold font-display text-white mb-2 text-center">
          Our Five Core Disciplines
        </h2>
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
                <h3 className="text-base font-bold text-white font-display mb-2">
                  {cat.id}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#5fdee7]/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Active Research Desks</span>
                <span className="text-[#10b981]">Daily Wire</span>
              </div>
            </div>
          ))}
          
          {/* Institutional Governance Card */}
          <div className="p-5 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-[#10b981] font-semibold mb-1 block">
                EDITORIAL GOVERNANCE
              </span>
              <h3 className="text-base font-bold text-white font-display mb-2">
                TechAPark Research Desk
              </h3>
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

      {/* Mandatory Institutional Links & Desks */}
      {onNavigateTab && (
        <div className="p-8 rounded-3xl bg-[#0b2721] border border-[#5fdee7]/30 text-center space-y-4">
          <h2 className="text-xl font-bold font-display text-white">
            Explore TechAPark Institutional Charters & Policies
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mx-auto">
            Review our foundational editorial standards, privacy protections, and user agreements or connect directly with our newsroom editors:
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('contact')}
              className="px-4 py-2.5 rounded-xl bg-[#5fdee7] text-[#081c18] font-mono text-xs font-bold hover:bg-[#48cbd4] transition-colors"
            >
              Newsroom Hotlines & Contact Desks
            </button>
            <button
              onClick={() => onNavigateTab('editorial-standards')}
              className="px-4 py-2.5 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 text-[#5fdee7] font-mono text-xs hover:bg-[#5fdee7] hover:text-[#081c18] transition-colors"
            >
              Editorial Standards & Peer Review
            </button>
            <button
              onClick={() => onNavigateTab('privacy')}
              className="px-4 py-2.5 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 text-slate-200 font-mono text-xs hover:border-[#5fdee7] transition-colors"
            >
              Privacy Policy (Zero-Tracking)
            </button>
            <button
              onClick={() => onNavigateTab('terms')}
              className="px-4 py-2.5 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 text-slate-200 font-mono text-xs hover:border-[#5fdee7] transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
