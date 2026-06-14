const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Services.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// replace icons
content = content.replace('Code, Camera, Video,', 'Database, Mail, Target,');

// Service 1
content = content.replace('<Code className="w-6 h-6" />', '<Database className="w-6 h-6" />');
content = content.replace('{language === "EN" ? "Website Creation" : "Création de Site Web"}', '{t("nav.serviceWeb")}');
content = content.replace('onClick={() => handlePurchase(language === "EN" ? "Website Creation" : "Création de Site Web", "web")}', 'onClick={() => handlePurchase(t("nav.serviceWeb"), "web")}');

// Service 2
content = content.replace('<Camera className="w-6 h-6" />', '<Mail className="w-6 h-6" />');
content = content.replace('{language === "EN" ? "AI Photo Shooting" : "Séance Photo IA"}', '{t("nav.servicePhoto")}');
content = content.replace('onClick={() => handlePurchase(language === "EN" ? "AI Photo Shooting" : "Séance Photo IA", "photo", language === "EN" ? "Pack of 45 AI HD Photos" : "Pack de 45 Photos IA HD")}', 'onClick={() => handlePurchase(t("nav.servicePhoto"), "photo")}');

// Service 3
content = content.replace('<Video className="w-6 h-6" />', '<Target className="w-6 h-6" />');
content = content.replace('{language === "EN" ? "Video Production" : "Production Vidéo"}', '{t("nav.serviceVideo")}');
content = content.replace('{language === "EN" ? "Select Video Batch Volume" : "Sélectionner le volume d\'envoi"}', '{language === "EN" ? "Select Batch Volume" : "Sélectionner le volume"}');
content = content.replace('onClick={() => handlePurchase(language === "EN" ? "Video Production" : "Production Vidéo", "video", language === "EN" ? `Batch of ${videoVolume} Video Ad${videoVolume > 1 ? \'s\' : \'\'}` : `Lot de ${videoVolume} Vidéo${videoVolume > 1 ? \'s\' : \'\'} Pub`)}', 'onClick={() => handlePurchase(t("nav.serviceVideo"), "video")}');

// also replace translation keys inside Services if necessary but languageContext is better handled

fs.writeFileSync(filePath, content, 'utf8');
console.log('Services page strings replaced successfully');
