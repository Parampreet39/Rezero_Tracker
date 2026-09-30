import React, { useState } from 'react';
import { CHARACTER_CODEX_ENTRIES, CharacterCodexEntry } from '../data/characterCodexData';
import { Shield, Lock, Eye, AlertTriangle, Users, Heart, Sparkles, Search, Palette, Image as ImageIcon, Unlock } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import { ALL_TRACKER_ITEMS } from '../data';
import { UserItemState } from '../types/tracker';

interface SpoilerCharacterCodexProps {
  userState?: Record<string, UserItemState>;
  currentArcNumber?: number; // e.g. 3
  onOpenSettings?: (charId?: string) => void;
}

export const SpoilerCharacterCodex: React.FC<SpoilerCharacterCodexProps> = ({
  userState = {},
  currentArcNumber = 3,
  onOpenSettings,
}) => {
  const { getCharacterCodexImage, characterCodexImages, themeColors } = useCustomization();

  const [spoilerArcLimit, setSpoilerArcLimit] = useState<number>(currentArcNumber);
  const [selectedCharId, setSelectedCharId] = useState<string>('rem');
  const [campFilter, setCampFilter] = useState<string>('all');
  const [charSearch, setCharSearch] = useState<string>('');
  const [manuallyUnlockedChars, setManuallyUnlockedChars] = useState<Set<string>>(new Set());

  const isArcCompleted = (arcNum: number): boolean => {
    const arcItems = ALL_TRACKER_ITEMS.filter((it) => it.arcId === `arc${arcNum}`);
    if (arcItems.length === 0) return true;
    return arcItems.every((it) => userState && userState[it.id]?.completed);
  };

  const isProfileLocked = (profileMinArc: number, charId: string): boolean => {
    return profileMinArc > 1 && !isArcCompleted(profileMinArc) && !manuallyUnlockedChars.has(charId);
  };

  const selectedChar = CHARACTER_CODEX_ENTRIES.find((c) => c.id === selectedCharId) || CHARACTER_CODEX_ENTRIES[0];

  // Filter character list
  const filteredChars = CHARACTER_CODEX_ENTRIES.filter((c) => {
    if (campFilter !== 'all' && c.primaryCamp !== campFilter) return false;
    if (charSearch.trim()) {
      const q = charSearch.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.race.toLowerCase().includes(q) ||
        c.japaneseName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // If selected character is hidden by the current filter, display the first filtered character
  const activeChar = filteredChars.some((c) => c.id === selectedChar.id)
    ? selectedChar
    : filteredChars[0] || selectedChar;

  // Resolve active profile based on spoilerArcLimit
  const getActiveProfile = (char: CharacterCodexEntry) => {
    // Find highest minArc <= spoilerArcLimit
    const available = char.profiles.filter((p) => p.minArc <= spoilerArcLimit);
    if (available.length === 0) {
      return char.profiles[0]; // fallback to earliest
    }
    return available[available.length - 1];
  };

  const activeProfile = getActiveProfile(activeChar);

  return (
    <div className="space-y-6">
      {/* Top Banner & Spoiler Barrier Slider */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sky-400">
              <Shield className="w-4 h-4" />
              <span>Spoiler-Safe Character Codex</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Dynamic Character Dossier & Authorities Ledger
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Character status, authorities, camp loyalties, and deaths dynamically gate to your reading progress so you never see future spoilers.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Barrier: </span>
            <span className="text-emerald-400 font-bold">Arc {spoilerArcLimit} Level</span>
          </div>
        </div>

        {/* Interactive Spoiler Barrier Slider */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400">Reveal Lore Up To:</span>
            <div className="flex flex-wrap items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((arcNum) => (
                <button
                  key={arcNum}
                  onClick={() => setSpoilerArcLimit(arcNum)}
                  className={`px-2 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                    spoilerArcLimit === arcNum
                      ? 'shadow-sm'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                  style={
                    spoilerArcLimit === arcNum
                      ? {
                          backgroundColor: themeColors.main,
                          color: themeColors.bg,
                        }
                      : undefined
                  }
                >
                  Arc {arcNum}
                </button>
              ))}
              <button
                onClick={() => setSpoilerArcLimit(10)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-bold ${
                  spoilerArcLimit === 10
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-900 text-rose-300 hover:text-rose-200'
                }`}
                title="Unlock all lore (including recent web novel arcs)"
              >
                All (Full Spoilers)
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            {spoilerArcLimit <= 3 ? '✓ Safe for early reading position' : '⚠️ Contains future arc revelations & plot twists'}
          </div>
        </div>
      </div>

      {/* Main Split Layout: Character List + Dossier */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left: Character List */}
        <div className="w-full lg:w-84 shrink-0 space-y-3">
          {/* Search & Camp Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={charSearch}
                onChange={(e) => setCharSearch(e.target.value)}
                placeholder="Search character or race..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                style={{
                  borderColor: charSearch ? themeColors.main : undefined,
                }}
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All' },
                { id: 'Emilia', label: 'Emilia' },
                { id: 'Crusch', label: 'Crusch' },
                { id: 'Anastasia', label: 'Anastasia' },
                { id: 'Priscilla', label: 'Priscilla' },
                { id: 'Felt', label: 'Felt' },
                { id: 'Witches', label: 'Witches' },
                { id: 'Witch Cult', label: 'Cult' },
                { id: 'Empire', label: 'Empire' },
                { id: 'Legends', label: 'Legends' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCampFilter(c.id)}
                  className={`px-2.5 py-1 rounded cursor-pointer whitespace-nowrap ${
                    campFilter === c.id
                      ? 'shadow-sm font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                  style={
                    campFilter === c.id
                      ? {
                          backgroundColor: themeColors.main,
                          color: themeColors.bg,
                        }
                      : undefined
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Showing {filteredChars.length} characters in Re:Zero Codex
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-1.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredChars.map((char) => {
              const prof = getActiveProfile(char);
              const isSelected = selectedChar.id === char.id;
              const hasCustomImage = Boolean(characterCodexImages[char.id]);
              return (
                <div
                  key={char.id}
                  onClick={() => setSelectedCharId(char.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'text-white'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: `${themeColors.main}20`,
                          borderColor: themeColors.main,
                          boxShadow: `0 4px 14px -2px ${themeColors.main}30`,
                        }
                      : undefined
                  }
                >
                  {/* Miniature Portrait Thumbnail */}
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 shrink-0">
                    <img
                      src={getCharacterCodexImage(char.id)}
                      alt={char.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {hasCustomImage && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs truncate">{char.name}</span>
                      {char.id === 'rem' && <Heart className="w-3 h-3 fill-sky-400 text-sky-400 shrink-0" />}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono truncate">{prof.title}</div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ${
                      prof.status === 'Alive'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                        : prof.status === 'Deceased'
                        ? 'bg-rose-950 text-rose-400 border border-rose-800/40'
                        : 'bg-amber-950 text-amber-400 border border-amber-800/40'
                    }`}
                  >
                    {prof.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Dossier for Selected Character */}
        {isProfileLocked(activeProfile.minArc, activeChar.id) ? (
          <div className="flex-1 w-full p-12 rounded-2xl bg-slate-950/90 border border-rose-500/40 text-center space-y-6 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 to-transparent pointer-events-none" />
            <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-lg animate-pulse">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-lg">
              <div className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
                Forbidden Memory Seal — Arc {activeProfile.minArc} Incomplete
              </div>
              <h3 className="text-2xl font-bold text-white font-serif">
                {activeChar.name}'s Dossier is Locked
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                This character's dossier, background secrets, and authorities are sealed behind Arc {activeProfile.minArc} progression. Complete all chapters of Arc {activeProfile.minArc} in the Story Tracker to breach this barrier, or temporarily lift the seal below.
              </p>
            </div>
            <button
              onClick={() => {
                setManuallyUnlockedChars((prev) => {
                  const next = new Set(prev);
                  next.add(activeChar.id);
                  return next;
                });
              }}
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer shadow-lg inline-flex items-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>🔓 Breach Memory Seal & Lift Barrier</span>
            </button>
          </div>
        ) : (
          <div className="flex-1 w-full p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-start sm:items-center gap-4">
              <div
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 shadow-lg shrink-0 bg-slate-950 group"
                style={{ borderColor: themeColors.main }}
              >
                <img
                  src={getCharacterCodexImage(activeChar.id)}
                  alt={activeChar.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {characterCodexImages[activeChar.id] && (
                  <div
                    className="absolute bottom-1 right-1 px-1 py-0.2 rounded text-[8px] font-bold shadow-md"
                    style={{
                      backgroundColor: themeColors.main,
                      color: themeColors.bg,
                    }}
                  >
                    CUSTOM
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                  <span>{activeChar.race}</span>
                  <span className="text-slate-600">·</span>
                  <span>Birthday: {activeChar.birthday || 'Unknown'}</span>
                  <span className="text-slate-600">·</span>
                  <span>CV: {activeChar.voiceActor || 'Unknown'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  {activeChar.name}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  Current Title: <span className="text-sky-300 font-semibold">{activeProfile.title}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <span
                className={`text-xs font-mono px-3 py-1 rounded-full font-bold inline-block border ${
                  activeProfile.status === 'Alive'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                    : activeProfile.status === 'Deceased'
                    ? 'bg-rose-950 text-rose-300 border-rose-500'
                    : 'bg-amber-950 text-amber-300 border-amber-500'
                }`}
              >
                Status: {activeProfile.status}
              </span>
              
              {onOpenSettings && (
                <button
                  onClick={() => onOpenSettings(activeChar.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                  title={`Change image for ${activeChar.name}`}
                >
                  <ImageIcon className="w-3.5 h-3.5" style={{ color: themeColors.highlight }} />
                  <span>Change Portrait</span>
                </button>
              )}
            </div>
          </div>

          {/* Bio for current arc */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 font-mono">
              Arc {spoilerArcLimit} Canonical Status & Overview
            </div>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {activeProfile.bio}
            </p>
          </div>

          {/* Known Authorities & Magic */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
              Active Authorities, Magic & Armaments
            </div>
            <div className="flex flex-wrap gap-2">
              {activeProfile.authoritiesOrMagic.map((auth, idx) => (
                <span key={`${auth}-${idx}`} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200">
                  ✦ {auth}
                </span>
              ))}
            </div>
          </div>

          {/* Revealed Secrets for this Arc */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
              Revealed Secrets (Unlocked at this Story Stage)
            </div>
            <ul className="space-y-1.5">
              {activeProfile.revealedSecrets.map((secret, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                  <span>{secret}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
