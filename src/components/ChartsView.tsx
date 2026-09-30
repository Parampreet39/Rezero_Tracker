import React, { useMemo, useState } from 'react';
import { ALL_TRACKER_ITEMS, ARC_GROUPS } from '../data';
import { UserItemState } from '../types/tracker';
import { BarChart3, TrendingUp, Calendar, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface ChartsViewProps {
  userState: Record<string, UserItemState>;
  onSelectArc: (arcId: string) => void;
}

export const ChartsView: React.FC<ChartsViewProps> = ({
  userState,
  onSelectArc,
}) => {
  const { themeColors } = useCustomization();
  const [activeChartTab, setActiveChartTab] = useState<'arcs' | 'timeline' | 'categories'>('arcs');
  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; count: number; x: number; y: number } | null>(null);

  // Calculate arc stats
  const arcStats = useMemo(() => {
    return ARC_GROUPS.filter(a => a.id !== 'all').map(arc => {
      const items = ALL_TRACKER_ITEMS.filter(it => it.arcId === arc.id);
      const completedCount = items.filter(it => userState[it.id]?.completed).length;
      const totalCount = items.length;
      const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
      return {
        id: arc.id,
        title: arc.title,
        subtitle: arc.subtitle,
        number: arc.number,
        total: totalCount,
        completed: completedCount,
        percentage,
        color: arc.color,
      };
    });
  }, [userState]);

  // Calculate reading velocity per date
  const timelineData = useMemo(() => {
    const countsByDate: Record<string, number> = {};
    ALL_TRACKER_ITEMS.forEach(it => {
      const state = userState[it.id];
      if (state?.completed && state.completedDate) {
        countsByDate[state.completedDate] = (countsByDate[state.completedDate] || 0) + 1;
      }
    });

    const sortedDates = Object.keys(countsByDate).sort();
    let cumulative = 0;
    return sortedDates.map(date => {
      const count = countsByDate[date];
      cumulative += count;
      const dateParts = date.split('-');
      const formatted = dateParts.length === 3 ? `${dateParts[1]}/${dateParts[2]}` : date;
      return {
        date,
        formatted,
        count,
        cumulative,
      };
    });
  }, [userState]);

  // Calculate category stats
  const categoryStats = useMemo(() => {
    const cats: Record<string, { total: number; completed: number; color: string }> = {
      'Main Story': { total: 0, completed: 0, color: '#38bdf8' },
      'Side Story': { total: 0, completed: 0, color: '#818cf8' },
      'EX Light Novel': { total: 0, completed: 0, color: '#f59e0b' },
      'What IF': { total: 0, completed: 0, color: '#f43f5e' },
      'Manga': { total: 0, completed: 0, color: '#10b981' },
      'Reference & Meta': { total: 0, completed: 0, color: '#94a3b8' },
    };

    ALL_TRACKER_ITEMS.forEach(it => {
      if (cats[it.category]) {
        cats[it.category].total += 1;
        if (userState[it.id]?.completed) {
          cats[it.category].completed += 1;
        }
      }
    });

    return Object.entries(cats).map(([name, data]) => ({
      name,
      ...data,
      pct: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
    }));
  }, [userState]);

  const totalCompleted = useMemo(() => {
    return Object.values(userState).filter(s => s.completed).length;
  }, [userState]);

  const totalItems = ALL_TRACKER_ITEMS.length;
  const overallPercentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  const maxDayCount = useMemo(() => {
    return Math.max(...timelineData.map(d => d.count), 15);
  }, [timelineData]);

  return (
    <div className="space-y-6">
      {/* Top summary metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Completed Chapters</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white tabular-nums">{totalCompleted}</span>
            <span className="text-xs text-slate-500 font-mono">/ {totalItems}</span>
          </div>
          <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${overallPercentage}%`,
                backgroundColor: themeColors.main,
              }}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
            <Heart
              className="w-4 h-4 fill-current"
              style={{ color: themeColors.main }}
            />
            <span>Overall Progress</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-bold font-mono tabular-nums"
              style={{ color: themeColors.highlight }}
            >
              {overallPercentage}%
            </span>
            <span className="text-xs text-slate-500">done</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 truncate">
            {totalItems - totalCompleted} chapters remaining
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Active Log Days</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">{timelineData.length}</span>
            <span className="text-xs text-slate-500">recorded</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 truncate">
            Latest: {timelineData[timelineData.length - 1]?.date || 'None'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>Peak Day Velocity</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-rose-400 tabular-nums">{maxDayCount}</span>
            <span className="text-xs text-slate-500">chapters</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 truncate">
            Single-day sprint record
          </div>
        </div>
      </div>

      {/* Chart mode tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div>
          <h2 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5" style={{ color: themeColors.main }} />
            Reading Progress & Velocity
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track reading speed and completion rates across all story arcs.
          </p>
        </div>

        <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-medium font-mono">
          <button
            onClick={() => setActiveChartTab('arcs')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeChartTab === 'arcs' ? 'shadow-sm font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            style={
              activeChartTab === 'arcs'
                ? {
                    backgroundColor: themeColors.main,
                    color: themeColors.bg,
                  }
                : undefined
            }
          >
            Arc Breakdown
          </button>
          <button
            onClick={() => setActiveChartTab('timeline')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeChartTab === 'timeline' ? 'shadow-sm font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            style={
              activeChartTab === 'timeline'
                ? {
                    backgroundColor: themeColors.main,
                    color: themeColors.bg,
                  }
                : undefined
            }
          >
            Daily Velocity
          </button>
          <button
            onClick={() => setActiveChartTab('categories')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeChartTab === 'categories' ? 'shadow-sm font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            style={
              activeChartTab === 'categories'
                ? {
                    backgroundColor: themeColors.main,
                    color: themeColors.bg,
                  }
                : undefined
            }
          >
            Format Distribution
          </button>
        </div>
      </div>

      {/* CHART 1: Arc Breakdown Horizontal Bars */}
      {activeChartTab === 'arcs' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-300">
              Arc Completion Rates & Chapter Volumes
            </div>
            <div className="text-xs text-slate-500">
              Click any arc bar to jump to its chapters
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {arcStats.map((arc) => (
              <div
                key={arc.id}
                onClick={() => onSelectArc(arc.id)}
                className="group cursor-pointer p-2.5 rounded-xl hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-700"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200 group-hover:text-sky-300 transition-colors">
                      {arc.number}: {arc.title}
                    </span>
                    <span className="text-slate-500 text-[11px] hidden sm:inline">
                      ({arc.subtitle})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono tabular-nums text-slate-400">
                    <span className="font-medium text-slate-200">{arc.completed}</span>
                    <span className="text-slate-600">/</span>
                    <span>{arc.total}</span>
                    <span className={`text-xs ml-1 font-bold ${
                      arc.percentage === 100
                        ? 'text-emerald-400'
                        : arc.percentage > 0
                        ? 'text-sky-400'
                        : 'text-slate-600'
                    }`}>
                      {arc.percentage}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${arc.color} ${
                      arc.percentage === 0 ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{ width: `${arc.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHART 2: Daily Reading Velocity Timeline */}
      {activeChartTab === 'timeline' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-300">
                Logged Reading Activity & Daily Volume
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Chapters checked off per logged session
              </div>
            </div>
            <div
              className="text-xs font-mono px-2.5 py-1 rounded-md border"
              style={{
                color: themeColors.highlight,
                backgroundColor: `${themeColors.main}20`,
                borderColor: `${themeColors.main}50`,
              }}
            >
              Cumulative: {totalCompleted} ch
            </div>
          </div>

          {timelineData.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No date-stamped completions yet. Check off chapters with dates to build your reading timeline!
            </div>
          ) : (
            <div className="pt-4 pb-2">
              <div className="relative w-full h-64">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 700 240" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="remVelocityGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={themeColors.highlight} stopOpacity="0.85" />
                      <stop offset="100%" stopColor={themeColors.main} stopOpacity="0.25" />
                    </linearGradient>
                    <linearGradient id="remLineAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={themeColors.main} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={themeColors.main} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                    const y = 200 - ratio * 170;
                    const val = Math.round(ratio * maxDayCount);
                    return (
                      <g key={i}>
                        <line x1="30" y1={y} x2="680" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                        <text x="20" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" className="font-mono">
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Cumulative line curve */}
                  {(() => {
                    if (timelineData.length < 2) return null;
                    const points = timelineData.map((d, index) => {
                      const x = 50 + (index / (timelineData.length - 1)) * 610;
                      const y = 200 - (d.cumulative / totalCompleted) * 170;
                      return `${x},${y}`;
                    }).join(' ');

                    return (
                      <>
                        <path
                          d={`M 50,200 L ${points} L ${50 + 610},200 Z`}
                          fill="url(#remLineAreaGrad)"
                        />
                        <polyline
                          fill="none"
                          stroke="#7dd3fc"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={points}
                        />
                      </>
                    );
                  })()}

                  {/* Daily volume bars */}
                  {timelineData.map((d, index) => {
                    const step = 610 / (timelineData.length - 1 || 1);
                    const x = 50 + index * step;
                    const barHeight = Math.max((d.count / maxDayCount) * 170, 4);
                    const y = 200 - barHeight;
                    const barWidth = Math.min(step * 0.45, 24);

                    return (
                      <g
                        key={d.date}
                        className="cursor-pointer group"
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredPoint({ label: d.date, count: d.count, x: rect.left, y: rect.top });
                        }}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <rect
                          x={x - barWidth / 2}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          rx={3}
                          fill="url(#remVelocityGrad)"
                          className="hover:opacity-100 opacity-85 transition-opacity"
                        />
                        <text
                          x={x}
                          y="225"
                          fill="#94a3b8"
                          fontSize="9.5"
                          textAnchor="middle"
                          className="font-mono group-hover:fill-sky-300 transition-colors"
                        >
                          {d.formatted}
                        </text>
                        <text
                          x={x}
                          y={y - 5}
                          fill="#e2e8f0"
                          fontSize="9.5"
                          fontWeight="bold"
                          textAnchor="middle"
                          className="font-mono"
                        >
                          {d.count}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {hoveredPoint && (
                  <div
                    className="absolute z-20 pointer-events-none px-3 py-1.5 rounded-lg bg-slate-950/95 border border-sky-400 text-white text-xs shadow-xl backdrop-blur-md transform -translate-x-1/2 -translate-y-full font-mono"
                    style={{ left: '50%', top: '20px' }}
                  >
                    <div className="font-semibold text-sky-300">{hoveredPoint.label}</div>
                    <div className="tabular-nums text-slate-300">{hoveredPoint.count} chapters completed</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CHART 3: Format Breakdown */}
      {activeChartTab === 'categories' && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="text-sm font-medium text-slate-300">
            Format & Content Type Progress Breakdown
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {categoryStats.map((cat) => (
              <div
                key={cat.name}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">{cat.name}</span>
                    <span className="font-mono text-sky-400 font-bold">{cat.pct}%</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-3 font-mono tabular-nums">
                    {cat.completed} of {cat.total} completed
                  </div>
                </div>

                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
