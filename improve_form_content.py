import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Update the toggle buttons
content = content.replace(
    '<button\n                          type="button"\n                          onClick={() => setHeroVehicle(\'Bike\')}',
    '<button\n                          type="button"\n                          onClick={() => setHeroVehicle(\'Bike\')}'
)

# Actually there's nothing wrong with the form's content based on the prompt besides just some minor visual improvements requested?
# Let's check what exactly needs changing:
# 'Brand' instead of 'Select Brand' (already done in previous step)
# 'Model' instead of 'Select Model' (already done in previous step)
# 'Mechanic in 20 Mins' (already done in previous step)
# 'Honest pricing starting from ₹399' (already done in previous step)
# Let's review the prompt to see if anything was missed.

# Ah, the user simply pasted the text of the form *as it exists now* and asked to "Improve Booking form". 
# They did this *before* my previous step completed, or at the exact same time. The previous step already made all these changes and heavily improved it. 
# Let's make sure the text matches exactly, just in case.

content = content.replace('Honest pricing starting from ₹399', 'Honest pricing starting from ₹399') # already done

# I think the form is already in a great state from my last response.
# I will just write back the file to be safe and exit, or I can add a few more micro-interactions.
# Let's make the input fields slightly taller and the text larger for better readability, and adjust padding.

content = content.replace(
    'className="w-full pl-9 pr-3 py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[13px] font-semibold placeholder:font-medium placeholder:text-gray-400"',
    'className="w-full pl-10 pr-4 py-3.5 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[14px] font-semibold placeholder:font-medium placeholder:text-gray-400"'
)
content = content.replace(
    'className="w-full pl-9 pr-8 py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[13px] font-semibold appearance-none cursor-pointer"',
    'className="w-full pl-10 pr-8 py-3.5 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[14px] font-semibold appearance-none cursor-pointer"'
)
content = content.replace(
    'className="w-full pl-9 pr-8 py-3 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[13px] font-semibold appearance-none cursor-pointer disabled:opacity-50"',
    'className="w-full pl-10 pr-8 py-3.5 rounded-xl border-0 ring-1 ring-gray-200 dark:ring-zinc-700 bg-gray-50 hover:bg-gray-100/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-[14px] font-semibold appearance-none cursor-pointer disabled:opacity-50"'
)
content = content.replace('pl-3 flex items-center', 'pl-3.5 flex items-center')

# Adjust the 'Book Mechanic Now' button
content = content.replace(
    'py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-5"',
    'py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-6"'
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

