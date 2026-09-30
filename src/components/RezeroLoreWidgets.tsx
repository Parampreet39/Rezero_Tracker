import React, { useState } from 'react';
import { UserItemState } from '../types/tracker';
import { Shield, Heart, Volume2, Sparkles, Sword, ShieldAlert, Zap, BookOpen } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface RezeroLoreWidgetsProps {
  userState?: Record<string, UserItemState>;
}

export type CampLoyalty = 'emilia' | 'crusch' | 'anastasia' | 'priscilla' | 'felt' | 'witches';

export const CAMPS: Record<CampLoyalty, { name: string; leader: string; motto: string; color: string; badge: string; quote: string }> = {
  emilia: {
    name: 'Emilia Camp (Lugunica Royal Candidate)',
    leader: 'Emilia, Subaru & Roswaal Manor',
    motto: 'Fairness, Equal Opportunity & Devotion',
    color: 'from-purple-500/20 to-sky-500/20 border-purple-400/40 text-purple-200',
    badge: '👑 Royal Candidate',
    quote: '"I want to create a world where no one is judged for how they were born."',
  },
  crusch: {
    name: 'Crusch Camp (White Whale Allies)',
    leader: 'Crusch Karsten & Wilhelm',
    motto: 'Severance from the Dragon Covenant',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300',
    badge: '⚔️ Dragon Slayers',
    quote: '"Lugunica belongs to the people, not to the Dragon."',
  },
  anastasia: {
    name: 'Anastasia Camp',
    leader: 'Anastasia Hoshin & Julius',
    motto: 'Greed, Commerce & Prosperity',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300',
    badge: '💰 Kararagi Trade',
    quote: '"I\'m greedy. I want everything, and I won\'t rest until I have it all."',
  },
  priscilla: {
    name: 'Priscilla Camp',
    leader: 'Priscilla Barielle & Al',
    motto: 'The Sun Princess & Absolute Fortune',
    color: 'from-rose-500/20 to-red-500/20 border-rose-500/40 text-rose-300',
    badge: '☀️ The Sun Princess',
    quote: '"The world is arranged for mine own convenience. Grovel in awe of mine brilliance."',
  },
  felt: {
    name: 'Felt Camp',
    leader: 'Felt & Reinhard van Astrea',
    motto: 'Tear Down the Corrupt Nobility',
    color: 'from-amber-500/20 to-yellow-500/20 border-amber-500/40 text-amber-300',
    badge: '🗡️ Slums Rebellion',
    quote: '"I\'m gonna tear this entire rotten kingdom apart!"',
  },
  witches: {
    name: 'Witches of Sin & Shadow Sanctuary',
    leader: 'Satella, Echidna & Sin Witches',
    motto: 'Boundless Desire & Eternal Bonds',
    color: 'from-violet-950/60 to-purple-900/40 border-violet-500/50 text-violet-200',
    badge: '💜 Witch Realm',
    quote: '"Even across 400 years of solitude, my love will never waver."',
  },
};

