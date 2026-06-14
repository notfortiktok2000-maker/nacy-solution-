const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'context', 'LanguageContext.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// English replacements
content = content.replace('"nav.serviceWeb": "B2B Lead Generation",', '"nav.serviceWeb": "Lead Generation",');
content = content.replace('"nav.servicePhoto": "Outbound Email Automation",', '"nav.servicePhoto": "Lead Gen + Landing Page",');
content = content.replace('"nav.serviceVideo": "LinkedIn Prospecting",', '"nav.serviceVideo": "Lead Gen + Landing Page + Content",');

content = content.replace('"services.webDesc": "Automated B2B lead generation infrastructure. We scrape high-intent data, enrich it, and craft tailored cold outreach campaigns to book meetings directly on your calendar.",', '"services.webDesc": "Automated B2B lead generation infrastructure. We scrape high-intent data, enrich it, and craft tailored cold outreach campaigns to book meetings directly on your calendar.",');

content = content.replace('"services.photoDesc": "Robust outbound cold email infrastructure at scale. We setup secondary domains, warm up IP addresses, and manage sending volumes without risking your main domain reputation.",', '"services.photoDesc": "Combine our automated lead generation infrastructure with a highly optimized, conversion-focused landing page designed to turn prospects into booked meetings.",');

content = content.replace('"services.videoDesc": "Targeted LinkedIn prospecting using automation tools. We bypass connection limits, craft personalized DMs, and extract verified corporate emails directly from LinkedIn profiles.",', '"services.videoDesc": "The ultimate outbound engine. We provide lead generation, a custom landing page, and complete content creation including optimized sales scripts and messaging.",');

// French replacements
content = content.replace('"nav.serviceWeb": "Génération de Leads B2B",', '"nav.serviceWeb": "Génération de Leads",');
content = content.replace('"nav.servicePhoto": "Automatisation d\'Emails Outbound",', '"nav.servicePhoto": "Lead Gen + Landing Page",');
content = content.replace('"nav.serviceVideo": "Prospection LinkedIn",', '"nav.serviceVideo": "Lead Gen + Landing Page + Contenu",');

content = content.replace('"services.photoDesc": "Infrastructure robuste de cold email à grande échelle. Nous configurons des domaines secondaires et gérons les volumes d\'envoi sans risquer votre réputation.",', '"services.photoDesc": "Associez notre infrastructure de génération de leads automatisée à une page de destination hautement optimisée et axée sur la conversion pour maximiser vos prises de rendez-vous.",');

content = content.replace('"services.videoDesc": "Prospection LinkedIn ciblée avec des outils d\'automatisation. Nous concevons des messages personnalisés et extrayons les e-mails directement depuis les profils.",', '"services.videoDesc": "Le moteur de vente ultime. Nous fournissons la génération de leads, une page de destination sur mesure, ainsi que la création complète de contenu incluant scripts et argumentaires.",');

// Update marquee texts too to match
content = content.replace('"marquee.website": "B2B Lead Generation",', '"marquee.website": "Lead Generation",');
content = content.replace('"marquee.photo": "Outbound Email Automation",', '"marquee.photo": "Lead Gen + Landing Page",');
content = content.replace('"marquee.video": "LinkedIn Prospecting",', '"marquee.video": "Lead Gen + Landing Page + Content",');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done language offers');
