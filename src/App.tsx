/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ALL_TRACKER_ITEMS, ARC_GROUPS } from './data';
import { UserItemState, ContentCategory, TrackerItem } from './types/tracker';
import { getChapterLore } from './data/chapterLore';
import { Header, AppFeatureView } from './components/Header';
import { RemHeroBanner } from './components/RemHeroBanner';
import { CommandPalette } from './components/CommandPalette';
import { ChapterCodexDrawer } from './components/ChapterCodexDrawer';
import { RezeroLoreWidgets } from './components/RezeroLoreWidgets';
import { ArcNav } from './components/ArcNav';
import { NextUpBanner } from './components/NextUpBanner';
import { FilterControls, StatusFilter } from './components/FilterControls';
import { ChapterRow } from './components/ChapterRow';
import { ChartsView } from './components/ChartsView';
import { IfStorySplitter } from './components/IfStorySplitter';
import { SpoilerCharacterCodex } from './components/SpoilerCharacterCodex';
import { WorldMapViewer } from './components/WorldMapViewer';
import { NovelDiffViewer } from './components/NovelDiffViewer';
import { ReturnByDeathSimulator } from './components/ReturnByDeathSimulator';
import { WitchFactorTree } from './components/WitchFactorTree';
import { ArcAchievementsModal } from './components/ArcAchievementsModal';
import { VelocityForecastCalculator } from './components/VelocityForecastCalculator';
import { ResetModal } from './components/ResetModal';
import { SettingsModal } from './components/SettingsModal';
import { CustomizationProvider, useCustomization } from './context/CustomizationContext';
import { Filter, PanelRightClose, PanelRightOpen, Heart } from 'lucide-react';

const STORAGE_KEY = 'rezero_tracker_state_v2';

function getInitialState(): Record<string, UserItemState> {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved state', e);
    }
  }

  // Fallback to default user markdown state
  const initial: Record<string, UserItemState> = {};
  ALL_TRACKER_ITEMS.forEach((item) => {
    initial[item.id] = {
      completed: Boolean(item.defaultCompleted),
      completedDate: item.defaultDate,
      highlight: Boolean(item.highlight),
      notes: item.note || '',
    };
  });
  return initial;
}

