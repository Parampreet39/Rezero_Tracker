import React from 'react';
import { ARC_GROUPS, ALL_TRACKER_ITEMS } from '../data';
import { UserItemState } from '../types/tracker';
import {
  BookOpen, Apple, Castle, Snowflake, Crown, Sword, Coffee,
  Waves, Compass, ShieldAlert, Flame, Sparkles, Sun, GitBranch, Layers, Heart
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface ArcNavProps {
  selectedArcId: string;
  onSelectArc: (arcId: string) => void;
  userState: Record<string, UserItemState>;
}

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen, Apple, Castle, Snowflake, Crown, Sword, Coffee,
  Waves, Compass, ShieldAlert, Flame, Sparkles, Sun, GitBranch, Layers,
};

export const ArcNav: React.FC<ArcNavProps> = ({
  selectedArcId,
  onSelectArc,
  userState,
}) => {
  const { themeColors, characterLore } = useCustomization();

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-2">
      <div className="flex items-center justify-between px-2 pb-1">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 font-mono">
          Story Arcs
        </span>
        <span
          className="text-[11px] font-mono font-medium"
          style={{ color: themeColors.highlight }}
        >
          10 Arcs + IFs
        </span>
      </div>

      {/* Responsive list */}
      <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
        {ARC_GROUPS.map((arc) => {
          const Icon = ICON_MAP[arc.icon] || BookOpen;
          const items = arc.id === 'all'
            ? ALL_TRACKER_ITEMS
            : ALL_TRACKER_ITEMS.filter((it) => it.arcId === arc.id);
          const total = items.length;
          const completed = items.filter((it) => userState[it.id]?.completed).length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
          const isSelected = selectedArcId === arc.id;

          return (
            <button
              key={arc.id}
              onClick={() => onSelectArc(arc.id)}
              className={`flex items-center justify-between p-2.5 rounded-xl text-left transition-all shrink-0 lg:shrink w-56 lg:w-full border cursor-pointer ${
                isSelected
                  ? 'text-white'
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
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border"
                  style={
                    isSelected
                      ? {
                          backgroundColor: themeColors.main,
                          color: themeColors.bg,
                          borderColor: themeColors.highlight,
                        }
                      : {
                          backgroundColor: '#1e293b',
                          color: '#94a3b8',
                          borderColor: '#334155',
                        }
                  }
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate leading-tight flex items-center gap-1">
                    <span>{arc.number}: {arc.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate leading-tight">
                    {arc.subtitle}
                  </div>
                </div>
              </div>

              {/* Progress metrics */}
              <div className="text-right shrink-0 pl-2">
                <div className="text-xs font-mono tabular-nums font-medium text-slate-300">
                  {completed}/{total}
                </div>
                <div
                  className="text-[10px] font-mono font-bold"
                  style={{
                    color: isSelected
                      ? themeColors.highlight
                      : themeColors.main,
                  }}
                >
                  {pct}%
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
