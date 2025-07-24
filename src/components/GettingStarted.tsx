import React from 'react';
import { UserPlus, MousePointer } from 'lucide-react';

const GettingStarted: React.FC = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Step 1: Create a Learner Profile',
      description: 'Create a learner profile by inputting personal details, outlining learning goals, and specifying preferred subjects. A complete and accurate profile is crucial for maximizing the effectiveness of our learning platform, as it allows for tailored recommendations and personalized support that align with each individual\'s unique needs and aspirations.'
    },
    {
      icon: MousePointer,
      title: 'Step 2: Choose the Right Membership',
      description: 'By carefully evaluating the details in your profile, we can suggest the perfect plan customized to meet your unique requirements. This approach guarantees a tailored learning experience that resonates with your objectives and caters to your preferences.'
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Getting Started
          </h2>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`flex justify-center ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
                  <step.icon className="h-16 w-16 text-indigo-600" />
                </div>
              </div>
              <div className={`bg-indigo-600 text-white p-8 rounded-2xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-indigo-100 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;