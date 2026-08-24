const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const importStatement = `import { 
  Wrench, 
  Settings, 
  Bike, 
  Zap, 
  CheckCircle2, 
  Home, 
  DollarSign, 
  ShieldCheck, 
  Phone,
  ChevronDown,
  Moon,
  Sun,
  X,
  Mail
} from 'lucide-react';`;

const newImportStatement = `import { 
  Wrench, 
  Settings, 
  Bike, 
  Zap, 
  CheckCircle2, 
  Home, 
  DollarSign, 
  ShieldCheck, 
  Phone,
  ChevronDown,
  Moon,
  Sun,
  X,
  Mail,
  Calendar,
  Truck,
  Battery,
  Droplet,
  Car,
  SprayCan
} from 'lucide-react';`;

content = content.replace(importStatement, newImportStatement);
fs.writeFileSync('src/App.tsx', content);
