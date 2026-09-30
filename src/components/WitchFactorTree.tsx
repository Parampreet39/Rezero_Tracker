import React, { useState } from 'react';
import { UserItemState } from '../types/tracker';
import { ALL_TRACKER_ITEMS } from '../data';
import { Sparkles, Shield, Heart, Skull, Flame, Eye, Lock, CheckCircle2, Unlock } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface WitchFactorTreeProps {
  userState?: Record<string, UserItemState>;
  currentArcNumber?: number; // e.g. 3
}

export const WitchFactorTree: React.FC<WitchFactorTreeProps> = ({
  userState = {},
  currentArcNumber = 3,
}) => {
  const { themeColors } = useCustomization();
  const [spoilerArcLimit, setSpoilerArcLimit] = useState<number>(currentArcNumber);
  const [manuallyRevealedFactors, setManuallyRevealedFactors] = useState<Set<string>>(new Set());

  const isArcCompleted = (arcNum: number): boolean => {
    const arcItems = ALL_TRACKER_ITEMS.filter((it) => it.arcId === `arc${arcNum}`);
    if (arcItems.length === 0) return true;
    return arcItems.every((it) => userState && userState[it.id]?.completed);
  };

  // Derive unlocks based on arc completion in tracker OR manual unlock OR spoiler slider
  const isSlothUnlocked =
    isArcCompleted(3) ||
    manuallyRevealedFactors.has('sloth') ||
    spoilerArcLimit >= 4;

  const isGreedUnlocked =
    isArcCompleted(5) ||
    isArcCompleted(6) ||
    manuallyRevealedFactors.has('greed') ||
    spoilerArcLimit >= 6;

  const isGreedSecondForm =
    isArcCompleted(6) ||
    manuallyRevealedFactors.has('greed') ||
    spoilerArcLimit >= 7;

  const isGluttonyUnlocked =
    isArcCompleted(7) ||
    isArcCompleted(8) ||
    manuallyRevealedFactors.has('gluttony') ||
    spoilerArcLimit >= 8;

  const handleRevealFactor = (factorId: string) => {
    setManuallyRevealedFactors((prev) => {
      const next = new Set(prev);
      next.add(factorId);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Spoiler Barrier Slider */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Authority Mastery Tree</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Subaru Natsuki’s Witch Factor Evolution
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 max-w-3xl">
              As you finish major story arcs, Subaru absorbs the authorities of fallen Sin Archbishops, adapting their grotesque powers into self-sacrificial tools to protect his friends.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 shrink-0">
            <span>Active Vessel: </span>
            <span className="text-amber-400 font-bold">Sage Candidate (賢者候補)</span>
          </div>
        </div>

        {/* Interactive Authority Spoiler Barrier Slider */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400">Reveal Authorities Up To:</span>
            <div className="flex flex-wrap items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((arcNum) => (
                <button
                  key={arcNum}
                  onClick={() => setSpoilerArcLimit(arcNum)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                    spoilerArcLimit === arcNum
                      ? 'shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                  style={
                    spoilerArcLimit === arcNum
                      ? {
                          backgroundColor: themeColors.main,
                          color: themeColors.bg,
                        }
                      : undefined
                  }
                >
                  Arc {arcNum}
                </button>
              ))}
              <button
                onClick={() => setSpoilerArcLimit(10)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                  spoilerArcLimit >= 8
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-900 text-rose-300 hover:text-rose-200'
                }`}
                title="Unlock all authority lore across all arcs"
              >
                All (Full Spoilers)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {spoilerArcLimit !== currentArcNumber && (
              <button
                onClick={() => setSpoilerArcLimit(currentArcNumber)}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800 text-[11px] cursor-pointer"
              >
                Sync with Progress (Arc {currentArcNumber})
              </button>
            )}
            <div className="text-[11px] text-slate-500">
              {spoilerArcLimit <= currentArcNumber ? '✓ Safe for current reading' : '⚠️ Contains future authority spoilers'}
            </div>
          </div>
        </div>
      </div>

      {/* Authorities Tree Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. ENVY: RETURN BY DEATH */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/40 space-y-4 shadow-lg shadow-purple-950/20 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-950 text-purple-400 flex items-center justify-center border border-purple-800">
                  <Skull className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-purple-400 uppercase font-bold">Witch Factor 01</div>
                  <div className="text-sm font-bold text-white">Authority of Envy</div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                ACTIVE
              </span>
            </div>

            <div className="text-xs text-slate-300 font-serif italic">
              "Granted by Satella, the Witch of Envy. Rewinds world time upon death."
            </div>

            {/* Evolution Nodes */}
            <div className="space-y-2 font-mono text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
                <span>✦ Checkpoint Rewind</span>
                <span className="text-[10px]">UNLOCKED</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
                <span>✦ Witch Miasma Emission</span>
                <span className="text-[10px]">PASSIVE</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
                <span>✦ Taboo Heart Clutch</span>
                <span className="text-[10px]">ENFORCED</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
                <span>✦ Gluttony Memory Immunity</span>
                <span className="text-[10px]">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-800/30 text-[10px] font-mono text-purple-300 text-center">
            Acquired: Prologue (Arc 1)
          </div>
        </div>

        {/* 2. SLOTH: INVISIBLE PROVIDENCE */}
        <div className={`p-5 rounded-2xl border space-y-4 shadow-lg transition-all flex flex-col justify-between ${
          isSlothUnlocked
            ? 'bg-slate-900/90 border-amber-500/40 shadow-amber-950/20'
            : 'bg-slate-950/60 border-slate-800'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  isSlothUnlocked ? 'bg-amber-950 text-amber-400 border-amber-800' : 'bg-slate-900 text-slate-600 border-slate-800'
                }`}>
                  {isSlothUnlocked ? <Sparkles className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">Witch Factor 02</div>
                  <div className="text-sm font-bold text-white">Invisible Providence</div>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                isSlothUnlocked
                  ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                  : 'text-amber-400 bg-amber-950/60 border-amber-800/40'
              }`}>
                {isSlothUnlocked ? 'AWAKENED' : '🔒 Arc 4 Locked'}
              </span>
            </div>

            {isSlothUnlocked ? (
              <>
                <div className="text-xs text-slate-300 font-serif italic">
                  "Absorbed from Petelgeuse Romanee-Conti. Manifests a single phantom arm."
                </div>

                {/* Evolution Nodes */}
                <div className="space-y-2 font-mono text-xs pt-1">
                  <div className="p-2.5 rounded-lg border bg-slate-950 border-amber-500/40 text-amber-300 flex items-center justify-between">
                    <span>✦ Single Invisible Hand</span>
                    <span className="text-[10px]">UNLOCKED</span>
                  </div>
                  <div className="p-2.5 rounded-lg border bg-slate-950 border-amber-500/40 text-amber-300 flex items-center justify-between">
                    <span>✦ Physical Phasing Barrier</span>
                    <span className="text-[10px]">UNLOCKED</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-rose-500/40 text-rose-300 flex items-center justify-between">
                    <span>✦ Brain Recoil Penalty</span>
                    <span className="text-[10px]">PENALTY</span>
                  </div>
                </div>
              </>
            ) : (
              /* Locked Placeholder */
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center space-y-3 py-6">
                <div className="text-xs font-mono text-amber-300 font-bold">
                  🔒 Sealed Authority of Sloth
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                  Defeat Petelgeuse in Arc 3 and advance into Arc 4 (Sanctuary) to awaken this Witch Factor.
                </p>
                <button
                  onClick={() => handleRevealFactor('sloth')}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-mono text-amber-300 bg-amber-950/40 border border-amber-800/50 hover:bg-amber-900/60 cursor-pointer transition-colors"
                >
                  👁️ Inspect Authority Lore
                </button>
              </div>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 text-center">
            Requirement: Complete Arc 3 / Begin Arc 4
          </div>
        </div>

        {/* 3. GREED: COR LEONIS */}
        <div
          className={`p-5 rounded-2xl border space-y-4 shadow-lg transition-all flex flex-col justify-between ${
            isGreedUnlocked
              ? 'bg-slate-900/90 shadow-xl'
              : 'bg-slate-950/60 border-slate-800'
          }`}
          style={
            isGreedUnlocked
              ? {
                  borderColor: `${themeColors.main}50`,
                  boxShadow: `0 4px 20px -5px ${themeColors.main}25`,
                }
              : undefined
          }
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center border"
                  style={
                    isGreedUnlocked
                      ? {
                          backgroundColor: `${themeColors.main}20`,
                          color: themeColors.main,
                          borderColor: `${themeColors.main}50`,
                        }
                      : {
                          backgroundColor: '#0f172a',
                          color: '#64748b',
                          borderColor: '#334155',
                        }
                  }
                >
                  {isGreedUnlocked ? <Heart className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase font-bold" style={{ color: themeColors.highlight }}>
                    Witch Factor 03
                  </div>
                  <div className="text-sm font-bold text-white">Cor Leonis (小さな王)</div>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                isGreedUnlocked
                  ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                  : 'text-amber-400 bg-amber-950/60 border-amber-800/40'
              }`}>
                {isGreedUnlocked ? 'AWAKENED' : '🔒 Arc 6 Locked'}
              </span>
            </div>

            {isGreedUnlocked ? (
              <>
                <div className="text-xs text-slate-300 font-serif italic">
                  "Absorbed from Regulus Corneas. Shares burdens and senses emotional bonds."
                </div>

                {/* Evolution Nodes */}
                <div className="space-y-2 font-mono text-xs pt-1">
                  <div
                    className="p-2.5 rounded-lg border flex items-center justify-between bg-slate-950"
                    style={{
                      color: themeColors.highlight,
                      borderColor: `${themeColors.main}40`,
                    }}
                  >
                    <span>✦ First Form: Comrades Radar</span>
                    <span className="text-[10px]">UNLOCKED</span>
                  </div>
                  <div
                    className="p-2.5 rounded-lg border flex items-center justify-between bg-slate-950"
                    style={{
                      color: isGreedSecondForm ? themeColors.highlight : '#64748b',
                      borderColor: isGreedSecondForm ? `${themeColors.main}40` : '#1e293b',
                    }}
                  >
                    <span>✦ Second Form: Burden Sharing</span>
                    <span className="text-[10px]">{isGreedSecondForm ? 'UNLOCKED' : 'LOCKED (Arc 7)'}</span>
                  </div>
                  <div
                    className="p-2.5 rounded-lg border flex items-center justify-between bg-slate-950"
                    style={{
                      color: isGreedSecondForm ? themeColors.highlight : '#64748b',
                      borderColor: isGreedSecondForm ? `${themeColors.main}40` : '#1e293b',
                    }}
                  >
                    <span>✦ Pain Redistribution</span>
                    <span className="text-[10px]">{isGreedSecondForm ? 'UNLOCKED' : 'LOCKED (Arc 7)'}</span>
                  </div>
                </div>
              </>
            ) : (
              /* Locked Placeholder */
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center space-y-3 py-6">
                <div className="text-xs font-mono text-sky-300 font-bold">
                  🔒 Sealed Authority of Greed
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                  Defeat Regulus Corneas in Priestella (Arc 5) and enter the Pleiades Watchtower (Arc 6) to awaken Cor Leonis.
                </p>
                <button
                  onClick={() => handleRevealFactor('greed')}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-mono text-sky-300 bg-sky-950/40 border border-sky-800/50 hover:bg-sky-900/60 cursor-pointer transition-colors"
                >
                  👁️ Inspect Authority Lore
                </button>
              </div>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 text-center">
            Requirement: Complete Arc 5 / Begin Arc 6
          </div>
        </div>

        {/* 4. GLUTTONY: SOUL & MEMORY RESONANCE */}
        <div className={`p-5 rounded-2xl border space-y-4 shadow-lg transition-all flex flex-col justify-between ${
          isGluttonyUnlocked
            ? 'bg-slate-900/90 border-rose-500/40 shadow-rose-950/20'
            : 'bg-slate-950/60 border-slate-800'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                  isGluttonyUnlocked ? 'bg-rose-950 text-rose-400 border-rose-800' : 'bg-slate-900 text-slate-600 border-slate-800'
                }`}>
                  {isGluttonyUnlocked ? <Flame className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-rose-400 uppercase font-bold">Witch Factor 04</div>
                  <div className="text-sm font-bold text-white">Authority of Gluttony</div>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                isGluttonyUnlocked
                  ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40'
                  : 'text-amber-400 bg-amber-950/60 border-amber-800/40'
              }`}>
                {isGluttonyUnlocked ? 'AWAKENED' : '🔒 Arc 8 Locked'}
              </span>
            </div>

            {isGluttonyUnlocked ? (
              <>
                <div className="text-xs text-slate-300 font-serif italic">
                  "Resonating through the soul bonds of Louis Arneb & fallen Gluttony archbishops."
                </div>

                {/* Evolution Nodes */}
                <div className="space-y-2 font-mono text-xs pt-1">
                  <div className="p-2.5 rounded-lg border bg-slate-950 border-rose-500/40 text-rose-300 flex items-center justify-between">
                    <span>✦ Solar Eclipse (日食) Synthesis</span>
                    <span className="text-[10px]">UNLOCKED</span>
                  </div>
                  <div className="p-2.5 rounded-lg border bg-slate-950 border-rose-500/40 text-rose-300 flex items-center justify-between">
                    <span>✦ Spica Soul Resonance Pact</span>
                    <span className="text-[10px]">AWAKENED</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
                    <span>✦ Memory Transmutation Ward</span>
                    <span className="text-[10px]">ACTIVE</span>
                  </div>
                </div>
              </>
            ) : (
              /* Locked Placeholder */
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center space-y-3 py-6">
                <div className="text-xs font-mono text-rose-300 font-bold">
                  🔒 Sealed Authority of Gluttony
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                  Confront the Gluttony siblings in Arc 6 and survive the Vollachian Calamity (Arc 8) to unlock.
                </p>
                <button
                  onClick={() => handleRevealFactor('gluttony')}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-mono text-rose-300 bg-rose-950/40 border border-rose-800/50 hover:bg-rose-900/60 cursor-pointer transition-colors"
                >
                  👁️ Inspect Authority Lore
                </button>
              </div>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 text-center">
            Requirement: Complete Arc 7 / Enter Arc 8
          </div>
        </div>
      </div>
    </div>
  );
};
