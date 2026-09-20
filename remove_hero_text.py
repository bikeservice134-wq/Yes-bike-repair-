import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

pattern = r'<h1 className="text-\[42px\].*?</h1>\s*<div className="flex flex-col items-center lg:items-start.*?</div>\s*</FadeIn>\s*</div>'

content = re.sub(pattern, '', content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

