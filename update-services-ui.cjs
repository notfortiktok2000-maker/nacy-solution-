const fs = require('fs');
const path = require('path');

const servicesFile = path.join(__dirname, 'src', 'pages', 'Services.tsx');
let content = fs.readFileSync(servicesFile, 'utf8');

// Offer 1
content = content.replace(
  '<div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between">\n                <div>\n                  <span className="block text-[10px] text-[#86868B] uppercase tracking-wider font-semibold">{t("services.startingFrom")}</span>\n                  <span className="text-xl font-bold text-[#F5F5F7]">{getPrice("web")}</span>\n                </div>\n                <button\n                  type="button"\n                  onClick={() => handlePurchase(t("nav.serviceWeb"), "web")}\n                  className="btn-primary"\n                >\n                  <span>{t("services.orderNow")}</span>\n                  <ArrowRight className="w-4 h-4" />\n                </button>\n              </div>',
  '<div className="pt-8 border-t border-white/10 mt-8">\n                <button\n                  type="button"\n                  onClick={() => handlePurchase(t("nav.serviceWeb"), "web")}\n                  className="btn-primary w-full flex items-center justify-center gap-2"\n                >\n                  <span>{t("services.orderNow")}</span>\n                  <ArrowRight className="w-4 h-4" />\n                </button>\n              </div>'
);

// Offer 2
content = content.replace(
  '<div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between">\n                <div>\n                  <span className="block text-[10px] text-[#86868B] uppercase tracking-wider font-semibold">{t("services.totalPackage")}</span>\n                  <span className="text-xl font-bold text-[#F5F5F7]">{getPrice("photo")}</span>\n                </div>\n                <button\n                  type="button"\n                  onClick={() => handlePurchase(t("nav.servicePhoto"), "photo")}\n                  className="btn-primary"\n                >\n                  <span>{t("services.bookShoot")}</span>\n                  <ArrowRight className="w-4 h-4" />\n                </button>\n              </div>',
  '<div className="pt-8 border-t border-white/10 mt-8">\n                <button\n                  type="button"\n                  onClick={() => handlePurchase(t("nav.servicePhoto"), "photo")}\n                  className="btn-primary w-full flex items-center justify-center gap-2"\n                >\n                  <span>{t("services.orderNow")}</span>\n                  <ArrowRight className="w-4 h-4" />\n                </button>\n              </div>'
);

// Offer 3
content = content.replace(
  '<div className="pt-8 border-t border-white/10 mt-8 flex items-center justify-between">\n                <div>\n                  <span className="block text-[10px] text-[#86868B] uppercase tracking-wider font-semibold">{t("services.totalCost")}</span>\n                  <span className="text-xl font-bold text-[#F5F5F7]">{getPrice("video")}</span>\n                </div>\n                <button\n                  type="button"\n                  onClick={() => handlePurchase(t("nav.serviceVideo"), "video")}\n                  className="btn-primary"\n                >\n                  <span>{t("services.orderNow")}</span>\n                  <ArrowRight className="w-4 h-4" />\n                </button>\n              </div>',
  '<div className="pt-8 border-t border-white/10 mt-8">\n                <button\n                  type="button"\n                  onClick={() => handlePurchase(t("nav.serviceVideo"), "video")}\n                  className="btn-primary w-full flex items-center justify-center gap-2"\n                >\n                  <span>{t("services.orderNow")}</span>\n                  <ArrowRight className="w-4 h-4" />\n                </button>\n              </div>'
);

content = content.replace(/  const getPrice = \(type: "web" \| "photo" \| "video"\) => \{[\s\S]*?  \};\n\n/, '');

fs.writeFileSync(servicesFile, content, 'utf8');
console.log('Services updated successfully');
