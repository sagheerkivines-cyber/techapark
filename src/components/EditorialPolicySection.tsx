import React from 'react';
import { OFFICIAL_CONTACT, EDITORIAL_BOARD } from '../data/editors';
import { 
  ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, FileCheck, 
  Users, Award, Cpu, Mail, ArrowLeft, Terminal, Eye, BookOpen 
} from 'lucide-react';

interface EditorialPolicyProps {
  onBackToFeed: () => void;
  onNavigateTab: (tab: 'feed' | 'about' | 'editors' | 'contact' | 'privacy' | 'terms' | 'editorial-standards') => void;
}

export const EditorialPolicySection: React.FC<EditorialPolicyProps> = ({ onBackToFeed, onNavigateTab }) => {
  return (
    <article className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-sans">
      
      {/* Navigation Breadcrumb / Back button */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#5fdee7]/20">
        <button
          onClick={onBackToFeed}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#5fdee7] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO DAILY WIRE FEED</span>
        </button>
        <div className="text-[11px] font-mono text-slate-400">
          DOCUMENT REF: TAP-EDP-2026-V4
        </div>
      </div>

      {/* Masthead Banner */}
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-md bg-[#0b2721] border border-[#5fdee7]/30 text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider">
          <FileCheck className="w-3.5 h-3.5" />
          <span>JOURNALISTIC CODE & RESEARCH CHARTER</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          Editorial Standards & Peer Review Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          The rigorous operating principles governing TechAPark: dual-blind technical peer review, air-gapped laboratory benchmark verification, zero paid endorsements, transparent corrections, and coordinated security disclosures.
        </p>

        {/* Policy Metadata Card */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 text-xs font-mono">
          <div>
            <span className="text-slate-400 block mb-0.5">ESTABLISHED:</span>
            <span className="text-white font-bold">Volume I, 2026</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">DIRECTOR OF STANDARDS:</span>
            <span className="text-[#5fdee7] font-bold">Sagheer Ahmad</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">LAB BENCHMARK LOCALE:</span>
            <span className="text-white font-bold">Technology Park Labs</span>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-12 text-sm text-slate-300 leading-relaxed">

        {/* 1. Uncompromising Journalistic Independence */}
        <section className="p-6 rounded-2xl bg-[#081c18] border border-[#5fdee7]/20 space-y-3">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#5fdee7]" />
            1. Uncompromising Journalistic Independence
          </h2>
          <p>
            TechAPark exists to provide software architects, systems engineers, and technical leaders with unvarnished, empirical reality. We do not accept sponsored reviews, paid editorial placement, or native advertising masquerading as analysis.
          </p>
          <p>
            No hardware manufacturer, cloud vendor, or venture-backed startup can purchase favorable coverage, alter benchmark test findings, or preview investigations prior to public dissemination. Editorial decisions rest entirely with the Editor-in-Chief and our contributing technical board.
          </p>
        </section>

        {/* 2. The 4-Stage Dual-Blind Peer Review Process */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            2. Dual-Blind Peer Review Architecture
          </h2>
          <p>
            Unlike conventional tech blogs that prioritize viral aggregations, every flagship investigation published on TechAPark must navigate a rigorous four-stage evaluation pipeline before publication:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/20">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#5fdee7]">
                <span className="w-5 h-5 rounded-full bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-[10px]">1</span>
                <span>PRE-PUBLICATION TRIAGE</span>
              </div>
              <p className="text-xs text-slate-300">
                Initial evaluation by the Section Desk Editor to verify novel engineering substance, architectural validity, and compliance with our defensive research scope.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/20">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#10b981]">
                <span className="w-5 h-5 rounded-full bg-[#081c18] border border-[#10b981]/40 flex items-center justify-center text-[10px]">2</span>
                <span>LABORATORY REPLICATION</span>
              </div>
              <p className="text-xs text-slate-300">
                All benchmark numbers, terminal scripts, and kernel configuration claims are replicated inside air-gapped test nodes at our Technology Park hardware lab.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/20">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-sky-400">
                <span className="w-5 h-5 rounded-full bg-[#081c18] border border-sky-400/40 flex items-center justify-center text-[10px]">3</span>
                <span>DUAL-BLIND TECHNICAL SCRUTINY</span>
              </div>
              <p className="text-xs text-slate-300">
                Author identities and reviewer affiliations are anonymized. Two external domain specialists evaluate the mathematical rigor, security threat model, and edge-case handling.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/20">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-amber-400">
                <span className="w-5 h-5 rounded-full bg-[#081c18] border border-amber-400/40 flex items-center justify-center text-[10px]">4</span>
                <span>INFOGRAPHIC SCHEMATIC AUDIT</span>
              </div>
              <p className="text-xs text-slate-300">
                Our graphics desk produces a structured 6-panel technical infographic blueprint to illustrate system topologies, memory workflows, and packet timings accurately.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Fact-Checking & Empirical Replication */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            3. Fact-Checking & Reproducibility Standard
          </h2>
          <p>
            Every empirical claim published on TechAPark must be falsifiable and reproducible. When presenting performance benchmarks, latency histograms, or cryptanalytic timings, our authors are required to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>Disclose exact hardware configurations (CPU stepping, memory timings, cooling loops, firmware revisions).</li>
            <li>Specify underlying operating systems, kernel patch levels, and compiler flags used during execution.</li>
            <li>Provide raw reproducible terminal commands, scripts, or benchmarking suites whenever possible.</li>
            <li>Document testing variance and conduct a minimum of five (5) benchmark passes with statistical outliers discarded.</li>
          </ul>
        </section>

        {/* 4. Corrections Policy & Errata Log */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            4. Corrections, Retractions & Errata Protocol
          </h2>
          <p>
            Precision is our highest priority. When an error of fact or code regression is brought to our attention, we act decisively:
          </p>
          <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/25 space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Minor Typos / Syntax Clarifications:</strong> Corrected immediately within the live article with timestamped revision tracking.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <RefreshCw className="w-4 h-4 text-[#5fdee7] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Substantive Benchmark or Factual Updates:</strong> An explicit &quot;Correction Notice&quot; box is inserted at the top of the article detailing what was corrected, why, and the date of verification.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Full Retraction Standard:</strong> If an investigation&apos;s core premise is proven mathematically or empirically invalid, the article is retracted with a public post-mortem signed by Editor-in-Chief Sagheer Ahmad.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            To submit an errata report or correction challenge, email our senior newsroom desk directly at <a href={`mailto:${OFFICIAL_CONTACT.email}?subject=Errata Report`} className="text-[#5fdee7] underline">{OFFICIAL_CONTACT.email}</a>.
          </p>
        </section>

        {/* 5. Responsible Disclosure Program (ISO/IEC 29147) */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            5. Coordinated Vulnerability Disclosure (CVD)
          </h2>
          <p>
            TechAPark frequently analyzes novel zero-day attack surfaces and cloud infrastructure bypasses. We adhere strictly to the <strong>ISO/IEC 29147 standard for Coordinated Vulnerability Disclosure</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li><strong>Vendor Safe Harbor:</strong> Affected software vendors or hardware manufacturers are given a mandatory ninety (90) day remediation window before technical exploitation details are published.</li>
            <li><strong>Critical Infrastructure Exceptions:</strong> If an actively exploited zero-day is detected in wild attacks, we coordinate immediate defensive advisories focusing exclusively on detection signatures and mitigation without publishing exploit payloads.</li>
            <li><strong>Researcher Recognition:</strong> We provide full journalistic credit and CVE attributions to independent ethical security researchers who submit validated findings.</li>
          </ul>
        </section>

        {/* 6. Human Authorship & Anti-Slop Discipline */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            6. Human Authorship & Strict Anti-AI Slop Policy
          </h2>
          <p>
            The internet is flooded with generic, synthesized AI summaries that lack empirical testing and real-world engineering experience. TechAPark enforces a zero-tolerance policy against unverified synthetic content (&quot;AI Slop&quot;).
          </p>
          <p>
            Every piece published on TechAPark is authored, validated, and signed by human domain specialists with proven industry experience in cloud architecture, infosec auditing, or hardware engineering. Automated tools may only be utilized for static spelling or stylistic syntax checks.
          </p>
        </section>

        {/* 7. Official Editorial Board & Newsroom Desks */}
        <section className="p-6 rounded-2xl bg-[#081c18] border border-[#5fdee7]/30 space-y-4">
          <h2 className="text-xl font-bold font-display text-white">
            7. Connect with the Editorial Board
          </h2>
          <p>
            Interested in submitting an investigation for peer review, challenging a published benchmark, or proposing an editorial collaboration? Reach out to our editors:
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigateTab('editors')}
              className="px-4 py-2 rounded-xl bg-[#5fdee7] text-[#081c18] font-mono text-xs font-bold hover:bg-[#48cbd4] transition-colors flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Meet the Board of Editors</span>
            </button>
            <button
              onClick={() => onNavigateTab('contact')}
              className="px-4 py-2 rounded-xl bg-[#10b981] text-[#081c18] font-mono text-xs font-bold hover:bg-[#0ea372] transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Submit Investigation / Pitch</span>
            </button>
            <button
              onClick={() => onNavigateTab('about')}
              className="px-4 py-2 rounded-xl bg-[#0b2721] border border-[#5fdee7]/30 text-white font-mono text-xs hover:border-[#5fdee7] transition-colors"
            >
              Read Editorial Manifesto
            </button>
          </div>
        </section>

      </div>
    </article>
  );
};
