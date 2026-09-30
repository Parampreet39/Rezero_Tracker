# Re:Zero Completionist Tracker & Story Companion

An ultimate, spoiler-safe offline companion and story tracker for ***Re:Zero - Starting Life in Another World*** (Web Novel, Light Novel, Anime, Side Stories, EX Volumes, and "What IF" Timelines).

---

## 🚀 Quick Start & Installation Guide

### 1. Offline Web Browser Build
To run the app locally in any web browser:
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser at `http://localhost:3000`.

To build static offline production files (which you can open directly via `dist/index.html` in any browser offline):
```bash
npm run build
```

---

### 2. Standalone Desktop App (`.exe` for Windows / macOS / Linux)
You can launch and install the app as a native desktop application (`.exe` executable).

1. Ensure Node.js is installed on your system.
2. Install dependencies:
   ```bash
   npm install
   ```
3. **Run in Desktop Mode (Development):**
   ```bash
   npm run electron
   ```
4. **Build Standalone `.exe` & Installer (Production):**
   ```bash
   npm run build:exe
   ```
   This will compile the React app and package it using `electron-builder`. Once complete, look in the newly created **`release/`** folder for:
   - **Windows (`.exe`)**: `ReZero Completionist Tracker Setup x.x.x.exe` (Installer) or Portable `.exe`.
   - **macOS (`.dmg`)**: Disk image installer.
   - **Linux (`AppImage`)**: AppImage binary.

---

## ✨ Features Included
- **Chapter Codex & Progress Tracker**: Track completion across Arcs 1–10 + Side Stories with persistent local storage.
- **Spoiler-Safe Arc Progression Barriers**: Codex entries, RBD loops, World Map regions, and Witch Factors are dynamically locked/sealed behind narrative arc completion in the tracker.
- **Personalization Studio**: Customize themes (Emilia, Rem, Echidna, Satella, Reinhard), typography, sound cues, character armaments, and portrait artwork for every character in the Codex.
- **Return by Death (RBD) Loop Simulator**: Inspect all canonical loops, checkpoints, and causes of death.
- **World Map Cartography**: Explore nations, climates, and borders across Lugunica, Vollachia, Kararagi, and Gusteko.
- **Authority Mastery Tree**: Track Subaru's Witch Factor evolutions (Sloth, Greed, Gluttony).

**Vibe Coded**
