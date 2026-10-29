import React, { useState, useEffect } from 'react';
import { InfographicData } from '../types/blog';
import { 
  Shield, Smartphone, RefreshCw, Key, EyeOff, AlertTriangle,
  Cpu, Flame, Globe, KeyRound, Terminal, GraduationCap,
  Bug, ShieldCheck, Search, Mail, ServerOff, Database,
  BadgeCheck, Lock, CreditCard, Activity, WifiOff,
  FolderSync, FileText, Share2, Building, Cloud,
  Users, Layers, HardDrive, FileCode, CloudRain, ShoppingBag,
  DownloadCloud, RotateCcw, UserCheck, Zap,
  Code, AppWindow, Globe2, Box, TrendingUp,
  Package, Gavel, Award, Clock,
  Home, Timer, BellOff, Coffee, MessageSquare,
  Ear, CheckCircle, Calendar, ShieldAlert,
  Coins, Video, Link, BookOpen,
  Laptop, Monitor, Fan, Sparkles,
  Keyboard, Mouse, Headphones, Square, Tv, Mic,
  Crosshair, Trophy, Glasses, Eye, Smile,
  Layout, Folder, Camera, Grid, Settings,
  Sun, BatteryCharging, Vibrate, Moon, MapPin,
  XCircle, Trash2, Download, Sliders,
  HelpCircle, Power, AlertCircle, MonitorX, Printer,
  Maximize2, Copy, Check, Eye as EyeIcon, Binary
} from 'lucide-react';

interface InfographicViewerProps {
  infographic: InfographicData;
  imageUrl?: string;
  articleTitle: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Shield, Smartphone, RefreshCw, Key, EyeOff, AlertTriangle,
  Cpu, Flame, Globe, KeyRound, Terminal, GraduationCap,
  Bug, ShieldCheck, Search, Mail, ServerOff, Database,
  BadgeCheck, Lock, CreditCard, Activity, WifiOff,
  SmartphoneCheck: Smartphone,
  FolderSync, FileText, Share2,
  ShieldLock: ShieldAlert,
  Building, Cloud,
  Users, Layers, HardDrive, FileCode, CloudRain, ShoppingBag,
  DownloadCloud, RotateCcw, UserCheck, Zap,
  Code, AppWindow, Globe2, Box, TrendingUp,
  Package, Gavel, Award, Clock,
  Home, Timer, BellOff, Coffee, MessageSquare,
  Ear, CheckCircle, Calendar, ShieldAlert,
  Coins, Video, Link, BookOpen,
  Laptop, Monitor, Fan, Sparkles,
  Keyboard, Mouse, Headphones, Square, Tv, Mic,
  Crosshair, Trophy, Glasses, Eye, Smile,
  Layout, Folder, Camera, Grid, Settings,
  Sun, BatteryCharging, Vibrate, Moon, MapPin,
  XCircle, Trash2, Download, Sliders,
  HelpCircle, Power, AlertCircle, MonitorX, Printer
};

