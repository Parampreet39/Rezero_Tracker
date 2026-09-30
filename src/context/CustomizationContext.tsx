import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  MonkeyTheme,
  ThemeColors,
  CustomImageKey,
  MONKEY_THEMES,
  CharacterLoreProfile,
  CharacterArmamentProfile,
  DEFAULT_CHARACTER_LORES,
  AppCustomizationSettings,
} from '../types/monkeytype';
import { ASSETS } from '../assets';

const SETTINGS_STORAGE_KEY = 'rezero_app_customization_v2';

interface ExtendedCustomizationSettings extends AppCustomizationSettings {
  characterLoreOverrides?: Partial<Record<MonkeyTheme, CharacterLoreProfile>>;
  characterCodexImages?: Record<string, string>;
}

interface CustomizationContextType {
  themeId: MonkeyTheme;
  setThemeId: (theme: MonkeyTheme) => void;
  themeColors: ThemeColors;
  customThemeColors: ThemeColors;
  updateCustomThemeColors: (colors: Partial<ThemeColors>) => void;
  characterLore: CharacterLoreProfile;
  customCharacterLore: CharacterLoreProfile;
  updateCustomCharacterLore: (lore: Partial<CharacterLoreProfile>) => void;
  updateCharacterArmament: (armament: Partial<CharacterArmamentProfile>) => void;
  updateCharacterTrait: (index: 0 | 1 | 2, trait: { title: string; status: string }) => void;
  resetCustomCharacterLore: () => void;
  customImages: Partial<Record<CustomImageKey, string>>;
  setImage: (key: CustomImageKey, dataUrlOrUrl: string) => void;
  resetImage: (key: CustomImageKey) => void;
  resetAllImages: () => void;
  getImage: (key: CustomImageKey) => string;
  characterCodexImages: Record<string, string>;
  setCharacterCodexImage: (charId: string, dataUrlOrUrl: string) => void;
  resetCharacterCodexImage: (charId: string) => void;
  resetAllCharacterCodexImages: () => void;
  getCharacterCodexImage: (charId: string) => string;
  backgroundWallpaperOpacity: number;
  setBackgroundWallpaperOpacity: (val: number) => void;
  fontFamily: 'default' | 'cinzel' | 'mono' | 'sans';
  setFontFamily: (font: 'default' | 'cinzel' | 'mono' | 'sans') => void;
  glowEffect: 'none' | 'subtle' | 'vibrant';
  setGlowEffect: (glow: 'none' | 'subtle' | 'vibrant') => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  exportSettingsJSON: () => string;
  downloadSettingsFile: () => void;
  importSettingsJSON: (jsonStr: string) => { success: boolean; message: string };
  resetAllSettings: () => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

const DEFAULT_CUSTOM_COLORS: ThemeColors = {
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
};

function getStoredSettings(): Partial<ExtendedCustomizationSettings> {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse customization settings', e);
  }
  return {};
}

