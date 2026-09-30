import React, { useState } from 'react';
import { ASSETS } from '../assets';
import { UserItemState } from '../types/tracker';
import { ALL_TRACKER_ITEMS } from '../data';
import { Map, Compass, Landmark, Shield, Sparkles, Navigation, Globe, Lock, Eye } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';

interface WorldMapViewerProps {
  userState?: Record<string, UserItemState>;
  currentArcNumber?: number; // e.g. 3
}

interface NationLore {
  id: string;
  name: string;
  japanese: string;
  ruler: string;
  climate: string;
  minArc: number;
  keyArcs: string;
  description: string;
  features: string[];
}

const NATIONS: NationLore[] = [
  {
    id: 'lugunica',
    name: 'Kingdom of Lugunica (親竜王国ルグニカ)',
    japanese: 'ルグニカ王国',
    ruler: 'Council of Wise Men / Royal Selection Candidates',
    climate: 'Temperate Plains, Verdant Valleys & Alpine Frontiers',
    minArc: 1,
    keyArcs: 'Arcs 1, 2, 3, 4',
    description: 'The dragon-blessed eastern realm where Subaru was initially summoned. Bound by an ancient covenant with the Divine Dragon Volcanica, protected by the Sword Saint lineage, and home to the Royal Capital and Roswaal Manor.',
    features: [
      'The Royal Capital: Central jewel of nobility and the Royal Selection assembly',
      'Roswaal Manor & Irlam Village: Heart of the Wolgarm crisis and Rem’s redemption',
      'The Sanctuary (Cremaldy Forest): Tomb of Echidna and the barrier trials',
      'Flugel Tree & Plains: Site of the historic White Whale subjugation',
    ],
  },
  {
    id: 'gusteko',
    name: 'Holy Kingdom of Gusteko (グステコ聖王国)',
    japanese: 'グステコ聖王国',
    ruler: 'Holy King & Spirit Church High Priests',
    climate: 'Sub-Zero Tundras, Frozen Fjords & Glaciers',
    minArc: 4,
    keyArcs: 'Arc 4, Elsa Backstory & Northern Lore',
    description: 'The deeply religious, harsh northern realm shrouded in permanent ice and snow. The population venerates natural spirits and the Holy Spirit Od Laguna with extreme fanaticism.',
    features: [
      'Glacial Sanctuaries: Remote hermitages where spirit mediums commune with frost deities',
      'Cursed Assassin Lineages: Birthplace of cold-hearted mercenaries like Elsa Granhiert',
      'Rigid Caste Dogma: Society stratified by divine spirit protections and faith',
    ],
  },
  {
    id: 'kararagi',
    name: 'City-States of Kararagi (カララギ都市国家)',
    japanese: 'カララギ',
    ruler: 'Merchant Council / Hoshin Trading Syndicate',
    climate: 'Humid Wetlands, Canals & Commercial Hubs',
    minArc: 5,
    keyArcs: 'Arc 5 (Pristella) & Sloth IF',
    description: 'The prosperous western merchant federation founded 400 years ago by the legendary Earth-summoned merchant Hoshin. Features Japanese-style Kansai speech, kimono clothing, and open markets.',
    features: [
      'Water Gate City Pristella: The Venice-like water fortress protected by 4 sluice gates',
      'Commercial Free Markets: Birthplace of the Anastasia Hoshin trading empire',
      'Rem IF Refuge: The serene eastern haven where Subaru and Rem built a family in the Sloth timeline',
    ],
  },
  {
    id: 'waterfall',
    name: 'The Great Waterfall & The Edge of the World (大瀑布)',
    japanese: '大瀑布',
    ruler: 'Beyond the Realm of Man',
    climate: 'Infinite Abyss of Falling Waters & Cosmic Od Laguna',
    minArc: 6,
    keyArcs: 'Arc 6 (Augria Sand Dunes / Pleiades)',
    description: 'The catastrophic western and eastern boundary of the flat world where the continental waters plunge infinitely into the cosmos. Guarded by the Pleiades Watchtower and ancient seals.',
    features: [
      'Augria Sand Dunes: Endless sea of mabeast-infested sands and lethal miasma storms',
      'Pleiades Watchtower: The monolithic citadel built by Sage Flugel to watch over the Witch’s Seal',
      'Taygeta & Electra: Cosmic libraries holding the Books of the Dead of every fallen mortal',
    ],
  },
  {
    id: 'vollachia',
    name: 'Sacred Vollachian Empire (神聖ヴォラキア帝国)',
    japanese: 'ヴォラキア帝国',
    ruler: 'Emperor Vincent Vollachia (77th Emperor)',
    climate: 'Volcanic Badlands, Steamy Jungles & Fortified Canyons',
    minArc: 7,
    keyArcs: 'Arcs 7, 8 (EX 4 & 5)',
    description: 'The martial powerhouse south of Lugunica governed by social Darwinism: "The strong survive, the weak perish." Ruled by the Nine Divine Generals and the wielder of the Yang Sword Vollachia.',
    features: [
      'Imperial Capital Lupugana: Walled citadel of the Crystal Palace and throne room',
      'Buddheim Jungle & Shudraq: Territory of the Amazonian snake huntress tribe',
      'Chaosflame (Demon City): Metropolitan haven ruled by Yorna Mishigure',
      'Ginunhive (Gladiator Island): Island arena where the Pleiades Battalion was forged',
    ],
  },
];

