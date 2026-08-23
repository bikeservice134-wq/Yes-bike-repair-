const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace standard useState for isDark with lazy initialization + useEffect
const oldState = 'const [isDark, setIsDark] = useState(false);';
const newState = `const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  React.useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);`;

content = content.replace(oldState, newState);
fs.writeFileSync('src/App.tsx', content);
