import React from 'react';
import { TrackerItem, UserItemState } from '../types/tracker';
import { getChapterLore } from '../data/chapterLore';
import { Check, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface ChapterRowProps {
  item: TrackerItem;
  state: UserItemState;
  onToggle: (id: string) => void;
  onUpdateState: (id: string, updates: Partial<UserItemState>) => void;
  onSelect: (item: TrackerItem) => void;
  isSelected?: boolean;
  isNextUp?: boolean;
  searchQuery?: string;
}

export const ChapterRow: React.FC<ChapterRowProps> = ({
  item,
  state,
  onToggle,
  onUpdateState,
  onSelect,
  isSelected = false,
  isNextUp = false,
  searchQuery = '',
}) => {
  const { themeColors, characterLore } = useCustomization();
  const lore = getChapterLore(item.id, item.title, item.arcTitle);

  // Check active theme character presence
  const activeCharName = characterLore.characterName.split(' ')[0]?.toLowerCase() || '';
  const hasActiveCharacter = activeCharName
    ? lore.characters.some((c) => c.toLowerCase().includes(activeCharName)) ||
      item.title.toLowerCase().includes(activeCharName) ||
      item.subcategory?.toLowerCase().includes(activeCharName)
    : false;

  // Rem presence for canon tracking
  const hasRem =
    lore.characters.some((c) => c.toLowerCase().includes('rem')) ||
    item.title.toLowerCase().includes('rem') ||
    item.subcategory?.toLowerCase().includes('rem');

  // Check if search query matches lore details
  const q = searchQuery.toLowerCase().trim();
  const matchedInLore =
    q &&
    (lore.summary.toLowerCase().includes(q) ||
      lore.keyPoints.some((p) => p.toLowerCase().includes(q)) ||
      lore.characters.some((c) => c.toLowerCase().includes(q)));

  return (
    <div
      onClick={() => onSelect(item)}
      className={`group relative flex flex-col p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
        state.completed
          ? 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-850 hover:border-slate-700'
          : 'bg-slate-900/80 border-slate-800/80 hover:bg-slate-850'
      }`}
      style={
        isSelected
          ? {
              backgroundColor: `${themeColors.main}18`,
              borderColor: themeColors.main,
              boxShadow: `0 8px 24px -4px ${themeColors.main}30`,
              outline: `2px solid ${themeColors.main}50`,
            }
          : isNextUp
          ? {
              backgroundColor: `${themeColors.main}10`,
              borderColor: `${themeColors.main}60`,
              boxShadow: `0 4px 16px -2px ${themeColors.main}20`,
            }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: Checkbox + Content */}
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(item.id);
            }}
            className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
              state.completed
                ? 'shadow-sm'
                : 'border-slate-700 bg-slate-950 text-transparent hover:border-slate-500'
            }`}
            style={
              state.completed
                ? {
                    backgroundColor: themeColors.main,
                    borderColor: themeColors.highlight,
                    color: themeColors.bg,
                    boxShadow: `0 2px 8px -1px ${themeColors.main}50`,
                  }
                : undefined
            }
            title={state.completed ? 'Mark unread' : 'Mark completed'}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </button>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-sm font-medium tracking-tight ${
                  state.completed
                    ? 'text-slate-400 line-through decoration-slate-600'
                    : 'text-slate-100 group-hover:text-white'
                }`}
              >
                {item.title}
              </span>

              {/* Active Character Badge if relevant */}
              {hasActiveCharacter && (
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold"
                  style={{
                    backgroundColor: `${themeColors.main}20`,
                    borderColor: `${themeColors.main}50`,
                    color: themeColors.highlight,
                  }}
                  title={`Features ${characterLore.characterName}`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{characterLore.characterName}</span>
                </span>
              )}

              {/* Next Up Target Badge */}
              {isNextUp && !state.completed && (
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold animate-pulse"
                  style={{
                    backgroundColor: `${themeColors.main}25`,
                    borderColor: themeColors.main,
                    color: themeColors.highlight,
                  }}
                >
                  Next Target ✦
                </span>
              )}
            </div>

            {/* Snippet / Teaser */}
            <p className="text-xs text-slate-400 line-clamp-1 font-serif">
              {lore.summary}
            </p>

            {/* Matched Search snippet indicator */}
            {matchedInLore && (
              <div
                className="text-[11px] font-mono mt-1 p-1 rounded border inline-block"
                style={{
                  backgroundColor: `${themeColors.main}10`,
                  borderColor: `${themeColors.main}30`,
                  color: themeColors.highlight,
                }}
              >
                Found in Chapter Codex lore
              </div>
            )}
          </div>
        </div>

        {/* Right: Date, Category badge, Chevron */}
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
          {state.completed && state.completedDate && (
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              {state.completedDate}
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateState(item.id, { highlight: !state.highlight });
            }}
            className={`p-1 rounded hover:bg-slate-800 transition-colors ${
              state.highlight
                ? 'text-amber-400'
                : 'text-slate-600 hover:text-slate-400'
            }`}
            title={state.highlight ? 'Remove favorite star' : 'Mark as favorite chapter'}
          >
            <Heart className={`w-3.5 h-3.5 ${state.highlight ? 'fill-current' : ''}`} />
          </button>

          <ChevronRight
            className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
              isSelected ? 'rotate-90' : 'text-slate-600'
            }`}
            style={{
              color: isSelected ? themeColors.highlight : undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
};
