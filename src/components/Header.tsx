import React from 'react';
import {
  ListChecks,
  GitBranch,
  Shield,
  Split,
  Skull,
  Sparkles,
  Award,
  Calculator,
  BarChart3,
  RotateCcw,
  Map,
  Palette,
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

export type AppFeatureView =
  | 'tracker'
  | 'if_routes'
  | 'characters'
  | 'world_map'
  | 'novel_diffs'
  | 'loops'
  | 'authorities'
  | 'badges'
  | 'forecast'
  | 'analytics';

export type AppView = AppFeatureView;

interface HeaderProps {
  currentView: AppFeatureView;
  onViewChange: (v: AppFeatureView) => void;
  completedCount: number;
  totalCount: number;
  onOpenResetModal?: () => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  completedCount,
  totalCount,
  onOpenResetModal,
  onOpenSettings,
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const { getImage, themeColors, characterLore } = useCustomization();
  const avatarSrc = getImage('remSolo');

  const navItems = [
    { id: 'tracker' as const, label: 'Chapter Codex', icon: ListChecks },
    { id: 'if_routes' as const, label: 'IF Timelines', icon: GitBranch },
    { id: 'characters' as const, label: 'Character Codex', icon: Shield },
    { id: 'world_map' as const, label: 'World Map', icon: Map },
    { id: 'novel_diffs' as const, label: 'LN vs WN', icon: Split },
    { id: 'loops' as const, label: 'RBD Loops', icon: Skull },
    { id: 'authorities' as const, label: 'Witch Factors', icon: Sparkles },
    { id: 'badges' as const, label: 'Badges', icon: Award },
    { id: 'forecast' as const, label: 'Forecast & Sync', icon: Calculator },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header
      className="sticky top-0 z-30 w-full backdrop-blur-md border-b transition-colors duration-200 bg-slate-950/95 border-slate-800 shadow-lg shadow-black/40"
      style={{
        borderBottomColor: `${themeColors.main}30`,
      }}
    >
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between gap-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl overflow-hidden border-2 shadow-md shrink-0 bg-slate-900 transition-all cursor-pointer"
            onClick={onOpenSettings}
            style={{ borderColor: themeColors.main }}
            title="Click to customize character portrait & settings"
          >
            <img
              src={avatarSrc}
              alt="Avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white font-serif">
                Re:Zero Completionist Tracker
              </span>
              <span
                className="text-xs font-mono px-1.5 py-0.2 rounded border font-medium"
                style={{
                  color: themeColors.main,
                  borderColor: `${themeColors.main}40`,
                  backgroundColor: `${themeColors.main}15`,
                }}
              >
                {characterLore.characterName.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Right Tools: Progress counter, Theme indicator, Reset, and Settings */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="text-xs text-slate-400 font-mono tabular-nums hidden sm:inline">
            <span style={{ color: themeColors.highlight }} className="font-bold">{completedCount}</span> / {totalCount} ({percentage}%)
          </span>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer shadow-md"
              style={{
                backgroundColor: `${themeColors.main}20`,
                borderColor: `${themeColors.main}60`,
                color: themeColors.highlight,
              }}
              title="Personalization Studio (Themes, Armaments, Images & Settings)"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: themeColors.main }} />
              <span>{characterLore.characterName.split(' ')[0]}</span>
            </button>
          )}

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-lg border border-slate-700 bg-slate-900/90 text-slate-300 hover:text-white hover:border-slate-500 transition-all cursor-pointer shadow-sm"
              title="Personalization Studio"
            >
              <span className="text-sm">⚙️</span>
              <span className="hidden sm:inline">Settings</span>
            </button>
          )}

          {onOpenResetModal && (
            <button
              onClick={onOpenResetModal}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-lg border border-slate-700 bg-slate-900/90 text-rose-300 hover:text-white hover:border-rose-500 hover:bg-rose-950/60 transition-all cursor-pointer shadow-sm"
              title="Reset Reading Progress"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Nav Feature Pills Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: themeColors.main,
                        color: themeColors.bg,
                        fontWeight: 700,
                        boxShadow: `0 2px 10px -1px ${themeColors.main}40`,
                      }
                    : undefined
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
