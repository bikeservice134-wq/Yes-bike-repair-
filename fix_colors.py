import sys

with open('src/App.tsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '{/* HOW IT WORKS */}' in line:
        start_idx = i
        break

for i in range(start_idx, start_idx + 40):
    if 'bg-white dark:bg-[#1d1d1d]' in lines[i] and 'border-t' in lines[i]:
        lines[i] = lines[i].replace('bg-white dark:bg-[#1d1d1d]', 'bg-gray-50 dark:bg-[#101010]')
    
    if 'ring-8 ring-white' in lines[i]:
        lines[i] = lines[i].replace('ring-8 ring-white dark:ring-[#1d1d1d]', 'ring-8 ring-gray-50 dark:ring-[#101010]')
        
    if 'bg-gray-50 dark:bg-[#101010] p-6' in lines[i]:
        lines[i] = lines[i].replace('bg-gray-50 dark:bg-[#101010]', 'bg-white dark:bg-[#1d1d1d]')

with open('src/App.tsx', 'w') as f:
    f.writelines(lines)
