const fs = require('fs');
const path = require('path');

const checkoutPath = path.join(__dirname, 'src', 'pages', 'Checkout.tsx');
let content = fs.readFileSync(checkoutPath, 'utf8');

// Fix translations by replacing incorrect keys
content = content.replace(/t\("checkout\.summaryBadge"\)/g, 't("checkout.orderSummary")');
content = content.replace(/t\("checkout\.packDetails"\)/g, 't("checkout.pkgDetails")');
content = content.replace(/t\("checkout\.billingDetails"\)/g, 't("checkout.billingHeading")');
content = content.replace(/t\("contact\.formFirstName"\)/g, 't("checkout.firstNameLabel")');
content = content.replace(/t\("contact\.formLastName"\)/g, 't("checkout.lastNameLabel")');
content = content.replace(/t\("checkout\.phoneLabel"\)/g, 't("checkout.waPhoneLabel")');
content = content.replace(/t\("checkout\.addressLabel"\)/g, 't("checkout.billingAddrLabel")');

// Replace Button Text
content = content.replace(/t\("checkout\.submitting"\)/g, 'language === "EN" ? "Submitting..." : "En cours..."');
content = content.replace(/t\("checkout\.submitBtn"\)/g, 'language === "EN" ? "Submit" : "Soumettre"');

// Fix WhatsApp Redirect and Payload 
content = content.replace(/const waMessage = \n[^\;]+\;/m, `const waMessage = 
      \`New Order — NACY ST%0A\` +
      \`Client: *\${formData.prenom} \${formData.nom}*%0A\` +
      \`Product ordered: *\${product.name}*%0A\` +
      \`WhatsApp: \${formData.tel}%0A\` +
      \`City: \${formData.ville} - Address: \${formData.adresse}%0A\` +
      \`Date: \${today}\`;`);

content = content.replace(/setTimeout\(\(\) => \{[\s\S]*?\}, 1200\);/m, `// Open WA contact number thread in same tab (fixes popup blocker issues on mobile)
    window.location.href = \`https://wa.me/212710900502?text=\${waMessage}\`;
    
    // Clear session so they don't double buy
    sessionStorage.removeItem("nacy_selected_product");
    setIsSubmitting(false);`);

// Validation without cp
content = content.replace(/!formData\.cp/, 'false');

// Remove cp from formData
content = content.replace(/ville: "",\s+cp: ""/, 'ville: ""');

// Removing Pricing elements from the UI
content = content.replace(/\{\/\* Service pricing items table layout \*\/\}[\s\S]*?<div className="bg-\[#0A0A0A\]\/40 border border-white\/10 p-4 rounded-xl text-center">/m, `<div className="bg-[#0A0A0A]/40 border border-white/10 p-4 rounded-xl text-center mt-6">`);

// Remove "Postal Code" div
let zipRegex = /<div[^>]*>\s*<label[^>]*>\{t\("checkout\.postalLabel"\)\}[^<]*<\/label>\s*<input[^>]*name="cp"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
content = content.replace(zipRegex, '</div>');

// Ensure grid-cols-2 becomes grid-cols-1 for ville to fill space
// The previous div had <div className="grid grid-cols-2 gap-4"> for ville & cp. We need to replace that.
content = content.replace(/<div className="grid grid-cols-2 gap-4">\s*<div>\s*<label className="block text-\[11px\] font-semibold text-\[#A1A1A6\] uppercase mb-1\.5 tracking-wider">\{t\("checkout\.cityLabel"\)} \*/, `<div className="grid grid-cols-1 gap-4">\n                  <div>\n                    <label className="block text-[11px] font-semibold text-[#A1A1A6] uppercase mb-1.5 tracking-wider">{t("checkout.cityLabel")} *`);

fs.writeFileSync(checkoutPath, content, 'utf8');
console.log('Checkout fixed');