export const WorldMapViewer: React.FC<WorldMapViewerProps> = ({
  userState = {},
  currentArcNumber = 3,
}) => {
  const { getImage, themeColors } = useCustomization();
  const mapSrc = getImage('worldMap');
  const [spoilerArcLimit, setSpoilerArcLimit] = useState<number>(currentArcNumber);
  const [manuallyRevealedNations, setManuallyRevealedNations] = useState<Set<string>>(new Set());
  const [selectedNationId, setSelectedNationId] = useState<string>('lugunica');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const selectedNation = NATIONS.find((n) => n.id === selectedNationId) || NATIONS[0];

  const isArcCompleted = (arcNum: number): boolean => {
    const arcItems = ALL_TRACKER_ITEMS.filter((it) => it.arcId === `arc${arcNum}`);
    if (arcItems.length === 0) return true;
    return arcItems.every((it) => userState && userState[it.id]?.completed);
  };

  const isNationLocked = (nation: NationLore): boolean => {
    return nation.minArc > 1 && !isArcCompleted(nation.minArc) && !manuallyRevealedNations.has(nation.id);
  };

  const isSelectedNationLocked = isNationLocked(selectedNation);

  const handleRevealNation = (nationId: string) => {
    setManuallyRevealedNations((prev) => {
      const next = new Set(prev);
      next.add(nationId);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Spoiler Barrier */}
      <div
        className="p-5 rounded-2xl bg-slate-900/80 border space-y-4"
        style={{ borderColor: `${themeColors.main}30` }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
              style={{ color: themeColors.main }}
            >
              <Globe className="w-4 h-4" />
              <span>Continental Cartography & Geography Codex</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Re:Zero World Map & Four Great Nations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 max-w-3xl">
              Inspect the continent bounded by the Great Waterfall, exploring the political borders, climate zones, and story locations across Lugunica, Vollachia, Kararagi, and Gusteko.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-950 text-xs font-mono text-slate-300 hover:text-white hover:border-sky-400 transition-colors cursor-pointer"
            >
              {isZoomed ? 'Normal View' : 'Inspect Full Resolution'}
            </button>
          </div>
        </div>

        {/* Interactive Cartographic Spoiler Barrier */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400">Reveal Map Lore Up To:</span>
            <div className="flex flex-wrap items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((arcNum) => (
                <button
                  key={arcNum}
                  onClick={() => setSpoilerArcLimit(arcNum)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer font-bold ${
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
                  spoilerArcLimit >= 8
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-900 text-rose-300 hover:text-rose-200'
                }`}
                title="Unlock all continental map lore"
              >
                All (Full Spoilers)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {spoilerArcLimit !== currentArcNumber && (
              <button
                onClick={() => setSpoilerArcLimit(currentArcNumber)}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800 text-[11px] cursor-pointer"
              >
                Sync with Progress (Arc {currentArcNumber})
              </button>
            )}
            <div className="text-[11px] text-slate-500">
              {spoilerArcLimit <= currentArcNumber ? '✓ Safe for reading progress' : '⚠️ Contains future nation lore'}
            </div>
          </div>
        </div>
      </div>

      {/* Map Showcase Frame */}
      <div
        className="relative rounded-2xl border overflow-hidden bg-slate-950 shadow-2xl"
        style={{ borderColor: `${themeColors.main}35` }}
      >
        <div className={`relative overflow-hidden transition-all duration-300 ${isZoomed ? 'max-h-[85vh]' : 'max-h-[520px]'}`}>
          <img
            src={mapSrc}
            alt="Re:Zero Continental World Map"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Floating Map Legend Pill */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono backdrop-blur-md">
            <div className="flex items-center gap-2 text-slate-300">
              <Compass className="w-4 h-4 text-sky-400" />
              <span className="font-bold text-white">The Flat World (平坦な世界)</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 hidden sm:inline">Bounded on all sides by the Great Waterfall</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400" /> Lugunica (East)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Vollachia (South)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Kararagi (West)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-300" /> Gusteko (North)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Nations Selector & Detailed Regional Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Nation Tabs */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1 font-bold">
            Select Territory
          </div>

          <div className="space-y-1.5">
            {NATIONS.map((nation) => {
              const isSelected = selectedNation.id === nation.id;
              const locked = isNationLocked(nation);
              return (
                <button
                  key={nation.id}
                  onClick={() => setSelectedNationId(nation.id)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700 text-slate-300'
                  }`}
                  style={{
                    backgroundColor: isSelected ? `${themeColors.main}20` : undefined,
                    borderColor: isSelected ? themeColors.main : undefined,
                    boxShadow: isSelected ? `0 4px 14px -2px ${themeColors.main}30` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{nation.name.split('(')[0]}</span>
                    {locked ? (
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Arc {nation.minArc}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-sky-400/80">{nation.keyArcs}</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                    {locked ? '🔒 Locked Territory Lore' : nation.ruler}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Territory Dossier */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
          {isSelectedNationLocked ? (
            /* Locked Territory Shield */
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-5 my-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-xl">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
                  Arc {selectedNation.minArc} Cartographic Seal Active
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {selectedNation.name.split('(')[0]} Lore is Locked
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-mono">
                  This foreign realm and its landmarks are canonically introduced during {selectedNation.keyArcs}. Complete Arc {selectedNation.minArc} in the Chapter Codex to unlock automatically, or reveal it now.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => handleRevealNation(selectedNation.id)}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-amber-600 hover:bg-amber-500 text-slate-950 cursor-pointer shadow-lg transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Reveal Territory Lore</span>
                </button>
                <button
                  onClick={() => setSpoilerArcLimit(10)}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer transition-all"
                >
                  Unlock All Map Lore
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between text-xs font-mono text-sky-400 mb-1">
                  <span>{selectedNation.japanese}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-bold">
                    Featured: {selectedNation.keyArcs}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                  {selectedNation.name}
                </h3>

                <div className="text-xs font-mono text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                  <span><strong>Ruler:</strong> {selectedNation.ruler}</span>
                  <span className="text-slate-600">·</span>
                  <span><strong>Climate:</strong> {selectedNation.climate}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                  Territorial Overview & Geopolitics
                </div>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {selectedNation.description}
                </p>
              </div>

              {/* Key Geographic Landmarks */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Key Strategic Landmarks & Canonical Battlegrounds
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedNation.features.map((feature, idx) => {
                    const parts = feature.split(':');
                    const title = parts[0];
                    const desc = parts.slice(1).join(':');

                    return (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                        <div className="font-bold text-slate-200 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                          <span>{title}</span>
                        </div>
                        {desc && <div className="text-slate-400 leading-relaxed text-[11px]">{desc}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