export const CustomizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initial = useMemo(() => getStoredSettings(), []);

  const [themeId, setThemeId] = useState<MonkeyTheme>(initial.themeId || 'satella');
  const [customThemeColors, setCustomThemeColors] = useState<ThemeColors>(
    initial.customThemeColors || DEFAULT_CUSTOM_COLORS
  );
  const [customCharacterLore, setCustomCharacterLore] = useState<CharacterLoreProfile>(
    initial.customCharacterLore || DEFAULT_CHARACTER_LORES.custom
  );
  const [characterLoreOverrides, setCharacterLoreOverrides] = useState<Partial<Record<MonkeyTheme, CharacterLoreProfile>>>(
    initial.characterLoreOverrides || {}
  );
  const [customImages, setCustomImages] = useState<Partial<Record<CustomImageKey, string>>>(
    initial.customImages || {}
  );
  const [characterCodexImages, setCharacterCodexImages] = useState<Record<string, string>>(
    initial.characterCodexImages || {}
  );
  const [backgroundWallpaperOpacity, setBackgroundWallpaperOpacity] = useState<number>(
    typeof initial.backgroundWallpaperOpacity === 'number' ? initial.backgroundWallpaperOpacity : 0.15
  );
  const [fontFamily, setFontFamily] = useState<'default' | 'cinzel' | 'mono' | 'sans'>(
    initial.fontFamily || 'default'
  );
  const [glowEffect, setGlowEffect] = useState<'none' | 'subtle' | 'vibrant'>(
    initial.glowEffect || 'vibrant'
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    initial.soundEnabled !== undefined ? initial.soundEnabled : true
  );

  // Derive active colors
  const themeColors = useMemo<ThemeColors>(() => {
    if (themeId === 'custom') {
      return customThemeColors;
    }
    return MONKEY_THEMES[themeId] || MONKEY_THEMES.satella;
  }, [themeId, customThemeColors]);

  // Derive active character lore and armaments
  const characterLore = useMemo<CharacterLoreProfile>(() => {
    if (characterLoreOverrides[themeId]) {
      return characterLoreOverrides[themeId]!;
    }
    if (themeId === 'custom') {
      return customCharacterLore;
    }
    return DEFAULT_CHARACTER_LORES[themeId] || DEFAULT_CHARACTER_LORES.satella;
  }, [themeId, characterLoreOverrides, customCharacterLore]);

  // Persist settings
  useEffect(() => {
    const payload: ExtendedCustomizationSettings = {
      version: 2,
      themeId,
      customThemeColors,
      customCharacterLore,
      characterLoreOverrides,
      customImages,
      characterCodexImages,
      backgroundWallpaperOpacity,
      fontFamily,
      glowEffect,
      soundEnabled,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Storage quota exceeded for custom settings', e);
    }
  }, [
    themeId,
    customThemeColors,
    customCharacterLore,
    characterLoreOverrides,
    customImages,
    characterCodexImages,
    backgroundWallpaperOpacity,
    fontFamily,
    glowEffect,
    soundEnabled,
  ]);

  // Apply CSS custom properties to root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', themeColors.bg);
    root.style.setProperty('--theme-subAlt', themeColors.subAlt);
    root.style.setProperty('--theme-sub', themeColors.sub);
    root.style.setProperty('--theme-text', themeColors.text);
    root.style.setProperty('--theme-main', themeColors.main);
    root.style.setProperty('--theme-error', themeColors.error);
    root.style.setProperty('--theme-highlight', themeColors.highlight);
    root.style.setProperty('--theme-accent', themeColors.accent || themeColors.main);
    root.style.setProperty('--theme-glow-opacity', glowEffect === 'none' ? '0' : glowEffect === 'subtle' ? '0.15' : '0.3');
  }, [themeColors, glowEffect]);

  // Apply font family
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-cinzel', 'font-mono', 'font-sans');
    if (fontFamily === 'cinzel') {
      root.classList.add('font-serif');
    } else if (fontFamily === 'mono') {
      root.classList.add('font-mono');
    }
  }, [fontFamily]);

  const updateCustomThemeColors = (colors: Partial<ThemeColors>) => {
    setCustomThemeColors((prev) => ({ ...prev, ...colors }));
  };

  const updateCustomCharacterLore = (lore: Partial<CharacterLoreProfile>) => {
    const base = characterLoreOverrides[themeId] || DEFAULT_CHARACTER_LORES[themeId] || DEFAULT_CHARACTER_LORES.satella;
    const updated: CharacterLoreProfile = {
      ...base,
      ...lore,
      armament: {
        ...base.armament,
        ...(lore.armament || {}),
      },
    };

    if (themeId === 'custom') {
      setCustomCharacterLore(updated);
    }
    setCharacterLoreOverrides((prev) => ({
      ...prev,
      [themeId]: updated,
    }));
  };

  const updateCharacterArmament = (armament: Partial<CharacterArmamentProfile>) => {
    const base = characterLoreOverrides[themeId] || DEFAULT_CHARACTER_LORES[themeId] || DEFAULT_CHARACTER_LORES.satella;
    const updated: CharacterLoreProfile = {
      ...base,
      armament: {
        ...base.armament,
        ...armament,
      },
    };

    if (themeId === 'custom') {
      setCustomCharacterLore(updated);
    }
    setCharacterLoreOverrides((prev) => ({
      ...prev,
      [themeId]: updated,
    }));
  };

  const updateCharacterTrait = (index: 0 | 1 | 2, trait: { title: string; status: string }) => {
    const base = characterLoreOverrides[themeId] || DEFAULT_CHARACTER_LORES[themeId] || DEFAULT_CHARACTER_LORES.satella;
    const newTraits = [...base.traits] as [
      { title: string; status: string },
      { title: string; status: string },
      { title: string; status: string }
    ];
    newTraits[index] = trait;

    const updated: CharacterLoreProfile = {
      ...base,
      traits: newTraits,
    };

    if (themeId === 'custom') {
      setCustomCharacterLore(updated);
    }
    setCharacterLoreOverrides((prev) => ({
      ...prev,
      [themeId]: updated,
    }));
  };

  const resetCustomCharacterLore = () => {
    const defaultLore = DEFAULT_CHARACTER_LORES[themeId] || DEFAULT_CHARACTER_LORES.satella;
    if (themeId === 'custom') {
      setCustomCharacterLore(DEFAULT_CHARACTER_LORES.custom);
    }
    setCharacterLoreOverrides((prev) => {
      const next = { ...prev };
      delete next[themeId];
      return next;
    });
  };

  const setImage = (key: CustomImageKey, dataUrlOrUrl: string) => {
    setCustomImages((prev) => ({ ...prev, [key]: dataUrlOrUrl }));
  };

  const resetImage = (key: CustomImageKey) => {
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const resetAllImages = () => {
    setCustomImages({});
    setCharacterCodexImages({});
  };

  const setCharacterCodexImage = (charId: string, dataUrlOrUrl: string) => {
    setCharacterCodexImages((prev) => ({ ...prev, [charId]: dataUrlOrUrl }));
  };

  const resetCharacterCodexImage = (charId: string) => {
    setCharacterCodexImages((prev) => {
      const next = { ...prev };
      delete next[charId];
      return next;
    });
  };

  const resetAllCharacterCodexImages = () => {
    setCharacterCodexImages({});
  };

  const getCharacterCodexImage = (charId: string): string => {
    if (characterCodexImages[charId]) {
      return characterCodexImages[charId];
    }
    switch (charId) {
      case 'rem':
        return getImage('remSolo');
      case 'subaru':
      case 'emilia':
        return getImage('subaruEmilia');
      case 'ram':
        return getImage('remRam');
      case 'echidna':
      case 'shaula':
        return getImage('echidnaShaula');
      default:
        return getImage('emblemLogo');
    }
  };

  const getImage = (key: CustomImageKey): string => {
    if (customImages[key]) {
      return customImages[key]!;
    }
    switch (key) {
      case 'remSolo':
        if (themeId === 'subaru' || themeId === 'emilia') return ASSETS.subaruEmilia;
        if (themeId === 'ram') return ASSETS.remRam;
        if (themeId === 'echidna') return ASSETS.echidnaShaula;
        if (themeId === 'rem') return ASSETS.remSolo;
        if (themeId === 'satella') return ASSETS.emblemLogo;
        if (themeId === 'reinhard') return ASSETS.emblemLogo;
        return ASSETS.emblemLogo;
      case 'remBanner':
        return ASSETS.remBanner;
      case 'emblemLogo':
        return ASSETS.emblemLogo;
      case 'worldMap':
        return ASSETS.worldMap;
      case 'subaruEmilia':
        return ASSETS.subaruEmilia;
      case 'remRam':
        return ASSETS.remRam;
      case 'echidnaShaula':
        return ASSETS.echidnaShaula;
      default:
        return '';
    }
  };

  const exportSettingsJSON = (): string => {
    const payload: ExtendedCustomizationSettings = {
      version: 2,
      themeId,
      customThemeColors,
      customCharacterLore,
      characterLoreOverrides,
      customImages,
      characterCodexImages,
      backgroundWallpaperOpacity,
      fontFamily,
      glowEffect,
      soundEnabled,
      updatedAt: new Date().toISOString(),
    };
    return JSON.stringify(payload, null, 2);
  };

  const downloadSettingsFile = () => {
    const jsonStr = exportSettingsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rezero-tracker-settings-${themeId}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importSettingsJSON = (jsonStr: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonStr) as Partial<ExtendedCustomizationSettings>;
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, message: 'Invalid JSON structure.' };
      }

      if (parsed.themeId) {
        setThemeId(parsed.themeId);
      }
      if (parsed.customThemeColors) {
        setCustomThemeColors(parsed.customThemeColors);
      }
      if (parsed.customCharacterLore) {
        setCustomCharacterLore(parsed.customCharacterLore);
      }
      if (parsed.characterLoreOverrides) {
        setCharacterLoreOverrides(parsed.characterLoreOverrides);
      }
      if (parsed.customImages) {
        setCustomImages(parsed.customImages);
      }
      if (parsed.characterCodexImages) {
        setCharacterCodexImages(parsed.characterCodexImages);
      }
      if (typeof parsed.backgroundWallpaperOpacity === 'number') {
        setBackgroundWallpaperOpacity(parsed.backgroundWallpaperOpacity);
      }
      if (parsed.fontFamily) {
        setFontFamily(parsed.fontFamily);
      }
      if (parsed.glowEffect) {
        setGlowEffect(parsed.glowEffect);
      }
      if (parsed.soundEnabled !== undefined) {
        setSoundEnabled(Boolean(parsed.soundEnabled));
      }

      return { success: true, message: 'Settings successfully applied!' };
    } catch (e: any) {
      return { success: false, message: `Failed to import: ${e?.message || 'Parse error'}` };
    }
  };

  const resetAllSettings = () => {
    setThemeId('satella');
    setCustomThemeColors(DEFAULT_CUSTOM_COLORS);
    setCustomCharacterLore(DEFAULT_CHARACTER_LORES.custom);
    setCharacterLoreOverrides({});
    setCustomImages({});
    setCharacterCodexImages({});
    setBackgroundWallpaperOpacity(0.15);
    setFontFamily('default');
    setGlowEffect('vibrant');
    setSoundEnabled(true);
    localStorage.removeItem(SETTINGS_STORAGE_KEY);
  };

  const value = {
    themeId,
    setThemeId,
    themeColors,
    customThemeColors,
    updateCustomThemeColors,
    characterLore,
    customCharacterLore,
    updateCustomCharacterLore,
    updateCharacterArmament,
    updateCharacterTrait,
    resetCustomCharacterLore,
    customImages,
    setImage,
    resetImage,
    resetAllImages,
    getImage,
    characterCodexImages,
    setCharacterCodexImage,
    resetCharacterCodexImage,
    resetAllCharacterCodexImages,
    getCharacterCodexImage,
    backgroundWallpaperOpacity,
    setBackgroundWallpaperOpacity,
    fontFamily,
    setFontFamily,
    glowEffect,
    setGlowEffect,
    soundEnabled,
    setSoundEnabled,
    exportSettingsJSON,
    downloadSettingsFile,
    importSettingsJSON,
    resetAllSettings,
  };

  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>;
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
