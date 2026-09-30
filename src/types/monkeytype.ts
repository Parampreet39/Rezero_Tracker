export type MonkeyTheme =
  | 'subaru'
  | 'rem'
  | 'emilia'
  | 'ram'
  | 'beatrice'
  | 'satella'
  | 'reinhard'
  | 'echidna'
  | 'dracula'
  | 'carbon'
  | 'serika_dark'
  | 'custom';

export interface ThemeColors {
  name: string;
  character?: string;
  quote?: string;
  bg: string;
  subAlt: string;
  sub: string;
  text: string;
  main: string;
  error: string;
  highlight: string;
  accent?: string;
}

export type CustomImageKey =
  | 'remSolo'
  | 'remBanner'
  | 'emblemLogo'
  | 'worldMap'
  | 'subaruEmilia'
  | 'remRam'
  | 'echidnaShaula'
  | 'appBackground';

export interface ImageMetadata {
  id: CustomImageKey;
  label: string;
  description: string;
  recommendedAspect: string;
  defaultAssetKey: string;
}

export const CUSTOMIZABLE_IMAGES: ImageMetadata[] = [
  {
    id: 'remSolo',
    label: 'Character Avatar / Solo Portrait',
    description: 'Shown in the top header, the Next Chapter banner, and avatar badges.',
    recommendedAspect: '1:1 Square (e.g. 500x500)',
    defaultAssetKey: 'remSolo',
  },
  {
    id: 'remBanner',
    label: 'Main Tracker Hero Banner',
    description: 'The wide cinematic banner at the top of the reading tracker page.',
    recommendedAspect: '16:9 or 21:9 Ultra-Wide (e.g. 1920x800)',
    defaultAssetKey: 'remBanner',
  },
  {
    id: 'emblemLogo',
    label: 'App Crest / Lugunica Emblem',
    description: 'The crest icon used across drawers, achievements, and identity badges.',
    recommendedAspect: '1:1 Square (e.g. 400x400)',
    defaultAssetKey: 'emblemLogo',
  },
  {
    id: 'worldMap',
    label: 'Continental World Map',
    description: 'The map displayed in the interactive World Map of Lugunica & neighboring nations.',
    recommendedAspect: '16:9 Landscape (e.g. 1920x1080)',
    defaultAssetKey: 'worldMap',
  },
  {
    id: 'subaruEmilia',
    label: 'Subaru & Emilia Artwork',
    description: 'Featured in the spoiler-gated Character Codex profiles.',
    recommendedAspect: '3:4 Portrait (e.g. 600x800)',
    defaultAssetKey: 'subaruEmilia',
  },
  {
    id: 'remRam',
    label: 'Rem & Ram Twins Artwork',
    description: 'Featured in the twin maid codex profiles and faction dossiers.',
    recommendedAspect: '3:4 Portrait (e.g. 600x800)',
    defaultAssetKey: 'remRam',
  },
  {
    id: 'echidnaShaula',
    label: 'Echidna & Shaula Artwork',
    description: 'Featured in the Witches & Pleiades Watchtower profiles.',
    recommendedAspect: '3:4 Portrait (e.g. 600x800)',
    defaultAssetKey: 'echidnaShaula',
  },
  {
    id: 'appBackground',
    label: 'Full App Wallpaper / Background',
    description: 'Optional full-page background wallpaper behind the entire app.',
    recommendedAspect: '16:9 Landscape (e.g. 1920x1080)',
    defaultAssetKey: '',
  },
];

export interface CharacterTraitItem {
  title: string;
  status: string;
}

export interface CharacterArmamentProfile {
  primaryWeapon: string;
  primaryWeaponType: string;
  divineProtectionOrAuthority: string;
  relicOrMetia: string;
  signatureTrait: string;
  battleStance: string;
}

