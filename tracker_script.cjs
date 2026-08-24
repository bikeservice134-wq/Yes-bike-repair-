const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const trackerComponent = `
const BookingTrackerModal = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 2000);
    const timer2 = setTimeout(() => setCurrentStep(2), 4500);
    const timer3 = setTimeout(() => setCurrentStep(3), 7000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const steps = [
    { label: "Booked", description: "Your request is received" },
    { label: "Mechanic Assigned", description: "Arun is on the way" },
    { label: "Arrived", description: "Mechanic is at your location" },
    { label: "Service Complete", description: "Your vehicle is ready!" }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#151515] w-full max-w-lg rounded-2xl shadow-2xl p-6 relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Booking Status</h3>
          <p className="text-gray-500 dark:text-[#bdbdbd]">Tracking your service request in real-time</p>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-[#333] before:to-transparent">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#151515] bg-gray-100 dark:bg-[#222] text-gray-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors duration-500"
                  style={{
                    backgroundColor: isCompleted || isActive ? '#dc2626' : '',
                    color: isCompleted || isActive ? '#fff' : ''
                  }}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : (isActive ? <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" /> : <div className="w-2.5 h-2.5 bg-gray-300 dark:bg-[#555] rounded-full" />)}
                </div>
                
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#1a1a1a] shadow-sm transition-all duration-500"
                  style={{
                    borderColor: isActive ? '#dc2626' : '',
                    opacity: currentStep < index ? 0.5 : 1,
                    transform: isActive ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div className="flex flex-col">
                    <h4 className={"font-bold text-[16px] mb-1 " + (isCompleted || isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-[#888]")}>{step.label}</h4>
                    <p className="text-sm text-gray-500 dark:text-[#aaa]">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {currentStep === 3 && (
          <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={onClose} className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-8 py-3 rounded-lg font-bold transition-colors">
              Close Tracker
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
`;

content = content.replace(
  'const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {',
  trackerComponent + '\n\nconst Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {'
);

content = content.replace(
  '{heroSuccess && (\n        <Toast message="Booking request submitted! We will contact you soon." onClose={() => setHeroSuccess(false)} />\n      )}',
  '{heroSuccess && (\n        <BookingTrackerModal onClose={() => setHeroSuccess(false)} />\n      )}'
);

fs.writeFileSync('src/App.tsx', content);