export const RezeroLoreWidgets: React.FC<RezeroLoreWidgetsProps> = () => {
  const { themeColors, characterLore, themeId, soundEnabled } = useCustomization();
  const [selectedCamp, setSelectedCamp] = useState<CampLoyalty>(() => {
    if (themeId === 'satella' || themeId === 'echidna') return 'witches';
    if (themeId === 'reinhard') return 'felt';
    return 'emilia';
  });

  const camp = CAMPS[selectedCamp] || CAMPS.emilia;

  // Play harmonic chime
  const playHeartSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      // AudioContext unavailable
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* 1. Dynamic Story Companion based on Active Theme Character */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider font-mono"
              style={{ color: themeColors.main }}
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Re:Zero Story Companion</span>
            </div>
            <button
              onClick={playHeartSound}
              className="text-[10px] text-slate-500 hover:text-slate-300 font-mono flex items-center gap-1 cursor-pointer"
              title="Play harmonic bell chime"
            >
              <Volume2 className="w-3 h-3" />
              <span>Chime</span>
            </button>
          </div>

          <div className="mt-2 text-xs font-semibold text-white">
            Current Arc: <span className="font-mono" style={{ color: themeColors.highlight }}>{characterLore.currentArcStatus}</span>
          </div>

          <p className="text-[11px] text-slate-300 mt-1 leading-relaxed line-clamp-3">
            {characterLore.statusSummary}
          </p>
        </div>

        {/* Dynamic Status badge */}
        <div
          className="p-2 rounded-lg border text-xs flex items-center justify-between"
          style={{
            backgroundColor: `${themeColors.main}15`,
            borderColor: `${themeColors.main}45`,
            color: themeColors.text,
          }}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-semibold truncate">{characterLore.characterName}</span>
            <span className="text-[10px] text-slate-400 truncate">({characterLore.japaneseTitle})</span>
          </div>
          <span className="font-mono text-[10px] font-bold shrink-0 ml-2" style={{ color: themeColors.highlight }}>
            {characterLore.roleBadge}
          </span>
        </div>
      </div>

      {/* 2. Dynamic Character Armament & Arsenal */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider font-mono truncate mr-2"
              style={{ color: themeColors.main }}
            >
              <Sword className="w-4 h-4 shrink-0" />
              <span className="truncate">{characterLore.characterName.toUpperCase()} ARMAMENT</span>
            </div>
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0"
              style={{
                color: themeColors.highlight,
                borderColor: `${themeColors.main}40`,
                backgroundColor: `${themeColors.main}10`,
              }}
            >
              {characterLore.armament?.battleStance || 'Combat Ready'}
            </span>
          </div>

          {/* Primary Armament & Authority highlight */}
          <div className="mt-2 space-y-1.5 text-xs font-mono">
            <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800 flex items-start gap-1.5">
              <Zap className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: themeColors.main }} />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] text-slate-400 uppercase">Weapon / Focus:</div>
                <div className="text-white text-[11px] font-medium truncate">
                  {characterLore.armament?.primaryWeapon || characterLore.traits[0]?.title}
                </div>
              </div>
            </div>

            <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800 flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: themeColors.highlight }} />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] text-slate-400 uppercase">Authority / Protection:</div>
                <div className="text-slate-200 text-[11px] font-medium truncate">
                  {characterLore.armament?.divineProtectionOrAuthority || characterLore.traits[1]?.title}
                </div>
              </div>
            </div>
          </div>

          {/* 3 Traits Strip */}
          <div className="space-y-1 mt-2">
            {characterLore.traits.map((trait, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-[11px] px-1.5 py-0.5 rounded bg-slate-950/60 border border-slate-800/80"
              >
                <span className="truncate pr-2 text-slate-300 font-mono">
                  {trait.title}
                </span>
                <span
                  className="text-[9px] font-mono font-bold px-1 rounded border shrink-0"
                  style={{
                    color: themeColors.main,
                    borderColor: `${themeColors.main}50`,
                    backgroundColor: `${themeColors.main}15`,
                  }}
                >
                  {trait.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[10px] text-slate-400 font-mono text-center italic truncate">
          "{characterLore.flavorQuote}"
        </div>
      </div>

      {/* 3. Camp Allegiance */}
      <div className={`p-4 rounded-xl border shadow-md flex flex-col justify-between space-y-3 bg-gradient-to-br ${camp.color}`}>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider font-mono">
              <Shield className="w-4 h-4" />
              <span>Royal Selection Camp</span>
            </div>
            <select
              value={selectedCamp}
              onChange={(e) => setSelectedCamp(e.target.value as CampLoyalty)}
              className="text-xs bg-slate-950/90 border border-slate-700 rounded px-2 py-0.5 text-white font-mono focus:outline-none cursor-pointer"
            >
              <option value="emilia">Emilia Camp</option>
              <option value="crusch">Crusch Camp</option>
              <option value="anastasia">Anastasia Camp</option>
              <option value="priscilla">Priscilla Camp</option>
              <option value="felt">Felt Camp</option>
              <option value="witches">Witches / Sanctuary</option>
            </select>
          </div>

          <div className="mt-2">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{camp.name}</span>
            </div>
            <div className="text-xs text-slate-300 italic mt-1 font-serif line-clamp-2">
              {camp.quote}
            </div>
          </div>
        </div>

        <div className="text-[10px] font-mono opacity-80 border-t border-white/10 pt-2 flex items-center justify-between">
          <span>{camp.motto}</span>
          <span>{camp.badge}</span>
        </div>
      </div>
    </div>
  );
};
