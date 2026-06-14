const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Services.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove price calculations and currency logic
content = content.replace(/  const \[currency, setCurrency\] = useState<CurrencyType>\("MAD"\);\n\n/, '');
content = content.replace(/  const getVideoSavings = \(\) => \{\n    return "";\n  \};\n\n/, '');

// Fix product checkout structure (no price needed anymore since user says "no price")
// but we keep price as 0 so typescript doesn't complain
let checkoutPayloadStr = `
  const handlePurchase = (serviceName: string, amountId: "web" | "photo" | "video", detailAddition?: string) => {
    const payload: CheckoutProduct = {
      id: amountId,
      name: serviceName,
      price: 0,
      currency: "MAD",
      tierName: serviceName,
      details: detailAddition || "Premium Content"
    };

    sessionStorage.setItem("nacy_selected_product", JSON.stringify(payload));
    navigate("/checkout");
  };
`;

const handlePurchaseRegex = /  const handlePurchase = \([\s\S]*?navigate\("\/checkout"\);\n  \};\n/m;
content = content.replace(handlePurchaseRegex, checkoutPayloadStr.trim() + "\n");

// Replace the currency toggle buttons UI
const toggleRegex = /          <div className="flex justify-center pt-2">[\s\S]*?<\/div>\n          <\/div>\n/m;
content = content.replace(toggleRegex, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Removed currency and pricing logic from Services');
