import React from 'react';
import { ARC_ACHIEVEMENTS } from '../data/achievementsData';
import { UserItemState } from '../types/tracker';
import { Award } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface ArcAchievementsModalProps {
  userState: Record<string, UserItemState>;
}

export const ArcAchievementsModal: React.FC<ArcAchievementsModalProps> = ({
  userState,
}) => {
  const { themeColors } = useCustomization();
  const unlockedBadges = ARC_ACHIEVEMENTS.filter((b) => b.checkUnlocked(userState));
  const totalBadges = ARC_ACHIEVEMENTS.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
            style={{ color: themeColors.main }}
          >
            <Award className="w-4 h-4" />
            <span>Completionist Trophies</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Story Arc Badges & Reading Milestones
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Earn official chronicle badges as you read through complete story arcs, legendary chapters, and emotional milestones.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
          <span>Unlocked: </span>
          <span className="font-bold text-sm" style={{ color: themeColors.highlight }}>
            {unlockedBadges.length}
          </span>
          <span className="text-slate-500"> / {totalBadges} Badges</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ARC_ACHIEVEMENTS.map((badge) => {
          const isUnlocked = badge.checkUnlocked(userState);

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                isUnlocked
                  ? 'bg-gradient-to-br from-slate-900 to-slate-950 shadow-lg'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-60'
              }`}
              style={{
                borderColor: isUnlocked ? `${themeColors.main}60` : undefined,
                boxShadow: isUnlocked ? `0 8px 25px -5px ${themeColors.main}20` : undefined,
              }}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                    {badge.icon}
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      isUnlocked
                        ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50'
                        : 'text-slate-500 bg-slate-900 border-slate-800'
                    }`}
                  >
                    {isUnlocked ? 'UNLOCKED ✓' : 'LOCKED'}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-xs font-mono" style={{ color: themeColors.highlight }}>
                    {badge.subtitle}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-500 border-t border-slate-800/80 pt-2 flex items-center justify-between">
                <span>Req: {badge.requirement}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
