const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Enhance contrast: make page backgrounds pure black or #050505, and cards #121212 or #1A1A1A
  
  // App.tsx
  if (file.endsWith('App.tsx')) {
    content = content.replace(/bg-\[#0A0A0A\]/g, 'bg-black');
  }

  // Navbar
  if (file.endsWith('Navbar.tsx')) {
    content = content.replace(/bg-\[#0A0A0A\]\/80/g, 'bg-black/80');
    content = content.replace(/bg-\[#0A0A0A\]\/40/g, 'bg-black/40');
    // internal menus
    content = content.replace(/bg-black(?=[\s])/g, 'bg-[#121212]');
  }

  // Home.tsx
  if (file.endsWith('Home.tsx')) {
    content = content.replace(/bg-\[#0A0A0A\](?=\s+border-b|\s+overflow-hidden|\s+pt-36)/g, 'bg-black');
    content = content.replace(/bg-\[#121212\](?=\s+border-y)/g, 'bg-[#0A0A0A]');
    // The cards were bg-[#0A0A0A], let's make them #121212
    content = content.replace(/bg-\[#0A0A0A\](?=\s+p-8|\s+border|\s+rounded-2xl)/g, 'bg-[#121212]');
    // Borders
    content = content.replace(/border-white\/30/g, 'border-white/10');
  }

  // Services.tsx
  if (file.endsWith('Services.tsx')) {
    content = content.replace(/bg-\[#0A0A0A\](?=\s+text-\[#F5F5F7\])/g, 'bg-black');
    content = content.replace(/border-white\/30/g, 'border-white/10');
  }

  // WhyUs.tsx
  if (file.endsWith('WhyUs.tsx')) {
    content = content.replace(/bg-\[#0A0A0A\](?=\s+text-\[#F5F5F7\])/g, 'bg-black');
    // Quotes block
    content = content.replace(/bg-\[#0A0A0A\](?=\s+space-y)/g, 'bg-[#121212]');
    content = content.replace(/bg-\[#0A0A0A\](?=\s+flex\s+items-center)/g, 'bg-[#1A1A1A]');
    content = content.replace(/border-white\/30/g, 'border-white/10');
  }

  // Contact.tsx
  if (file.endsWith('Contact.tsx')) {
    content = content.replace(/bg-\[#0A0A0A\](?=\s+text-\[#F5F5F7\])/g, 'bg-black');
    content = content.replace(/bg-\[#0A0A0A\](?=\s+border\s+border-white)/g, 'bg-[#0A0A0A]');
    content = content.replace(/border-white\/30/g, 'border-white/10');
  }

  // Checkout.tsx
  if (file.endsWith('Checkout.tsx')) {
    content = content.replace(/bg-\[#0A0A0A\](?=\s+text-\[#F5F5F7\])/g, 'bg-black');
    content = content.replace(/border-white\/30/g, 'border-white/10');
  }

  // index.css
  if (file.endsWith('index.css')) {
     content = content.replace(/--bg-primary: #[0-9A-Fa-f]+;/g, '--bg-primary: #000000;');
     content = content.replace(/--color-bg-primary: #[0-9A-Fa-f]+;/g, '--color-bg-primary: #000000;');
     content = content.replace(/--bg-secondary: #[0-9A-Fa-f]+;/g, '--bg-secondary: #121212;');
     content = content.replace(/--color-bg-secondary: #[0-9A-Fa-f]+;/g, '--color-bg-secondary: #121212;');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated contrast in: ${file}`);
  }
});
