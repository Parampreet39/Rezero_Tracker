import React, { useState } from 'react';
import { UserItemState } from '../types/tracker';
import { ALL_TRACKER_ITEMS } from '../data';
import { Calculator, Globe, Users } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface VelocityForecastCalculatorProps {
  userState: Record<string, UserItemState>;
}

export const VelocityForecastCalculator: React.FC<VelocityForecastCalculatorProps> = ({
  userState,
}) => {
  const { themeColors } = useCustomization();
  const [chaptersPerWeek, setChaptersPerWeek] = useState<number>(14); // ~2 ch/day default

  const totalItems = ALL_TRACKER_ITEMS.length;
  const completedCount = Object.values(userState).filter((s) => s.completed).length;
  const remainingChapters = Math.max(0, totalItems - completedCount);

  // Dynamic remaining chapters for key milestones
  const arc3Items = ALL_TRACKER_ITEMS.filter((it) => it.arcId === 'arc1' || it.arcId === 'arc2' || it.arcId === 'arc3');
  const arc3Remaining = arc3Items.filter((it) => !userState[it.id]?.completed).length;

  const arc4Items = ALL_TRACKER_ITEMS.filter((it) => it.arcId === 'arc4');
  const arc4Remaining = arc3Remaining + arc4Items.filter((it) => !userState[it.id]?.completed).length;

  const arc6Items = ALL_TRACKER_ITEMS.filter((it) => it.arcId === 'arc5' || it.arcId === 'arc6');
  const arc6Remaining = arc4Remaining + arc6Items.filter((it) => !userState[it.id]?.completed).length;

  // Active reading position
  const nextUnreadItem = ALL_TRACKER_ITEMS.find((it) => !userState[it.id]?.completed);

  const calculateTargetDate = (chaptersNeeded: number) => {
    if (chaptersPerWeek <= 0) return 'Never (Pace 0)';
    const daysNeeded = Math.ceil((chaptersNeeded / chaptersPerWeek) * 7);
    const date = new Date();
    date.setDate(date.getDate() + daysNeeded);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Camp Influence Breakdown calculation
  const campCounts: Record<string, { total: number; color: string; badge: string }> = {
    'Emilia Camp': { total: 420, color: 'bg-sky-500', badge: '62% Focus' },
    'Crusch Camp': { total: 110, color: 'bg-emerald-500', badge: '16% Focus' },
    'Anastasia Camp': { total: 65, color: 'bg-blue-400', badge: '10% Focus' },
    'Priscilla Camp': { total: 55, color: 'bg-rose-500', badge: '8% Focus' },
    'Felt Camp': { total: 30, color: 'bg-amber-400', badge: '4% Focus' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
            style={{ color: themeColors.main }}
          >
            <Calculator className="w-4 h-4" />
            <span>Forecasting & Community Metrics</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Reading Velocity Forecast & Community Sync
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Simulate your reading pace to predict exact calendar completion dates, track Royal Selection camp distribution, and check world frontier status.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 shrink-0">
          <span>Remaining: </span>
          <span className="font-bold" style={{ color: themeColors.highlight }}>{remainingChapters} chapters</span>
        </div>
      </div>

      {/* 1. Velocity Forecast Calculator */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-sm font-bold text-white">Interactive Reading Pace Simulator</div>
            <div className="text-xs text-slate-400 mt-0.5">
              Adjust your target weekly reading volume to calculate estimated milestone arrival dates.
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 font-mono">
            <span className="text-xs text-slate-400">Target Pace:</span>
            <span className="text-base font-bold tabular-nums" style={{ color: themeColors.highlight }}>{chaptersPerWeek}</span>
            <span className="text-xs text-slate-500">ch/week</span>
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Slow & Steady (3 ch/wk)</span>
            <span>Balanced Reader (14 ch/wk)</span>
            <span>Sprint Binger (35 ch/wk)</span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            value={chaptersPerWeek}
            onChange={(e) => setChaptersPerWeek(Number(e.target.value))}
            className="w-full bg-slate-950 h-2 rounded-lg cursor-pointer"
            style={{ accentColor: themeColors.main }}
          />
        </div>

        {/* Milestone Forecast Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono uppercase font-bold" style={{ color: themeColors.highlight }}>Arc 3 Climax</div>
            <div className="text-xs text-slate-400">Petelgeuse Purge (15 ch)</div>
            <div className="text-base font-bold text-white pt-1">
              {calculateTargetDate(arc3Remaining)}
            </div>
            <div className="text-[10px] text-emerald-400 font-mono">~{Math.ceil(arc3Remaining / (chaptersPerWeek / 7))} days away</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Arc 4 Conclusion</div>
            <div className="text-xs text-slate-400">Sanctuary Trials & Tea Party</div>
            <div className="text-base font-bold text-white pt-1">
              {calculateTargetDate(arc4Remaining)}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">~{Math.ceil(arc4Remaining / (chaptersPerWeek / 7))} days away</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono uppercase text-purple-400 font-bold">Pleiades Watchtower</div>
            <div className="text-xs text-slate-400">Arc 6 Climax</div>
            <div className="text-base font-bold text-white pt-1">
              {calculateTargetDate(arc6Remaining)}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">~{Math.ceil(arc6Remaining / (chaptersPerWeek / 7))} days away</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono uppercase text-rose-400 font-bold">Caught Up with Raw</div>
            <div className="text-xs text-slate-400">Arc 10 Frontier ({remainingChapters} ch)</div>
            <div className="text-base font-bold text-white pt-1">
              {calculateTargetDate(remainingChapters)}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Full Chronicle Caught Up</div>
          </div>
        </div>
      </div>

      {/* 2. Community Frontier Sync & Camp Influence Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Community Frontier Sync */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider font-mono"
            style={{ color: themeColors.main }}
          >
            <Globe className="w-4 h-4" />
            <span>Community Frontier Sync Status</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-slate-400">Official English Light Novel (Yen Press)</div>
                <div className="font-bold text-white mt-0.5">Volume 26 (Arc 6 Taygeta)</div>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Official Release
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-slate-400">Fan Translation Frontier (WTC Translations)</div>
                <div className="font-bold text-white mt-0.5">Arc 9 & Arc 10 (Ongoing)</div>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded border"
                style={{
                  color: themeColors.highlight,
                  backgroundColor: `${themeColors.main}15`,
                  borderColor: `${themeColors.main}40`,
                }}
              >
                Fully Translated
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-slate-400">Raw Japanese Web Novel (Syosetu)</div>
                <div className="font-bold text-white mt-0.5">Arc 10 Chapter 12 (Active)</div>
              </div>
              <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                Raw Frontier
              </span>
            </div>

            <div
              className="p-3 rounded-xl border flex items-center justify-between"
              style={{
                backgroundColor: `${themeColors.main}10`,
                borderColor: `${themeColors.main}40`,
              }}
            >
              <div>
                <div className="font-bold" style={{ color: themeColors.highlight }}>Your Active Reading Frontier</div>
                <div className="font-bold text-white mt-0.5 line-clamp-1">
                  {nextUnreadItem
                    ? `${nextUnreadItem.arcTitle.split(':')[0]}: ${nextUnreadItem.title}`
                    : 'All Chapters Complete · Caught Up to Raw!'}
                </div>
              </div>
              <span
                className="text-[10px] text-white px-2 py-0.5 rounded font-bold shrink-0 ml-2"
                style={{ backgroundColor: themeColors.main, color: themeColors.bg }}
              >
                You Are Here 📍
              </span>
            </div>
          </div>
        </div>

        {/* Camp Influence Dashboard */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
            <Users className="w-4 h-4" />
            <span>Royal Selection Camp Influence Share</span>
          </div>

          <div className="space-y-3 pt-1">
            {Object.entries(campCounts).map(([name, data]) => (
              <div key={name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-medium">{name}</span>
                  <span className="text-slate-500">{data.badge}</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full ${data.color}`}
                    style={{ width: data.badge.split('%')[0] + '%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800">
            Emilia Camp commands the dominant narrative focus, followed by Crusch & Wilhelm's subjugation saga in Arc 3.
          </div>
        </div>
      </div>
    </div>
  );
};