function TrackerAppContent() {
  const {
    themeColors,
    characterLore,
    getImage,
    backgroundWallpaperOpacity,
    fontFamily,
  } = useCustomization();

  const [userState, setUserState] = useState<Record<string, UserItemState>>(getInitialState);
  const [selectedArcId, setSelectedArcId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<ContentCategory | 'all'>('all');
  const [currentView, setCurrentView] = useState<AppFeatureView>('tracker');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsInitialCharId, setSettingsInitialCharId] = useState<string | undefined>(undefined);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Selected chapter for the Right-Side Chapter Codex Dossier
  const nextUnreadItem = useMemo(() => {
    return ALL_TRACKER_ITEMS.find((it) => !userState[it.id]?.completed) || null;
  }, [userState]);

  const currentArcNumber = useMemo(() => {
    if (!nextUnreadItem) return 10;
    if (nextUnreadItem.arcId.startsWith('arc')) {
      const num = parseInt(nextUnreadItem.arcId.replace('arc', ''), 10);
      return isNaN(num) ? 3 : num;
    }
    return 3;
  }, [nextUnreadItem]);

  const [selectedChapter, setSelectedChapter] = useState<TrackerItem | null>(() => {
    return ALL_TRACKER_ITEMS.find((it) => !getInitialState()[it.id]?.completed) || ALL_TRACKER_ITEMS[0];
  });
  const [isCodexOpen, setIsCodexOpen] = useState(true);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
  }, [userState]);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  // Global hotkeys (Esc / Cmd+K for command palette)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape' && !isCommandPaletteOpen) {
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  // Toggle single item
  const handleToggle = (id: string) => {
    setUserState((prev) => {
      const current = prev[id] || { completed: false };
      const nextCompleted = !current.completed;
      const today = new Date().toISOString().split('T')[0];
      return {
        ...prev,
        [id]: {
          ...current,
          completed: nextCompleted,
          completedDate: nextCompleted ? (current.completedDate || today) : current.completedDate,
        },
      };
    });
  };

  // Update item details (date, highlight, note)
  const handleUpdateItem = (id: string, updates: Partial<UserItemState>) => {
    setUserState((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || { completed: false }),
        ...updates,
      },
    }));
  };

  const handleCompleteNext = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setUserState((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        completed: true,
        completedDate: today,
      },
    }));

    // Select the next unread after this one
    const remainingUnread = ALL_TRACKER_ITEMS.find(
      (it) => it.id !== id && !userState[it.id]?.completed
    );
    if (remainingUnread) {
      setSelectedChapter(remainingUnread);
    }
    triggerToast('Chapter completed! Progress recorded.');
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    return ALL_TRACKER_ITEMS.filter((item) => {
      // Arc filter
      if (selectedArcId !== 'all' && item.arcId !== selectedArcId) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }

      // Status filter
      const isCompleted = Boolean(userState[item.id]?.completed);
      if (statusFilter === 'completed' && !isCompleted) return false;
      if (statusFilter === 'incomplete' && isCompleted) return false;
      if (statusFilter === 'highlights' && !userState[item.id]?.highlight) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const lore = getChapterLore(item.id, item.title, item.arcTitle);
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSub = (item.subcategory || '').toLowerCase().includes(q);
        const matchSummary = (lore?.summary || '').toLowerCase().includes(q);
        const matchKeyPoints = (lore?.keyPoints || []).some((ev) => ev.toLowerCase().includes(q));
        const matchChars = (lore?.characters || []).some((c) => c.toLowerCase().includes(q));

        if (!matchTitle && !matchSub && !matchSummary && !matchKeyPoints && !matchChars) {
          return false;
        }
      }

      return true;
    });
  }, [selectedArcId, categoryFilter, statusFilter, searchQuery, userState]);

  // Group filtered items by Arc & Subcategory
  const groupedSections = useMemo(() => {
    const groups: {
      arcId: string;
      arcTitle: string;
      subcategories: {
        name: string;
        items: TrackerItem[];
      }[];
    }[] = [];

    const arcMap = new Map<string, TrackerItem[]>();
    filteredItems.forEach((item) => {
      if (!arcMap.has(item.arcId)) {
        arcMap.set(item.arcId, []);
      }
      arcMap.get(item.arcId)!.push(item);
    });

    ARC_GROUPS.forEach((arc) => {
      const itemsInArc = arcMap.get(arc.id);
      if (itemsInArc && itemsInArc.length > 0) {
        // Group by subcategory
        const subMap = new Map<string, TrackerItem[]>();
        itemsInArc.forEach((item) => {
          const subName = item.subcategory || 'General Chapters';
          if (!subMap.has(subName)) {
            subMap.set(subName, []);
          }
          subMap.get(subName)!.push(item);
        });

        const subcategories = Array.from(subMap.entries()).map(([name, subItems]) => ({
          name,
          items: subItems,
        }));

        groups.push({
          arcId: arc.id,
          arcTitle: arc.title,
          subcategories,
        });
      }
    });

    return groups;
  }, [filteredItems]);

  // Overall statistics
  const totalCompleted = useMemo(() => {
    return ALL_TRACKER_ITEMS.filter((it) => userState[it.id]?.completed).length;
  }, [userState]);

  // Navigation handlers
  const currentChapterIndex = useMemo(() => {
    if (!selectedChapter) return -1;
    return ALL_TRACKER_ITEMS.findIndex((it) => it.id === selectedChapter.id);
  }, [selectedChapter]);

  const handleNavigatePrev = () => {
    if (currentChapterIndex > 0) {
      setSelectedChapter(ALL_TRACKER_ITEMS[currentChapterIndex - 1]);
    }
  };

  const handleNavigateNext = () => {
    if (currentChapterIndex < ALL_TRACKER_ITEMS.length - 1) {
      setSelectedChapter(ALL_TRACKER_ITEMS[currentChapterIndex + 1]);
    }
  };

  // Bulk actions
  const handleMarkAllInView = () => {
    const today = new Date().toISOString().split('T')[0];
    setUserState((prev) => {
      const next = { ...prev };
      filteredItems.forEach((item) => {
        next[item.id] = {
          ...(next[item.id] || {}),
          completed: true,
          completedDate: next[item.id]?.completedDate || today,
        };
      });
      return next;
    });
    triggerToast(`Marked ${filteredItems.length} chapters as completed.`);
  };

  const handleResetCompleteZero = () => {
    const zeroState: Record<string, UserItemState> = {};
    ALL_TRACKER_ITEMS.forEach((item) => {
      zeroState[item.id] = {
        completed: false,
        completedDate: undefined,
        highlight: false,
        notes: '',
      };
    });
    setUserState(zeroState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(zeroState));
    triggerToast('Returned to Zero! All chapters reset to unread.');
  };

  const handleResetCurrentArc = () => {
    const targetArc = selectedArcId === 'all' ? (nextUnreadItem?.arcId || 'arc1') : selectedArcId;
    setUserState((prev) => {
      const next = { ...prev };
      ALL_TRACKER_ITEMS.forEach((item) => {
        if (item.arcId === targetArc) {
          next[item.id] = {
            ...(next[item.id] || {}),
            completed: false,
            completedDate: undefined,
          };
        }
      });
      return next;
    });
    const arcTitle = ARC_GROUPS.find((a) => a.id === targetArc)?.title || targetArc;
    triggerToast(`Reset completed chapters for ${arcTitle.split(':')[0]}.`);
  };

  const handleResetToBaseline = () => {
    const initial: Record<string, UserItemState> = {};
    ALL_TRACKER_ITEMS.forEach((item) => {
      initial[item.id] = {
        completed: Boolean(item.defaultCompleted),
        completedDate: item.defaultDate,
        highlight: Boolean(item.highlight),
        notes: item.note || '',
      };
    });
    setUserState(initial);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    triggerToast('Restored curated baseline (Arc 3 Chapter 70).');
  };

  const handleResetToDefaults = () => {
    setIsResetModalOpen(true);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(userState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `rezero_completionist_progress_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('Backup JSON exported successfully.');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (typeof parsed === 'object' && parsed !== null) {
          setUserState(parsed);
          triggerToast('Tracker progress restored from backup!');
        }
      } catch (err) {
        triggerToast('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const bgWallpaper = getImage('appBackground');

  return (
    <div
      className="min-h-screen text-slate-100 flex flex-col font-sans transition-colors duration-300 relative"
      style={{
        backgroundColor: themeColors.bg,
        color: themeColors.text,
        fontFamily:
          fontFamily === 'cinzel'
            ? '"Cinzel", serif'
            : fontFamily === 'mono'
            ? '"JetBrains Mono", monospace'
            : fontFamily === 'sans'
            ? '"Plus Jakarta Sans", sans-serif'
            : undefined,
      }}
    >
      {/* Optional Custom Full-App Wallpaper Background */}
      {bgWallpaper && (
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${bgWallpaper})`,
            opacity: backgroundWallpaperOpacity,
          }}
        />
      )}

      {/* Toast Notification */}
      {showToast && (
        <div
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl border text-white text-xs shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce bg-slate-950/90"
          style={{
            borderColor: themeColors.main,
            boxShadow: `0 10px 25px -5px ${themeColors.main}40`,
          }}
        >
          <Heart className="w-4 h-4" style={{ fill: themeColors.main, color: themeColors.main }} />
          <span>{showToast}</span>
        </div>
      )}

      {/* Settings & Personalization Studio Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          setSettingsInitialCharId(undefined);
        }}
        initialCharacterId={settingsInitialCharId}
        onShowToast={triggerToast}
      />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectChapter={(id) => {
          const item = ALL_TRACKER_ITEMS.find((it) => it.id === id);
          if (item) {
            setSelectedChapter(item);
            setIsCodexOpen(true);
            setCurrentView('tracker');
          }
        }}
        onToggleChapter={handleToggle}
        onSelectArc={(arcId) => {
          setSelectedArcId(arcId);
          setCurrentView('tracker');
        }}
        onChangeView={setCurrentView}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Reset Progress Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onResetCompleteZero={handleResetCompleteZero}
        onResetCurrentArc={handleResetCurrentArc}
        onResetToBaseline={handleResetToBaseline}
        currentArcTitle={ARC_GROUPS.find((a) => a.id === selectedArcId)?.title || 'Current View'}
      />

      {/* Top Header */}
      <Header
        currentView={currentView}
        onViewChange={(v) => setCurrentView(v)}
        completedCount={totalCompleted}
        totalCount={ALL_TRACKER_ITEMS.length}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-5 space-y-5 relative z-10">
        {/* Hero Banner with Quotes and Metrics */}
        <RemHeroBanner
          completedCount={totalCompleted}
          totalCount={ALL_TRACKER_ITEMS.length}
          onJumpToArc={(arcId) => {
            setSelectedArcId(arcId);
            setCurrentView('tracker');
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Next Chapter Floating Banner */}
        <NextUpBanner
          nextItem={nextUnreadItem}
          userState={userState}
          onCompleteNext={handleCompleteNext}
          onJumpToArc={(arcId) => {
            setSelectedArcId(arcId);
            if (nextUnreadItem) {
              setSelectedChapter(nextUnreadItem);
              setIsCodexOpen(true);
            }
            setCurrentView('tracker');
          }}
        />

        {/* Re:Zero Lore & Story Widgets */}
        {currentView === 'tracker' && (
          <RezeroLoreWidgets
            userState={userState}
          />
        )}

        {/* Multi-Feature View Switcher */}
        {currentView === 'if_routes' && (
          <IfStorySplitter
            onSelectChapter={(chapterId) => {
              const found = ALL_TRACKER_ITEMS.find((it) => it.id === chapterId);
              if (found) {
                setSelectedChapter(found);
                setSelectedArcId(found.arcId);
              }
              setCurrentView('tracker');
              setIsCodexOpen(true);
            }}
          />
        )}

        {currentView === 'characters' && (
          <SpoilerCharacterCodex
            userState={userState}
            currentArcNumber={currentArcNumber}
            onOpenSettings={(charId) => {
              setSettingsInitialCharId(charId);
              setIsSettingsOpen(true);
            }}
          />
        )}

        {currentView === 'world_map' && (
          <WorldMapViewer
            userState={userState}
            currentArcNumber={currentArcNumber}
          />
        )}

        {currentView === 'novel_diffs' && (
          <NovelDiffViewer />
        )}

        {currentView === 'loops' && (
          <ReturnByDeathSimulator
            userState={userState}
            currentArcNumber={currentArcNumber}
          />
        )}

        {currentView === 'authorities' && (
          <WitchFactorTree
            userState={userState}
            currentArcNumber={currentArcNumber}
          />
        )}

        {currentView === 'badges' && (
          <ArcAchievementsModal
            userState={userState}
          />
        )}

        {currentView === 'forecast' && (
          <VelocityForecastCalculator
            userState={userState}
          />
        )}

        {currentView === 'analytics' && (
          <ChartsView
            userState={userState}
            onSelectArc={(arcId) => {
              setSelectedArcId(arcId);
              setCurrentView('tracker');
            }}
          />
        )}

        {currentView === 'tracker' && (
          /* ================= SPLIT-PANE CODEX ================= */
          <div className="flex flex-col lg:flex-row gap-5 items-start">
            {/* Left Arc Navigation Sidebar */}
            <ArcNav
              selectedArcId={selectedArcId}
              onSelectArc={setSelectedArcId}
              userState={userState}
            />

            {/* Center Chapter Stream & Feed */}
            <div className="flex-1 w-full space-y-4 min-w-0">
              {/* Filter and Search Controls */}
              <FilterControls
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                categoryFilter={categoryFilter}
                onCategoryFilterChange={setCategoryFilter}
                totalFiltered={filteredItems.length}
                totalAll={ALL_TRACKER_ITEMS.length}
                onExportData={handleExportData}
                onImportData={handleImportData}
                onResetToDefaults={handleResetToDefaults}
                onMarkAllInView={handleMarkAllInView}
              />

              {/* Toggle Codex Drawer button */}
              <div className="flex items-center justify-between px-2 text-xs text-slate-400">
                <span className="font-mono">
                  Showing {filteredItems.length} chapters · Click any chapter to inspect chapter dossier
                </span>
                <button
                  onClick={() => setIsCodexOpen(!isCodexOpen)}
                  className="flex items-center gap-1 transition-colors cursor-pointer"
                  style={{ color: themeColors.highlight }}
                >
                  {isCodexOpen ? (
                    <>
                      <PanelRightClose className="w-3.5 h-3.5" />
                      <span>Hide Dossier</span>
                    </>
                  ) : (
                    <>
                      <PanelRightOpen className="w-3.5 h-3.5" />
                      <span>Open Dossier</span>
                    </>
                  )}
                </button>
              </div>

              {/* Chapter Listing */}
              {groupedSections.length === 0 ? (
                <div className="p-12 text-center rounded-2xl border bg-slate-900/60 border-slate-800">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-3">
                    <Filter className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-300">No chapters match your filter</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Try searching for key plot points like "White Whale", "From Zero", "Sloth", or clear your search query.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('all');
                      setCategoryFilter('all');
                      setSelectedArcId('all');
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {groupedSections.map((group) => {
                    const arcItems = ALL_TRACKER_ITEMS.filter((it) => it.arcId === group.arcId);
                    const arcCompleted = arcItems.filter((it) => userState[it.id]?.completed).length;
                    const arcPct = arcItems.length > 0 ? Math.round((arcCompleted / arcItems.length) * 100) : 0;

                    return (
                      <div
                        key={group.arcId}
                        className="rounded-2xl border border-slate-800/80 bg-slate-900/40 overflow-hidden shadow-lg"
                      >
                        {/* Arc Section Header */}
                        <div className="px-5 py-3.5 bg-slate-900/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h2 className="text-base font-bold text-white tracking-tight">
                              {group.arcTitle}
                            </h2>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {arcCompleted} of {arcItems.length} chapters completed
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  backgroundColor: themeColors.main,
                                  width: `${arcPct}%`,
                                }}
                              />
                            </div>
                            <span
                              className="text-xs font-mono font-bold tabular-nums"
                              style={{
                                color: themeColors.highlight,
                              }}
                            >
                              {arcPct}%
                            </span>
                          </div>
                        </div>

                        {/* Subcategories and Chapter Rows */}
                        <div className="p-4 sm:p-5 space-y-6">
                          {group.subcategories.map((sub) => (
                            <div key={sub.name} className="space-y-2">
                              {/* Subcategory title */}
                              <div className="flex items-center gap-2 pb-1 border-b border-slate-800/60">
                                <span className="text-xs font-semibold" style={{ color: themeColors.highlight }}>
                                  {sub.name}
                                </span>
                                <span className="text-xs text-slate-500">
                                  ({sub.items.length})
                                </span>
                              </div>

                              {/* Chapter rows */}
                              <div className="grid grid-cols-1 gap-2">
                                {sub.items.map((item) => (
                                  <ChapterRow
                                    key={item.id}
                                    item={item}
                                    state={userState[item.id] || { completed: false }}
                                    onToggle={handleToggle}
                                    onUpdateState={handleUpdateItem}
                                    onSelect={(selected) => {
                                      setSelectedChapter(selected);
                                      setIsCodexOpen(true);
                                    }}
                                    isSelected={selectedChapter?.id === item.id}
                                    isNextUp={item.id === nextUnreadItem?.id}
                                    searchQuery={searchQuery}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right-Hand Chapter Codex Dossier Panel */}
            {isCodexOpen && selectedChapter && (
              <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-20 max-h-[85vh] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <ChapterCodexDrawer
                  item={selectedChapter}
                  state={userState[selectedChapter.id] || { completed: false }}
                  onClose={() => setIsCodexOpen(false)}
                  onToggle={handleToggle}
                  onUpdateState={handleUpdateItem}
                  onNavigatePrev={handleNavigatePrev}
                  onNavigateNext={handleNavigateNext}
                  hasPrev={currentChapterIndex > 0}
                  hasNext={currentChapterIndex < ALL_TRACKER_ITEMS.length - 1}
                  isNextUp={selectedChapter.id === nextUnreadItem?.id}
                />
              </div>
            )}
          </div>
        )}

        {/* Editorial Footer */}
        <footer className="pt-8 pb-12 border-t border-slate-800/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-semibold" style={{ color: themeColors.main }}>
              {characterLore.characterName} Edition ({characterLore.japaneseTitle})
            </span>
            <span aria-hidden="true">·</span>
            <span>Re:Zero Completionist Tracker</span>
            <span aria-hidden="true">·</span>
            <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-700">esc</kbd> for command palette</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Autosaved to Browser</span>
            <span aria-hidden="true">·</span>
            <span style={{ color: themeColors.highlight }}>Starting Life in Another World from Zero ✨</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <CustomizationProvider>
      <TrackerAppContent />
    </CustomizationProvider>
  );
}
