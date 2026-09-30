import React, { useState, useRef, useMemo } from 'react';
import {
  X,
  Palette,
  Image as ImageIcon,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Check,
  Sliders,
  Volume2,
  VolumeX,
  Type,
  FileCode,
  AlertCircle,
  Copy,
  Sword,
  Shield,
  Zap,
  BookOpen,
  Search,
  User,
  Users,
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import {
  MonkeyTheme,
  MONKEY_THEMES,
  CUSTOMIZABLE_IMAGES,
  CustomImageKey,
} from '../types/monkeytype';
import { CHARACTER_CODEX_ENTRIES, CharacterCodexEntry } from '../data/characterCodexData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  initialCharacterId?: string;
}

type TabType = 'themes' | 'armaments' | 'images' | 'sync';

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  initialCharacterId,
}) => {
  const {
    themeId,
    setThemeId,
    themeColors,
    customThemeColors,
    updateCustomThemeColors,
    characterLore,
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
    downloadSettingsFile,
    exportSettingsJSON,
    importSettingsJSON,
    resetAllSettings,
  } = useCustomization();

  const [activeTab, setActiveTab] = useState<TabType>('themes');
  const [urlInputs, setUrlInputs] = useState<Partial<Record<CustomImageKey, string>>>({});
  const [jsonInput, setJsonInput] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Codex Character Portrait Changer State
  const [selectedCodexCharId, setSelectedCodexCharId] = useState<string>(
    initialCharacterId || 'subaru'
  );
  const [codexCharUrlInput, setCodexCharUrlInput] = useState<string>('');
  const [codexCampFilter, setCodexCampFilter] = useState<string>('all');
  const [codexSearch, setCodexSearch] = useState<string>('');
  const [imageSubSection, setImageSubSection] = useState<'codex' | 'general'>('codex');

  const filteredCodexChars = useMemo(() => {
    return CHARACTER_CODEX_ENTRIES.filter((c) => {
      if (codexCampFilter !== 'all' && c.primaryCamp !== codexCampFilter) return false;
      if (codexSearch.trim()) {
        const q = codexSearch.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.japaneseName.toLowerCase().includes(q) ||
          c.race.toLowerCase().includes(q) ||
          c.primaryCamp.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [codexCampFilter, codexSearch]);

  const selectedCodexChar = useMemo(() => {
    return (
      CHARACTER_CODEX_ENTRIES.find((c) => c.id === selectedCodexCharId) ||
      filteredCodexChars[0] ||
      CHARACTER_CODEX_ENTRIES[0]
    );
  }, [selectedCodexCharId, filteredCodexChars]);

  const customCodexCount = useMemo(() => {
    return Object.keys(characterCodexImages).length;
  }, [characterCodexImages]);

  const handleCodexUrlSubmit = (charId: string) => {
    const val = codexCharUrlInput.trim();
    if (!val) return;
    setCharacterCodexImage(charId, val);
    setCodexCharUrlInput('');
    const char = CHARACTER_CODEX_ENTRIES.find((c) => c.id === charId);
    onShowToast(`Updated portrait for ${char?.name || charId}! ✨`);
  };

  const handleCodexFileUpload = (charId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      onShowToast('Image size exceeds 8MB. Please use a smaller file or URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCharacterCodexImage(charId, dataUrl);
        const char = CHARACTER_CODEX_ENTRIES.find((c) => c.id === charId);
        onShowToast(`Uploaded portrait for ${char?.name || charId}! 🎨`);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleUrlSubmit = (key: CustomImageKey) => {
    const val = urlInputs[key]?.trim();
    if (!val) return;
    setImage(key, val);
    setUrlInputs((prev) => ({ ...prev, [key]: '' }));
    onShowToast(`Updated image for ${key}! ✨`);
  };

  const handleFileUpload = (key: CustomImageKey, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      onShowToast('Image size exceeds 8MB. Please use a smaller file or URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setImage(key, dataUrl);
        onShowToast(`Uploaded custom image! 🎨`);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCopyJSON = () => {
    const json = exportSettingsJSON();
    navigator.clipboard.writeText(json);
    setIsCopied(true);
    onShowToast('Settings JSON copied to clipboard! 📋');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importSettingsJSON(content);
        if (res.success) {
          onShowToast('Settings imported successfully! 🚀');
        } else {
          onShowToast(res.message);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleApplyPastedJSON = () => {
    if (!jsonInput.trim()) return;
    const res = importSettingsJSON(jsonInput);
    if (res.success) {
      setJsonInput('');
      onShowToast('Settings imported successfully! 🚀');
    } else {
      onShowToast(res.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden bg-slate-950 text-slate-100"
        style={{
          borderColor: `${themeColors.main}50`,
          boxShadow: `0 20px 50px -10px ${themeColors.main}30`,
        }}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-center justify-between gap-4 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-md shrink-0"
              style={{
                backgroundColor: `${themeColors.main}20`,
                borderColor: `${themeColors.main}60`,
                color: themeColors.highlight,
              }}
            >
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 font-serif">
                <span>Personalization Studio & Settings</span>
              </h2>
              <p className="text-xs text-slate-400">
                Customize themes, character armaments & traits, visual artwork, and export/import configurations.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher Navigation */}
        <div className="flex items-center px-6 border-b border-slate-800/80 bg-slate-950/90 gap-2 overflow-x-auto scrollbar-none shrink-0 font-mono text-xs">
          <button
            onClick={() => setActiveTab('themes')}
            className={`flex items-center gap-2 py-3.5 px-4 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'themes'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
            style={{
              borderColor: activeTab === 'themes' ? themeColors.main : 'transparent',
              color: activeTab === 'themes' ? themeColors.highlight : undefined,
            }}
          >
            <Palette className="w-4 h-4" />
            <span>🎨 Themes & Colors</span>
          </button>

          <button
            onClick={() => setActiveTab('armaments')}
            className={`flex items-center gap-2 py-3.5 px-4 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'armaments'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
            style={{
              borderColor: activeTab === 'armaments' ? themeColors.main : 'transparent',
              color: activeTab === 'armaments' ? themeColors.highlight : undefined,
            }}
          >
            <Sword className="w-4 h-4" />
            <span>⚔️ Character Traits & Armament</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center gap-2 py-3.5 px-4 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'images'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
            style={{
              borderColor: activeTab === 'images' ? themeColors.main : 'transparent',
              color: activeTab === 'images' ? themeColors.highlight : undefined,
            }}
          >
            <ImageIcon className="w-4 h-4" />
            <span>🖼️ Art & Image Customizer</span>
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`flex items-center gap-2 py-3.5 px-4 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'sync'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
            style={{
              borderColor: activeTab === 'sync' ? themeColors.main : 'transparent',
              color: activeTab === 'sync' ? themeColors.highlight : undefined,
            }}
          >
            <FileCode className="w-4 h-4" />
            <span>💾 Export / Import JSON</span>
          </button>
        </div>

        {/* Modal Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: THEMES & COLORS */}
          {activeTab === 'themes' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono mb-3">
                  Select Character Theme Preset
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(Object.keys(MONKEY_THEMES) as MonkeyTheme[]).map((tKey) => {
                    const t = MONKEY_THEMES[tKey];
                    const isSelected = themeId === tKey;
                    return (
                      <button
                        key={tKey}
                        onClick={() => {
                          setThemeId(tKey);
                          onShowToast(`Switched to ${t.name} theme! ✨`);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'ring-2 shadow-lg'
                            : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                        }`}
                        style={{
                          backgroundColor: isSelected ? `${t.main}15` : undefined,
                          borderColor: isSelected ? t.main : undefined,
                          outlineColor: isSelected ? t.main : undefined,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white">{t.name}</span>
                          {isSelected && <Check className="w-4 h-4" style={{ color: t.main }} />}
                        </div>

                        <div className="flex items-center gap-1.5 mt-3">
                          <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.bg }} title="Background" />
                          <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.subAlt }} title="Card surface" />
                          <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.main }} title="Main Accent" />
                          <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.highlight }} title="Highlight" />
                          <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: t.accent || t.main }} title="Secondary" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Theme Color Studio */}
              {themeId === 'custom' && (
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Custom Theme Color Studio</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Fine-tune every hexadecimal color variable of your personalized palette.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                    {[
                      { key: 'main' as const, label: 'Main Accent Color' },
                      { key: 'highlight' as const, label: 'Highlight Glow' },
                      { key: 'accent' as const, label: 'Secondary Accent' },
                      { key: 'bg' as const, label: 'Background Hue' },
                      { key: 'subAlt' as const, label: 'Surface Panels' },
                      { key: 'text' as const, label: 'Text Primary' },
                    ].map((col) => (
                      <div key={col.key} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] text-slate-400">{col.label}</div>
                          <div className="text-xs font-bold text-white uppercase">{customThemeColors[col.key] || '#000000'}</div>
                        </div>
                        <input
                          type="color"
                          value={customThemeColors[col.key] || '#38bdf8'}
                          onChange={(e) => updateCustomThemeColors({ [col.key]: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Audio & Font Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold uppercase font-mono text-slate-300 flex items-center gap-2">
                    <Type className="w-4 h-4" style={{ color: themeColors.main }} />
                    <span>App Typography</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {[
                      { id: 'default' as const, label: 'Modern Sans' },
                      { id: 'cinzel' as const, label: 'Cinzel Serif' },
                      { id: 'mono' as const, label: 'JetBrains Mono' },
                      { id: 'sans' as const, label: 'Jakarta Clean' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFontFamily(f.id)}
                        className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                          fontFamily === f.id
                            ? 'bg-slate-800 border-slate-600 text-white font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold uppercase font-mono text-slate-300 flex items-center gap-2">
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                    <span>Sound & Harmonics</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Play harmonic chimes and audio cues on chapter completions and milestones.
                  </p>
                  <button
                    onClick={() => {
                      setSoundEnabled(!soundEnabled);
                      onShowToast(soundEnabled ? 'Audio cues muted' : 'Audio cues enabled! 🔔');
                    }}
                    className={`px-3 py-2 rounded-lg border text-xs font-mono font-bold cursor-pointer transition-all ${
                      soundEnabled
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {soundEnabled ? '🔔 Audio Cues Enabled' : '🔕 Audio Cues Muted'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHARACTER ARMAMENT & TRAITS */}
          {activeTab === 'armaments' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                      <Sword className="w-4 h-4" style={{ color: themeColors.main }} />
                      <span>{characterLore.characterName} Armaments, Arsenal & Traits</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Configure primary weaponry, authorities, divine protections, metia, and signature traits for the active theme.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      resetCustomCharacterLore();
                      onShowToast(`Reset ${characterLore.characterName} armaments to canon defaults!`);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>

                {/* Character Name & Role details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">Character Name</label>
                    <input
                      type="text"
                      value={characterLore.characterName}
                      onChange={(e) => updateCustomCharacterLore({ characterName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                      style={{ borderColor: `${themeColors.main}40` }}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">Japanese Title / Epithet</label>
                    <input
                      type="text"
                      value={characterLore.japaneseTitle}
                      onChange={(e) => updateCustomCharacterLore({ japaneseTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">Role Badge</label>
                    <input
                      type="text"
                      value={characterLore.roleBadge}
                      onChange={(e) => updateCustomCharacterLore({ roleBadge: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">Current Arc Status</label>
                    <input
                      type="text"
                      value={characterLore.currentArcStatus}
                      onChange={(e) => updateCustomCharacterLore({ currentArcStatus: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                {/* Armament & Arsenal Section */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase font-mono text-slate-300">
                    <Zap className="w-4 h-4" style={{ color: themeColors.main }} />
                    <span>Weaponry & Combat Metia Arsenal</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Primary Weapon / Combat Focus</label>
                      <input
                        type="text"
                        value={characterLore.armament?.primaryWeapon || ''}
                        onChange={(e) => updateCharacterArmament({ primaryWeapon: e.target.value })}
                        placeholder="e.g. Hands of Unseen Shadows, Dragon Sword Reid, Morningstar Flail"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                        style={{ borderColor: `${themeColors.main}40` }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Weapon Type / Classification</label>
                      <input
                        type="text"
                        value={characterLore.armament?.primaryWeaponType || ''}
                        onChange={(e) => updateCharacterArmament({ primaryWeaponType: e.target.value })}
                        placeholder="e.g. Divine Dragon Blade, Witch Factor Void, Heavy Metia"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Divine Protection or Sin Authority</label>
                      <input
                        type="text"
                        value={characterLore.armament?.divineProtectionOrAuthority || ''}
                        onChange={(e) => updateCharacterArmament({ divineProtectionOrAuthority: e.target.value })}
                        placeholder="e.g. Authority of Envy (RBD), Sword Saint Divine Blessing"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Relic, Metia or Sacred Keepsake</label>
                      <input
                        type="text"
                        value={characterLore.armament?.relicOrMetia || ''}
                        onChange={(e) => updateCharacterArmament({ relicOrMetia: e.target.value })}
                        placeholder="e.g. Shadow Garden Beacon, Pyroxene Pendant, Tome of Wisdom"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Signature Trait / Magic Affinity</label>
                      <input
                        type="text"
                        value={characterLore.armament?.signatureTrait || ''}
                        onChange={(e) => updateCharacterArmament({ signatureTrait: e.target.value })}
                        placeholder="e.g. Al Shamak Spatial Void, Ice Brand Arts"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Battle Stance / Role</label>
                      <input
                        type="text"
                        value={characterLore.armament?.battleStance || ''}
                        onChange={(e) => updateCharacterArmament({ battleStance: e.target.value })}
                        placeholder="e.g. Calamity Dominion, Vanguard Striker"
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3 Trait Customization Inputs */}
                <div className="space-y-3 pt-1">
                  <div className="text-xs font-semibold uppercase font-mono text-slate-300">
                    Signature Trait Slots & Status Tags
                  </div>

                  {characterLore.traits.map((trait, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="sm:col-span-8 space-y-1">
                        <label className="text-[10px] font-mono text-slate-400">Trait / Skill Slot {idx + 1}</label>
                        <input
                          type="text"
                          value={trait.title}
                          onChange={(e) => updateCharacterTrait(idx as 0 | 1 | 2, { title: e.target.value, status: trait.status })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
                          style={{ borderColor: `${themeColors.main}40` }}
                        />
                      </div>

                      <div className="sm:col-span-4 space-y-1">
                        <label className="text-[10px] font-mono text-slate-400">Status Tag</label>
                        <input
                          type="text"
                          value={trait.status}
                          onChange={(e) => updateCharacterTrait(idx as 0 | 1 | 2, { title: trait.title, status: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none uppercase font-bold"
                          style={{ borderColor: `${themeColors.main}40` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status Summary & Quotes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Story Companion Summary Description</label>
                    <textarea
                      rows={2}
                      value={characterLore.statusSummary}
                      onChange={(e) => updateCustomCharacterLore({ statusSummary: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Canon Quote</label>
                    <input
                      type="text"
                      value={characterLore.quote}
                      onChange={(e) => updateCustomCharacterLore({ quote: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 italic focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Quote Story Context</label>
                    <input
                      type="text"
                      value={characterLore.quoteContext}
                      onChange={(e) => updateCustomCharacterLore({ quoteContext: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Companion Flavor Quote</label>
                    <input
                      type="text"
                      value={characterLore.flavorQuote}
                      onChange={(e) => updateCustomCharacterLore({ flavorQuote: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 italic focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ART & IMAGE CUSTOMIZER */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              {/* Sub-section Switcher */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setImageSubSection('codex')}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      imageSubSection === 'codex'
                        ? 'shadow-md'
                        : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                    style={
                      imageSubSection === 'codex'
                        ? {
                            backgroundColor: themeColors.main,
                            color: themeColors.bg,
                            boxShadow: `0 4px 14px -2px ${themeColors.main}40`,
                          }
                        : undefined
                    }
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Every Character in Codex</span>
                    {customCodexCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-white text-[10px]">
                        {customCodexCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setImageSubSection('general')}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      imageSubSection === 'general'
                        ? 'shadow-md'
                        : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                    style={
                      imageSubSection === 'general'
                        ? {
                            backgroundColor: themeColors.main,
                            color: themeColors.bg,
                            boxShadow: `0 4px 14px -2px ${themeColors.main}40`,
                          }
                        : undefined
                    }
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Tracker Banners & Wallpaper</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  {imageSubSection === 'codex' && customCodexCount > 0 && (
                    <button
                      onClick={() => {
                        resetAllCharacterCodexImages();
                        onShowToast('Reset all customized character codex portraits to defaults.');
                      }}
                      className="px-2.5 py-1 text-xs font-mono text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded-lg border border-rose-800/50 cursor-pointer transition-colors"
                    >
                      Reset All Codex Portraits
                    </button>
                  )}
                  {imageSubSection === 'general' && (
                    <button
                      onClick={() => {
                        resetAllImages();
                        onShowToast('All images reset to default artwork.');
                      }}
                      className="px-2.5 py-1 text-xs font-mono text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded-lg border border-rose-800/50 cursor-pointer transition-colors"
                    >
                      Reset All Art
                    </button>
                  )}
                </div>
              </div>

              {/* ================= 1. EVERY CHARACTER IN CODEX STUDIO ================= */}
              {imageSubSection === 'codex' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Selector & Dropdown Controls Card */}
                  <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                          <Users className="w-4 h-4" />
                          <span>Character Portrait Customizer</span>
                        </div>
                        <h4 className="text-base font-bold text-white tracking-tight mt-0.5">
                          Change the Image of Every Single Character in Character Codex
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Select any character from the dropdown below to assign custom artwork, anime screenshots, or light novel portraits.
                        </p>
                      </div>

                      <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                        Total Characters: <span className="font-bold text-white">{CHARACTER_CODEX_ENTRIES.length}</span>
                        {customCodexCount > 0 && (
                          <span className="ml-2 text-emerald-400">({customCodexCount} customized)</span>
                        )}
                      </div>
                    </div>

                    {/* Camp Quick Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-[11px]">
                      {[
                        { id: 'all', label: 'All Camps' },
                        { id: 'Emilia', label: 'Emilia Camp' },
                        { id: 'Crusch', label: 'Crusch Camp' },
                        { id: 'Anastasia', label: 'Anastasia Camp' },
                        { id: 'Priscilla', label: 'Priscilla Camp' },
                        { id: 'Felt', label: 'Felt Camp' },
                        { id: 'Witches', label: 'Witches of Sin' },
                        { id: 'Witch Cult', label: 'Witch Cult' },
                        { id: 'Empire', label: 'Vollachian Empire' },
                        { id: 'Legends', label: 'Ancient Legends' },
                      ].map((camp) => (
                        <button
                          key={camp.id}
                          onClick={() => setCodexCampFilter(camp.id)}
                          className={`px-2.5 py-1 rounded-lg cursor-pointer whitespace-nowrap transition-all ${
                            codexCampFilter === camp.id
                              ? 'font-bold shadow-sm'
                              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800/80'
                          }`}
                          style={
                            codexCampFilter === camp.id
                              ? {
                                  backgroundColor: `${themeColors.main}30`,
                                  borderColor: themeColors.main,
                                  color: themeColors.highlight,
                                }
                              : undefined
                          }
                        >
                          {camp.label}
                        </button>
                      ))}
                    </div>

                    {/* Search & Character Dropdown Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                      {/* Character Dropdown Selector */}
                      <div className="sm:col-span-8 space-y-1.5">
                        <label className="text-xs font-mono font-bold text-slate-200 flex items-center justify-between">
                          <span>Select Character to Customize:</span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            {filteredCodexChars.length} characters available
                          </span>
                        </label>
                        <select
                          value={selectedCodexCharId}
                          onChange={(e) => setSelectedCodexCharId(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-mono focus:outline-none cursor-pointer"
                          style={{
                            borderColor: themeColors.main,
                            boxShadow: `0 0 10px -2px ${themeColors.main}20`,
                          }}
                        >
                          {codexCampFilter === 'all' ? (
                            <>
                              <optgroup label="Emilia Camp">
                                {CHARACTER_CODEX_ENTRIES.filter((c) => c.primaryCamp === 'Emilia').map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name} {characterCodexImages[c.id] ? '✨ [CUSTOM PORTRAIT]' : ''}
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="Crusch Camp">
                                {CHARACTER_CODEX_ENTRIES.filter((c) => c.primaryCamp === 'Crusch').map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name} {characterCodexImages[c.id] ? '✨ [CUSTOM PORTRAIT]' : ''}
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="Anastasia Camp">
                                {CHARACTER_CODEX_ENTRIES.filter((c) => c.primaryCamp === 'Anastasia').map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name} {characterCodexImages[c.id] ? '✨ [CUSTOM PORTRAIT]' : ''}
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="Priscilla Camp">
                                {CHARACTER_CODEX_ENTRIES.filter((c) => c.primaryCamp === 'Priscilla').map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name} {characterCodexImages[c.id] ? '✨ [CUSTOM PORTRAIT]' : ''}
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="Felt Camp">
                                {CHARACTER_CODEX_ENTRIES.filter((c) => c.primaryCamp === 'Felt').map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name} {characterCodexImages[c.id] ? '✨ [CUSTOM PORTRAIT]' : ''}
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="Witches of Sin & Shadow">
                                {CHARACTER_CODEX_ENTRIES.filter((c) => c.primaryCamp === 'Witches').map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name} {characterCodexImages[c.id] ? '✨ [CUSTOM PORTRAIT]' : ''}
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="Witch Cult Archbishops">
                                {CHARACTER_CODEX_ENTRIES.filter((c) => c.primaryCamp === 'Witch Cult').map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name} {characterCodexImages[c.id] ? '✨ [CUSTOM PORTRAIT]' : ''}
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="Vollachian Empire">
                                {CHARACTER_CODEX_ENTRIES.filter((c) => c.primaryCamp === 'Empire').map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name} {characterCodexImages[c.id] ? '✨ [CUSTOM PORTRAIT]' : ''}
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="Ancient Legends & Heroes">
                                {CHARACTER_CODEX_ENTRIES.filter((c) => c.primaryCamp === 'Legends').map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name} {characterCodexImages[c.id] ? '✨ [CUSTOM PORTRAIT]' : ''}
                                  </option>
                                ))}
                              </optgroup>
                            </>
                          ) : (
                            filteredCodexChars.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name} ({c.japaneseName}) {characterCodexImages[c.id] ? '✨ [CUSTOM]' : ''}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      {/* Search Filter Input */}
                      <div className="sm:col-span-4 space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">Filter By Name / Race:</label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Type character name..."
                            value={codexSearch}
                            onChange={(e) => setCodexSearch(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2.5 text-xs text-slate-100 font-mono focus:outline-none"
                            style={{
                              borderColor: codexSearch ? themeColors.main : undefined,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Selected Character Customizer Card */}
                  {selectedCodexChar && (
                    <div
                      className="p-5 rounded-2xl bg-slate-900/80 border space-y-5 shadow-xl transition-all"
                      style={{
                        borderColor: `${themeColors.main}40`,
                        boxShadow: `0 10px 30px -10px ${themeColors.main}20`,
                      }}
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-5">
                        {/* Portrait Preview */}
                        <div className="space-y-2 shrink-0 w-full sm:w-44">
                          <div
                            className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-950 border-2 shadow-lg"
                            style={{ borderColor: themeColors.main }}
                          >
                            <img
                              src={getCharacterCodexImage(selectedCodexChar.id)}
                              alt={selectedCodexChar.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2 right-2">
                              {characterCodexImages[selectedCodexChar.id] ? (
                                <span
                                  className="px-2 py-0.5 rounded-md text-[9px] font-bold shadow-md"
                                  style={{
                                    backgroundColor: themeColors.main,
                                    color: themeColors.bg,
                                  }}
                                >
                                  CUSTOM ✨
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-slate-950/90 border border-slate-700 text-slate-300">
                                  DEFAULT
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-[11px] text-center font-mono text-slate-400">
                            {selectedCodexChar.race}
                          </div>
                        </div>

                        {/* Character Details & Editing Controls */}
                        <div className="flex-1 w-full space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-950 border border-slate-800" style={{ color: themeColors.highlight }}>
                                  {selectedCodexChar.primaryCamp} Camp
                                </span>
                                <span className="text-xs font-mono text-slate-400">
                                  {selectedCodexChar.japaneseName}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-white mt-1">
                                {selectedCodexChar.name}
                              </h3>
                              <p className="text-xs text-slate-400 mt-0.5">
                                {selectedCodexChar.profiles[0]?.title || selectedCodexChar.race} · Birthday: {selectedCodexChar.birthday || 'Unknown'} · CV: {selectedCodexChar.voiceActor || 'Unknown'}
                              </p>
                            </div>

                            {characterCodexImages[selectedCodexChar.id] && (
                              <button
                                onClick={() => {
                                  resetCharacterCodexImage(selectedCodexChar.id);
                                  onShowToast(`Reset ${selectedCodexChar.name}'s portrait to default.`);
                                }}
                                className="px-3 py-1.5 text-xs font-mono text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded-xl border border-rose-800/50 cursor-pointer transition-colors shrink-0"
                              >
                                Reset To Default
                              </button>
                            )}
                          </div>

                          {/* Image Set by URL */}
                          <div className="space-y-2">
                            <label className="text-xs font-mono font-semibold text-slate-300">
                              Option 1: Paste Image Web URL
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder={`https://example.com/${selectedCodexChar.id}-portrait.jpg`}
                                value={codexCharUrlInput}
                                onChange={(e) => setCodexCharUrlInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCodexUrlSubmit(selectedCodexChar.id)}
                                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none"
                              />
                              <button
                                onClick={() => handleCodexUrlSubmit(selectedCodexChar.id)}
                                disabled={!codexCharUrlInput.trim()}
                                className="px-4 py-2 text-xs font-bold rounded-xl text-white disabled:opacity-40 cursor-pointer transition-all shrink-0"
                                style={{
                                  backgroundColor: themeColors.main,
                                  color: themeColors.bg,
                                }}
                              >
                                Set URL
                              </button>
                            </div>
                          </div>

                          {/* Image Set by File Upload */}
                          <div className="space-y-2 pt-2 border-t border-slate-800/80">
                            <label className="text-xs font-mono font-semibold text-slate-300">
                              Option 2: Upload File From Device (PNG, JPG, WebP, GIF)
                            </label>
                            <div className="flex items-center gap-3">
                              <label
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all shadow-sm"
                                style={{
                                  backgroundColor: `${themeColors.main}15`,
                                  borderColor: themeColors.main,
                                  color: themeColors.highlight,
                                }}
                              >
                                <Upload className="w-4 h-4" />
                                <span>Choose Image File...</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleCodexFileUpload(selectedCodexChar.id, e)}
                                  className="hidden"
                                />
                              </label>

                              <span className="text-[11px] text-slate-500 font-mono">
                                Max 8MB. Stored locally in browser.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Character Avatar Strip / Quick Selector Grid */}
                  <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Quick Select Character:</span>
                      <span>Showing {filteredCodexChars.length} characters</span>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 max-h-56 overflow-y-auto pr-1">
                      {filteredCodexChars.map((char) => {
                        const isSelected = selectedCodexChar.id === char.id;
                        const isCustom = Boolean(characterCodexImages[char.id]);
                        return (
                          <button
                            key={char.id}
                            onClick={() => setSelectedCodexCharId(char.id)}
                            className={`p-1.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer text-left ${
                              isSelected
                                ? 'bg-slate-800 border-sky-400 shadow-md'
                                : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                            }`}
                            style={
                              isSelected
                                ? {
                                    borderColor: themeColors.main,
                                    backgroundColor: `${themeColors.main}20`,
                                  }
                                : undefined
                            }
                            title={`${char.name} (${char.primaryCamp} Camp)`}
                          >
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-700/60">
                              <img
                                src={getCharacterCodexImage(char.id)}
                                alt={char.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              {isCustom && (
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950" />
                              )}
                            </div>
                            <span className="text-[10px] font-mono truncate w-full text-center text-slate-300">
                              {char.name.split(' ')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= 2. GENERAL TRACKER BANNERS & WALLPAPER ================= */}
              {imageSubSection === 'general' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CUSTOMIZABLE_IMAGES.map((img) => {
                      const currentSrc = getImage(img.id);
                      const isOverridden = Boolean(customImages[img.id]);

                      return (
                        <div
                          key={img.id}
                          className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="font-bold text-xs text-white">{img.label}</h4>
                                <p className="text-[11px] text-slate-400">{img.description}</p>
                              </div>
                              {isOverridden && (
                                <span
                                  className="px-1.5 py-0.2 rounded text-[9px] font-bold shrink-0"
                                  style={{
                                    backgroundColor: themeColors.main,
                                    color: themeColors.bg,
                                  }}
                                >
                                  CUSTOM
                                </span>
                              )}
                            </div>

                            {/* Preview */}
                            <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                              {currentSrc ? (
                                <img
                                  src={currentSrc}
                                  alt={img.label}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-slate-600 font-mono">
                                  No image set
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="space-y-2 pt-2 border-t border-slate-800">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Paste image URL (https://...)"
                                value={urlInputs[img.id] || ''}
                                onChange={(e) => setUrlInputs((prev) => ({ ...prev, [img.id]: e.target.value }))}
                                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit(img.id)}
                                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-mono focus:outline-none"
                              />
                              <button
                                onClick={() => handleUrlSubmit(img.id)}
                                disabled={!urlInputs[img.id]?.trim()}
                                className="px-3 py-1 text-xs font-bold rounded-lg text-white disabled:opacity-40 cursor-pointer transition-all"
                                style={{
                                  backgroundColor: themeColors.main,
                                }}
                              >
                                Set
                              </button>
                            </div>

                            <div className="flex items-center justify-between text-xs pt-1">
                              <label className="flex items-center gap-1 cursor-pointer font-medium" style={{ color: themeColors.highlight }}>
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload File</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(img.id, e)}
                                  className="hidden"
                                />
                              </label>

                              {isOverridden && (
                                <button
                                  onClick={() => {
                                    resetImage(img.id);
                                    onShowToast(`Reset ${img.label} to default.`);
                                  }}
                                  className="text-slate-500 hover:text-rose-400 font-mono text-[11px] cursor-pointer"
                                >
                                  Reset
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Wallpaper Opacity Slider */}
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-slate-300">
                        Background Wallpaper Opacity
                      </label>
                      <span className="text-xs font-mono" style={{ color: themeColors.highlight }}>
                        {Math.round(backgroundWallpaperOpacity * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.6"
                      step="0.01"
                      value={backgroundWallpaperOpacity}
                      onChange={(e) => setBackgroundWallpaperOpacity(parseFloat(e.target.value))}
                      className="w-full cursor-pointer accent-sky-400"
                      style={{ accentColor: themeColors.main }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EXPORT / IMPORT JSON */}
          {activeTab === 'sync' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Export Card */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-sm" style={{ color: themeColors.highlight }}>
                      <Download className="w-4 h-4" />
                      <span>Export Settings & Palette</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Download your customized theme palette, armaments, traits, and image references as a JSON file to transfer across devices.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={downloadSettingsFile}
                      className="w-full py-2.5 px-4 rounded-xl text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      style={{
                        backgroundColor: themeColors.main,
                        color: themeColors.bg,
                        boxShadow: `0 4px 15px -3px ${themeColors.main}40`,
                      }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download .JSON File</span>
                    </button>

                    <button
                      onClick={handleCopyJSON}
                      className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Raw JSON String'}</span>
                    </button>
                  </div>
                </div>

                {/* Import Card */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Upload className="w-4 h-4" />
                      <span>Import Settings JSON</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Upload a previously exported settings JSON file or paste its raw contents to apply customizations.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Upload .JSON File</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleImportFile}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Paste JSON directly */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <label className="text-xs font-mono font-bold text-slate-300">
                  Or Paste JSON Text directly:
                </label>
                <textarea
                  rows={4}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='Paste JSON here: { "version": 2, "themeId": "satella", ... }'
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none"
                  style={{ borderColor: `${themeColors.main}30` }}
                />
                <button
                  onClick={handleApplyPastedJSON}
                  disabled={!jsonInput.trim()}
                  className="px-4 py-2 rounded-xl text-white text-xs font-bold disabled:opacity-40 cursor-pointer transition-all"
                  style={{
                    backgroundColor: themeColors.main,
                    color: themeColors.bg,
                  }}
                >
                  Apply Pasted Configuration
                </button>
              </div>

              {/* Hard Reset Card */}
              <div className="p-4 rounded-xl border border-rose-900/40 bg-rose-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-rose-300 font-mono flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>Master Factory Reset</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Revert all customizations, images, colors, armaments, and settings back to pristine defaults.
                  </p>
                </div>
                <button
                  onClick={() => {
                    resetAllSettings();
                    onShowToast('Factory settings restored!');
                  }}
                  className="px-3 py-1.5 text-xs font-bold font-mono rounded-lg bg-rose-600 hover:bg-rose-500 text-white cursor-pointer transition-all shrink-0"
                >
                  Reset Everything
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
