export interface ChapterLoreInfo {
  summary: string;
  keyPoints: string[];
  characters: string[];
  tags?: string[];
  checkpoint?: string;
  quote?: string;
}

export const CHAPTER_LORE_DATABASE: Record<string, ChapterLoreInfo> = {
  // ARC 1
  'arc1-prologue': {
    summary: 'Subaru Natsuki is suddenly summoned into the fantasy capital of Lugunica with only convenience store groceries and a cell phone.',
    keyPoints: ['First arrival into the parallel world', 'Realizes he possesses no initial cheat weapons or stats', 'Encounter with thugs in the back alley'],
    characters: ['Subaru Natsuki', 'Ton Chin Kan thugs'],
    tags: ['Summoning', 'Prologue'],
    checkpoint: 'Lugunica Capital Appa Merchant Stand',
  },
  'arc1-ch1': {
    summary: 'Subaru realizes modern Japanese yen has no value in Lugunica and tries to figure out how to survive in the unfamiliar fantasy capital.',
    keyPoints: ['Currency exchange failure with the Appa vendor', 'Discovering humanoid demi-humans in the capital crowd', 'Realizing magic exists in this realm'],
    characters: ['Subaru Natsuki', 'Kadomon (Appa Vendor)'],
    tags: ['Slums', 'World Building'],
  },
  'arc1-ch2': {
    summary: 'Cornered by slums thugs, Subaru is miraculously saved by a silver-haired half-elf girl and her floating grey cat spirit.',
    keyPoints: ['First encounter with Emilia and Puck', 'Emilia claims her name is "Satella"', 'Emilia is searching for her stolen royal insignia'],
    characters: ['Subaru Natsuki', 'Emilia ("Satella")', 'Puck', 'Thugs'],
    tags: ['First Meeting', 'EMT', 'Magic'],
    quote: '"My name is... Satella. I have no family name."',
  },
  'arc1-ch5': {
    summary: 'Subaru learns more about the girl calling herself Satella and decides to assist her search across the slums to retrieve the insignia.',
    keyPoints: ['Emilia explains the insignia is indispensable to her future', 'Subaru makes a solemn vow to help her', 'Tracking the thief girl into the slums'],
    characters: ['Subaru Natsuki', 'Emilia', 'Puck'],
    tags: ['Bonding', 'Slums Investigation'],
  },
  'arc1-ch6': {
    summary: 'Subaru and Emilia arrive at Rom’s Loot House in the slums, where they stumble into a horrifying massacre and are brutally murdered.',
    keyPoints: ['Subaru enters the dark loot house and finds Old Man Rom dead', 'Gut Hunter Elsa Granhiert strikes from the shadows', 'First death and bloodied promise: "I swear... I will save you!"'],
    characters: ['Subaru Natsuki', 'Emilia', 'Elsa Granhiert', 'Old Man Rom'],
    tags: ['Loop 1 Death', 'First Death', 'Gut Hunter'],
    checkpoint: 'Loop 1 Conclusion',
    quote: '"Wait for me... I swear... I will save you!"',
  },
  'arc1-ch7': {
    summary: 'Subaru awakens back at the Appa stand with no wounds. Confused, he tries to understand whether he hallucinated his gruesome death.',
    keyPoints: ['Return by Death triggers for the first time', 'Appa merchant Kadomon acts as if they just met', 'Subaru rushes back to the slums to prevent the bloodshed'],
    characters: ['Subaru Natsuki', 'Kadomon'],
    tags: ['Loop 2', 'Return by Death'],
    checkpoint: 'Appa Vendor (Loop 2)',
  },
  'arc1-ch8': {
    summary: 'Subaru reaches the Loot House early in Loop 2, meets Felt and Rom, and prepares to buy the insignia before Emilia arrives.',
    keyPoints: ['First meeting with Felt and Old Man Rom', 'Negotiating with modern cell phone value evaluation', 'Elsa arrives unexpectedly early for the transaction'],
    characters: ['Subaru Natsuki', 'Felt', 'Old Man Rom', 'Elsa Granhiert'],
    tags: ['Loop 2', 'Negotiation', 'Peak Chapter 🟢'],
  },
  'arc1-ch14': {
    summary: 'Subaru restarts on Loop 4 after being killed by thugs in Loop 3. He now understands his curse and prepares the definitive solution.',
    keyPoints: ['Realizes calling Emilia "Satella" infuriates her due to the Witch of Envy', 'Understands Return by Death rules and trauma', 'Decides to recruit external combat power'],
    characters: ['Subaru Natsuki', 'Kadomon'],
    tags: ['Loop 4', 'Strategy', 'Determination'],
    checkpoint: 'Appa Vendor (Loop 4 - Final)',
  },
  'arc1-ch15': {
    summary: 'Subaru runs into the red-haired Sword Saint Reinhard van Astrea in the capital streets and alerts him of impending slums trouble.',
    keyPoints: ['First meeting with Reinhard van Astrea', 'Reinhard’s overwhelming heroic aura and Divine Protections', 'Subaru plants the distress signal for the Loot House'],
    characters: ['Subaru Natsuki', 'Reinhard van Astrea'],
    tags: ['Sword Saint', 'Allies'],
  },
  'arc1-ch18': {
    summary: 'The climactic battle in the Loot House begins as Elsa attacks. Subaru, Rom, and Felt fight desperately for survival.',
    keyPoints: ['Elsa reveals her horrifying speed and thirst for intestines', 'Subaru deflects Elsa’s blade with his modern cell phone and wooden club', 'Old Man Rom gets gravely wounded'],
    characters: ['Subaru Natsuki', 'Elsa Granhiert', 'Old Man Rom', 'Felt'],
    tags: ['Battle', 'Loot House Climax'],
  },
  'arc1-ch21': {
    summary: 'Reinhard van Astrea arrives at the Loot House and unleashes the absurd might of the Sword Saint against the Gut Hunter.',
    keyPoints: ['Reinhard draws mana and obliterates the loot house with a single swing', 'Elsa survives and launches a surprise suicide lunge at Emilia', 'Subaru shields Emilia with his own body and takes a gut wound'],
    characters: ['Subaru Natsuki', 'Reinhard van Astrea', 'Elsa Granhiert', 'Emilia'],
    tags: ['Sword Saint Power', 'Elsa Defeat', 'Subaru Sacrifice'],
  },
  'arc1-ch22': {
    summary: 'As Subaru collapses from his wound, the silver-haired girl finally reveals her true name: Emilia.',
    keyPoints: ['Emilia reveals her real name and thanks Subaru with tears in her eyes', 'Reinhard realizes Felt’s true lineage from the dragon insignia glow', 'Subaru passes out, entering Arc 2'],
    characters: ['Subaru Natsuki', 'Emilia', 'Reinhard van Astrea', 'Felt'],
    tags: ['True Name', 'Arc 1 Climax', 'EMT'],
    quote: '"My name is Emilia. Just Emilia."',
  },

  // ARC 2
  'arc2-ch1': {
    summary: 'Subaru awakens in a luxurious bedroom of Roswaal Manor and meets the twin demon maids Ram and Rem.',
    keyPoints: ['Waking up to the unfamiliar ornate ceiling', 'First introduction to the twin maids Ram and Rem', 'Exploring the mysterious endless hallway'],
    characters: ['Subaru Natsuki', 'Ram', 'Rem'],
    tags: ['Roswaal Manor', 'Twin Maids', 'New Arc'],
  },
  'arc2-ch2': {
    summary: 'Subaru accidentally opens the Door Crossing into the Forbidden Library and gets mana-drained by the spirit Beatrice.',
    keyPoints: ['Meeting Librarian Beatrice for the first time', 'Beatrice drains Subaru’s gate mana to zero', 'Roswaal L. Mathers, the eccentric Margrave, appears'],
    characters: ['Subaru Natsuki', 'Beatrice', 'Roswaal L. Mathers'],
    tags: ['Beatrice', 'Forbidden Library', 'Peak Chapter 🟢'],
  },
  'arc2-ch9': {
    summary: 'Subaru dies mysteriously in his sleep during the fourth night without knowing who or what killed him.',
    keyPoints: ['Loop 1 death at Roswaal Manor', 'Sudden organ failure/curse agony in the night', 'Awakening back in the bed with Ram and Rem staring at him'],
    characters: ['Subaru Natsuki', 'Ram', 'Rem'],
    tags: ['Loop 1 Manor Death', 'Curse Mystery'],
    checkpoint: 'Roswaal Manor Guest Room (Loop 2)',
  },
  'arc2-ch17': {
    summary: 'During Loop 2, as Subaru succumbs to the curse in the dark hallway, he hears the terrifying rattle of iron chains before getting bludgeoned.',
    keyPoints: ['The sound of an iron spiked flail echoing in the dark', 'Subaru is brutally executed without seeing the face of his killer', 'The trauma of betrayal inside the mansion'],
    characters: ['Subaru Natsuki', 'Unknown Executioner (Rem)'],
    tags: ['Loop 2 Death', 'Chain Sound', 'Psychological Horror'],
  },
  'arc2-ch25': {
    summary: 'In Loop 3, Subaru flees to the mountains to observe from outside, only to be ambushed, interrogated, and slaughtered by Rem.',
    keyPoints: ['Rem reveals herself as the chain executioner', 'Rem accuses Subaru of being a Witch Cultist due to his lingering miasma', 'Ram mercy-kills Subaru via wind blade severed throat'],
    characters: ['Subaru Natsuki', 'Rem', 'Ram'],
    tags: ['Loop 3 Climax', 'Rem Interrogation', 'Miasma Scent'],
  },
  'arc2-ch31': {
    summary: 'Devastated by Rem’s hatred, Subaru considers fleeing, but jumps off the precipice to reset the world and save the sisters.',
    keyPoints: ['Subaru confronts Beatrice in the library seeking comfort', 'The realization that he genuinely loves everyone in the mansion', 'The leap of faith: jumping off the cliff to restart the loop for Rem'],
    characters: ['Subaru Natsuki', 'Beatrice', 'Ram'],
    tags: ['Suicide Loop', 'Emotional Climax', 'Peak Chapter 🟢'],
    quote: '"I will save you all... no matter how many times I die!"',
  },
  'arc2-ch32': {
    summary: 'Subaru breaks down crying in Emilia’s lap as she grants him emotional solace without demanding explanations.',
    keyPoints: ['Emilia gives Subaru a compassionate lap pillow', 'Subaru sobs all the agony, terror, and isolation out of his soul', 'Reborn with clear conviction for Loop 4'],
    characters: ['Subaru Natsuki', 'Emilia', 'Puck'],
    tags: ['Lap Pillow', 'Emotional Reset', 'Masterpiece'],
  },
  'arc2-ch41': {
    summary: 'Subaru uncovers the shaman beast curse in Irlam Village and heads into the forest where Rem unleashes her demon horn.',
    keyPoints: ['Identifying the cursed puppy bite on the village children', 'Rem loses control in the forest into Oni Berserk mode', 'Subaru protects Rem from the mabeast onslaught'],
    characters: ['Subaru Natsuki', 'Rem'],
    tags: ['Oni Mode', 'Mabeast Forest', 'Peak Chapter 🟢'],
  },
  'arc2-ch47': {
    summary: 'Rem’s trauma over her severed horn and guilt over Ram is healed as Subaru tells her she doesn’t need to replace her sister.',
    keyPoints: ['Subaru tells Rem to look at the future and laugh together', 'Rem breaks through her decade of self-loathing', 'Roswaal arrives with apocalyptic magical artillery to vaporize the Wolgarm swarm'],
    characters: ['Subaru Natsuki', 'Rem', 'Roswaal'],
    tags: ['Rem Redemption', 'Roswaal Power', 'Peak Chapter 🟢'],
  },
  'arc2-ch49': {
    summary: 'Subaru asks Emilia out on a date in the morning sun, closing the chaotic week with genuine peace and laughter.',
    keyPoints: ['Emilia agrees to Subaru’s date request', 'Rem and Ram’s playful banter restored with genuine warmth', 'Arc 2 Conclusion'],
    characters: ['Subaru Natsuki', 'Emilia', 'Rem', 'Ram', 'Beatrice'],
    tags: ['Arc 2 Finale', 'Date Promise', 'Peak Chapter 🟢'],
  },

  // ARC 3
  'arc3-ch14': {
    summary: 'The Royal Selection officially commences in the Royal Castle of Lugunica before the council of wise men and imperial knights.',
    keyPoints: ['All five Royal Selection candidates introduced: Emilia, Crusch, Anastasia, Priscilla, Felt', 'Emilia faces racial discrimination for her half-elf silver appearance', 'Subaru claims the title of Emilia’s Knight in front of the assembled nobility'],
    characters: ['Subaru Natsuki', 'Emilia', 'Julius', 'Reinhard', 'Crusch', 'Ferris', 'Priscilla', 'Anastasia'],
    tags: ['Royal Selection', 'Castle Assembly', 'Knighthood Challenge'],
  },
  'arc3-ch20': {
    summary: 'Julius Juukulius severely beats Subaru in a mock duel in the training yard to save him from lethal retribution from other outraged knights.',
    keyPoints: ['Julius challenges Subaru’s reckless claim of knightly status', 'Subaru is physically battered and humiliated', 'The terrible psychological wedge formed between Subaru and the knighthood'],
    characters: ['Subaru Natsuki', 'Julius Juukulius', 'Ferris', 'Reinhard'],
    tags: ['Duel', 'Humiliation', 'Peak Chapter 🟢'],
  },
  'arc3-ch21': {
    summary: 'Subaru and Emilia have their devastating argument in the Karsten mansion room, resulting in their agonizing separation.',
    keyPoints: ['Emilia asks Subaru why he went so far, but Subaru cannot reveal Return by Death', 'Subaru’s ugly, entitled outburst: "Everything I did was for you!"', 'Emilia walks away: "The Subaru I see now... isn\'t the Subaru who saved me."'],
    characters: ['Subaru Natsuki', 'Emilia'],
    tags: ['The Breakup', 'Tragic Misunderstanding', 'Peak Chapter 🟢'],
    quote: '"Please don\'t burden me with a gratitude I don\'t even remember having to give."',
  },
  'arc3-ch32': {
    summary: 'Subaru returns to Roswaal Manor to find everyone slaughtered by the Witch Cult and freezes to death in Puck’s apocalyptic blizzard.',
    keyPoints: ['Subaru discovers Ram, the children, and mansion residents massacred', 'Encountering Petelgeuse Romanee-Conti, Sin Archbishop of Sloth', 'Puck turns into the Beast of the End and decapitates Subaru in absolute cold'],
    characters: ['Subaru Natsuki', 'Rem', 'Petelgeuse', 'Puck'],
    tags: ['Witch Cult', 'Sloth Debut', 'Puck Execution'],
    checkpoint: 'Karsten Villa Bedroom',
  },
  'arc3-ch37': {
    summary: 'Subaru is captured and tortured by Petelgeuse Romanee-Conti, who twists Rem’s limbs in front of him with Unseen Hands.',
    keyPoints: ['Petelgeuse’s grotesque devotion to love and the Gospel', 'Rem crawling with broken limbs to free Subaru from his iron chains', 'Rem whispering "Live..." as she dies in Subaru’s arms'],
    characters: ['Subaru Natsuki', 'Rem', 'Petelgeuse Romanee-Conti'],
    tags: ['Sloth Torture', 'Rem Sacrifice', 'Darkest Loop', 'Peak Chapter 🟢'],
    quote: '"I love you..."',
  },
  'arc3-ch46': {
    summary: 'Subaru attempts to tell Emilia about Return by Death, causing the Shadow Witch hand to squeeze Emilia’s heart to death.',
    keyPoints: ['Subaru’s desperate forbidden confession', 'The Shadow Hand bypasses Subaru and crushes Emilia’s heart', 'Subaru sits holding Emilia’s corpse as Beatrice expels him and Puck freezes the world'],
    characters: ['Subaru Natsuki', 'Emilia', 'Beatrice', 'Puck'],
    tags: ['Taboo Broken', 'Emilia Death', 'Satella Punishment', 'Peak Chapter 🟢'],
  },
  'arc3-ch52': {
    summary: 'The legendary "From Zero" chapter. Subaru declares himself the most pathetic man alive, but Rem rejects his despair and confesses her eternal love.',
    keyPoints: ['Subaru begs Rem to run away with him to Kararagi', 'Subaru screams all his hatred for his own weakness and incompetence', 'Rem’s famous declaration: "From zero... starting here, from zero, Natsuki Subaru!"'],
    characters: ['Subaru Natsuki', 'Rem'],
    tags: ['From Zero', 'Iconic Masterpiece', 'Rem Confession', 'Peak Chapter 🟢'],
    quote: '"No matter what happened before, Natsuki Subaru is my hero!"',
  },
  'arc3-ch56': {
    summary: 'Subaru negotiates the grand alliance between Emilia’s camp, Crusch Karsten, and Anastasia Hoshin using the White Whale’s spawn location.',
    keyPoints: ['Subaru offers the mining rights of Elior Forest and the time/place of the White Whale attack', 'Crusch accepts the alliance terms with genuine respect', 'The Flugel Tree operation is planned'],
    characters: ['Subaru Natsuki', 'Rem', 'Crusch Karsten', 'Anastasia Hoshin', 'Ferris', 'Wilhelm'],
    tags: ['Alliance Formed', 'Flugel Tree', 'Peak Chapter 🟢'],
  },
  'arc3-ch64': {
    summary: 'The Great Mabeast White Whale descends upon the Flugel Plains. The subjugation army strikes back with cannon fire and spirit magic.',
    keyPoints: ['The fog of elimination begins to erase fallen soldiers from history', 'Wilhelm van Astrea leaps onto the beast with vengeance for Thearesia', 'Subaru acts as live bait using his witch miasma scent'],
    characters: ['Subaru Natsuki', 'Rem', 'Wilhelm van Astrea', 'Crusch Karsten'],
    tags: ['White Whale Battle', 'Fog of Elimination', 'Peak Chapter 🟢'],
  },
  'arc3-ch69': {
    summary: 'The White Whale splits into three sky phantoms. Subaru devises a suicidal plan to fell the Flugel Tree and crush the beast.',
    keyPoints: ['Subaru and Rem dive beneath the main whale on the dragon carriage', 'Magic explosives topple the massive century-old Flugel Tree', 'Wilhelm delivers the final execution blow to the pinned White Whale'],
    characters: ['Subaru Natsuki', 'Rem', 'Wilhelm van Astrea', 'Crusch'],
    tags: ['White Whale Defeated', 'Wilhelm Revenge', 'Peak Chapter 🟢'],
    quote: '"Sleep with my wife, in peace, you overgrown fish!"',
  },
  'arc3-ch70': {
    summary: 'After the White Whale victory, Subaru marches immediately with half the army and the mercenary Iron Fang to purge Petelgeuse from Roswaal Manor.',
    keyPoints: ['Subaru parts ways with injured Crusch and Rem heading back to the capital', 'Julius Juukulius arrives with merchant knights to reinforce the Witch Cult assault', 'Current reading frontier for the user!'],
    characters: ['Subaru Natsuki', 'Rem', 'Crusch', 'Julius Juukulius', 'Ferris'],
    tags: ['Current Frontier', 'Witch Cult Subjugation', 'Next Up'],
  },

  // ARC 4 KEY HIGHLIGHTS
  'arc4-p1-10': {
    summary: 'Subaru enters the tomb in Sanctuary and comes face-to-face with Echidna, the white-haired Witch of Greed, who serves him bodily fluid tea.',
    keyPoints: ['First encounter with Echidna in the dream citadel', 'Drinking the Witch’s Tea (Echidna’s bodily fluids) to stabilize his gate', 'Echidna reveals the existence of the Sanctuary Trials'],
    characters: ['Subaru Natsuki', 'Echidna'],
    tags: ['Echidna Debut', 'Tea Party', 'Witch of Greed'],
    quote: '"My tea... It is made from my bodily fluids, you see."',
  },
  'arc4-p2-43': {
    summary: 'Subaru encounters the Great Rabbit in the snow and suffers the most gruesome death in the series, being eaten alive from inside out.',
    keyPoints: ['The Great Rabbit swarm descends upon Sanctuary', 'Thousands of carnivorous rabbits burrow into Subaru’s flesh and organs', 'Psychological shattering that leads to the second tea party'],
    characters: ['Subaru Natsuki', 'The Great Rabbit'],
    tags: ['Great Rabbit', 'Gory Death', 'Sanctuary Horror'],
  },
  'arc4-p3-76': {
    summary: 'The Witches of Sin assemble at the Tea Party: Minerva, Carmilla, Daphne, Typhon, Sekhmet, and the arrival of Satella in person.',
    keyPoints: ['Meeting all seven Witches of Sin', 'Satella appears and confesses her unconditional, eternal love to Subaru', 'Subaru resolves to value his own life and not rely purely on death as a disposable tool'],
    characters: ['Subaru Natsuki', 'Satella', 'Echidna', 'Minerva', 'Carmilla'],
    tags: ['All Witches Assembled', 'Satella Confession', 'Sanctuary Masterpiece'],
    quote: '"Love yourself more... Because I love you."',
  },
  'arc4-p5-106': {
    summary: 'Otto Suwen punches Subaru in the face and demands he stop pretending he has to shoulder everything alone.',
    keyPoints: ['Otto acts as the true MVP of Sanctuary', 'Otto agrees to face Garfiel in combat so Subaru can move forward', 'The beginning of the counterattack against Roswaal’s Gospel'],
    characters: ['Subaru Natsuki', 'Otto Suwen', 'Garfiel Tinsel'],
    tags: ['Otto MVP', 'Friendship', 'Turning Tide'],
  },
  'arc4-p6-129': {
    summary: 'The iconic "-Choose Me" chapter. Subaru storms the burning Forbidden Library and begs Beatrice to take his hand and live for him.',
    keyPoints: ['Subaru refuses to be "That Person" from the 400-year contract', 'Subaru demands Beatrice choose him out of her own free will', 'Beatrice takes Subaru’s outstretched hand as the library burns down around them'],
    characters: ['Subaru Natsuki', 'Beatrice'],
    tags: ['Choose Me', 'Beatrice Contract', 'Emotional Masterpiece'],
    quote: '"Don\'t choose me because of a promise. Choose me because you want to be with me!"',
  },

  // ARC 5 HIGHLIGHTS
  'arc5-p1-5': {
    summary: 'The Emilia Camp travels to Pristella, the grand Water Gate City, by invitation of Anastasia Hoshin, reuniting all Royal Selection camps.',
    keyPoints: ['Arrival in Pristella with its four grand waterways and floating gondolas', 'Reunions with Priscilla, Crusch, Felt, and Anastasia camps', 'Meeting Songstress Liliana and merchant Joshua'],
    characters: ['Subaru Natsuki', 'Emilia', 'Anastasia', 'Priscilla', 'Crusch'],
    tags: ['Pristella', 'City of Water', 'Camp Reunion'],
  },
  'arc5-p4-59': {
    summary: 'Subaru, Reinhard, and Emilia confront Regulus Corneas, Sin Archbishop of Greed, and unravel the secret of his invulnerability.',
    keyPoints: ['Regulus’s endless narcissistic rants about rights and infringement', 'Subaru deduces Regulus’s "Lion’s Heart" stopping his heartbeat and placing it in his wives', 'Reinhard kicks Regulus straight down into the bedrock of Pristella'],
    characters: ['Subaru Natsuki', 'Reinhard van Astrea', 'Emilia', 'Regulus Corneas'],
    tags: ['Regulus Defeat', 'Greed Defeated', 'Reinhard Action'],
  },

  // ARC 6 HIGHLIGHTS
  'arc6-p1-18': {
    summary: 'Subaru, Emilia, Beatrice, Ram, Anastasia, and Meili cross the Augria Sand Dunes and breach the Pleiades Watchtower, guarded by Shaula.',
    keyPoints: ['Crossing the Sand Sea infested with centaur mabeasts', 'Sniper attacks from the tower summit', 'Meeting Shaula who enthusiastically tackles Subaru calling him "Master Flugel"'],
    characters: ['Subaru Natsuki', 'Emilia', 'Beatrice', 'Shaula', 'Julius'],
    tags: ['Pleiades Watchtower', 'Shaula Debut', 'Flugel Mystery'],
  },
  'arc6-p4-70': {
    summary: 'Subaru confronts the Book of the Dead in the Taygeta Library and experiences the loss and reconstruction of his own identity.',
    keyPoints: ['Subaru reads the deaths of friends and strangers', 'Amnesia Subaru confronting "The Amazing Guy Natsuki Subaru"', 'The five rules and trials of the Pleiades Watchtower'],
    characters: ['Subaru Natsuki', 'Louis Arneb', 'Shaula'],
    tags: ['Amnesia Arc', 'Taygeta Library', 'Psychological Peak'],
  },

  // ARC 7 & 8 HIGHLIGHTS
  'arc7-p1-1': {
    summary: 'Subaru and an amnesiac, hostile Rem are teleported across the southern border into the brutal warrior realm of the Vollachian Empire.',
    keyPoints: ['Subaru separated from the Emilia Camp', 'Rem has amnesia and despises Subaru for his pungent witch miasma', 'First meeting with Vincent Vollachia, the exiled Emperor in disguise'],
    characters: ['Subaru Natsuki', 'Rem', 'Vincent Vollachia'],
    tags: ['Empire Arc', 'Amnesiac Rem', 'Vollachia'],
  },
  'arc8-p5-74': {
    summary: 'The grand climax of the Vollachian Civil War in the Imperial Capital Lupugana against the Great Disaster and Sphinx’s undead legions.',
    keyPoints: ['The Pleiades Battalion counterattack with Cecilus, Arakiya, and Vincent', 'Priscilla Barielle’s final glorious sacrifice and curtain close', 'Subaru and Rem’s bond fundamentally reconciled'],
    characters: ['Subaru Natsuki', 'Vincent Vollachia', 'Priscilla Barielle', 'Sphinx', 'Rem'],
    tags: ['Empire Climax', 'Priscilla Farewell', 'War Conclusion'],
  },
};

// Helper function to get lore with intelligent fallbacks
export function getChapterLore(itemId: string, itemTitle: string, arcTitle: string): ChapterLoreInfo {
  if (CHAPTER_LORE_DATABASE[itemId]) {
    return CHAPTER_LORE_DATABASE[itemId];
  }

  // Smart fallback generator for other chapters
  const chMatch = itemTitle.match(/Chapter (\d+)/i);
  const chNum = chMatch ? chMatch[1] : '';

  return {
    summary: `Main story chapter in ${arcTitle.split(':')[0]}. Subaru and allies advance the events surrounding this section of the storyline.`,
    keyPoints: [
      `Chronological progression of ${itemTitle}`,
      `Key developments in the overarching narrative of ${arcTitle.split(':')[0]}`,
      `Critical dialogue and preparations for upcoming trials`,
    ],
    characters: ['Subaru Natsuki', 'Emilia Faction'],
    tags: [arcTitle.split(':')[0], 'Web Novel Canon'],
  };
}
