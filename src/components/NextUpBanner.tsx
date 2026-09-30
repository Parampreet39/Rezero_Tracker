import React from 'react';
import { TrackerItem, UserItemState } from '../types/tracker';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface NextUpBannerProps {
  nextItem: TrackerItem | null;
  userState?: Record<string, UserItemState>;
  onCompleteNext: (id: string) => void;
  onJumpToArc: (arcId: string) => void;
}

export const NextUpBanner: React.FC<NextUpBannerProps> = ({
  nextItem,
  onCompleteNext,
  onJumpToArc,
}) => {
  const { getImage, themeColors, characterLore } = useCustomization();
  const avatarSrc = getImage('remSolo');

  if (!nextItem) {
    return (
      <div
        className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border flex items-center justify-between"
        style={{ borderColor: `${themeColors.main}40` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${themeColors.main}20`, color: themeColors.main }}
          >
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">All Chapters Caught Up!</h3>
            <p className="text-xs text-slate-400">
              You have read every single chapter in the chronicle! An extraordinary achievement.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div
      className="relative overflow-hidden p-5 rounded-2xl border shadow-xl transition-all duration-200 bg-gradient-to-r from-slate-950/90 via-slate-900 to-slate-950/80 shadow-black/40"
      style={{
        borderColor: `${themeColors.main}40`,
      }}
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Avatar mini badge */}
          <div
            className="w-11 h-11 rounded-xl overflow-hidden border-2 shrink-0 shadow-md bg-slate-950"
            style={{
              borderColor: themeColors.main,
            }}
          >
            <img
              src={avatarSrc}
              alt="Avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider font-mono">
              <span
                style={{ color: themeColors.highlight }}
              >
                {characterLore.characterName.split(' ')[0]}'s Target
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 font-normal">{nextItem.arcTitle.split(':')[0]}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {nextItem.title}
            </h3>

            <p className="text-xs text-slate-400 mt-0.5 italic">
              "{characterLore.quote || 'Let us conquer this chapter together!'}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
          <button
            onClick={() => onJumpToArc(nextItem.arcId)}
            className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            View Arc
          </button>

          <button
            onClick={() => onCompleteNext(nextItem.id)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{
              backgroundColor: themeColors.main,
              color: themeColors.bg,
              boxShadow: `0 4px 14px -2px ${themeColors.main}40`,
            }}
          >
            <span>Complete ({today})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
