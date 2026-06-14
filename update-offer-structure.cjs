const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'context', 'LanguageContext.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update English
content = content.replace('"nav.serviceWeb": "Lead Generation",', '"nav.serviceWeb": "Full Lead Generation",');
content = content.replace('"nav.servicePhoto": "Lead Gen + Landing Page",', '"nav.servicePhoto": "Website Creation",');
content = content.replace('"nav.serviceVideo": "Lead Gen + Landing Page + Content",', '"nav.serviceVideo": "AI Content Packs",');

content = content.replace(/"services\.webDesc": ".*?",/, '"services.webDesc": "A complete lead generation engine. Includes full website creation, AI-generated content, outbound systems, and automated meeting bookings tailored to your business.",');
content = content.replace(/"services\.s01": ".*?",/, '"services.s01": "FULL PIPELINE",');
content = content.replace(/"services\.webF1": ".*?",/, '"services.webF1": "Custom Website Creation",');
content = content.replace(/"services\.webF2": ".*?",/, '"services.webF2": "Content & Assets Included",');
content = content.replace(/"services\.webF3": ".*?",/, '"services.webF3": "Automated Cold Outreach",');

content = content.replace(/"services\.photoDesc": ".*?",/, '"services.photoDesc": "Transform your online presence with a custom, high-converting website. Built for speed, optimized for sales, and designed to match your brand identity perfectly.",');
content = content.replace(/"services\.s02": ".*?",/, '"services.s02": "WEB DESIGN",');
content = content.replace(/"services\.photoF1": ".*?",/, '"services.photoF1": "Custom High-Conversion Design",');
content = content.replace(/"services\.photoF2": ".*?",/, '"services.photoF2": "Mobile & SEO Optimized",');
content = content.replace(/"services\.photoF3": ".*?",/, '"services.photoF3": "Fast & Secure Architecture",');

content = content.replace(/"services\.videoDesc": ".*?",/, '"services.videoDesc": "Tailored content for your business. Choose video packs with sliding-scale pricing (more videos = lower cost) or custom static ad packages for organic and paid growth.",');
content = content.replace(/"services\.s03": ".*?",/, '"services.s03": "ADS & CONTENT",');
content = content.replace(/"services\.videoF1": ".*?",/, '"services.videoF1": "Volume Video Packs (Scale & Save)",');
content = content.replace(/"services\.videoF2": ".*?",/, '"services.videoF2": "Personalized Static Ads",');
content = content.replace(/"services\.videoF3": ".*?",/, '"services.videoF3": "UGC & Organic Styles",');

content = content.replace('"marquee.website": "Lead Generation",', '"marquee.website": "Lead Gen Infrastructure",');
content = content.replace('"marquee.photo": "Lead Gen + Landing Page",', '"marquee.photo": "Website Creation",');
content = content.replace('"marquee.video": "Lead Gen + Landing Page + Content",', '"marquee.video": "AI Content Packs",');


// Update French
content = content.replace('"nav.serviceWeb": "Génération de Leads",', '"nav.serviceWeb": "Génération de Leads Complète",');
content = content.replace('"nav.servicePhoto": "Lead Gen + Landing Page",', '"nav.servicePhoto": "Création de Site Web",');
content = content.replace('"nav.serviceVideo": "Lead Gen + Landing Page + Contenu",', '"nav.serviceVideo": "Packs de Contenu IA",');

content = content.replace(/"services\.webDesc": ".*?",/g, '"services.webDesc": "Un moteur complet de génération de leads. Inclut la création du site web, du contenu IA, des systèmes sortants et des rendez-vous automatisés sur mesure.",');

content = content.replace(/"services\.photoDesc": ".*?",/g, '"services.photoDesc": "Transformez votre présence en ligne avec un site sur mesure à fort taux de conversion. Conçu pour la vitesse, optimisé pour les ventes.",');

content = content.replace(/"services\.videoDesc": ".*?",/g, '"services.videoDesc": "Contenu sur mesure. Choisissez des packs vidéo à prix dégressif (plus vous commandez, moins c\'est cher) ou des packs de publicités statiques personnalisés.",');

let frS01Regex = /"services\.s01": ".*?",/g;
let c = 0;
content = content.replace(frS01Regex, (match) => {
    c++;
    if(c === 2) return '"services.s01": "PIPELINE COMPLET",';
    return match;
});

let frS02Regex = /"services\.s02": ".*?",/g;
c = 0;
content = content.replace(frS02Regex, (match) => {
    c++;
    if(c === 2) return '"services.s02": "WEB DESIGN",';
    return match;
});

let frS03Regex = /"services\.s03": ".*?",/g;
c = 0;
content = content.replace(frS03Regex, (match) => {
    c++;
    if(c === 2) return '"services.s03": "PUBS & CONTENU",';
    return match;
});


let frWF1 = /"services\.webF1": ".*?",/g; c=0;
content = content.replace(frWF1, m => { c++; return c===2 ? '"services.webF1": "Création de Site Web Inclus",':m; });

let frWF2 = /"services\.webF2": ".*?",/g; c=0;
content = content.replace(frWF2, m => { c++; return c===2 ? '"services.webF2": "Contenus & Médias IA",':m; });

let frWF3 = /"services\.webF3": ".*?",/g; c=0;
content = content.replace(frWF3, m => { c++; return c===2 ? '"services.webF3": "Emailing Cold Outreach Automatisé",':m; });


let frPF1 = /"services\.photoF1": ".*?",/g; c=0;
content = content.replace(frPF1, m => { c++; return c===2 ? '"services.photoF1": "Design Haute Conversion",':m; });

let frPF2 = /"services\.photoF2": ".*?",/g; c=0;
content = content.replace(frPF2, m => { c++; return c===2 ? '"services.photoF2": "Optimisation Mobile & SEO",':m; });

let frPF3 = /"services\.photoF3": ".*?",/g; c=0;
content = content.replace(frPF3, m => { c++; return c===2 ? '"services.photoF3": "Architecture Rapide & Sécurisée",':m; });


let frVF1 = /"services\.videoF1": ".*?",/g; c=0;
content = content.replace(frVF1, m => { c++; return c===2 ? '"services.videoF1": "Packs Vidéo au Volume (Prix dégressif)",':m; });

let frVF2 = /"services\.videoF2": ".*?",/g; c=0;
content = content.replace(frVF2, m => { c++; return c===2 ? '"services.videoF2": "Publicités Statiques Personnalisées",':m; });

let frVF3 = /"services\.videoF3": ".*?",/g; c=0;
content = content.replace(frVF3, m => { c++; return c===2 ? '"services.videoF3": "Formats UGC et Organiques",':m; });

content = content.replace('"marquee.website": "Génération de Leads B2B",', '"marquee.website": "Génération de Leads",');
content = content.replace('"marquee.photo": "Automatisation d\'Emails Outbound",', '"marquee.photo": "Création de Site Web",');
content = content.replace('"marquee.video": "Prospection LinkedIn",', '"marquee.video": "Packs Anti-Pub/UGC",');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Language context updated for new offer structure');
