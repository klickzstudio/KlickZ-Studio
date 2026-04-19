import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { basename } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });

if (!process.env.SANITY_API_WRITE_TOKEN) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-03',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const isDryRun = process.argv.includes('--dry-run');
const ASSETS_DIR = "c:\\Users\\AinZ\\Documents\\Clients_Projects\\Mysticstudios\\Photo_Compressed_resized";

const categoryMapping = {
  'BabyShower': { title: 'Baby Shower Photography', slug: 'baby-shower', type: 'Baby Shower', desc: 'Joyful Baby Shower Photography in Chennai – Candid Family Moments' },
  'Birthday': { title: 'Birthday Photography', slug: 'birthday', type: 'Birthday Celebration', desc: 'Vibrant Birthday Celebration Photography Chennai – Candid Party Moments' },
  'BridePortrait': { title: 'Bride Portrait', slug: 'bride-portrait', type: 'Bridal Portrait', desc: 'Luxury Bridal Portrait Photography Chennai – Traditional Bride' },
  'ChristenWedding': { title: 'Christian Wedding', slug: 'christian-wedding', type: 'Christian Wedding', desc: 'Beautiful Christian Wedding Ceremony Photography in Chennai' },
  'GroomPortrait': { title: 'Groom Portrait', slug: 'groom-portrait', type: 'Groom Portrait', desc: 'Classic Groom Portrait Photography Chennai – Professional Photoshoot' },
  'OutDoor': { title: 'Outdoor Photography', slug: 'outdoor', type: 'Outdoor Couple Shoot', desc: 'Memorable Pre-Wedding Outdoor Shoot in Chennai – Couple Photography' },
  'Reception': { title: 'Wedding Reception', slug: 'reception', type: 'Wedding Reception', desc: 'Wedding Reception Couple Photoshoot in Chennai – Extravaganza' },
  'Stilloute': { title: 'Silhouette Photography', slug: 'silhouette', type: 'Silhouette Photography', desc: 'Artistic Silhouette Photography Chennai – Couple Portraits' },
  'Wedding': { title: 'Wedding Photography', slug: 'wedding', type: 'Wedding Photography', desc: 'Best Candid Wedding Photography in Chennai – Wedding Celebration' },
};

async function wipeMockData() {
  console.log("🗑️ Wiping existing photographyImage and photographyCategory documents (Unsplash)...");
  if (isDryRun) {
    console.log("[DRY RUN] Would delete all existing photographyImage and photographyCategory docs.");
    return;
  }
  
  const images = await client.fetch(`*[_type == "photographyImage"]{_id}`);
  for (const img of images) {
    await client.delete(img._id);
    console.log(`Deleted image doc: ${img._id}`);
  }
  
  const categories = await client.fetch(`*[_type == "photographyCategory"]{_id}`);
  for (const cat of categories) {
    await client.delete(cat._id);
    console.log(`Deleted category doc: ${cat._id}`);
  }
  console.log("✅ Sanity data wiped successfully.");
}

async function uploadImages() {
  const folders = fs.readdirSync(ASSETS_DIR).filter(file => {
    return fs.statSync(path.join(ASSETS_DIR, file)).isDirectory() && categoryMapping[file];
  });

  for (const folder of folders) {
    console.log(`\n📂 Processing category: ${folder}`);
    const catData = categoryMapping[folder];
    
    let catId = `category-${catData.slug}`;
    
    if (!isDryRun) {
      await client.createIfNotExists({
        _id: catId,
        _type: 'photographyCategory',
        title: catData.title,
        slug: { _type: 'slug', current: catData.slug },
        description: `${catData.desc} by Klickzstudio`,
      });
      console.log(`Created/Verified Category: ${catData.title}`);
    } else {
      console.log(`[DRY RUN] Would create/verify Category: ${catData.title} (${catId})`);
    }

    const folderPath = path.join(ASSETS_DIR, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.JPG') || f.endsWith('.jpeg'));

    let count = 1;
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const originalExt = path.extname(file);
      const customFilename = `${catData.slug}-klickzstudio-chennai-${count}${originalExt}`;
      const altText = `${catData.desc} by Klickz Studio ${count}`;
      
      console.log(`  📸 Uploading: ${file}`);
      console.log(`     -> Expected SEO Filename: ${customFilename}`);
      console.log(`     -> Expected Alt Text: ${altText}`);

      if (!isDryRun) {
        try {
          const existingImage = await client.fetch(`*[_type == "photographyImage" && title == $title][0]`, { title: altText });
          if (existingImage) {
            console.log(`     ⏭️ Already exists, skipping: ${altText}`);
          } else {
            const fileStream = fs.createReadStream(filePath);
            const asset = await client.assets.upload('image', fileStream, {
              filename: customFilename,
            });
            await client.create({
              _type: 'photographyImage',
              image: {
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id },
                alt: altText,
              },
              title: altText,
              category: { _type: 'reference', _ref: catId },
              clientHandle: "Klickzstudio",
            });
            console.log(`     ✅ Uploaded and linked successfully!`);
          }
        } catch (err) {
          console.error(`     ❌ Error uploading ${file}: ${err.message}`);
        }
      }
      count++;
    }
  }
}

async function run() {
  try {
    console.log(`🚀 Starting Sanity Upload Pipeline (DRY RUN: ${isDryRun})\n`);
    // await wipeMockData();
    await uploadImages();
    console.log(`\n🎉 Pipeline completed successfully!`);
  } catch (error) {
    console.error("❌ Pipeline failed:", error);
  }
}

run();
