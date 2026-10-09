import React from 'react';
import { EDITORIAL_BOARD, OFFICIAL_CONTACT } from '../data/editors';
import { ShieldCheck, Mail, Phone, MessageCircle, Award, Terminal } from 'lucide-react';

export const EditorsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Masthead */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-md bg-[#0b2721] border border-[#5fdee7]/30 text-xs font-mono font-bold text-[#5fdee7] uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" />
          <span>EDITORIAL BOARD & NEWSROOM LEADERSHIP</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight mb-4">
          TechAPark Editors & Architects
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          Led by Editor-in-Chief Sagheer Ahmad, our senior technical contributors combine doctoral cryptanalysis, cloud infrastructure leadership, and systems engineering benchmarks.
        </p>
      </div>

      {/* Editor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {EDITORIAL_BOARD.map((editor, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#0b2721] border border-[#5fdee7]/25 shadow-lg flex flex-col justify-between hover:border-[#5fdee7] transition-all"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${editor.avatarColor} border border-[#5fdee7]/40 flex items-center justify-center font-mono font-bold text-white text-base shadow-md`}>
                  {editor.initials}
                </div>
                <div>
                  <h3 className="font-bold font-display text-white text-base">
                    {editor.name}
                  </h3>
                  <div className="text-xs text-[#5fdee7] font-mono">
                    {editor.role}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#081c18] border border-[#5fdee7]/15 mb-3 text-xs font-mono text-slate-300">
                <span className="text-[#10b981] font-bold">Discipline:</span> {editor.discipline}
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {editor.bio}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#5fdee7]/15 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 text-[#10b981]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{editor.verifiedArticles} Investigations</span>
              </span>

              <a
                href={`mailto:${OFFICIAL_CONTACT.email}?subject=Editorial Query for ${editor.name}`}
                className="text-[#5fdee7] hover:underline"
              >
                Contact Lead
              </a>
            </div>

          </div>
        ))}

        {/* Official Newsroom Desk Direct Card */}
        <div className="p-6 rounded-2xl bg-[#071916] border border-[#5fdee7]/40 shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#0b2721] border border-[#5fdee7]/40 flex items-center justify-center text-[#5fdee7] mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold font-display text-white text-lg mb-1">
              Direct Newsroom Desk
            </h3>
            <p className="text-xs font-mono text-[#5fdee7] mb-3">
              Official Contact & Press Credentials
            </p>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
              Reach the lead editorial team directly for urgent vulnerability disclosures, corrections, or hardware review submissions.
            </p>
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#5fdee7]" />
                <span>{OFFICIAL_CONTACT.phone}</span>
              </div>
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-[#5fdee7]" />
                <span>{OFFICIAL_CONTACT.email}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#5fdee7]/15">
            <a
              href={OFFICIAL_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#10b981] text-[#081c18] font-bold text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Connect via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
