import fs from 'fs';
import path from 'path';

const filesToFix = [
  'src/components/home/IntroSection.tsx',
  'src/components/home/FounderSection.tsx',
  'src/app/(website)/layout.tsx',
  'src/app/(website)/best-wedding-photographers-in-chennai/page.tsx',
  'src/data/hero-slides.ts',
  'src/components/home/StatsCounter.tsx'
];

const basePath = 'c:/Users/AinZ/Documents/Clients_Projects/Mysticstudios/mystic-studios-clone';

filesToFix.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('750')) {
      console.log(`Fixing ${file}...`);
      content = content.replace(/750/g, '500');
      fs.writeFileSync(fullPath, content);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});

console.log('✅ Global replacement of 750 with 500 complete.');
