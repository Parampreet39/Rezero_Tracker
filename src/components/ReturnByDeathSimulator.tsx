import React, { useState, useMemo } from 'react';
import { ARC_LOOPS_DATA, LoopRecord } from '../data/loopsData';
import { UserItemState } from '../types/tracker';
import { ALL_TRACKER_ITEMS } from '../data';
import {
  Skull,
  Check,
  AlertOctagon,
  Volume2,
  Search,
  Lock,
  Eye,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface ReturnByDeathSimulatorProps {
  userState?: Record<string, UserItemState>;
  currentArcNumber?: number; // e.g. 3
}

export const ReturnByDeathSimulator: React.FC<ReturnByDeathSimulatorProps> = ({
  userState = {},
  currentArcNumber = 3,
}) => {
  const { themeColors } = useCustomization();
  const [spoilerArcLimit, setSpoilerArcLimit] = useState<number>(currentArcNumber);
  const [manuallyRevealedLoops, setManuallyRevealedLoops] = useState<Set<string>>(new Set());
  const [selectedArc, setSelectedArc] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDeathType, setSelectedDeathType] = useState<string>('all');
  const [selectedLoopId, setSelectedLoopId] = useState<string>(ARC_LOOPS_DATA[0].id);

  const getLoopArcNum = (arcId: string): number => {
    const num = parseInt(arcId.replace('arc', ''), 10);
    return isNaN(num) ? 1 : num;
  };

  const isArcCompleted = (arcNum: number): boolean => {
    const arcItems = ALL_TRACKER_ITEMS.filter((it) => it.arcId === `arc${arcNum}`);
    if (arcItems.length === 0) return true;
    return arcItems.every((it) => userState && userState[it.id]?.completed);
  };

  const isLoopLocked = (loop: LoopRecord): boolean => {
    const loopArc = getLoopArcNum(loop.arcId);
    return loopArc > 1 && !isArcCompleted(loopArc) && !manuallyRevealedLoops.has(loop.id);
  };

  // Compute arc counts dynamically
  const arcTabs = useMemo(() => {
    const list = [
      { id: 'all', label: 'All Arcs', count: ARC_LOOPS_DATA.length },
      { id: 'arc1', label: 'Arc 1: Capital', count: ARC_LOOPS_DATA.filter((l) => l.arcId === 'arc1').length },
      { id: 'arc2', label: 'Arc 2: Manor', count: ARC_LOOPS_DATA.filter((l) => l.arcId === 'arc2').length },
      { id: 'arc3', label: 'Arc 3: Sloth', count: ARC_LOOPS_DATA.filter((l) => l.arcId === 'arc3').length },
      { id: 'arc4', label: 'Arc 4: Sanctuary', count: ARC_LOOPS_DATA.filter((l) => l.arcId === 'arc4').length },
      { id: 'arc5', label: 'Arc 5: Pristella', count: ARC_LOOPS_DATA.filter((l) => l.arcId === 'arc5').length },
      { id: 'arc6', label: 'Arc 6: Watchtower', count: ARC_LOOPS_DATA.filter((l) => l.arcId === 'arc6').length },
      { id: 'arc7', label: 'Arc 7: Vollachia', count: ARC_LOOPS_DATA.filter((l) => l.arcId === 'arc7').length },
      { id: 'arc8', label: 'Arc 8: Calamity', count: ARC_LOOPS_DATA.filter((l) => l.arcId === 'arc8').length },
    ];
    return list;
  }, []);

  const deathTypes = [
    'all',
    'Murder',
    'Curse / Mabeast',
    'Suicide',
    'Environmental / Blizzard',
    'Psychological / Soul',
    'Euthanasia',
    'Sniping / Projectile',
  ];

  const filteredLoops = ARC_LOOPS_DATA.filter((l) => {
    if (selectedArc !== 'all' && l.arcId !== selectedArc) return false;
    if (selectedDeathType !== 'all' && l.deathType !== selectedDeathType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        l.causeOfDeath.toLowerCase().includes(q) ||
        l.antagonist.toLowerCase().includes(q) ||
        l.checkpoint.toLowerCase().includes(q) ||
        l.arcName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeLoop =
    ARC_LOOPS_DATA.find((l) => l.id === selectedLoopId) ||
    filteredLoops[0] ||
    ARC_LOOPS_DATA[0];

  const isActiveLoopLocked = isLoopLocked(activeLoop);

  // Play heartbeat sound
  const playHeartbeat = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(65, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      // AudioContext unavailable
    }
  };

  const handleRevealLoop = (loopId: string) => {
    setManuallyRevealedLoops((prev) => {
      const next = new Set(prev);
      next.add(loopId);
      return next;
    });
  };

  const victoriousCount = ARC_LOOPS_DATA.filter((l) => l.causeOfDeath.includes('VICTORIOUS')).length;
  const fatalCount = ARC_LOOPS_DATA.length - victoriousCount;

  return (
    <div className="space-y-6">
      {/* Top Banner & Spoiler Barrier Slider */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
              style={{ color: themeColors.main }}
            >
              <Skull className="w-4 h-4" />
              <span>Return by Death Simulator & Complete Loop Ledger</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Subaru Natsuki’s Canonical Loops & Checkpoints
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 max-w-3xl">
              Inspect every death, rewind checkpoint, fatal adversary, and crucial piece of intelligence retained across all story arcs from Arc 1 in the Capital to the Vollachian Imperial Calamity in Arc 8.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono shrink-0">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Loop Barrier: </span>
            <span className="text-emerald-400 font-bold">Arc {spoilerArcLimit} Level</span>
          </div>
        </div>

        {/* Interactive Spoiler Barrier Slider */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400">Reveal Deaths Up To:</span>
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
                title="Unlock all death loops across all arcs"
              >
                All Arcs (Full Spoilers)
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
              {spoilerArcLimit <= currentArcNumber ? '✓ Safe for current reading' : '⚠️ Contains future fatal loops'}
            </div>
          </div>
        </div>

        {/* Filters Rail: Arc Tabs + Search + Death Type */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">
          {/* Arc Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
            {arcTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedArc(tab.id);
                  const first = ARC_LOOPS_DATA.find((l) => tab.id === 'all' || l.arcId === tab.id);
                  if (first) setSelectedLoopId(first.id);
                }}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer font-medium transition-colors ${
                  selectedArc === tab.id
                    ? 'font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
                style={{
                  backgroundColor: selectedArc === tab.id ? themeColors.main : undefined,
                  color: selectedArc === tab.id ? themeColors.bg : undefined,
                }}
              >
                <span>{tab.label}</span>
                <span className="ml-1 opacity-70">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Search + Death Type Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search adversary, cause, or checkpoint..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                style={{ borderColor: searchQuery ? themeColors.main : undefined }}
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono scrollbar-none">
              {deathTypes.map((dt) => (
                <button
                  key={dt}
                  onClick={() => setSelectedDeathType(dt)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                    selectedDeathType === dt
                      ? 'bg-slate-800 font-bold border'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                  style={{
                    color: selectedDeathType === dt ? themeColors.highlight : undefined,
                    borderColor: selectedDeathType === dt ? `${themeColors.main}50` : undefined,
                  }}
                >
                  {dt === 'all' ? 'All Causes' : dt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Loops Timeline Rail + Active Loop Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Loops List */}
        <div className="lg:col-span-5 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredLoops.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs">
              No timeline loops match your selected filters.
            </div>
          ) : (
            filteredLoops.map((loop) => {
              const isSelected = activeLoop.id === loop.id;
              const isVictorious = loop.causeOfDeath.includes('VICTORIOUS');
              const locked = isLoopLocked(loop);
              const loopArc = getLoopArcNum(loop.arcId);

              return (
                <div
                  key={loop.id}
                  onClick={() => {
                    setSelectedLoopId(loop.id);
                    playHeartbeat();
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
                  }`}
                  style={{
                    backgroundColor: isSelected ? `${themeColors.main}20` : undefined,
                    borderColor: isSelected ? themeColors.main : undefined,
                    boxShadow: isSelected ? `0 4px 14px -2px ${themeColors.main}30` : undefined,
                  }}
                >
                  <div className="min-w-0 pr-3 flex-1">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          locked
                            ? 'bg-slate-600'
                            : isVictorious
                            ? 'bg-emerald-400 animate-pulse'
                            : 'bg-rose-500'
                        }`}
                      />
                      <span className="truncate">{loop.arcName.split(':')[0]} · Loop #{loop.loopNumber}</span>
                      {locked ? (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800/40">
                          🔒 Arc {loopArc}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                          {isVictorious ? '(Victorious)' : `(${loop.deathType})`}
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {locked ? (
                        <span className="text-slate-500 font-mono italic">
                          🔒 Sealed Arc {loopArc} Fatal Timeline...
                        </span>
                      ) : (
                        loop.causeOfDeath
                      )}
                    </div>

                    <div className="text-[10px] font-mono mt-1 truncate" style={{ color: themeColors.highlight }}>
                      {locked ? 'Adversary: [Protected by Spoiler Lock]' : `Adversary: ${loop.antagonist}`}
                    </div>
                  </div>

                  <div className="text-right text-[10px] font-mono text-slate-500 shrink-0">
                    {locked ? (
                      <span className="text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/30 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>LOCKED</span>
                      </span>
                    ) : isVictorious ? (
                      <span className="text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                        CLEARED ✓
                      </span>
                    ) : (
                      <span className="text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-800/40">
                        REWOUND ↺
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Active Loop Dossier */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
          {isActiveLoopLocked ? (
            /* Locked State Shield */
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-5 my-6">
              <div className="w-16 h-16 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto shadow-xl">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-rose-400 uppercase tracking-wider font-bold">
                  Arc {getLoopArcNum(activeLoop.arcId)} Spoiler Barrier Active
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Death Loop #{activeLoop.loopNumber} is Sealed
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-mono">
                  This fatal timeline occurs in {activeLoop.arcName}. Checkpoint details, cause of death, and retained secrets are locked to protect your reading experience.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => handleRevealLoop(activeLoop.id)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-rose-600 hover:bg-rose-500 text-white cursor-pointer shadow-lg transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Reveal This Death Loop</span>
                </button>
                <button
                  onClick={() => setSpoilerArcLimit(10)}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer transition-all"
                >
                  Unlock All Arcs Barrier
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono" style={{ color: themeColors.highlight }}>
                    <span className="font-bold">{activeLoop.arcName}</span>
                    <span className="text-slate-600">·</span>
                    <span>Iteration #{activeLoop.loopNumber}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{activeLoop.deathType}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                    {activeLoop.checkpoint}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    Active Story Span: {activeLoop.startChapter} → {activeLoop.endChapter}
                  </div>
                </div>

                <button
                  onClick={playHeartbeat}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border text-xs font-mono cursor-pointer hover:bg-slate-800 transition-colors"
                  style={{
                    borderColor: `${themeColors.main}60`,
                    color: themeColors.highlight,
                  }}
                  title="Simulate cardiac pressure"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Simulate Heartbeat</span>
                </button>
              </div>

              {/* Cause of Death & Primary Adversary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-950/60 space-y-1.5 shadow-inner">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5" />
                    <span>Cause of Death / Resolution</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 leading-relaxed">
                    {activeLoop.causeOfDeath}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 shadow-inner">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold flex items-center gap-1.5" style={{ color: themeColors.highlight }}>
                    <Skull className="w-3.5 h-3.5" />
                    <span>Primary Adversary / Threat</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 leading-relaxed">
                    {activeLoop.antagonist}
                  </div>
                </div>
              </div>

              {/* Retained Keys & Intelligence Carried to Next Loop */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Retained Intelligence & Secrets Unlocked in this Timeline</span>
                </div>

                <ul className="space-y-2">
                  {activeLoop.retainedKnowledge.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lore Callout */}
              <div
                className="p-3.5 rounded-xl border text-[11px] font-mono flex items-center justify-between"
                style={{
                  backgroundColor: `${themeColors.main}10`,
                  borderColor: `${themeColors.main}30`,
                  color: themeColors.highlight,
                }}
              >
                <span>Return by Death (死に戻り) Authority</span>
                <span>Unbreakable Checkpoint Lock</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
