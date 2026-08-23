import { Search, Stethoscope, Calendar, CheckCircle } from 'lucide-react';

function HowItWorks() {
  const steps = [
    { icon: Search, title: "Search", desc: "Find doctors near you" },
    { icon: Stethoscope, title: "Choose Doctor", desc: "Compare and pick" },
    { icon: Calendar, title: "Pick a Slot", desc: "Real, live availability" },
    { icon: CheckCircle, title: "Confirmed", desc: "Slot locked in" },
  ];

  return (
    <section className="py-20 px-8 bg-white text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-16">
        How <span className="text-blue-600">MineQueue</span> Works
      </h2>

      <div className="relative max-w-4xl mx-auto">
        
        {/* Base static line */}
        <div className="absolute top-7 left-0 w-full h-0.5 bg-gray-200"></div>

        {/* Moving animated line */}
        <div className="absolute top-7 w-10 h-0.5 bg-blue-600 animate-moveLine"></div>

        {/* Steps */}
        <div className="relative z-10 flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center w-1/4">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mt-4 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;