import React, { useState } from 'react';
import { Quote, Sparkles, BookOpen, Heart, Palette } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface RemHeroBannerProps {
  completedCount: number;
  totalCount: number;
  onJumpToArc: (arcId: string) => void;
  onOpenSettings?: () => void;
}

export const RemHeroBanner: React.FC<RemHeroBannerProps> = ({
  completedCount,
  totalCount,
  onJumpToArc,
  onOpenSettings,
}) => {
  const { getImage, themeColors, characterLore, soundEnabled } = useCustomization();
  const bannerSrc = getImage('remBanner');
  const avatarSrc = getImage('remSolo');
  const [quoteIndex, setQuoteIndex] = useState(0);

  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Sound effect
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // AudioContext unavailable
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border transition-all duration-300 shadow-2xl bg-gradient-to-r from-slate-950/95 via-slate-900 to-slate-950/90"
      style={{
        borderColor: `${themeColors.main}45`,
        boxShadow: `0 10px 30px -10px ${themeColors.main}30`,
      }}
    >
      {/* Background Ambience / Art */}
      <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-luminosity">
        {bannerSrc && (
          <img
            src={bannerSrc}
            alt="Hero Banner Artwork"
            className="w-full h-full object-cover object-right"
            referrerPolicy="no-referrer"
          />
        )}
      </div>

      <div className="relative z-10 p-5 sm:p-7 space-y-6">
        {/* Top Row: Character Portrait, Title, and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* Character Avatar */}
            <div
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 shadow-xl shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer bg-slate-950"
              onClick={onOpenSettings}
              style={{
                borderColor: themeColors.main,
                boxShadow: `0 8px 25px -5px ${themeColors.main}40`,
              }}
              title="Click to customize character portrait & theme in Settings"
            >
              <img
                src={avatarSrc}
                alt="Character Avatar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase">
                <span className="font-bold" style={{ color: themeColors.highlight }}>
                  ✦ {characterLore.role}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">{characterLore.japaneseTitle}</span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-serif mt-0.5">
                RE:ZERO COMPLETIONIST TRACKER
              </h1>

              <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                <span>"{characterLore.quote}"</span>
              </p>
            </div>
          </div>

          {/* Right: Theme Studio & What IF shortcut */}
          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <button
              onClick={() => onJumpToArc('what_if')}
              className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors bg-slate-900/80 border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white cursor-pointer"
            >
              <span>What IF Routes</span>
            </button>

            {onOpenSettings && (
              <button
                onClick={() => {
                  onOpenSettings();
                  playChime();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
                style={{
                  backgroundColor: themeColors.main,
                  color: themeColors.bg,
                  boxShadow: `0 4px 15px -3px ${themeColors.main}40`,
                }}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>{characterLore.characterName} Theme</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Character Quote Box */}
        <div
          className="p-4 rounded-xl border transition-all duration-200 group flex items-start justify-between gap-3"
          style={{
            backgroundColor: `${themeColors.subAlt}90`,
            borderColor: `${themeColors.main}40`,
            boxShadow: `0 4px 20px -5px ${themeColors.main}20`,
          }}
        >
          <div className="flex items-start gap-3 min-w-0">
            <Quote
              className="w-5 h-5 shrink-0 mt-0.5 transition-transform group-hover:scale-110"
              style={{ color: themeColors.highlight }}
            />
            <div>
              <p className="text-xs sm:text-sm font-serif italic leading-relaxed text-slate-100">
                "{characterLore.quote}"
              </p>
              <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-2">
                <span style={{ color: themeColors.highlight }}>— {characterLore.characterName}</span>
                <span aria-hidden="true">·</span>
                <span>{characterLore.quoteContext}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Reading Metrics & Status Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] uppercase font-mono text-slate-400">Chapters Read</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
              {completedCount} <span className="text-xs text-slate-500 font-normal">/ {totalCount}</span>
            </div>
            <div className="text-[10px] font-mono mt-0.5" style={{ color: themeColors.main }}>
              {percentage}% Journey Completed
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] uppercase font-mono text-slate-400">Chronicle Scope</div>
            <div className="text-sm sm:text-base font-bold text-slate-200 mt-0.5 truncate">
              Arcs 1–10 + EX + IF
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              1,000+ Total Chapters
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] uppercase font-mono text-slate-400">Active Focus</div>
            <div className="text-sm sm:text-base font-bold mt-0.5 truncate" style={{ color: themeColors.highlight }}>
              {characterLore.characterName}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              {characterLore.role}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[10px] uppercase font-mono text-slate-400">Completionist Level</div>
            <div className="text-sm sm:text-base font-bold mt-0.5 truncate flex items-center gap-1" style={{ color: themeColors.main }}>
              <Heart className="w-4 h-4 fill-current" />
              <span>{percentage >= 100 ? 'Transcended' : percentage >= 50 ? 'Veteran Scholar' : 'Knight Apprentice'}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Synced with Canon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