export interface CharacterLoreProfile {
  characterName: string;
  japaneseTitle: string;
  role: string;
  currentArcStatus: string;
  statusSummary: string;
  roleBadge: string;
  quote: string;
  quoteContext: string;
  armament: CharacterArmamentProfile;
  traits: [CharacterTraitItem, CharacterTraitItem, CharacterTraitItem];
  flavorQuote: string;
}

export const MONKEY_THEMES: Record<MonkeyTheme, ThemeColors> = {
  subaru: {
    name: 'Natsuki Subaru',
    character: 'Subaru Natsuki',
    quote: 'Even if you forget me, I will never forget you. Starting from zero!',
    bg: '#0e0b08',
    subAlt: '#18130e',
    sub: '#78685c',
    text: '#faf5f0',
    main: '#f97316',
    error: '#ef4444',
    highlight: '#fb923c',
    accent: '#eab308',
  },
  rem: {
    name: 'Rem (Morning Mist)',
    character: 'Rem',
    quote: 'From zero... let us start life in another world from zero, Subaru-kun.',
    bg: '#070d1e',
    subAlt: '#0e1833',
    sub: '#506788',
    text: '#dbeafe',
    main: '#38bdf8',
    error: '#f43f5e',
    highlight: '#7dd3fc',
    accent: '#60a5fa',
  },
  emilia: {
    name: 'Emilia (Royal Amethyst)',
    character: 'Emilia',
    quote: 'My name is just Emilia. An ordinary silver half-elf with big dreams.',
    bg: '#0c0918',
    subAlt: '#17112c',
    sub: '#72609a',
    text: '#ede9fe',
    main: '#a855f7',
    error: '#ef4444',
    highlight: '#c084fc',
    accent: '#e9d5ff',
  },
  ram: {
    name: 'Ram (Clairvoyance Rose)',
    character: 'Ram',
    quote: 'Hah, Barusu is being useless as always. Allow Ram to handle this.',
    bg: '#140810',
    subAlt: '#220d1c',
    sub: '#8a5c78',
    text: '#fce7f3',
    main: '#f43f5e',
    error: '#e11d48',
    highlight: '#fb7185',
    accent: '#fda4af',
  },
  beatrice: {
    name: 'Beatrice (Forbidden Library)',
    character: 'Beatrice',
    quote: 'I suppose you came all the way to Betty’s library just to disturb me, in fact!',
    bg: '#140a13',
    subAlt: '#231120',
    sub: '#99628a',
    text: '#fdf2f8',
    main: '#ec4899',
    error: '#f43f5e',
    highlight: '#f472b6',
    accent: '#fbbf24',
  },
  satella: {
    name: 'Satella (Witch of Envy)',
    character: 'Satella',
    quote: 'I love you. Because you gave me light, because you held my hand...',
    bg: '#07040d',
    subAlt: '#110b21',
    sub: '#5c487c',
    text: '#ede9fe',
    main: '#7c3aed',
    error: '#e11d48',
    highlight: '#a78bfa',
    accent: '#c4b5fd',
  },
  reinhard: {
    name: 'Reinhard (Sword Saint)',
    character: 'Reinhard van Astrea',
    quote: 'I am a knight among knights, Reinhard van Astrea. May your path be just.',
    bg: '#0c0d13',
    subAlt: '#151824',
    sub: '#64748b',
    text: '#f8fafc',
    main: '#dc2626',
    error: '#b91c1c',
    highlight: '#ef4444',
    accent: '#f59e0b',
  },
  echidna: {
    name: 'Echidna (Tea Witch)',
    character: 'Echidna',
    quote: 'Knowledge is the true elixir of the soul. Would you care for some tea?',
    bg: '#0f0f12',
    subAlt: '#18181d',
    sub: '#71717a',
    text: '#f4f4f5',
    main: '#eab308',
    error: '#dc2626',
    highlight: '#facc15',
    accent: '#fef08a',
  },
  dracula: {
    name: 'Dracula (Gothic Synth)',
    character: 'Count of Lugunica',
    quote: 'In the cold night of the kingdom, the shadow reveals all secrets.',
    bg: '#1e1f29',
    subAlt: '#282a36',
    sub: '#6272a4',
    text: '#f8f8f2',
    main: '#bd93f9',
    error: '#ff5555',
    highlight: '#ff79c6',
    accent: '#8be9fd',
  },
  carbon: {
    name: 'Carbon',
    character: 'Grand Archivist',
    quote: 'Ink, parchment, and truth. The canon remains eternal.',
    bg: '#141414',
    subAlt: '#1e1e1e',
    sub: '#616161',
    text: '#f5f5f5',
    main: '#f97316',
    error: '#e03e3e',
    highlight: '#fb923c',
    accent: '#fbbf24',
  },
  serika_dark: {
    name: 'Serika Dark',
    character: 'Shadow Scholar',
    quote: 'Discipline in reading leads to mastery of the narrative.',
    bg: '#2c2d30',
    subAlt: '#323437',
    sub: '#646669',
    text: '#d1d0c5',
    main: '#e2b714',
    error: '#ca4754',
    highlight: '#ffd643',
    accent: '#e2b714',
  },
  custom: {
    name: 'Custom Theme Studio',
    character: 'Chosen Reader',
    quote: 'My own path, chosen by me in this world from zero!',
    bg: '#0a0d18',
    subAlt: '#11172a',
    sub: '#64748b',
    text: '#f1f5f9',
    main: '#38bdf8',
    error: '#f43f5e',
    highlight: '#7dd3fc',
    accent: '#a855f7',
  },
};

