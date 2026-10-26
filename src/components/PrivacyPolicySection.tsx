import React from 'react';
import { OFFICIAL_CONTACT } from '../data/editors';
import { 
  ShieldCheck, Lock, EyeOff, FileText, Database, Server, 
  UserCheck, AlertCircle, Mail, Phone, ArrowLeft, CheckCircle2 
} from 'lucide-react';

interface PrivacyPolicyProps {
  onBackToFeed: () => void;
  onNavigateTab: (tab: 'feed' | 'about' | 'editors' | 'contact' | 'privacy' | 'terms' | 'editorial-standards') => void;
}

export const PrivacyPolicySection: React.FC<PrivacyPolicyProps> = ({ onBackToFeed, onNavigateTab }) => {
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
          DOCUMENT REF: TAP-POL-2026-V4
        </div>
      </div>

      {/* Masthead Banner */}
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-md bg-[#0b2721] border border-[#5fdee7]/30 text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>STATUTORY DATA GOVERNANCE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          Privacy Policy & Data Protection Charter
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Comprehensive disclosure regarding data collection, zero-surveillance design, local client-side storage, international data transfer safeguards, and user rights under GDPR, CCPA/CPRA, and global privacy frameworks.
        </p>

        {/* Policy Metadata Card */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 text-xs font-mono">
          <div>
            <span className="text-slate-400 block mb-0.5">EFFECTIVE DATE:</span>
            <span className="text-white font-bold">October 25, 2026</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">DATA CONTROLLER:</span>
            <span className="text-[#5fdee7] font-bold">TechAPark Engineering Journal</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">DPO & LEAD ARCHITECT:</span>
            <span className="text-white font-bold">Sagheer Ahmad</span>
          </div>
        </div>
      </header>

      {/* Main Legal Content Sections */}
      <div className="space-y-12 text-sm text-slate-300 leading-relaxed">

        {/* 1. Introduction & Zero-Tracking Philosophy */}
        <section className="p-6 rounded-2xl bg-[#081c18] border border-[#5fdee7]/20 space-y-3">
          <div className="flex items-center gap-2 text-base font-bold font-display text-white">
            <EyeOff className="w-5 h-5 text-[#5fdee7]" />
            <h2>1. Introduction & Our Zero-Surveillance Architecture</h2>
          </div>
          <p>
            TechAPark (<code className="text-[#5fdee7] font-mono">https://techapark.com</code>) operates as an independent daily engineering journal and technical benchmarking institution situated in Technology Park. We reject the contemporary surveillance capitalism model of the commercial internet.
          </p>
          <p>
            We design our digital infrastructure under the foundational doctrine of <strong>data minimization by default</strong>. We do not sell, rent, monetize, or broker personal reader information. We do not embed invasive cross-site tracking pixels, fingerprinting scripts, social network telemetry beacons, or third-party behavioral profiling trackers.
          </p>
        </section>

        {/* 2. Data Controller & Official Contact Information */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            2. Identity of the Data Controller
          </h2>
          <p>
            Under the General Data Protection Regulation (GDPR) and related global privacy statutes, the Data Controller responsible for your personal data is:
          </p>
          <div className="p-5 rounded-xl bg-[#0b2721] border border-[#5fdee7]/25 font-mono text-xs space-y-2 text-slate-200">
            <div><strong className="text-white">Organization:</strong> TechAPark Engineering Journal</div>
            <div><strong className="text-white">Editorial Bureau:</strong> Cyber Systems Tower 4, Technology Park</div>
            <div><strong className="text-white">Editor-in-Chief & DPO:</strong> Sagheer Ahmad</div>
            <div><strong className="text-white">Official Email:</strong> <a href={`mailto:${OFFICIAL_CONTACT.email}`} className="text-[#5fdee7] hover:underline">{OFFICIAL_CONTACT.email}</a></div>
            <div><strong className="text-white">Official Telephone / WhatsApp:</strong> <a href={OFFICIAL_CONTACT.whatsappUrl} className="text-[#10b981] hover:underline">{OFFICIAL_CONTACT.phoneDisplay}</a></div>
            <div><strong className="text-white">Official Website:</strong> https://techapark.com</div>
          </div>
        </section>

        {/* 3. Categories of Information We Process */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            3. Information We Collect and Process
          </h2>
          <p>
            We strictly limit the data we process to the following defined scopes:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/20">
              <h3 className="font-bold text-white font-display mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#5fdee7]" />
                A. Voluntary Inquiries & Disclosures
              </h3>
              <p className="text-xs text-slate-300">
                When you contact our newsroom, submit a security vulnerability disclosure, or send a pitch via email, WhatsApp, or our secure contact form, we collect your name, email address, message body, and any voluntary technical attachments provided.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/20">
              <h3 className="font-bold text-white font-display mb-1 flex items-center gap-2">
                <Database className="w-4 h-4 text-[#10b981]" />
                B. Client-Side Isolated Preferences
              </h3>
              <p className="text-xs text-slate-300">
                Your article bookmarks, category filters, and display layout choices are stored <strong>strictly on your local device</strong> via HTML5 <code className="text-[#5fdee7] font-mono">localStorage</code>. This data never touches our server and can be purged by you at any second.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/20">
              <h3 className="font-bold text-white font-display mb-1 flex items-center gap-2">
                <Server className="w-4 h-4 text-sky-400" />
                C. Ephemeral Infrastructure Logs
              </h3>
              <p className="text-xs text-slate-300">
                For defensive network protection, DDoS mitigation, and server uptime monitoring, our reverse proxy logs client IP addresses, requested URI paths, HTTP response codes, and browser user-agent strings. Logs are retained for a rolling 14-day cryptographic cycle before complete overwriting.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0b2721] border border-[#5fdee7]/20">
              <h3 className="font-bold text-white font-display mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                D. No Sensitive Personal Data
              </h3>
              <p className="text-xs text-slate-300">
                TechAPark never requests, processes, or retains special categories of sensitive personal data (such as political affiliations, genetic biometric records, philosophical beliefs, or financial payment details).
              </p>
            </div>
          </div>
        </section>

        {/* 4. Cookies & Web Storage Policy */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            4. Cookies & Web Storage Disclosure
          </h2>
          <p>
            Unlike mainstream ad-supported media sites that load dozens of third-party tracking cookies, TechAPark maintains strict cookie hygiene:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li><strong>No Tracking Cookies:</strong> We do not deploy third-party advertising tracking cookies or persistent cross-site behavioral cookies.</li>
            <li><strong>Local Storage Key (<code className="text-[#5fdee7] font-mono">techapark_bookmarks</code>):</strong> Used exclusively to preserve articles you explicitly choose to bookmark for offline reading.</li>
            <li><strong>Browser Autonomy:</strong> You may clear your cookies and local storage cache at any time via your browser settings without restricting access to our journalism.</li>
          </ul>
        </section>

        {/* 5. Legal Bases for Processing Under GDPR */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            5. Legal Bases for Processing (EU GDPR Art. 6)
          </h2>
          <p>
            We process technical and communication data exclusively under the following recognized legal bases:
          </p>
          <div className="space-y-2.5">
            <div className="p-3.5 rounded-lg bg-[#081c18] border border-[#5fdee7]/15 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Legitimate Interests (Art. 6(1)(f)):</strong> Maintaining server perimeter security, defending against distributed denial-of-service (DDoS) botnets, and validating server uptime.
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-[#081c18] border border-[#5fdee7]/15 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Consent (Art. 6(1)(a)):</strong> When you voluntarily submit queries, security vulnerability reports, or editorial comments to our editors.
              </div>
            </div>
            <div className="p-3.5 rounded-lg bg-[#081c18] border border-[#5fdee7]/15 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Legal Obligation (Art. 6(1)(c)):</strong> Fulfilling statutory compliance directives and cooperating with lawful requests from law enforcement regarding verified cyberattacks.
              </div>
            </div>
          </div>
        </section>

        {/* 6. Third-Party Integrations & Advertising Transparency */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            6. Third-Party Infrastructure & Advertising Standards
          </h2>
          <p>
            To deliver global sub-second page loads and maintain server integrity, we partner with industry-leading infrastructure providers under strict Data Processing Agreements:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li><strong>Content Delivery Network & Edge Security:</strong> Static assets, typography, and TLS termination are managed through enterprise CDN edge nodes with end-to-end HTTPS encryption.</li>
            <li><strong>Authorized Digital Sellers (ads.txt):</strong> TechAPark complies with IAB Tech Lab standards. We maintain a verified <code className="text-[#5fdee7] font-mono">ads.txt</code> record to prevent ad-fraud and impersonation. Any future programmatic ad inventory is strictly non-personalized and honors global Global Privacy Control (GPC) signals.</li>
          </ul>
        </section>

        {/* 7. Data Subject Rights Under GDPR & CCPA/CPRA */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            7. Your Fundamental Privacy Rights
          </h2>
          <p>
            Regardless of your geographical residency, TechAPark extends global data sovereignty rights to every reader:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#0b2721] border border-[#5fdee7]/15">
              <strong className="text-white block mb-1">Right to Access (GDPR Art. 15):</strong>
              Request a machine-readable copy of any correspondence or data linked to your identity.
            </div>
            <div className="p-3.5 rounded-xl bg-[#0b2721] border border-[#5fdee7]/15">
              <strong className="text-white block mb-1">Right to Erasure (GDPR Art. 17):</strong>
              Demand the irreversible deletion of your contact tickets, correspondence records, or pitch submissions.
            </div>
            <div className="p-3.5 rounded-xl bg-[#0b2721] border border-[#5fdee7]/15">
              <strong className="text-white block mb-1">Right to Rectification (GDPR Art. 16):</strong>
              Correct any inaccurate personal details or update author attributions.
            </div>
            <div className="p-3.5 rounded-xl bg-[#0b2721] border border-[#5fdee7]/15">
              <strong className="text-white block mb-1">California CCPA/CPRA Rights:</strong>
              Right to know, right to delete, right to opt-out of sale/sharing (TechAPark does not sell data), and non-discrimination.
            </div>
          </div>
          <p className="text-xs text-slate-400">
            To exercise any of these statutory rights, transmit an authenticated email to our Data Protection Officer at <a href={`mailto:${OFFICIAL_CONTACT.email}`} className="text-[#5fdee7] underline">{OFFICIAL_CONTACT.email}</a>. Requests are resolved within thirty (30) calendar days with zero processing fees.
          </p>
        </section>

        {/* 8. Children's Privacy (COPPA Compliance) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            8. Children’s Online Privacy Protection (COPPA)
          </h2>
          <p>
            TechAPark provides advanced technical analysis designed for software architects, systems engineers, and academic researchers. We do not intentionally target, collect, or solicit personal data from children under thirteen (13) years of age (or under 16 in applicable EU jurisdictions). If we become aware that personal information of a minor has been collected, it is immediately deleted.
          </p>
        </section>

        {/* 9. Security Safeguards & Encryption Standards */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold font-display text-white border-b border-[#5fdee7]/15 pb-2">
            9. Technical Security Standards & Incident Notification
          </h2>
          <p>
            All web traffic to TechAPark is enforced through <strong>TLS 1.3 encryption</strong> with strict HTTP Strict Transport Security (HSTS) headers. Editorial correspondence is safeguarded behind multi-factor authentication and hardware security keys. In the unlikely event of a security breach affecting user data, TechAPark will notify affected parties and regulatory authorities within seventy-two (72) hours in accordance with GDPR Article 33.
          </p>
        </section>

        {/* 10. Official Inquiries & Supervisory Authority */}
        <section className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/30 space-y-4">
          <h2 className="text-xl font-bold font-display text-white">
            10. Privacy Questions & DPO Newsroom Contact
          </h2>
          <p>
            For questions concerning this Privacy Policy, our data practices, or to exercise your statutory rights, please contact our newsroom team directly:
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={`mailto:${OFFICIAL_CONTACT.email}?subject=Official Privacy Inquiry / GDPR Request`}
              className="px-4 py-2 rounded-xl bg-[#5fdee7] text-[#081c18] font-mono text-xs font-bold hover:bg-[#48cbd4] transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email Data Protection Officer</span>
            </a>
            <a
              href={OFFICIAL_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#10b981] text-[#081c18] font-mono text-xs font-bold hover:bg-[#0ea372] transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Official Hotline</span>
            </a>
            <button
              onClick={() => onNavigateTab('contact')}
              className="px-4 py-2 rounded-xl bg-[#081c18] border border-[#5fdee7]/30 text-white font-mono text-xs hover:border-[#5fdee7] transition-colors"
            >
              Open Newsroom Contact Form
            </button>
          </div>
        </section>

      </div>
    </article>
  );
};
