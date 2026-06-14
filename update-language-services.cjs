const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'context', 'LanguageContext.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// English replacements
content = content.replace('"services.metaTitle": "Services | NACY ST — Premium Digital Solutions"', '"services.metaTitle": "Services | NACY ST — B2B Lead Generation & Outreach"');
content = content.replace('"services.metaDesc": "Explore our primary high-conversion services: custom website engineering, professional AI photo shooting, and attention-grabbing product video editing in Tangier."', '"services.metaDesc": "Explore our B2B outbound services: automated cold email infrastructure, LinkedIn data scraping, and qualified lead generation engines."');
content = content.replace('"services.heading": "High-performance digital assets built for conversion."', '"services.heading": "High-performance B2B prospecting engines built for sales."');
content = content.replace('"services.sub": "We merge professional software engineering with deep algorithmic creativity. No sluggish templates, no bloated processes. Only refined high-tier deliverables."', '"services.sub": "We merge data enrichment engineering with multi-channel outreach strategies. No manual busywork, no cold-calling. Only qualified meetings booked on your calendar."');

content = content.replace('"services.webDesc": "Hand-coded, optimized websites designed to win on Google. Lightning-fast response times, bespoke graphics, and clean design patterns tailored specifically to your conversion funnel."', '"services.webDesc": "Automated B2B lead generation infrastructure. We scrape high-intent data, enrich it, and craft tailored cold outreach campaigns to book meetings directly on your calendar."');
content = content.replace('"services.webF1": "Custom bespoke design, strictly zero templates"', '"services.webF1": "Data scraping & enrichment from ZoomInfo/Apollo"');
content = content.replace('"services.webF2": "Comprehensive SEO integration & semantic tags"', '"services.webF2": "Multi-channel sequences (Email + LinkedIn)"');
content = content.replace('"services.webF3": "Fluid ultra-responsive framework performance"', '"services.webF3": "Advanced deliverability & inbox warming"');
content = content.replace('"services.webF4": "30 days of complimentary engineering updates"', '"services.webF4": "Direct calendar bookings & CRM routing"');

content = content.replace('"services.photoDesc": "Studio-grade high definition commercial product pictures at a fraction of standard cost. We use deep stable model layers to engineer professional lighting, perfect models, and customized global scenery."', '"services.photoDesc": "Robust outbound cold email infrastructure at scale. We setup secondary domains, warm up IP addresses, and manage sending volumes without risking your main domain reputation."');
content = content.replace('"services.photoF1": "Complete package of 45 high definition visuals"', '"services.photoF1": "Setup of 5 secondary sending domains"');
content = content.replace('"services.photoF2": "Fully localized ambient light & backdrops"', '"services.photoF2": "Automated IP and domain warming"');
content = content.replace('"services.photoF3": "Stable, ultra-realistic model generation"', '"services.photoF3": "Spam-trap avoidance & DMARC/SPF/DKIM"');
content = content.replace('"services.photoF4": "Complete global commercial usage license"', '"services.photoF4": "A/B testing of copy and subject lines"');

content = content.replace('"services.videoDesc": "Aggressive thumb-stopping video edits carefully scripted and cut for Reels, TikTok, and YouTube Shorts. Built on psychological engagement hooks to keep users locked in from state zero."', '"services.videoDesc": "Targeted LinkedIn prospecting using automation tools. We bypass connection limits, craft personalized DMs, and extract verified corporate emails directly from LinkedIn profiles."');
content = content.replace('"services.videoF1": "Vertical optimized TikTok/Reels framework"', '"services.videoF1": "Automated connection requests at scale"');
content = content.replace('"services.videoF2": "Highly dynamic pace, text motion & audio synthesis"', '"services.videoF2": "Personalized DM follow-up sequences"');
content = content.replace('"services.videoF3": "Professional organic voiceovers optional"', '"services.videoF3": "Email extraction from target profiles"');

