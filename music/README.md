# 🎵 Music Player Instructions

## How to Add Music to Your Wedding Website

### Quick Start

1. **Add your .mp3 files** to this `/music` folder
2. **Run the generator script** to update the playlist:
   ```bash
   node generate-music-manifest.js
   ```
3. **Reload your website** - the music will automatically play!

---

## Detailed Instructions

### Method 1: Automatic (Recommended)

1. Copy your .mp3 files into this `/music` folder
2. Open terminal/command prompt in the project root directory
3. Run:
   ```bash
   node generate-music-manifest.js
   ```
4. This will automatically scan the `/music` folder and create/update `manifest.json`

### Method 2: Manual

If you don't want to use the script, you can manually edit `manifest.json`:

```json
[
  "song1.mp3",
  "song2.mp3",
  "my-favorite-song.mp3"
]
```

Just list all your .mp3 filenames in the array.

---

## File Naming Tips

- Use simple filenames without special characters
- Examples: `song1.mp3`, `wedding-theme.mp3`, `romantic-music.mp3`
- The music will play in the order listed in manifest.json

---

## How the Music Player Works

1. When visitors open your website, the music player initializes
2. Music starts playing automatically after the first user interaction (click, scroll, or mouse move)
3. The playlist plays continuously, moving to the next track when one finishes
4. Visitors can pause/play using the 🎵 button in the corner
5. If a track fails to load, it automatically skips to the next one

---

## Troubleshooting

**Music not playing?**
- Check that your .mp3 files are actually in the `/music` folder
- Make sure `manifest.json` exists and lists your files correctly
- Run `node generate-music-manifest.js` to regenerate the manifest
- Open browser console (F12) to see detailed logs

**Want to change the play order?**
- Edit `manifest.json` and reorder the filenames
- Or rename your files and regenerate the manifest

---

## Browser Autoplay Policy

Modern browsers block autoplay until user interaction. That's why:
- Music starts after first click/scroll/mouse move
- The 🎵 button helps users control playback
- This is normal browser behavior for better user experience
