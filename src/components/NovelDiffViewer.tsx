import React, { useState } from 'react';
import { NOVEL_DIFFS_DATA, NovelDiffItem } from '../data/novelDiffsData';
import {
  Split,
  BookOpen,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Layers,
  FileText,
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface NovelDiffViewerProps {}

export const NovelDiffViewer: React.FC<NovelDiffViewerProps> = () => {
  const { themeColors } = useCustomization();
  const [selectedArc, setSelectedArc] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDiffId, setSelectedDiffId] = useState<string>(NOVEL_DIFFS_DATA[0].id);

  const arcTabs = [
    { id: 'all', label: 'All Arcs' },
    { id: 'arc1', label: 'Arc 1' },
    { id: 'arc2', label: 'Arc 2' },
    { id: 'arc3', label: 'Arc 3' },
    { id: 'arc4', label: 'Arc 4' },
    { id: 'arc5', label: 'Arc 5' },
    { id: 'arc6', label: 'Arc 6' },
    { id: 'arc7', label: 'Arc 7' },
    { id: 'arc8', label: 'Arc 8' },
  ];

  const categoryTabs = [
    { id: 'all', label: 'All Categories' },
    { id: 'Cut Content', label: 'Cut Content' },
    { id: 'Structural Change', label: 'Structural' },
    { id: 'Character Detail', label: 'Character Lore' },
    { id: 'Added Content', label: 'Added Content' },
  ];

  const filteredDiffs = NOVEL_DIFFS_DATA.filter((d) => {
    if (selectedArc !== 'all' && d.arcId !== selectedArc) return false;
    if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.wnVersion.toLowerCase().includes(q) ||
        d.lnVersion.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeDiff =
    NOVEL_DIFFS_DATA.find((d) => d.id === selectedDiffId) ||
    filteredDiffs[0] ||
    NOVEL_DIFFS_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400">
              <Split className="w-4 h-4" />
              <span>Canonical Divergence & Edition Comparison</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Light Novel vs. Web Novel Master Diff Tracker
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 max-w-3xl">
              Track major textual differences, cut dialogues, psychological horror tones, and structural pacing reorganizations between the original Syosetu web novel and the official published Kadokawa / Yen Press light novels across Arcs 1 through 8.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 shrink-0">
            <span>Cataloged Diffs: </span>
            <span className="text-sky-400 font-bold">{NOVEL_DIFFS_DATA.length} Entries</span>
          </div>
        </div>

        {/* Filters Rail: Arc Tabs + Search + Categories */}
        <div className="pt-2 border-t border-slate-800/80 space-y-3">
          {/* Arc Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
            {arcTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedArc(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer font-medium transition-colors ${
                  selectedArc === tab.id
                    ? 'font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
                style={
                  selectedArc === tab.id
                    ? {
                        backgroundColor: themeColors.main,
                        color: themeColors.bg,
                      }
                    : undefined
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sub-Filters: Search and Category Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search diffs (e.g. Al, Liliana, Kiss of Death)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                style={{
                  borderColor: searchQuery ? themeColors.main : undefined,
                }}
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono scrollbar-none">
              {categoryTabs.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-slate-800 font-bold border'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                  style={
                    selectedCategory === cat.id
                      ? {
                          color: themeColors.highlight,
                          borderColor: `${themeColors.main}60`,
                        }
                      : undefined
                  }
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Diff Grid: Left List + Right Side-by-Side View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Col: Diff Items List */}
        <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredDiffs.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs">
              No differences match your selected filters.
            </div>
          ) : (
            filteredDiffs.map((diff) => {
              const isSelected = activeDiff.id === diff.id;
              return (
                <div
                  key={diff.id}
                  onClick={() => setSelectedDiffId(diff.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: `${themeColors.main}20`,
                          borderColor: themeColors.main,
                          boxShadow: `0 4px 14px -2px ${themeColors.main}30`,
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span className="text-sky-300 font-semibold">{diff.arcName.split(':')[0]}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${
                        diff.significance === 'Critical Lore'
                          ? 'text-amber-300 border-amber-500/40 bg-amber-950/40'
                          : diff.significance === 'Structural Change'
                          ? 'text-purple-300 border-purple-500/40 bg-purple-950/40'
                          : 'text-slate-400 border-slate-700 bg-slate-950'
                      }`}
                    >
                      {diff.significance}
                    </span>
                  </div>

                  <div className="text-xs font-bold leading-snug">{diff.title}</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {diff.summary}
                  </div>

                  {diff.fanVerdict && (
                    <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <span className="text-amber-400">✦</span>
                      <span>{diff.fanVerdict}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right Col: Deep Side-by-Side Comparison Inspector */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
          {/* Header Info */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                <span className="font-bold">{activeDiff.arcName}</span>
                <span className="text-slate-600">·</span>
                <span>Category: {activeDiff.category}</span>
              </div>

              {activeDiff.fanVerdict && (
                <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                  {activeDiff.fanVerdict}
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
              {activeDiff.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {activeDiff.summary}
            </p>
          </div>

          {/* Side-by-Side Comparison Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* WN Version */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-amber-900/40 space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-bold text-amber-300">Web Novel (Syosetu)</span>
                </div>
                <span className="text-[10px] text-amber-500/80 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800/40">
                  RAW SERIAL
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1 whitespace-pre-line">
                {activeDiff.wnVersion}
              </p>
            </div>

            {/* LN Version */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-sky-900/40 space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span className="font-bold text-sky-300">Light Novel (Kadokawa / Yen Press)</span>
                </div>
                <span className="text-[10px] text-sky-500/80 font-bold bg-sky-950 px-2 py-0.5 rounded border border-sky-800/40">
                  OFFICIAL CANON
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1 whitespace-pre-line">
                {activeDiff.lnVersion}
              </p>
            </div>
          </div>

          {/* Critical Context & Significance Note */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-bold text-slate-200">Significance: {activeDiff.significance}</div>
              <div className="text-slate-400 leading-relaxed">
                {activeDiff.significance === 'Critical Lore'
                  ? 'This difference contains essential lore, foreshadowing, or character motivations that impact later arcs (e.g. Arcs 5–9).'
                  : activeDiff.significance === 'Structural Change'
                  ? 'This difference alters the chapter sequence, volume pacing, or positioning of story interludes.'
                  : 'This change reflects commercial print pacing, dialogue streamlining, or fight choreography adjustments.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
