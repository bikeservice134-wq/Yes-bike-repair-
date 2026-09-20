import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# 1. Remove the Bengaluru pill
content = re.sub(
    r'<div className="inline-flex items-center gap-2 px-3 py-1\.5 rounded-full bg-yellow-100.*?<MapPin className="w-4 h-4" /> Bengaluru\s*</div>',
    '',
    content,
    flags=re.DOTALL
)

# 2. Since the text column is completely empty now, let's remove the empty container 
# and center the booking form by changing the grid setup.
content = content.replace(
    '<div className="order-1 lg:order-1 text-center lg:text-left pt-2 lg:pt-10">',
    ''
)
content = content.replace(
    '</div>\n                \n                {/* RIGHT: PREMIUM COMPACT BOOKING FORM */}',
    '{/* PREMIUM COMPACT BOOKING FORM */}'
)
content = content.replace(
    '<div className="max-w-6xl w-full mx-auto px-5 grid lg:grid-cols-2 gap-6 lg:gap-16 items-start relative z-10 pt-2 lg:pt-4">',
    '<div className="max-w-6xl w-full mx-auto px-5 flex flex-col justify-center items-center relative z-10 pt-2 lg:pt-10">'
)

content = content.replace(
    '<div id="booking-form" className="order-2 lg:order-2 w-full max-w-[340px] mx-auto lg:ml-auto lg:mr-0 relative z-20 mt-8 lg:mt-0">',
    '<div id="booking-form" className="w-full max-w-[400px] relative z-20">'
)

# The user also asked to remove "Book Your Bike Service".
# Let's see if this is the form title.
content = content.replace(
    '<h3 className="text-[22px] md:text-[24px] font-black tracking-tight text-gray-900 dark:text-white leading-tight mb-1.5">\n                        Book Your Bike Service\n                      </h3>',
    ''
)

with open('src/App.tsx', 'w') as f:
    f.write(content)
