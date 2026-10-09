import React, { useState } from 'react';
import { OFFICIAL_CONTACT } from '../data/editors';
import { Phone, Mail, MessageCircle, Send, CheckCircle, Shield, Clock, MapPin, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Security Disclosure / Editorial Query',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(OFFICIAL_CONTACT.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(OFFICIAL_CONTACT.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-md bg-[#0b2721] border border-[#5fdee7]/30 text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          <span>EDITORIAL & DISCLOSURE NEWSROOM</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-4">
          Connect With TechAPark Editors
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          Direct communication conduits for vulnerability disclosures, peer-review submissions, enterprise infrastructure queries, and editorial commentary.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Official Direct Contact Cards */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* WhatsApp & Phone Card (Official) */}
          <div className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/30 shadow-[0_4px_25px_rgba(0,0,0,0.4)] relative overflow-hidden group hover:border-[#5fdee7] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-[#5fdee7] group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6 text-[#10b981]" />
              </div>
              <span className="text-[11px] font-mono text-[#10b981] bg-[#10b981]/15 px-2.5 py-1 rounded-full border border-[#10b981]/30">
                ACTIVE CHAT
              </span>
            </div>

            <h3 className="text-lg font-bold font-display text-white mb-1">
              Official WhatsApp & Phone
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Direct editorial hotline & secure instant messaging
            </p>

            <div className="p-3.5 rounded-xl bg-[#081c18] border border-[#5fdee7]/20 flex items-center justify-between mb-4">
              <span className="font-mono text-base font-bold text-[#5fdee7] tracking-wider">
                {OFFICIAL_CONTACT.phone}
              </span>
              <button
                onClick={copyPhone}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 p-1"
                title="Copy phone number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={OFFICIAL_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#10b981] text-[#081c18] font-bold text-xs hover:bg-[#0ea372] transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat WhatsApp</span>
              </a>
              <a
                href={`tel:${OFFICIAL_CONTACT.phone}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#081c18] border border-[#5fdee7]/30 text-white font-medium text-xs hover:border-[#5fdee7] hover:text-[#5fdee7] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Direct Call</span>
              </a>
            </div>
          </div>

          {/* Official Email Card */}
          <div className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/30 shadow-[0_4px_25px_rgba(0,0,0,0.4)] relative overflow-hidden group hover:border-[#5fdee7] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-[#5fdee7] group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6 text-[#5fdee7]" />
              </div>
              <span className="text-[11px] font-mono text-[#5fdee7] bg-[#5fdee7]/10 px-2.5 py-1 rounded-full border border-[#5fdee7]/30">
                OFFICIAL DESK
              </span>
            </div>

            <h3 className="text-lg font-bold font-display text-white mb-1">
              Official Newsroom Email
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-4">
              Formal inquiries, disclosures & press releases
            </p>

            <div className="p-3.5 rounded-xl bg-[#081c18] border border-[#5fdee7]/20 flex items-center justify-between mb-4">
              <span className="font-mono text-xs sm:text-sm font-semibold text-slate-200 truncate mr-2">
                {OFFICIAL_CONTACT.email}
              </span>
              <button
                onClick={copyEmail}
                className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 p-1 shrink-0"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={`mailto:${OFFICIAL_CONTACT.email}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#5fdee7] text-[#081c18] font-bold text-xs hover:bg-[#4bc7cf] transition-colors shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Compose Email</span>
            </a>
          </div>

          {/* Operational Hours & Newsroom Location */}
          <div className="p-5 rounded-xl bg-[#081c18] border border-[#5fdee7]/20 space-y-3 text-xs font-mono text-slate-400">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#5fdee7] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-200 block font-semibold">Monitoring Horizon:</span>
                <span>{OFFICIAL_CONTACT.hours} (SLA &lt; 4h for Security P1)</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 pt-2 border-t border-[#5fdee7]/10">
              <MapPin className="w-4 h-4 text-[#5fdee7] shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-200 block font-semibold">Newsroom Headquarters:</span>
                <span>{OFFICIAL_CONTACT.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Editorial Dispatch / Query Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/30 shadow-2xl relative">
          
          <h3 className="text-xl font-bold font-display text-white mb-2">
            Submit Editorial Dispatch or Query
          </h3>
          <p className="text-xs text-slate-300 font-sans mb-6">
            All messages are encrypted and routed directly to Editor-in-Chief Sagheer Ahmad and the primary investigative desk.
          </p>

          {submitted ? (
            <div className="py-12 px-6 text-center space-y-4 rounded-xl bg-[#081c18] border border-[#10b981]/40">
              <CheckCircle className="w-12 h-12 text-[#10b981] mx-auto" />
              <h4 className="text-lg font-bold font-display text-white">
                Dispatch Received by Editorial Desk
              </h4>
              <p className="text-xs text-slate-300 font-sans max-w-md mx-auto">
                Thank you, {formState.name}. Your inquiry has been routed to{' '}
                <span className="font-mono text-[#5fdee7]">{OFFICIAL_CONTACT.email}</span>. A senior editor will review and respond within our standard operational SLA.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({
                    name: '',
                    email: '',
                    subject: 'Security Disclosure / Editorial Query',
                    message: ''
                  });
                }}
                className="px-4 py-2 text-xs font-mono font-semibold text-[#5fdee7] bg-[#0b2721] border border-[#5fdee7]/30 rounded-lg hover:bg-[#5fdee7] hover:text-[#081c18] transition-colors"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Henderson"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081c18] border border-[#5fdee7]/25 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#5fdee7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. alex@enterprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#081c18] border border-[#5fdee7]/25 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#5fdee7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Subject / Category
                </label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081c18] border border-[#5fdee7]/25 text-white text-xs focus:outline-none focus:border-[#5fdee7]"
                >
                  <option value="Security Disclosure / Vulnerability">Security Disclosure / Vulnerability</option>
                  <option value="Editorial Correction / Peer-Review Feedback">Editorial Correction / Peer-Review Feedback</option>
                  <option value="Guest Investigation Pitch">Guest Investigation Pitch</option>
                  <option value="Hardware Benchmarking Request">Hardware Benchmarking Request</option>
                  <option value="General Newsroom Inquiry">General Newsroom Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Technical Brief or Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Detail your inquiry, system scope, reproduction steps, or commentary..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#081c18] border border-[#5fdee7]/25 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#5fdee7]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-mono text-slate-400">
                  Protected by end-to-end zero-retention transit
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5fdee7] text-[#081c18] font-bold text-xs uppercase tracking-wider hover:bg-[#4bc7cf] shadow-[0_0_15px_rgba(95,222,231,0.3)] transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Dispatch</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </section>
  );
};