export const InfographicViewer: React.FC<InfographicViewerProps> = ({
  infographic,
  imageUrl,
  articleTitle
}) => {
  const [viewMode, setViewMode] = useState<'graphic' | 'blueprint'>(
    imageUrl ? 'graphic' : 'blueprint'
  );
  const [copiedPanelId, setCopiedPanelId] = useState<string | null>(null);

  useEffect(() => {
    if (imageUrl) {
      setViewMode('graphic');
    }
  }, [imageUrl]);

  const handleCopyPanel = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPanelId(id);
    setTimeout(() => setCopiedPanelId(null), 2000);
  };

  const CenterIcon = ICON_MAP[infographic.centerpieceIcon] || Cpu;

  return (
    <div className="w-full my-8 rounded-2xl overflow-hidden bg-[#071916] border border-[#5fdee7]/30 shadow-[0_0_35px_rgba(95,222,231,0.12)]">
      {/* Top Controller Bar */}
      <div className="px-5 py-3.5 bg-[#0a231e] border-b border-[#5fdee7]/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Binary className="w-4 h-4 text-[#5fdee7]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#5fdee7] uppercase">
            INFOGRAPHIC ARCHITECTURE
          </span>
          <span className="text-slate-400 text-xs hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-xs text-slate-300 hidden sm:inline font-sans">
            6-Panel Peer-Reviewed Visual Schematic
          </span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-[#061512] rounded-lg border border-[#5fdee7]/25">
          {imageUrl && (
            <button
              onClick={() => setViewMode('graphic')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                viewMode === 'graphic'
                  ? 'bg-[#5fdee7] text-[#081c18] font-bold shadow-[0_0_10px_rgba(95,222,231,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              High-Res Infographic
            </button>
          )}
          <button
            onClick={() => setViewMode('blueprint')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              viewMode === 'blueprint' || !imageUrl
                ? 'bg-[#5fdee7] text-[#081c18] font-bold shadow-[0_0_10px_rgba(95,222,231,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Interactive Blueprint
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'graphic' && imageUrl ? (
        <div className="relative group bg-[#061512] overflow-hidden flex items-center justify-center p-2 sm:p-4">
          <img
            src={imageUrl}
            alt={infographic.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              const clean = imageUrl?.split('/').pop();
              if (clean && !target.src.includes('/assets/images/')) {
                target.src = `/assets/images/${clean}`;
              }
            }}
            className="w-full max-h-[650px] object-contain rounded-xl border border-[#5fdee7]/25 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
          />
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-[#081c18]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#5fdee7]/40 text-xs text-[#5fdee7] font-mono flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>High-Fidelity AI Infographic</span>
          </div>
        </div>
      ) : (
        /* Interactive Blueprint View with 6 Illuminated Panels */
        <div className="p-6 sm:p-8 bg-gradient-to-b from-[#0b2721] via-[#081c18] to-[#061512] tech-grid-dense relative">
          
          {/* 3D Metallic Embossed Header Title */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-block px-3 py-1 mb-2 rounded bg-[#061512] border border-[#5fdee7]/40 text-[11px] font-mono font-bold tracking-widest text-[#5fdee7] uppercase">
              METALLIC EMBOSSED VISUAL SYSTEM
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-[0_2px_10px_rgba(95,222,231,0.3)] uppercase">
              {infographic.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono tracking-wider text-[#5fdee7] mt-1 uppercase">
              {infographic.subtitle}
            </p>
          </div>

          {/* Central High-Tech Hub Banner */}
          <div className="max-w-xl mx-auto mb-8 p-3.5 rounded-xl bg-[#081c18]/90 border border-[#5fdee7]/40 shadow-[0_0_20px_rgba(95,222,231,0.15)] flex items-center justify-center gap-3 text-center">
            <div className="w-9 h-9 rounded-lg bg-[#0b2721] border border-[#5fdee7]/50 flex items-center justify-center text-[#5fdee7] shrink-0">
              <CenterIcon className="w-5 h-5 text-[#5fdee7]" />
            </div>
            <div className="text-xs font-mono text-slate-200">
              <span className="text-[#5fdee7] font-bold">CORE HUB:</span> {infographic.centerpiece}
            </div>
          </div>

          {/* 6 Distinct Illuminated Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {infographic.panels.map((panel, idx) => {
              const PanelIcon = ICON_MAP[panel.iconName] || Shield;
              const isCopied = copiedPanelId === panel.id;

              return (
                <div
                  key={panel.id}
                  className="group relative p-5 rounded-xl bg-[#0b2721]/90 border border-[#5fdee7]/25 hover:border-[#5fdee7] hover:bg-[#0e332b] transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(95,222,231,0.2)] flex flex-col justify-between"
                >
                  {/* Panel Header with Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#5fdee7]/15">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#081c18] border border-[#5fdee7]/40 flex items-center justify-center text-[#5fdee7] group-hover:scale-105 group-hover:border-[#5fdee7] transition-all">
                          <PanelIcon className="w-4 h-4 text-[#5fdee7]" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-400">
                          PANEL 0{idx + 1}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyPanel(panel.id, `${panel.title}\n${panel.bullets.join('\n')}`)}
                        className="text-slate-400 hover:text-[#5fdee7] p-1 rounded hover:bg-[#081c18] transition-colors"
                        title="Copy panel specifications"
                        aria-label={`Copy specifications for ${panel.title}`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Panel Title */}
                    <h3 className="text-sm font-bold text-white font-display mb-3 group-hover:text-[#5fdee7] transition-colors">
                      {panel.title}
                    </h3>

                    {/* Bullet Points */}
                    <ul className="space-y-2 text-xs text-slate-300 font-sans">
                      {panel.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-[#5fdee7] font-mono text-[10px] mt-0.5 select-none shrink-0">
                            ▸
                          </span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Panel Status Marker */}
                  <div className="mt-4 pt-2.5 border-t border-[#5fdee7]/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>SPECIFICATION AUDITED</span>
                    <span className="text-[#10b981]">ACTIVE</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};