// French replacements
content = content.replace('"services.metaTitle": "Services | NACY ST — Solutions Digitales Premium"', '"services.metaTitle": "Services | NACY ST — Génération de Leads & Prospection B2B"');
content = content.replace('"services.metaDesc": "Découvrez nos offres à haute conversion : ingénierie de site web sur mesure, shooting photo IA de studio et montages vidéo accrocheurs de produits à Tanger."', '"services.metaDesc": "Découvrez nos services B2B outbound : infrastructure cold email automatisée, scraping LinkedIn, et moteurs de génération de leads qualifiés."');
content = content.replace('"services.heading": "Des atouts numériques haute performance conçus pour la conversion."', '"services.heading": "Moteurs de prospection B2B ultra-performants conçus pour la vente."');
content = content.replace('"services.sub": "Nous fusionnons l\'ingénierie logicielle professionnelle avec une créativité algorithmique profonde. Pas de modèles lents, pas de processus lourds. Uniquement des livrables de premier ordre."', '"services.sub": "Nous fusionnons l\'ingénierie d\'enrichissement de données avec des stratégies de prospection multicanales. Pas de travail manuel, pas de cold-calling. Uniquement des rendez-vous qualifiés générés."');

content = content.replace('"services.webDesc": "Des sites web codés à la main et optimisés pour s\'imposer sur Google. Temps de réponse ultra-rapides, graphismes sur mesure et design épuré adaptés à votre entonnoir de conversion."', '"services.webDesc": "Infrastructure de génération de leads B2B automatisée. Nous scrapons les données, les enrichissons et créons des campagnes sur mesure pour générer des rendez-vous."');
content = content.replace('"services.webF1": "Conception unique sur mesure, strictement sans modèles"', '"services.webF1": "Scraping & enrichissement via ZoomInfo/Apollo"');
content = content.replace('"services.webF2": "Intégration d\'un SEO global & balises sémantiques"', '"services.webF2": "Séquences multicanales (E-mail + LinkedIn)"');
content = content.replace('"services.webF3": "Performances de framework fluides et ultra-réactives"', '"services.webF3": "Délivrabilité avancée & chauffe d\'inbox"');
content = content.replace('"services.webF4": "30 jours de mises à jour techniques de courtoisie"', '"services.webF4": "Réservation directe & synchronisation CRM"');

content = content.replace('"services.photoDesc": "Photos de produits de qualité studio HD à une fraction du coût habituel. Nous exploitons des technologies IA avancées pour créer des éclairages de studio, des modèles parfaits et des décors sur mesure."', '"services.photoDesc": "Infrastructure robuste de cold email à grande échelle. Nous configurons des domaines secondaires et gérons les volumes d\'envoi sans risquer votre réputation."');
content = content.replace('"services.photoF1": "Package complet de 45 photos haute définition"', '"services.photoF1": "Configuration de 5 domaines d\'envoi secondaires"');
content = content.replace('"services.photoF2": "Éclairage d\'ambiance et arrière-plans localisés"', '"services.photoF2": "Chauffe automatisée des IP et domaines"');
content = content.replace('"services.photoF3": "Génération de mannequins stables et ultra-réalistes"', '"services.photoF3": "Évitement des spam-traps & DMARC/SPF/DKIM"');
content = content.replace('"services.photoF4": "Licence complète d\'utilisation commerciale mondiale"', '"services.photoF4": "Tests A/B des objets et contenus"');

content = content.replace('"services.videoDesc": "Montages vidéo engageants spécialement écrits et coupés pour vos Reels, TikTok et YouTube Shorts. Conçus sur des leviers psychologiques forts pour capter l\'attention dès la première seconde."', '"services.videoDesc": "Prospection LinkedIn ciblée avec des outils d\'automatisation. Nous concevons des messages personnalisés et extrayons les e-mails directement depuis les profils."');
content = content.replace('"services.videoF1": "Format vertical optimisé pour TikTok et Reels"', '"services.videoF1": "Demandes de connexion automatisées ciblées"');
content = content.replace('"services.videoF2": "Rythme très dynamique, textes animés & synthèse sonore"', '"services.videoF2": "Séquences de messages de suivi (DM) personnalisées"');
content = content.replace('"services.videoF3": "Voix off organiques professionnelles en option"', '"services.videoF3": "Extraction d\'e-mails à partir des profils B2B"');


fs.writeFileSync(filePath, content, 'utf8');
console.log('Language context strings replaced successfully');
