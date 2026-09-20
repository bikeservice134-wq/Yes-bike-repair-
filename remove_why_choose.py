import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

pattern = r'<section className="py-20 relative bg-white dark:bg-black overflow-hidden border-t border-gray-100 dark:border-white/5">\s*<div className="max-w-7xl mx-auto px-4 relative z-10">\s*<div className="text-center mb-16">\s*<h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6">\s*Why Choose.*?</div>\s*</div>\s*</section>'

content = re.sub(pattern, '', content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

