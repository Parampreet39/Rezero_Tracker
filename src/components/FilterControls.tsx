import React from 'react';
import { Search, Download, Upload, RotateCcw, CheckSquare, Sparkles } from 'lucide-react';
import { ContentCategory } from '../types/tracker';
import { useCustomization } from '../context/CustomizationContext';

export type StatusFilter = 'all' | 'incomplete' | 'completed' | 'highlights';

interface FilterControlsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  categoryFilter: ContentCategory | 'all';
  onCategoryFilterChange: (cat: ContentCategory | 'all') => void;
  totalFiltered: number;
  totalAll: number;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetToDefaults: () => void;
  onMarkAllInView: () => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  totalFiltered,
  totalAll,
  onExportData,
  onImportData,
  onResetToDefaults,
  onMarkAllInView,
}) => {
  const { themeColors } = useCustomization();

  return (
    <div className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-md">
      {/* Top search & quick counts */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Deep Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search chapters, lore, characters (e.g. 'Subaru', 'Emilia', 'Rem', 'Sloth')..."
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none transition-all font-mono"
            style={{
              borderColor: searchQuery ? themeColors.main : undefined,
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Action Tools */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onMarkAllInView}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-750 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="Mark visible chapters as completed"
          >
            <CheckSquare className="w-3.5 h-3.5" style={{ color: themeColors.highlight }} />
            <span className="hidden sm:inline">Mark Filtered</span>
          </button>

          <button
            onClick={onExportData}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-750 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="Export tracking progress JSON"
          >
            <Download className="w-3.5 h-3.5" style={{ color: themeColors.highlight }} />
            <span className="hidden sm:inline">Export</span>
          </button>

          <label
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-750 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            title="Import tracking backup JSON"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Import</span>
            <input
              type="file"
              accept=".json"
              onChange={onImportData}
              className="hidden"
            />
          </label>

          <button
            onClick={onResetToDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900/70 rounded-lg border border-rose-600/60 transition-colors cursor-pointer shadow-sm shadow-rose-950/40"
            title="Reset reading progress (Start from Zero or Reset Arc)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 font-mono">
        {/* Status buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            onClick={() => onStatusFilterChange('all')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onStatusFilterChange('incomplete')}
            className="px-3 py-1 rounded-md transition-colors cursor-pointer"
            style={
              statusFilter === 'incomplete'
                ? {
                    backgroundColor: themeColors.main,
                    color: themeColors.bg,
                    fontWeight: 700,
                  }
                : { color: '#94a3b8' }
            }
          >
            Unread
          </button>
          <button
            onClick={() => onStatusFilterChange('completed')}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'completed'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Done
          </button>
          <button
            onClick={() => onStatusFilterChange('highlights')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors cursor-pointer ${
              statusFilter === 'highlights'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Favorites</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Content' },
            { id: 'web_novel', label: 'Web Novel' },
            { id: 'light_novel', label: 'Light Novel' },
            { id: 'ex_volume', label: 'EX Volume' },
            { id: 'what_if', label: 'What IF' },
            { id: 'side_story', label: 'Side Story' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryFilterChange(cat.id as ContentCategory | 'all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap text-[11px] ${
                categoryFilter === cat.id
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              style={{
                color: categoryFilter === cat.id ? themeColors.highlight : undefined,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Count badge */}
        <div className="text-[11px] text-slate-400 hidden lg:block">
          Showing <span className="text-white font-bold">{totalFiltered}</span> / {totalAll}
        </div>
      </div>
    </div>
  );
};
