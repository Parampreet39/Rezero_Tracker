import React, { useState, useEffect } from 'react';
import { TrackerItem, UserItemState } from '../types/tracker';
import { getChapterLore } from '../data/chapterLore';
import {
  X,
  Check,
  Sparkles,
  Calendar,
  MessageSquare,
  BookOpen,
  Users,
  Compass,
  Quote,
  ChevronLeft,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface ChapterCodexDrawerProps {
  item: TrackerItem | null;
  state: UserItemState;
  onClose: () => void;
  onToggle: (id: string) => void;
  onUpdateState: (id: string, updates: Partial<UserItemState>) => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  isNextUp?: boolean;
}

export const ChapterCodexDrawer: React.FC<ChapterCodexDrawerProps> = ({
  item,
  state,
  onClose,
  onToggle,
  onUpdateState,
  onNavigatePrev,
  onNavigateNext,
  hasPrev,
  hasNext,
  isNextUp = false,
}) => {
  const { themeColors, characterLore } = useCustomization();
  const [noteText, setNoteText] = useState(state.notes || '');
  const [dateText, setDateText] = useState(state.completedDate || '');

  useEffect(() => {
    setNoteText(state.notes || '');
    setDateText(state.completedDate || '');
  }, [item?.id, state.notes, state.completedDate]);

  if (!item) return null;

  const lore = getChapterLore(item.id, item.title, item.arcTitle);

  // Check active theme character presence
  const activeCharName = characterLore.characterName.split(' ')[0]?.toLowerCase() || '';
  const hasActiveCharacter = activeCharName
    ? lore.characters.some((c) => c.toLowerCase().includes(activeCharName)) ||
      item.title.toLowerCase().includes(activeCharName) ||
      item.subcategory?.toLowerCase().includes(activeCharName)
    : false;

  const hasRem =
    lore.characters.some((c) => c.toLowerCase().includes('rem')) ||
    item.title.toLowerCase().includes('rem') ||
    item.subcategory?.toLowerCase().includes('rem');

  const handleSaveNote = () => {
    onUpdateState(item.id, { notes: noteText });
  };

  const handleDateChange = (val: string) => {
    setDateText(val);
    onUpdateState(item.id, { completedDate: val });
  };

  return (
    <div
      className="h-full flex flex-col border-l text-slate-100 backdrop-blur-xl shadow-2xl transition-colors duration-200 bg-slate-950/95"
      style={{
        borderColor: `${themeColors.main}40`,
      }}
    >
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 text-xs font-mono">
          <BookOpen
            className="w-3.5 h-3.5"
            style={{ color: themeColors.main }}
          />
          <span
            className="font-bold"
            style={{ color: themeColors.highlight }}
          >
            Chapter Dossier
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 truncate max-w-[150px]">{item.arcTitle.split(':')[0]}</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onNavigatePrev}
            disabled={!hasPrev}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Previous chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNavigateNext}
            disabled={!hasNext}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Next chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
            title="Close dossier"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Title & Metadata */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="text-xs font-mono font-semibold px-2 py-0.5 rounded border"
              style={{
                color: themeColors.main,
                borderColor: `${themeColors.main}40`,
                backgroundColor: `${themeColors.main}15`,
              }}
            >
              {item.subcategory || 'Chapter Entry'}
            </span>

            {hasActiveCharacter && (
              <span
                className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border"
                style={{
                  color: themeColors.highlight,
                  backgroundColor: `${themeColors.main}20`,
                  borderColor: `${themeColors.main}50`,
                }}
              >
                <Sparkles className="w-2.5 h-2.5" style={{ color: themeColors.main }} />
                <span>Features {characterLore.characterName}</span>
              </span>
            )}
            {!hasActiveCharacter && hasRem && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-sky-300 bg-sky-950/80 border border-sky-500/40 px-2 py-0.5 rounded">
                <Heart className="w-2.5 h-2.5 fill-sky-400 text-sky-400" />
                <span>Features Rem (レム)</span>
              </span>
            )}
            {isNextUp && (
              <span
                className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border animate-pulse"
                style={{
                  backgroundColor: `${themeColors.main}20`,
                  color: themeColors.highlight,
                  borderColor: `${themeColors.main}60`,
                }}
              >
                Current Target
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {item.title}
          </h2>

          {lore.quote && (
            <div
              className="mt-3 p-3.5 rounded-xl border text-xs italic flex items-start gap-2.5"
              style={{
                backgroundColor: `${themeColors.subAlt}90`,
                borderColor: `${themeColors.main}40`,
                color: themeColors.text,
              }}
            >
              <Quote
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color: themeColors.highlight }}
              />
              <span>{lore.quote}</span>
            </div>
          )}
        </div>

        {/* Action Button Box */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onToggle(item.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-xs transition-all shadow-md cursor-pointer"
              style={
                state.completed
                  ? { backgroundColor: '#059669', color: '#ffffff' }
                  : {
                      backgroundColor: themeColors.main,
                      color: themeColors.bg,
                      fontWeight: 700,
                      boxShadow: `0 4px 15px -3px ${themeColors.main}40`,
                    }
              }
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>
                {state.completed
                  ? 'Marked as Completed ✓'
                  : `Mark Completed (${characterLore.characterName.split(' ')[0]})`}
              </span>
            </button>

            <button
              onClick={() => onUpdateState(item.id, { highlight: !state.highlight })}
              className={`p-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                state.highlight
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Toggle 🟢 Peak Chapter"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{state.highlight ? 'Peak Chapter 🟢' : 'Mark Peak'}</span>
            </button>
          </div>

          {/* Date Logger */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Finished on:
            </span>
            <input
              type="date"
              value={dateText}
              onChange={(e) => handleDateChange(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-slate-200 font-mono focus:outline-none"
              style={{ accentColor: themeColors.main }}
            />
          </div>
        </div>

        {/* SECTION 1: What It's About (Synopsis) */}
        <div className="space-y-2">
          <div
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: themeColors.highlight }}
          >
            <Compass className="w-4 h-4" />
            <span>What It's About (Narrative Synopsis)</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            {lore.summary}
          </p>
        </div>

        {/* SECTION 2: Key Plot Points & Revelations */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Key Plot Points & Highlights</span>
          </div>

          <ul className="space-y-2">
            {lore.keyPoints.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: themeColors.main }}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SECTION 3: Characters Present */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Users className="w-4 h-4" />
            <span>Characters Present</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {lore.characters.map((char) => {
              const isMatch = activeCharName && char.toLowerCase().includes(activeCharName);
              return (
                <span
                  key={char}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium ${
                    isMatch
                      ? 'border-transparent'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                  style={
                    isMatch
                      ? {
                          backgroundColor: `${themeColors.main}25`,
                          borderColor: themeColors.main,
                          color: themeColors.highlight,
                        }
                      : undefined
                  }
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: Checkpoints or Safe to Read */}
        {item.safeToReadNotice && (
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-xs text-amber-200">
            <div className="font-semibold text-amber-300 mb-0.5">Reading Guidance:</div>
            <div>{item.safeToReadNotice}</div>
          </div>
        )}

        {lore.checkpoint && (
          <div
            className="p-3 rounded-xl border text-xs"
            style={{
              backgroundColor: `${themeColors.main}15`,
              borderColor: `${themeColors.main}40`,
              color: themeColors.text,
            }}
          >
            <span className="font-semibold" style={{ color: themeColors.highlight }}>
              Return by Death Checkpoint:{' '}
            </span>
            <span>{lore.checkpoint}</span>
          </div>
        )}

        {/* SECTION 5: Personal Reading Notes */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Personal Notes & Memories</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Auto-saved</span>
          </div>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onBlur={handleSaveNote}
            placeholder="Write your thoughts, predictions, emotional reactions, or favorite lines from this chapter..."
            rows={3}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none"
            style={{ borderColor: `${themeColors.main}30` }}
          />
        </div>
      </div>
    </div>
  );
};
