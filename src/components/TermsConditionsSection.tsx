import React from 'react';
import { OFFICIAL_CONTACT } from '../data/editors';
import { 
  FileText, Shield, AlertTriangle, Scale, CheckCircle2, 
  Copyright, Mail, ArrowLeft, ExternalLink, Terminal 
} from 'lucide-react';

interface TermsConditionsProps {
  onBackToFeed: () => void;
  onNavigateTab: (tab: 'feed' | 'about' | 'editors' | 'contact' | 'privacy' | 'terms' | 'editorial-standards') => void;
}

export const TermsConditionsSection: React.FC<TermsConditionsProps> = ({ onBackToFeed, onNavigateTab }) => {
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
          DOCUMENT REF: TAP-TOS-2026-V4
        </div>
      </div>

      {/* Masthead Banner */}
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-md bg-[#0b2721] border border-[#5fdee7]/30 text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>LEGAL AGREEMENT & USAGE TERMS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          Terms & Conditions of Service
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Governing legal terms, educational software licenses, defensive security research scopes, intellectual property rights, and user responsibilities for TechAPark Engineering Journal.
        </p>

        {/* Legal Metadata Card */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 text-xs font-mono">
          <div>
            <span className="text-slate-400 block mb-0.5">EFFECTIVE DATE:</span>
            <span className="text-white font-bold">October 25, 2026</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">PUBLISHING ENTITY:</span>
            <span className="text-[#5fdee7] font-bold">TechAPark Engineering Journal</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">LEGAL JURISDICTION:</span>
            <span className="text-white font-bold">Technology Park Legal Framework</span>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-12 text-sm text-slate-300 leading-relaxed">

        {/* 1. Acceptance of Terms */}
        <section className="p-6 rounded-2xl bg-[#081c18] border border-[#5fdee7]/20 space-y-3">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#5fdee7]" />
            1. Acceptance of the Terms
          </h2>
          <p>
            By accessing, reading, indexing, or utilizing the articles, code samples, architecture blueprints, and benchmarks published on TechAPark (<code className="text-[#5fdee7] font-mono">https://techapark.com</code>), you agree to be bound legally by these Terms & Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you disagree with any portion of these terms, you are prohibited from accessing or using this site.
          </p>
        </section>

        {/* 2. Defensive Security & Educational Research Scope */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            2. Defensive Security & Educational Research Protocol
          </h2>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">STRICT DUAL-USE & DEFENSIVE NOTICE:</strong>
              All vulnerability case studies, terminal commands, network configuration scripts, and cryptographic analyses published on TechAPark are provided exclusively for <strong>educational, defensive engineering, and academic verification purposes</strong>.
            </div>
          </div>
          <p>
            You agree never to deploy, adapt, or utilize any security testing methodology, code snippet, or penetration testing script provided on TechAPark against any network, server, database, or device without explicit, verifiable, written authorization from the system’s rightful owner. TechAPark and its editorial board strictly condemn malicious computer intrusion, unauthorized data access, and computer fraud.
          </p>
        </section>

        {/* 3. Intellectual Property Rights & Copyright */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            3. Intellectual Property & Copyright Notice
          </h2>
          <p>
            All original technical investigative journalism, editorial texts, custom technical infographics, visual schematics, audio transcriptions, and bespoke styling on TechAPark are the exclusive intellectual property of <strong>TechAPark Engineering Journal</strong> and its Editor-in-Chief Sagheer Ahmad, protected under international copyright, trademark, and trade dress statutes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/15">
              <strong className="text-white block mb-1">Permitted Fair Use:</strong>
              You may cite excerpts, summarize findings, or reference benchmark figures in academic papers, technical whitepapers, or industry reviews, provided that explicit editorial attribution and a live hyperlink to the original TechAPark canonical URL are prominently displayed.
            </div>
            <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/15">
              <strong className="text-white block mb-1">Prohibited Mass Scraping:</strong>
              Mass reproduction, automated scraping for commercial AI foundational model training without licensing, and systematic mirroring of TechAPark’s entire catalogue are strictly prohibited without prior written consent.
            </div>
          </div>
        </section>

        {/* 4. Code Sample Open-Source License */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            4. Code Snippets & Configuration Licensing
          </h2>
          <p>
            Unless explicitly noted otherwise, raw configuration files, bash scripts, and code snippets embedded within our engineering articles are made available under the terms of the <strong>MIT License</strong>:
          </p>
          <div className="p-4 rounded-xl bg-[#061512] border border-[#5fdee7]/25 font-mono text-xs text-slate-300 space-y-2">
            <p className="text-[#5fdee7]">THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.</p>
          </div>
        </section>

        {/* 5. User Conduct & Acceptable Use Policy */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            5. User Conduct & Prohibited Activities
          </h2>
          <p>When utilizing TechAPark, you agree that you will not:</p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>Engage in denial-of-service (DoS) or distributed denial-of-service (DDoS) attacks against our infrastructure or CDN edges.</li>
            <li>Attempt to probe, scan, or breach authentication barriers or administrative routes without prior written bug-bounty coordination.</li>
            <li>Submit fraudulent, abusive, defamatory, or deceptive messages through our newsroom hotlines, pitch portals, or comment forms.</li>
            <li>Misrepresent your identity or falsely claim affiliation with TechAPark, its Editor-in-Chief, or its board of contributing analysts.</li>
          </ul>
        </section>

        {/* 6. Disclaimer of Warranties */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            6. Disclaimer of Warranties
          </h2>
          <p>
            The materials on TechAPark are provided on an &quot;as is&quot; and &quot;as available&quot; basis. TechAPark makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>
          <p>
            While our investigative lab tests all benchmarks rigorously under air-gapped conditions, hardware revisions, driver updates, and operating system kernel changes may cause variance. TechAPark does not warrant the accuracy, likely results, or reliability of third-party hardware performance outside of our controlled laboratory tests.
          </p>
        </section>

        {/* 7. Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            7. Limitation of Liability
          </h2>
          <p>
            In no event shall TechAPark, its editors, authors, or infrastructure affiliates be liable for any damages (including, without limitation, damages for loss of data, loss of cloud credits, server outage, hardware malfunction, or business interruption) arising out of the use or inability to use the research, code, or materials on TechAPark, even if TechAPark has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        {/* 8. DMCA Copyright Infringement & Takedown Policy */}
        <section className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 space-y-4">
          <div className="flex items-center gap-2 text-base font-bold font-display text-white">
            <Copyright className="w-5 h-5 text-[#5fdee7]" />
            <h2>8. DMCA & Intellectual Property Takedown Requests</h2>
          </div>
          <p>
            TechAPark respects the intellectual property rights of others. If you believe that your copyrighted work has been copied in a manner that constitutes copyright infringement, please transmit a notice of claimed infringement to our Designated Copyright Agent:
          </p>
          <div className="p-4 rounded-xl bg-[#081c18] border border-[#5fdee7]/20 font-mono text-xs space-y-1.5 text-slate-200">
            <div><strong className="text-white">Designated Agent:</strong> Sagheer Ahmad (Editor-in-Chief)</div>
            <div><strong className="text-white">Email Address:</strong> <a href={`mailto:${OFFICIAL_CONTACT.email}?subject=DMCA Notice`} className="text-[#5fdee7] hover:underline">{OFFICIAL_CONTACT.email}</a></div>
            <div><strong className="text-white">Mailing Address:</strong> TechAPark Newsroom, Cyber Systems Tower 4, Technology Park</div>
            <div><strong className="text-white">Required Elements:</strong> Clear identification of copyrighted work, precise URL on TechAPark, physical or electronic signature, statement of good faith belief, and valid contact details.</div>
          </div>
        </section>

        {/* 9. Governing Law & Dispute Resolution */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            9. Governing Law & Jurisdiction
          </h2>
          <p>
            These Terms & Conditions shall be governed by and construed in accordance with the laws governing Technology Park commercial publications and international digital content standards. Any legal dispute or controversy arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent arbitration tribunals of Technology Park.
          </p>
        </section>

        {/* 10. Modifications & Official Contact */}
        <section className="p-6 rounded-2xl bg-[#081c18] border border-[#5fdee7]/30 space-y-4">
          <h2 className="text-xl font-bold font-display text-white">
            10. Modifications & Official Legal Inquiries
          </h2>
          <p>
            TechAPark reserves the right to revise these Terms & Conditions at any time without advance notice. By continuing to use this website after changes are posted, you agree to be bound by the then-current version. For legal notices and formal communications:
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={`mailto:${OFFICIAL_CONTACT.email}?subject=Official Terms & Legal Notice`}
              className="px-4 py-2 rounded-xl bg-[#5fdee7] text-[#081c18] font-mono text-xs font-bold hover:bg-[#48cbd4] transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Legal & Editorial Desk</span>
            </a>
            <button
              onClick={() => onNavigateTab('about')}
              className="px-4 py-2 rounded-xl bg-[#0b2721] border border-[#5fdee7]/30 text-white font-mono text-xs hover:border-[#5fdee7] transition-colors"
            >
              Read About TechAPark
            </button>
          </div>
        </section>

      </div>
    </article>
  );
};
