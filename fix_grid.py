import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# I missed closing the main grid container!
pattern = r'(<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">.*?<button onClick=\{.*?setIsTechnicalDetailsOpen\(true\); \}\}.*?View Technical Details\s*</button>\s*</div>\s*</div>)'

# I need to append </div> to the replacement
content = re.sub(pattern, r'\1\n          </div>', content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

