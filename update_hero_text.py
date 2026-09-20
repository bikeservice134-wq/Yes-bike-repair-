import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

new_left_text = """                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-500 text-xs font-bold tracking-wider uppercase mb-6 shadow-sm border border-yellow-200 dark:border-yellow-500/20">
                    <MapPin className="w-4 h-4" /> Bengaluru
                  </div>
                  
                  <h1 className="text-[42px] sm:text-5xl lg:text-[68px] font-black tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-8">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Doorstep Bike Repair</span>
                  </h1>
                  
                  <ul className="flex flex-col items-center lg:items-start gap-5 text-gray-800 dark:text-zinc-200 font-semibold text-[15px] md:text-lg">
                    <li className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-5 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 w-full max-w-md hover:-translate-y-0.5 transition-transform">
                      <span className="text-2xl">🏍️</span>
                      Bike & Scooter Repair at Your Doorstep
                    </li>
                    <li className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-5 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 w-full max-w-md hover:-translate-y-0.5 transition-transform">
                      <span className="text-2xl">🔧</span>
                      Home • Office • Roadside
                    </li>
                    <li className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-5 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 w-full max-w-md hover:-translate-y-0.5 transition-transform">
                      <span className="text-2xl">⚡</span>
                      Quick Service • Transparent Pricing • Verified Mechanics
                    </li>
                  </ul>"""

pattern_left = r'<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100.*?</ul>'

content = re.sub(pattern_left, new_left_text, content, flags=re.DOTALL)

# Update form title
content = content.replace("Book Mechanic Now", "Book Your Bike Service")

with open('src/App.tsx', 'w') as f:
    f.write(content)

