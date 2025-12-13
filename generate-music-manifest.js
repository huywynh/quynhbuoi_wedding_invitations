#!/usr/bin/env node

/**
 * Script to automatically generate music/manifest.json
 * Lists all .mp3 files in the /music directory
 *
 * Usage:
 *   node generate-music-manifest.js
 */

const fs = require('fs');
const path = require('path');

const musicDir = path.join(__dirname, 'music');
const manifestPath = path.join(musicDir, 'manifest.json');

try {
    // Check if music directory exists
    if (!fs.existsSync(musicDir)) {
        console.log('❌ Music directory not found. Creating it...');
        fs.mkdirSync(musicDir, { recursive: true });
        console.log('✅ Created /music directory');
    }

    // Read all files in music directory
    const files = fs.readdirSync(musicDir);

    // Filter only .mp3 files and exclude manifest.json
    const mp3Files = files
        .filter(file => file.toLowerCase().endsWith('.mp3'))
        .sort(); // Sort alphabetically

    if (mp3Files.length === 0) {
        console.log('⚠️  No .mp3 files found in /music directory');
        console.log('   Please add your music files to the /music folder');
    } else {
        // Write manifest.json
        fs.writeFileSync(
            manifestPath,
            JSON.stringify(mp3Files, null, 2),
            'utf8'
        );

        console.log('✅ Generated manifest.json successfully!');
        console.log(`   Found ${mp3Files.length} music file(s):`);
        mp3Files.forEach((file, index) => {
            console.log(`   ${index + 1}. ${file}`);
        });
    }

} catch (error) {
    console.error('❌ Error generating manifest:', error.message);
    process.exit(1);
}
