import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Add continuous shimmer to "Mechanic in 20 Mins"
content = content.replace(
    '<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"></div>',
    '<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite] ease-in-out"></div>'
)

# 2. Animate the form's background glow
content = content.replace(
    '<div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/30 to-yellow-600/10 blur-2xl rounded-[2.5rem] pointer-events-none opacity-70"></div>',
    '<div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/30 via-yellow-500/20 to-yellow-600/10 blur-2xl rounded-[2.5rem] pointer-events-none opacity-70 animate-pulse" style={{ animationDuration: "4s" }}></div>'
)

# 3. Add continuous glow to submit button
content = content.replace(
    '<button type="submit" className="w-full relative group overflow-hidden bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-yellow-500 dark:hover:bg-yellow-400 font-black text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-6">',
    '<button type="submit" className="w-full relative group overflow-hidden bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-yellow-500 dark:hover:bg-yellow-400 font-black text-sm uppercase tracking-wider py-4 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-6">'
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