export const DEFAULT_CHARACTER_LORES: Record<MonkeyTheme, CharacterLoreProfile> = {
  satella: {
    characterName: 'Satella',
    japaneseTitle: '嫉妬の魔女 (Witch of Envy)',
    role: 'Witch of Envy & Seal of the Great Waterfall',
    currentArcStatus: 'Sealed beyond the Great Waterfall',
    statusSummary: 'Sealed 400 years ago in a shrine at the edge of the world, maintaining an eternal soul-bond with Subaru and bestowing Return by Death.',
    roleBadge: 'Witch of Envy 💜',
    quote: 'I love you. Because you gave me light, because you held my hand...',
    quoteContext: 'Tea Party of the Witches',
    armament: {
      primaryWeapon: 'Unseen Hands of Envy (Thousands of Shadow Tendrils)',
      primaryWeaponType: 'Witch Factor / Void Shadow Manifestation',
      divineProtectionOrAuthority: 'Authority of Envy (Return by Death Bestowal & Time Reversal)',
      relicOrMetia: 'Shadow Garden Beacon & Witch Factor Core',
      signatureTrait: 'Yin Magic Supreme Archmage (Al Shamak & Spatial Void)',
      battleStance: 'Calamity Dominion / Absolute Love',
    },
    traits: [
      { title: '✦ Unseen Shadow Hands (Spatial Tendrils)', status: 'ACTIVE' },
      { title: '✦ Al Shamak Void & Dimensional Gate', status: 'ETERNAL' },
      { title: '✦ Return by Death Authority Bestowal', status: 'BOUND' },
    ],
    flavorQuote: 'Love yourself more... and weep when you are in pain.',
  },
  subaru: {
    characterName: 'Natsuki Subaru',
    japaneseTitle: '菜月・昴 (Emilia\'s Knight)',
    role: 'Knight of Emilia & Sage Candidate',
    currentArcStatus: 'The Fool Who Reaches For the Stars',
    statusSummary: 'Overcoming insurmountable despair across countless death loops to protect everyone he loves, forging bonds across all camps.',
    roleBadge: 'Emilia\'s Knight ⚔️',
    quote: 'Even if you forget me, I will never forget you. Starting from zero!',
    quoteContext: 'Pleiades Watchtower',
    armament: {
      primaryWeapon: 'Guiltywhip (Guilty Whip of Beast Leather)',
      primaryWeaponType: 'Flexible Combat Whip & Parkour Arts',
      divineProtectionOrAuthority: 'Authorities of Sloth (Invisible Providence) & Greed (Cor Leonis)',
      relicOrMetia: 'Earth Smartphone & Magic Stone Ring',
      signatureTrait: 'Return by Death (死に戻り) & Tactical Loops',
      battleStance: 'Vanguard Commander / Strategist',
    },
    traits: [
      { title: '✦ Invisible Providence (Sloth Hand)', status: 'AWAKENED' },
      { title: '✦ Cor Leonis (Burden Sharing)', status: 'MASTERED' },
      { title: '✦ Guiltywhip & Parkour Arts', status: 'EQUIPPED' },
    ],
    flavorQuote: 'Stand up! Stand up and choose the future you desire!',
  },
  emilia: {
    characterName: 'Emilia',
    japaneseTitle: 'エミリア (Royal Candidate)',
    role: 'Royal Selection Candidate & Silver Half-Elf',
    currentArcStatus: 'The Witch of Glaciation (Elior Forest)',
    statusSummary: 'Facing the trials of the Sanctuary and overcoming past trauma to claim her place as the rightful Queen of Lugunica.',
    roleBadge: 'Royal Candidate 👑',
    quote: 'My name is just Emilia. An ordinary silver half-elf with big dreams.',
    quoteContext: 'Puck\'s Sanctuary Contract',
    armament: {
      primaryWeapon: 'Ice Brand Arts (Glacial Armament: Broadswords, Halberds & Ice Clones)',
      primaryWeaponType: 'Crystalline Ice Sorcery',
      divineProtectionOrAuthority: 'Great Spirit Contract (Puck) & Absolute Zero Glaciation',
      relicOrMetia: 'Pyroxene Crystal Pendant & Elior Magic Robes',
      signatureTrait: 'Micro-Spirits Affinity & High Mana Capacity',
      battleStance: 'Glacial Spirit Knight / Spellcaster',
    },
    traits: [
      { title: '✦ Ice Brand Arts (Crystalline Weapons)', status: 'MASTERED' },
      { title: '✦ Absolute Zero Glaciation (Elior Seal)', status: 'UNLEASHED' },
      { title: '✦ Micro-Spirits Affinity & Lesser Spirit Pact', status: 'HARMONIZED' },
    ],
    flavorQuote: 'I want to create a world where no one is judged for how they were born.',
  },
  rem: {
    characterName: 'Rem',
    japaneseTitle: 'レム (Roswaal Manor Maid)',
    role: 'Gentle Maid of Roswaal Manor & Oni Guardian',
    currentArcStatus: 'The Hero\'s Pillar & Slumbering Beauty',
    statusSummary: 'Subaru\'s unwavering pillar of strength whose devotion ignited his rebirth from zero.',
    roleBadge: 'Roswaal Maid 🧹',
    quote: 'From zero... let us start life in another world from zero, Subaru-kun.',
    quoteContext: 'Arc 3, Chapter 52 (From Zero)',
    armament: {
      primaryWeapon: 'Spiked Morningstar Flail (Iron Heavy Chain & Spiked Ball)',
      primaryWeaponType: 'Heavy Impact Flail Metia',
      divineProtectionOrAuthority: 'Demon Clan Heritage (Single Horn Mana Resonance)',
      relicOrMetia: 'Roswaal Maid Twin Daggers & Healing Gem',
      signatureTrait: 'Water Magic (Huma, El Huma, Al Huma) & Regeneration',
      battleStance: 'Vanguard Demonic Striker',
    },
    traits: [
      { title: '✦ Iron Spiked Flail (Morningstar)', status: 'EQUIPPED' },
      { title: '✦ Water Magic (Huma & El Huma)', status: 'MASTERED' },
      { title: '✦ Oni Horn Awakening & Healing Magic', status: 'CONTROLLED' },
    ],
    flavorQuote: 'Rem will smash any who dare bring harm to Subaru-kun.',
  },
  ram: {
    characterName: 'Ram',
    japaneseTitle: 'ラム (Roswaal Head Maid)',
    role: 'Head Maid of Roswaal Manor & Demon Prodigy',
    currentArcStatus: 'The Uncrowned Demon King Prodigy',
    statusSummary: 'The undisputed genius of the Oni clan whose strategic intellect and wind blades slice through all opposition.',
    roleBadge: 'Head Maid 🌸',
    quote: 'Hah, Barusu is being useless as always. Allow Ram to handle this.',
    quoteContext: 'Roswaal Manor',
    armament: {
      primaryWeapon: 'Demon Clan Clairvoyance Wand & Wind Blades',
      primaryWeaponType: 'Precision Wind Magic & Clairvoyance',
      divineProtectionOrAuthority: 'Clairvoyance (Senrigan Vision Synapse)',
      relicOrMetia: 'Roswaal Mana Infusion Staff',
      signatureTrait: 'Wind Magic (El Fura, Ur Fura, Al Fura)',
      battleStance: 'Tactical Reconnaissance / Sniper',
    },
    traits: [
      { title: '✦ Clairvoyance (Senrigan Vision)', status: 'ACTIVE' },
      { title: '✦ Wind Magic (El Fura & Ur Fura)', status: 'LETHAL' },
      { title: '✦ Demon King Horn Remnants (Mana Drain)', status: 'SEALED' },
    ],
    flavorQuote: 'Do not overestimate yourself, Barusu. Ram expects nothing from you.',
  },
  beatrice: {
    characterName: 'Beatrice',
    japaneseTitle: 'ベアトリス (Great Spirit of Yin)',
    role: 'Keeper of the Forbidden Library & Subaru\'s Spirit',
    currentArcStatus: 'Contracted Great Spirit of Yin',
    statusSummary: 'Leaving behind 400 years of isolation to travel at Subaru\'s side as his contracted Great Spirit.',
    roleBadge: 'Great Spirit 📖',
    quote: 'I suppose you came all the way to Betty’s library just to disturb me, in fact!',
    quoteContext: 'Sanctuary Library Breach',
    armament: {
      primaryWeapon: 'Forbidden Library Grimoire & Minya Purple Crystals',
      primaryWeaponType: 'High-Rank Yin Magic Spellbook',
      divineProtectionOrAuthority: 'Great Spirit Yin Contract (Door Crossing & Absolute Space)',
      relicOrMetia: 'Original Blank Gospel of Echidna',
      signatureTrait: 'E·M·M (Invulnerability) & E·M·T (Absolute Magic Negation)',
      battleStance: 'Supreme Yin Sorceress',
    },
    traits: [
      { title: '✦ Yin Magic Archmage (Minya & Murakumo)', status: 'ABSOLUTE' },
      { title: '✦ E·M·M & E·M·T Absolute Immunity Fields', status: 'CO-CAST' },
      { title: '✦ Door Crossing & Dimensional Displacement', status: 'MASTERED' },
    ],
    flavorQuote: 'Betty chose you! So don\'t you dare go dying easily, I suppose!',
  },
  reinhard: {
    characterName: 'Reinhard van Astrea',
    japaneseTitle: 'ラインハルト (Sword Saint)',
    role: 'The Sword Saint & Master of Divine Protections',
    currentArcStatus: 'Knight Among Knights',
    statusSummary: 'The strongest living entity in the world, wielding the Dragon Sword Reid and countless Divine Protections.',
    roleBadge: 'Sword Saint ⚔️',
    quote: 'I am a knight among knights, Reinhard van Astrea. May your path be just.',
    quoteContext: 'Royal Capital Battle',
    armament: {
      primaryWeapon: 'Dragon Sword Reid (Claw-Marked Dragon Brand Blade)',
      primaryWeaponType: 'Legendary Divine Dragon Blade',
      divineProtectionOrAuthority: 'Divine Protections of Sword Saint, Phoenix (Rebirth), Arrow Evasion, Wind Walk',
      relicOrMetia: 'Astrea Family Knight Cloak & Dragon Insignia',
      signatureTrait: 'Infinite Mana Absorption & Unmatched Swordsmanship',
      battleStance: 'Apex Sword God / Shield of the Realm',
    },
    traits: [
      { title: '✦ Dragon Sword Reid (Dragon Brand)', status: 'EQUIPPED' },
      { title: '✦ Divine Protection of the Sword Saint', status: 'MAXIMUM' },
      { title: '✦ Phoenix Divine Protection (Instant Rebirth)', status: 'ACTIVE' },
    ],
    flavorQuote: 'If you wield a sword to protect others, I shall gladly stand as your shield.',
  },
  echidna: {
    characterName: 'Echidna',
    japaneseTitle: 'エキドナ (Witch of Greed)',
    role: 'Witch of Greed & Collector of All Knowledge',
    currentArcStatus: 'The Dream Citadel Hostess',
    statusSummary: 'Hostess of the Sanctuary trials whose insatiable curiosity spans every mystery of life, death, and magic.',
    roleBadge: 'Witch of Greed 🍵',
    quote: 'Knowledge is the true elixir of the soul. Would you care for some tea?',
    quoteContext: 'Witches\' Tea Party',
    armament: {
      primaryWeapon: 'Tome of Wisdom (Gospel of Omniscience & World Records)',
      primaryWeaponType: 'Omniscient Grimoire',
      divineProtectionOrAuthority: 'Authority of Greed (Soul Vessels & Dream Citadel)',
      relicOrMetia: 'Butterfly Brooch & Bodily Fluid Tea Cup',
      signatureTrait: 'Hexa-Element Supreme Sorcery (All 6 Elements)',
      battleStance: 'Omniscient Mastermind',
    },
    traits: [
      { title: '✦ Tome of Wisdom (Gospel of All Knowledge)', status: 'UNLIMITED' },
      { title: '✦ Hexa-Element Omnicasting Archmage', status: 'SUPREME' },
      { title: '✦ Sanctuary Barrier Matrix & Soul Vessel Craft', status: 'ACTIVE' },
    ],
    flavorQuote: 'Curiosity is an insatiable hunger that defines the very essence of thought.',
  },
  dracula: {
    characterName: 'Count of Lugunica',
    japaneseTitle: '夜の支配者 (Gothic Sovereign)',
    role: 'Shadow Sovereign of the Dark Citadel',
    currentArcStatus: 'Midnight Watch',
    statusSummary: 'Unveiling nocturnal secrets across Lugunica\'s underworld with gothic elegance.',
    roleBadge: 'Nocturnal Lord 🦇',
    quote: 'In the cold night of the kingdom, the shadow reveals all secrets.',
    quoteContext: 'Underworld Chronicles',
    armament: {
      primaryWeapon: 'Crimson Rapier of the Eclipse',
      primaryWeaponType: 'Gothic Rapier & Blood Mist Form',
      divineProtectionOrAuthority: 'Nocturnal Dominion & Bat Familiars',
      relicOrMetia: 'Obsidian Brooch of the Night',
      signatureTrait: 'Dark Arts & Curse Transmutation',
      battleStance: 'Shadow Duelist',
    },
    traits: [
      { title: '✦ Blood Mist & Shadow Form', status: 'ACTIVE' },
      { title: '✦ Nocturnal Dominion & Bat Familiars', status: 'COMMAND' },
      { title: '✦ Dark Arts & Curse Transmutation', status: 'MASTERED' },
    ],
    flavorQuote: 'The darkness bends to the will of those who do not fear it.',
  },
  carbon: {
    characterName: 'Grand Archivist',
    japaneseTitle: '大司書 (Archivist of Lugunica)',
    role: 'Master of the High Archive',
    currentArcStatus: 'Chronicling Canon',
    statusSummary: 'Documenting every loop, divergence, and heroic deed with pristine precision.',
    roleBadge: 'Grand Archivist 📜',
    quote: 'Ink, parchment, and truth. The canon remains eternal.',
    quoteContext: 'Lugunica Royal Library',
    armament: {
      primaryWeapon: 'Chronological Quill & Inscription Blade',
      primaryWeaponType: 'High Archival Focus',
      divineProtectionOrAuthority: 'Divergence Indexing Apparatus',
      relicOrMetia: 'Ledger of Eternal Loops',
      signatureTrait: 'High Preservation Ward & Indexing Matrix',
      battleStance: 'Archival Vanguard',
    },
    traits: [
      { title: '✦ Chronological Ledger & Tome Matrix', status: 'INDEXED' },
      { title: '✦ Divergence Indexing Apparatus', status: 'CALIBRATED' },
      { title: '✦ High Preservation Ward', status: 'ACTIVE' },
    ],
    flavorQuote: 'What is recorded here can never be washed away by the tides of time.',
  },
  serika_dark: {
    characterName: 'Shadow Scholar',
    japaneseTitle: '影の求道者 (The Seeker)',
    role: 'Seeker of the Hidden Leylines',
    currentArcStatus: 'Deep Study',
    statusSummary: 'Analyzing ancient magical frequencies and leyline anomalies across the four great nations.',
    roleBadge: 'Shadow Scholar ⚡',
    quote: 'Discipline in reading leads to mastery of the narrative.',
    quoteContext: 'Leyline Research Academy',
    armament: {
      primaryWeapon: 'Arcane Resonator & Golden Leyline Compass',
      primaryWeaponType: 'Arcane Leyline Wand',
      divineProtectionOrAuthority: 'Leyline Attunement Matrix',
      relicOrMetia: 'Mana Siphon Barrier Prism',
      signatureTrait: 'Frequency Modulation & Barrier Weave',
      battleStance: 'Arcane Researcher',
    },
    traits: [
      { title: '✦ Arcane Resonator & Golden Compass', status: 'TUNED' },
      { title: '✦ Leyline Attunement Matrix', status: 'STABLE' },
      { title: '✦ Mana Siphon Barrier', status: 'CHARGED' },
    ],
    flavorQuote: 'Knowledge without discipline is like fire in the wind.',
  },
  custom: {
    characterName: 'Chosen Reader',
    japaneseTitle: '異界の旅人 (Otherworldly Traveler)',
    role: 'Personal Companion & Adventurer',
    currentArcStatus: 'Pioneering Your Own Journey',
    statusSummary: 'Walking your customized path through Lugunica with unique armaments and personal convictions.',
    roleBadge: 'Custom Protagonist ✨',
    quote: 'My own path, chosen by me in this world from zero!',
    quoteContext: 'Your Custom Canon',
    armament: {
      primaryWeapon: 'Custom Forged Metia Blade / Staff',
      primaryWeaponType: 'Personal Signature Weaponry',
      divineProtectionOrAuthority: 'Personal Divine Blessing / Unique Authority',
      relicOrMetia: 'Personal Lugunica Keepsake',
      signatureTrait: 'Indomitable Willpower & Magic Affinity',
      battleStance: 'Freeform Combatant',
    },
    traits: [
      { title: '✦ Custom Signature Armament', status: 'EQUIPPED' },
      { title: '✦ Personalized Magic & Skills', status: 'MASTERED' },
      { title: '✦ Indomitable Willpower', status: 'UNBROKEN' },
    ],
    flavorQuote: 'This is my story, crafted by my own hands.',
  },
};

export interface AppCustomizationSettings {
  version: number;
  themeId: MonkeyTheme;
  customThemeColors: ThemeColors;
  customImages: Partial<Record<CustomImageKey, string>>;
  characterCodexImages?: Record<string, string>;
  customCharacterLore?: CharacterLoreProfile;
  backgroundWallpaperUrl?: string;
  backgroundWallpaperOpacity: number;
  fontFamily: 'default' | 'cinzel' | 'mono' | 'sans';
  glowEffect: 'none' | 'subtle' | 'vibrant';
  soundEnabled: boolean;
  updatedAt: string;
}

