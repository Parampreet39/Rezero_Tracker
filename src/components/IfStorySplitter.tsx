import React, { useState } from 'react';
import { IF_ROUTES_DATA, IfRouteInfo } from '../data/ifStoriesData';
import { GitBranch, Compass, Sparkles, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface IfStorySplitterProps {
  onSelectChapter?: (chapterId: string) => void;
}

export const IfStorySplitter: React.FC<IfStorySplitterProps> = ({
  onSelectChapter,
}) => {
  const { themeColors } = useCustomization();
  const [selectedRouteId, setSelectedRouteId] = useState<string>(IF_ROUTES_DATA[0].id);

  const selectedRoute: IfRouteInfo =
    IF_ROUTES_DATA.find((r) => r.id === selectedRouteId) || IF_ROUTES_DATA[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div
        className="p-5 rounded-2xl bg-slate-900/80 border space-y-3"
        style={{ borderColor: `${themeColors.main}30` }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
              style={{ color: themeColors.main }}
            >
              <GitBranch className="w-4 h-4" />
              <span>What IF Canonical Divergences & Sins of Subaru</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Re:Zero IF Alternate Timelines & Realities
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 max-w-3xl">
              Official divergence stories authored by Tappei Nagatsuki exploring what happens when Subaru Natsuki succumbs to one of the Deadly Sins at pivotal canonical decision points.
            </p>
          </div>
        </div>
      </div>

      {/* Selector Tabs for IF routes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {IF_ROUTES_DATA.map((route) => {
          const isSelected = selectedRouteId === route.id;
          return (
            <button
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className="p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer bg-slate-900/60 border-slate-800 hover:border-slate-700"
              style={
                isSelected
                  ? {
                      backgroundColor: `${themeColors.main}20`,
                      borderColor: themeColors.main,
                      boxShadow: `0 4px 14px -2px ${themeColors.main}30`,
                      outline: `2px solid ${themeColors.main}40`,
                    }
                  : undefined
              }
            >
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                  {route.sin.split(' ')[0]}
                </div>
                <div className="text-xs font-bold truncate mt-0.5 text-white">
                  {route.name.split(' ')[0]} IF
                </div>
              </div>

              <div className="mt-2 text-[10px] font-mono opacity-80 truncate text-slate-400">
                {route.branchArc.split(':')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Route Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Route Overview & Flavor */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400">
                <span>{selectedRoute.sin}</span>
                <span>·</span>
                <span>{selectedRoute.branchArc}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                {selectedRoute.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedRoute.japaneseTitle}</p>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
              <Compass className="w-3.5 h-3.5" style={{ color: themeColors.main }} />
              <span>{selectedRoute.branchChapter}</span>
            </div>
          </div>

          {/* Divergence Point Box */}
          <div
            className="p-4 rounded-xl border space-y-2"
            style={{
              backgroundColor: `${themeColors.main}10`,
              borderColor: `${themeColors.main}30`,
            }}
          >
            <div
              className="text-xs font-mono font-bold flex items-center gap-2 uppercase tracking-wider"
              style={{ color: themeColors.highlight }}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Canonical Divergence Decision</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {selectedRoute.divergencePremise}
            </p>
          </div>

          {/* Detailed Narrative Arc Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-400">
              Alternate Timeline Summary
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-serif bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {selectedRoute.summary}
            </p>
          </div>

          {/* Consequences / Fate */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-slate-400">
              Timeline Consequences & Key Events
            </h4>
            <div className="space-y-2">
              {selectedRoute.consequences.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safe to read arc banner */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Spoiler Safety Threshold: <strong className="text-slate-200">{selectedRoute.safeToReadArc}</strong></span>
          </div>

          {/* Navigation action to Tracker chapter */}
          {onSelectChapter && (
            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => onSelectChapter(selectedRoute.branchChapterId)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                style={{
                  backgroundColor: themeColors.main,
                  color: themeColors.bg,
                }}
              >
                <span>Read Branch Chapter in Tracker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Key Characters Impacted */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Key Characters in Timeline</span>
          </div>

          <div className="space-y-2">
            {selectedRoute.keyCharacters.map((char) => (
              <div
                key={char}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs font-medium text-slate-200 flex items-center justify-between"
              >
                <span>{char}</span>
                <span className="text-[10px] text-slate-500 font-mono">Altered Destiny</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
