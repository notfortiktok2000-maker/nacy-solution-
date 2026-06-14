const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'context', 'LanguageContext.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update English
content = content.replace('"services.orderNow": "Order Now",', '"services.orderNow": "Book a Call",');
content = content.replace('"services.bookShoot": "Book Shoot",', '"services.bookShoot": "Book a Call",');
content = content.replace('"services.orderVideos": "Order Videos",', '"services.orderVideos": "Book a Call",');

// Update French
content = content.replace('"services.orderNow": "Commander",', '"services.orderNow": "Réserver un Appel",');
content = content.replace('"services.bookShoot": "Réserver le Shoot",', '"services.bookShoot": "Réserver un Appel",');
content = content.replace('"services.orderVideos": "Commander les Vidéos",', '"services.orderVideos": "Réserver un Appel",');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Language context updated for order buttons');
