import React, { useState, useEffect, useRef } from 'react';
import { ALL_TRACKER_ITEMS } from '../data';
import { AppFeatureView } from './Header';
import {
  Search,
  ArrowRight,
  X,
  ListChecks,
  BarChart3,
  Heart,
  GitBranch,
  Shield,
  Split,
  Skull,
  Sparkles,
  Award,
  Calculator,
  Map,
  Sliders,
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (id: string) => void;
  onToggleChapter: (id: string) => void;
  onSelectArc: (arcId: string) => void;
  onChangeView: (view: AppFeatureView) => void;
  onOpenSettings?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  onSelectArc,
  onChangeView,
  onOpenSettings,
}) => {
  const { themeColors, characterLore } = useCustomization();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const commands = [
    { id: 'view-tracker', label: 'View Chapter Codex', icon: ListChecks, action: () => onChangeView('tracker') },
    { id: 'view-if', label: 'View Sin What IF Routes', icon: GitBranch, action: () => onChangeView('if_routes') },
    { id: 'view-characters', label: 'View Character Codex', icon: Shield, action: () => onChangeView('characters') },
    { id: 'view-map', label: 'View Continental World Map', icon: Map, action: () => onChangeView('world_map') },
    { id: 'view-diffs', label: 'View LN vs WN Differences', icon: Split, action: () => onChangeView('novel_diffs') },
    { id: 'view-loops', label: 'View Return by Death Loop Ledger', icon: Skull, action: () => onChangeView('loops') },
    { id: 'view-witch-factor', label: 'View Authority Evolution Tree', icon: Sparkles, action: () => onChangeView('authorities') },
    { id: 'view-badges', label: 'View Chronicle Badges', icon: Award, action: () => onChangeView('badges') },
    { id: 'view-forecast', label: 'View Velocity & Sync', icon: Calculator, action: () => onChangeView('forecast') },
    { id: 'view-analytics', label: 'View Reading Analytics & Charts', icon: BarChart3, action: () => onChangeView('analytics') },
    ...(onOpenSettings
      ? [{ id: 'open-settings', label: `Personalize ${characterLore.characterName} Theme & Armaments`, icon: Sliders, action: onOpenSettings }]
      : []),
  ];

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const matchedChapters = query.trim()
    ? ALL_TRACKER_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.arcTitle.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const allResults = [
    ...filteredCommands.map((c) => ({ type: 'command' as const, data: c })),
    ...matchedChapters.map((ch) => ({ type: 'chapter' as const, data: ch })),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl rounded-2xl bg-slate-950 border shadow-2xl overflow-hidden text-slate-200"
        style={{ borderColor: `${themeColors.main}50` }}
      >
        {/* Search input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-4 h-4" style={{ color: themeColors.main }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, character name, or chapter title..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-mono text-xs">
          {allResults.length === 0 ? (
            <div className="py-8 text-center text-slate-500">No matching commands or chapters.</div>
          ) : (
            allResults.map((item) => {
              if (item.type === 'command') {
                const Icon = item.data.icon;
                return (
                  <button
                    key={item.data.id}
                    onClick={() => {
                      item.data.action();
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-3.5 h-3.5" style={{ color: themeColors.main }} />
                      <span>{item.data.label}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              }

              const chapter = item.data;
              return (
                <button
                  key={chapter.id}
                  onClick={() => {
                    onSelectChapter(chapter.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-slate-100 truncate">{chapter.title}</div>
                    <div className="text-[10px] text-slate-500 truncate">{chapter.arcTitle}</div>
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-wider shrink-0 font-bold"
                    style={{ color: themeColors.highlight }}
                  >
                    Inspect
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-black/40 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <span>esc to close</span>
          <span>enter to select</span>
        </div>
      </div>
    </div>
  );
};
