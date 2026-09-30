import { TrackerItem } from '../types/tracker';

export const whatIfAndRefsItems: TrackerItem[] = [
  // What IF Stories - Sloth Route
  {
    id: 'if-sloth-wn',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: '💙 Sloth Route: Rem IF (The Natsuki Rem Timeline)',
    title: 'Rem IF (Web Novel Compilation Chapters)',
    order: 2001,
    safeToReadNotice: 'Safe to read: After Anime Episode 18 / Arc 3 Chapter 52',
    note: 'What if Subaru and Rem ran away to Kararagi together?',
  },
  {
    id: 'if-sloth-ln',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: '💙 Sloth Route: Rem IF (The Natsuki Rem Timeline)',
    title: 'Rem IF (Light Novel version / Bluray Novel 2017)',
    order: 2002,
    safeToReadNotice: 'Safe to read: After Anime Episode 18 / Arc 3 Chapter 52',
  },
  {
    id: 'if-sloth-oni',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: '💙 Sloth Route: Rem IF (The Natsuki Rem Timeline)',
    title: 'Oni Sisters of the Hidden Village: Before and After Pleiades (Ties into Rem IF)',
    order: 2003,
  },

  // Lust Route
  {
    id: 'if-lust-butterfly',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: '💖 Lust Route: Butterfly Dream (Formerly Harem IF)',
    title: 'Butterfly Dream',
    order: 2010,
    safeToReadNotice: 'Safe to read: After the End of Arc 3',
    note: 'What if Subaru actually became King and married everyone?',
  },

  // Vainglory Route
  ...[1, 2, 3, 4].map((part) => ({
    id: `if-vainglory-p${part}`,
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF' as const,
    subcategory: '🏫 Vainglory Route: High-School IF',
    title: `High-School IF - Part ${part}`,
    order: 2020 + part,
    safeToReadNotice: part <= 2 ? 'Safe to read: Parts 1 & 2 after Arc 3' : 'Safe to read: Parts 3 & 4 after Arc 6 Chapter 19!',
    note: 'What if the Re:Zero cast were just normal high school students in Japan?',
  })),

  // Greed Route: Kasaneru IF
  {
    id: 'if-greed-wn',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: '🤍 Greed Route: Kasaneru IF',
    title: 'Kasaneru IF (Web Novel Chapter - April Fools 2016)',
    order: 2030,
    safeToReadNotice: 'Safe to read: After Arc 5 Chapter 27',
    note: 'What if Subaru accepted Echidna\'s contract in the Sanctuary?',
  },
  {
    id: 'if-greed-ln',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: '🤍 Greed Route: Kasaneru IF',
    title: 'Kasaneru IF (Light Novel version / Bluray Novel 2021)',
    order: 2031,
    safeToReadNotice: 'Safe to read: After Arc 5 Chapter 27',
  },

  // Pride Route: Ayamatsu IF
  {
    id: 'if-pride',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: '🧡 Pride Route: Ayamatsu IF',
    title: 'Ayamatsu IF',
    order: 2040,
    safeToReadNotice: 'Safe to read: After Arc 5 Chapter 57',
    note: 'What if Subaru never called out for help in the very first loop in the loot house?',
  },

  // Wrath Route: Oboreru IF
  {
    id: 'if-wrath',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: '❤️ Wrath Route: Oboreru IF',
    title: 'Oboreru IF',
    order: 2050,
    safeToReadNotice: 'Safe to read: After Arc 4 Chapter 87',
    note: 'What if Subaru didn\'t jump off the cliff in Arc 2, and instead fled the Roswaal Mansion?',
  },

  // Gluttony Route: Tsugihagu IF
  {
    id: 'if-gluttony',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: '🤎 Gluttony Route: Tsugihagu IF',
    title: 'Tsugihagu IF',
    order: 2060,
    safeToReadNotice: 'Safe to read: After Arc 6 Chapter 48',
    note: 'What if Subaru [REDACTED] in the Pleiades Watchtower to "fix" everything?',
  },

  // Special IFs
  {
    id: 'if-aganau',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: 'The "What IF" Stories (The Sins Routes)',
    title: 'Aganau IF (The Retribution IF)',
    order: 2070,
    note: '20-year timeskip story where Subaru survives the 2nd loop of Arc 2 and hunts Petelgeuse.',
  },
  {
    id: 'if-mimikau',
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF',
    subcategory: 'The "What IF" Stories (The Sins Routes)',
    title: 'Mimikau IF (April Fools 2024 - Animal Ears IF)',
    order: 2080,
    note: 'April Fool\'s joke where Subaru wakes up in a timeline where everyone has kemonomimi.',
  },

  // Mimagau IF (Genderbent)
  ...[1, 2, 3, 4].map((arc) => ({
    id: `if-mimagau-arc${arc}`,
    arcId: 'what_if',
    arcTitle: 'The "What IF" Stories (The Sins Routes)',
    category: 'What IF' as const,
    subcategory: '✨ Miscellaneous Route: Mimagau IF',
    title: `Mimagau IF (Arc ${arc} Retelling)`,
    order: 2090 + arc,
    note: 'Genderbent retelling of the arcs.',
  })),

  // Reference Books & Databooks
  {
    id: 'ref-zeropedia',
    arcId: 'databooks',
    arcTitle: 'Reference Books & Databooks',
    category: 'Reference & Meta',
    subcategory: 'Reference Books & Databooks',
    title: 'Re: Zeropedia',
    order: 2100,
  },
  {
    id: 'ref-visual-complete',
    arcId: 'databooks',
    arcTitle: 'Reference Books & Databooks',
    category: 'Reference & Meta',
    subcategory: 'Reference Books & Databooks',
    title: 'Visual Complete',
    order: 2101,
  },
  {
    id: 'ref-ss-paper',
    arcId: 'databooks',
    arcTitle: 'Reference Books & Databooks',
    category: 'Reference & Meta',
    subcategory: 'Reference Books & Databooks',
    title: 'Reincarnating / Another World SS Paper',
    order: 2102,
  },
  {
    id: 'meta-death-or-kiss',
    arcId: 'databooks',
    arcTitle: 'Reference Books & Databooks',
    category: 'Reference & Meta',
    subcategory: 'Meta / Real World',
    title: 'Re:Zero - Death or Kiss (Visual Novel)',
    order: 2110,
  },
  {
    id: 'meta-artbooks',
    arcId: 'databooks',
    arcTitle: 'Reference Books & Databooks',
    category: 'Reference & Meta',
    subcategory: 'Meta / Real World',
    title: 'Artbooks: Re:BOX and Otsuka Shinichirou Collections',
    order: 2111,
  },
];
