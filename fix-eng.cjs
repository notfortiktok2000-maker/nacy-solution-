const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'context', 'LanguageContext.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The English portion is generally before line 250 in LanguageContext
// I will just use string replacement on the first instances
content = content.replace(
  /"services\.webDesc": "Un moteur complet de génération de leads.*?sur mesure\.",/, 
  '"services.webDesc": "A complete lead generation engine. Includes full website creation, AI-generated content, outbound systems, and automated meeting bookings tailored to your business.",'
);

content = content.replace(
  /"services\.photoDesc": "Transformez votre présence en ligne.*?optimisé pour les ventes\.",/, 
  '"services.photoDesc": "Transform your online presence with a custom, high-converting website. Built for speed, optimized for sales, and designed to match your brand identity perfectly.",'
);

content = content.replace(
  /"services\.videoDesc": "Contenu sur mesure.*?statiques personnalisés\.",/, 
  '"services.videoDesc": "Tailored content for your business. Choose video packs with sliding-scale pricing (more videos = lower cost) or custom static ad packages for organic and paid growth.",'
);

// We should also ensure French features F4 and others are correct.
// In French, F4 might still be English:
// "services.webF4": "Direct calendar bookings & CRM routing" -> 
// "services.photoF4": "A/B testing of copy and subject lines" ->
content = content.replace(/'"services.photoF4": "A\/B testing of copy and subject lines",'/g, '"services.photoF4": "A/B testing des textes et objets",');
content = content.replace(/'"services.webF4": "Direct calendar bookings & CRM routing",'/g, '"services.webF4": "Prises de rendez-vous directes et CRM",');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed English descriptions');
