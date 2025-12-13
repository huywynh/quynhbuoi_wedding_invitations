#!/usr/bin/env python3

"""
Script to automatically generate music/manifest.json
Lists all .mp3 files in the /music directory

Usage:
    python3 generate-music-manifest.py
"""

import os
import json
from pathlib import Path

def main():
    # Get project root directory
    project_dir = Path(__file__).parent
    music_dir = project_dir / 'music'
    manifest_path = music_dir / 'manifest.json'

    try:
        # Check if music directory exists
        if not music_dir.exists():
            print('❌ Music directory not found. Creating it...')
            music_dir.mkdir(parents=True, exist_ok=True)
            print('✅ Created /music directory')

        # Find all .mp3 files
        mp3_files = sorted([
            f.name for f in music_dir.iterdir()
            if f.is_file() and f.suffix.lower() == '.mp3'
        ])

        if not mp3_files:
            print('⚠️  No .mp3 files found in /music directory')
            print('   Please add your music files to the /music folder')
        else:
            # Write manifest.json
            with manifest_path.open('w', encoding='utf-8') as f:
                json.dump(mp3_files, f, indent=2, ensure_ascii=False)

            print('✅ Generated manifest.json successfully!')
            print(f'   Found {len(mp3_files)} music file(s):')
            for i, file in enumerate(mp3_files, 1):
                print(f'   {i}. {file}')

    except Exception as e:
        print(f'❌ Error generating manifest: {e}')
        exit(1)

if __name__ == '__main__':
    main()
