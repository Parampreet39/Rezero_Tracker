export interface ArcBadge {
  id: string;
  arcId: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  requirement: string;
  checkUnlocked: (userState: Record<string, { completed?: boolean }>) => boolean;
}

export const ARC_ACHIEVEMENTS: ArcBadge[] = [
  {
    id: 'badge-arc1',
    arcId: 'arc1',
    title: 'The Silver Star of the Capital',
    subtitle: 'Arc 1: A Tumultuous First Day',
    icon: '🌟',
    color: 'from-amber-500 to-yellow-600 border-amber-400 text-amber-200',
    description: 'Survived the Bowel Hunter, earned Emilia’s true name, and started life from zero in the Royal Capital.',
    requirement: 'Complete all 24 Arc 1 Web Novel chapters',
    checkUnlocked: (userState) => Boolean(userState['arc1-ch22']?.completed),
  },
  {
    id: 'badge-arc2',
    arcId: 'arc2',
    title: 'Hero of the Twin Onis',
    subtitle: 'Arc 2: The Chaotic Week',
    icon: '💙',
    color: 'from-sky-500 to-blue-600 border-sky-400 text-sky-200',
    description: 'Jumped off the cliff of faith, healed Rem’s ten years of guilt, and purged the Wolgarm mabeast curse.',
    requirement: 'Complete all 49 Arc 2 Web Novel chapters',
    checkUnlocked: (userState) => Boolean(userState['arc2-ch49']?.completed),
  },
  {
    id: 'badge-from-zero',
    arcId: 'arc3',
    title: 'Starting From Zero (Rem’s Confession)',
    subtitle: 'Special Milestone: Arc 3 Chapter 52',
    icon: '💍',
    color: 'from-sky-400 to-indigo-500 border-sky-300 text-sky-100',
    description: 'Witnessed Rem’s immortal declaration of love and resolved to become the hero she believes in.',
    requirement: 'Complete Arc 3 Chapter 52 ("From Zero")',
    checkUnlocked: (userState) => Boolean(userState['arc3-ch52']?.completed),
  },
  {
    id: 'badge-white-whale',
    arcId: 'arc3',
    title: 'Slayer of the White Whale',
    subtitle: 'Special Milestone: Arc 3 Chapter 69',
    icon: '🐋',
    color: 'from-teal-400 to-emerald-600 border-teal-300 text-teal-100',
    description: 'Felled the century-old Flugel Tree and avenged Thearesia van Astrea alongside the Sword Demon Wilhelm.',
    requirement: 'Complete Arc 3 Chapter 69 ("Wilhelm van Astrea")',
    checkUnlocked: (userState) => Boolean(userState['arc3-ch69']?.completed),
  },
  {
    id: 'badge-arc3',
    arcId: 'arc3',
    title: 'Purge of the Sloth Archbishop',
    subtitle: 'Arc 3: Return to the Royal Capital',
    icon: '⚔️',
    color: 'from-purple-500 to-indigo-600 border-purple-400 text-purple-200',
    description: 'Defeated Petelgeuse Romanee-Conti, reconciled with Emilia in the sunflower field, and absorbed the Sloth factor.',
    requirement: 'Complete all 84 Arc 3 Web Novel chapters',
    checkUnlocked: (userState) => Boolean(userState['arc3-ch84']?.completed),
  },
  {
    id: 'badge-arc4',
    arcId: 'arc4',
    title: 'The Beast of the Dynamic Snow',
    subtitle: 'Arc 4: The Everlasting Contract',
    icon: '☕',
    color: 'from-emerald-500 to-green-600 border-emerald-400 text-emerald-200',
    description: 'Conquered the Sanctuary Trials, drank the Witch’s Tea, chose Beatrice from the burning library, and became Emilia’s Knight.',
    requirement: 'Complete all Arc 4 Web Novel chapters up to Chapter 130',
    checkUnlocked: (userState) => Boolean(userState['arc4-p6-17']?.completed),
  },
  {
    id: 'badge-arc5',
    arcId: 'arc5',
    title: 'Hero of the Watergate City',
    subtitle: 'Arc 5: Stars What Make History',
    icon: '🌊',
    color: 'from-blue-600 to-cyan-500 border-cyan-400 text-cyan-200',
    description: 'Liberated Pristella from Greed, Wrath, Lust, and Gluttony, crushing Regulus Corneas in the waterways.',
    requirement: 'Complete Arc 5 Web Novel chapters',
    checkUnlocked: (userState) => Boolean(userState['arc5-p5-19']?.completed),
  },
  {
    id: 'badge-arc6',
    arcId: 'arc6',
    title: 'Master of the Pleiades Watchtower',
    subtitle: 'Arc 6: Hall of Memories',
    icon: '🦂',
    color: 'from-violet-600 to-purple-600 border-violet-400 text-violet-200',
    description: 'Conquered the sand dunes, solved the Taygeta monoliths, awakened Cor Leonis, and unraveled the Books of the Dead.',
    requirement: 'Complete Arc 6 Chapter 90 ("Hero")',
    checkUnlocked: (userState) => Boolean(userState['arc6-p5-19']?.completed),
  },
  {
    id: 'badge-arc7',
    arcId: 'arc7',
    title: 'Sword Wolf of the Empire',
    subtitle: 'Arc 7: The Land of Wolves',
    icon: '🐺',
    color: 'from-rose-600 to-red-600 border-rose-400 text-rose-200',
    description: 'Formed the Pleiades Battalion, survived the 10-second Gladiator sparkas, and united the Shudraq warriors.',
    requirement: 'Complete Arc 7 Chapter 110',
    checkUnlocked: (userState) => Boolean(userState['arc7-p8-13']?.completed),
  },
  {
    id: 'badge-arc8',
    arcId: 'arc8',
    title: 'The Sun Princess’s Benediction',
    subtitle: 'Arc 8: Vincent Vollachia',
    icon: '👑',
    color: 'from-amber-600 to-rose-600 border-amber-400 text-amber-200',
    description: 'Stood through the Undead Cataclysm in Lupugana and witnessed Priscilla Barielle’s unforgettable curtain close.',
    requirement: 'Complete Arc 8 Chapter 74 and Curtain’s Close',
    checkUnlocked: (userState) => Boolean(userState['arc8-p5-14']?.completed),
  },
];
