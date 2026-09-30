export interface IfRouteInfo {
  id: string;
  name: string;
  sin: string;
  japaneseTitle: string;
  branchArc: string;
  branchChapter: string;
  branchChapterId: string;
  divergencePremise: string;
  consequences: string[];
  keyCharacters: string[];
  safeToReadArc: string;
  badgeColor: string;
  summary: string;
}

export const IF_ROUTES_DATA: IfRouteInfo[] = [
  {
    id: 'sloth',
    name: 'Sloth Route (Rem IF / Natsuki Rem)',
    sin: 'Sloth (怠惰)',
    japaneseTitle: 'Re: ゼロから始める前日譚 カサネル / ナツキ・レム',
    branchArc: 'Arc 3: Return to the Royal Capital',
    branchChapter: 'Chapter 52: "From Zero"',
    branchChapterId: 'arc3-ch52',
    divergencePremise: 'What if Subaru agreed to run away to Kararagi when Rem offered in the capital, abandoning Emilia, Lugunica, and Return by Death?',
    consequences: [
      'Subaru and Rem flee to the Kararagi Free Trade Cities and marry.',
      'They have two children named Rigel and Spica.',
      'Emilia and the residents of Roswaal Manor are massacred by the Witch Cult.',
      'Subaru lives a peaceful, bittersweet mortal life haunted by memories of those he left behind.',
    ],
    keyCharacters: ['Natsuki Subaru', 'Natsuki Rem', 'Rigel Natsuki', 'Spica Natsuki', 'Halibel (The Great Shinobi)'],
    safeToReadArc: 'After Anime Season 1 Episode 18 / Arc 3 Chapter 52',
    badgeColor: 'border-sky-500/60 bg-sky-950/60 text-sky-300',
    summary: 'The most famous and beloved IF route. Subaru and Rem escape their tragic fate, build a family in the peaceful eastern nation of Kararagi, and Subaru learns to live for happiness rather than salvation through death.',
  },
  {
    id: 'pride',
    name: 'Pride Route (Ayamatsu IF)',
    sin: 'Pride (傲慢)',
    japaneseTitle: 'アヤマツ (Ayamatsu)',
    branchArc: 'Arc 1: A Tumultuous First Day',
    branchChapter: 'Chapter 14: Fourth Time’s a Charm',
    branchChapterId: 'arc1-ch14',
    divergencePremise: 'What if Subaru never called out for Reinhard’s help in the alleyway, dying 87 times against the slums thugs before forming an alliance with Elsa Granhiert?',
    consequences: [
      'Subaru burns with pathological pride, dedicating his life to burning Lugunica to the ground so Emilia can become Queen.',
      'Subaru allies with Elsa and Meili, killing Petelgeuse, Regulus, and burning the Capital.',
      'Subaru acts as the ultimate villain, leaving Emilia as the sole surviving hero.',
    ],
    keyCharacters: ['Subaru Natsuki', 'Elsa Granhiert', 'Meili Portroute', 'Felix', 'Reinhard van Astrea'],
    safeToReadArc: 'After Arc 5 Chapter 57',
    badgeColor: 'border-amber-500/60 bg-amber-950/60 text-amber-300',
    summary: 'A dark psychological descent where Subaru abuses Return by Death over thousands of loops to orchestrate the destruction of the Kingdom so Emilia can reign undisputed.',
  },
  {
    id: 'wrath',
    name: 'Wrath Route (Oboreru IF)',
    sin: 'Wrath (憤怒)',
    japaneseTitle: 'オボレル (Oboreru)',
    branchArc: 'Arc 2: The Chaotic Week',
    branchChapter: 'Chapter 31: The Clown’s Lament',
    branchChapterId: 'arc2-ch31',
    divergencePremise: 'What if Subaru refused to jump off the cliff to save Rem and Ram, fleeing the Roswaal Manor in total terror and hatred for betrayal?',
    consequences: [
      'Subaru founds the syndicate "Pleione", an underworld empire ruled with absolute paranoia.',
      'Subaru sees the world in monochrome black-and-white, unable to trust any human face.',
      'Cecilus Segmunt and Halibel become his personal executioners and bodyguards.',
      'Subaru relies on coin tosses to make life-and-death decisions for thousands of subordinates.',
    ],
    keyCharacters: ['Purge King Subaru', 'Ram', 'Cecilus Segmunt', 'Halibel', 'Emilia'],
    safeToReadArc: 'After Arc 4 Chapter 87',
    badgeColor: 'border-rose-500/60 bg-rose-950/60 text-rose-300',
    summary: 'Subaru becomes the feared "Purge King" of the underworld. His shattered psyche can only see colors in the faces of Ram and Emilia, while everyone else appears as static gray shadows.',
  },
  {
    id: 'greed',
    name: 'Greed Route (Kasaneru IF)',
    sin: 'Greed (強欲)',
    japaneseTitle: 'カサネル (Kasaneru)',
    branchArc: 'Arc 4: The Everlasting Contract',
    branchChapter: 'Chapter 74: Witch’s Plot and Proposal',
    branchChapterId: 'arc4-p3-22',
    divergencePremise: 'What if Subaru accepted Echidna’s contract in the tea party tomb, allowing the Witch of Greed to guide his Return by Death?',
    consequences: [
      'Subaru dies over 100 million times over minor inconveniences (like checking the weather).',
      'Emilia’s mental state collapses into complete childish dependency on Subaru.',
      'Echidna satisfies her endless curiosity through Subaru’s infinite painful loops.',
      'Roswaal, Beatrice, and Otto are manipulated like hollow chess pieces.',
    ],
    keyCharacters: ['Subaru Natsuki', 'Echidna (Witch of Greed)', 'Emilia', 'Roswaal L. Mathers', 'Beatrice'],
    safeToReadArc: 'After Arc 5 Chapter 27',
    badgeColor: 'border-yellow-400/60 bg-yellow-950/60 text-yellow-300',
    summary: 'A chilling timeline exploring what happens when Subaru treats his own death as free and infinite currency. He saves everyone, but his soul and the minds of his loved ones are permanently broken.',
  },
  {
    id: 'gluttony',
    name: 'Gluttony Route (Tsugihagu IF)',
    sin: 'Gluttony (暴食)',
    japaneseTitle: 'ツギハグ (Tsugihagu)',
    branchArc: 'Arc 6: Hall of Memories',
    branchChapter: 'Chapter 48: Murder Becomes a Habit',
    branchChapterId: 'arc6-p3-14',
    divergencePremise: 'What if Amnesia Subaru in the Pleiades Watchtower decided to murder all his companions to read their "Books of the Dead" and piece himself back together?',
    consequences: [
      'Subaru hunts down Shaula, Julius, Meili, and Ram in the tower.',
      'He consumes their memories to learn who "Natsuki Subaru" truly was.',
      'His mind becomes a patchwork chimera of dozens of stolen lives.',
    ],
    keyCharacters: ['Patchwork Subaru', 'Shaula', 'Julius Juukulius', 'Meili', 'Louis Arneb'],
    safeToReadArc: 'After Arc 6 Chapter 48',
    badgeColor: 'border-amber-600/60 bg-amber-950/60 text-amber-400',
    summary: 'A horrific murder-mystery inverted timeline where Subaru becomes a serial killer inside the Pleiades Watchtower, patching together his lost identity through the pages of his slaughtered comrades.',
  },
  {
    id: 'lust',
    name: 'Lust Route (Butterfly Dream)',
    sin: 'Lust (色欲)',
    japaneseTitle: '胡蝶之夢 (Butterfly Dream)',
    branchArc: 'Arc 3: Return to the Royal Capital',
    branchChapter: 'Chapter 84 / Interlude',
    branchChapterId: 'arc3-interlude-3',
    divergencePremise: 'What if Subaru became the King of Lugunica and gathered Emilia, Rem, Ram, Crusch, Priscilla, Felt, and Anastasia into his grand harem palace?',
    consequences: [
      'Subaru rules Lugunica surrounded by all the candidates as royal consorts.',
      'Humorous and surreal parody route deleted from Narou and rewritten into a dream allegory.',
    ],
    keyCharacters: ['King Subaru', 'Emilia', 'Rem', 'Crusch', 'Priscilla', 'Anastasia', 'Felt'],
    safeToReadArc: 'After Arc 3 Conclusion',
    badgeColor: 'border-pink-500/60 bg-pink-950/60 text-pink-300',
    summary: 'A whimsical and absurd April Fool’s route where Subaru takes the throne and unifies all camps through sheer harem romance.',
  },
  {
    id: 'vainglory',
    name: 'Vainglory Route (High-School IF)',
    sin: 'Vainglory (虚飾)',
    japaneseTitle: '学校生活 IF (Gakko Seikatsu)',
    branchArc: 'Real World Alternate Universe',
    branchChapter: 'Alternate Modern Tokyo Setting',
    branchChapterId: 'if-vainglory-p1',
    divergencePremise: 'What if all Re:Zero characters were students and faculty in a modern Japanese high school in Tokyo?',
    consequences: [
      'Subaru is an ordinary high school delinquent with Emilia as the class idol.',
      'Rem and Ram are twin underclassmen maids of the home economics club.',
      'Roswaal is the eccentric school principal, and Reinhard is the student council president.',
    ],
    keyCharacters: ['High School Subaru', 'Emilia-san', 'Rem-chan', 'Ram-senpai', 'Echidna-sensei'],
    safeToReadArc: 'Parts 1-2 after Arc 3; Parts 3-4 after Arc 6',
    badgeColor: 'border-purple-500/60 bg-purple-950/60 text-purple-300',
    summary: 'The heartwarming and hilarious high-school slice of life AU where nobody dies, homework replaces Witch Cult attacks, and school festivals replace royal selections.',
  },
  {
    id: 'aganau',
    name: 'Aganau IF (The Retribution IF)',
    sin: 'Retribution / Vengeance (贖罪)',
    japaneseTitle: 'アガナウ IF (Lost in Memories Game Story)',
    branchArc: 'Arc 3: The White Whale & Sloth',
    branchChapter: 'Chapter 37: Sloth',
    branchChapterId: 'arc3-ch37',
    divergencePremise: 'What if Subaru failed to save Rem from Petelgeuse, lost his right eye and left arm, and spent 20 years hunting down the Sin Archbishop of Sloth for revenge?',
    consequences: [
      'Subaru survives alone for 20 years as a hardened, scarred mercenary.',
      'Ferris falls into deep depression, and the Emilia Camp dissolves in grief.',
      'Subaru wields Beatrice’s daggers and finally corners Petelgeuse two decades later.',
    ],
    keyCharacters: ['20-Year Veteran Subaru', 'Ferris', 'Petelgeuse Romanee-Conti', 'Reinhard van Astrea'],
    safeToReadArc: 'After Arc 3 Chapter 52',
    badgeColor: 'border-cyan-500/60 bg-cyan-950/60 text-cyan-300',
    summary: 'Written by Tappei Nagatsuki for the mobile game Lost in Memories. A gritty 20-year timeskip story of a scarred Subaru who gave up on salvation and lived purely for retribution against Sloth.',
  },
];
