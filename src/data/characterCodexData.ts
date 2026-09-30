export interface ArcGatedProfile {
  minArc: number; // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  status:
    | 'Alive'
    | 'Deceased'
    | 'Erased by White Whale'
    | 'Coma (Gluttony Victim)'
    | 'Amnesiac'
    | 'Sealed'
    | 'Immortal'
    | 'Unknown';
  title: string;
  campLoyalty: string;
  authoritiesOrMagic: string[];
  bio: string;
  revealedSecrets: string[];
}

export interface CharacterCodexEntry {
  id: string;
  name: string;
  japaneseName: string;
  primaryCamp:
    | 'Emilia'
    | 'Crusch'
    | 'Anastasia'
    | 'Priscilla'
    | 'Felt'
    | 'Witches'
    | 'Witch Cult'
    | 'Empire'
    | 'Legends';
  race: string;
  birthday?: string;
  voiceActor?: string;
  profiles: ArcGatedProfile[];
}

import { emiliaCampCodex } from './codex/emiliaCamp';
import { cruschAndAnastasiaCodex } from './codex/cruschAndAnastasia';
import { priscillaAndFeltCodex } from './codex/priscillaAndFelt';
import { witchesAndCultCodex } from './codex/witchesAndCult';
import { empireAndLegendsCodex } from './codex/empireAndLegends';

export const CHARACTER_CODEX_ENTRIES: CharacterCodexEntry[] = [
  ...emiliaCampCodex,
  ...cruschAndAnastasiaCodex,
  ...priscillaAndFeltCodex,
  ...witchesAndCultCodex,
  ...empireAndLegendsCodex,
];
