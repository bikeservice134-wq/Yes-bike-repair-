import re
with open('src/App.tsx', 'r') as f:
    content = f.read()

content = content.replace('animate-[shimmer_3s_infinite]', 'animate-shimmer')
with open('src/App.tsx', 'w') as f:
    f.write(content)
