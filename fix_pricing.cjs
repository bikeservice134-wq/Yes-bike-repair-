const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const packagesData = `
const popularPackages = [
  {
    title: "General\\nService",
    originalPrice: "₹1050",
    price: "₹599",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80"
  },
  {
    title: "General\\nService With\\nOil",
    originalPrice: "₹1550",
    price: "₹999",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1622175960965-06b208eb6758?w=800&q=80"
  },
  {
    title: "Running\\nRepair",
    originalPrice: "₹550",
    price: "₹399",
    rating: "4.6",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
  },
  {
    title: "Jump\\nStart",
    originalPrice: "₹550",
    price: "₹399",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1560935105-027f677fb6fc?w=800&q=80"
  }
];
`;

content = content.replace(packagesData, ''); // remove it from the middle
const insertPoint = content.indexOf('export default function App() {');
content = content.slice(0, insertPoint) + packagesData + '\n' + content.slice(insertPoint);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Fixed syntax');
