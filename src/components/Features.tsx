import React from 'react';
import { UserCheck, Target, TrendingUp } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: UserCheck,
      title: 'Personalized Experience',
      description: 'Sessions are all about you. Teaching through active learning, our tutors customize their approach to find the best ways to help you learn and understand, building confidence and skills that last.'
    },
    {
      icon: Target,
      title: 'Quality and Convenience',
      description: 'Our tutors are skilled teaching professionals with in-depth knowledge of the subjects they teach. Sessions are 100% online, so students can learn anywhere, anytime, and teachers can focus on what matters most.'
    },
    {
      icon: TrendingUp,
      title: 'More Effective Learning',
      description: 'Proven to help students learn more effectively, our tutoring approach focuses on building understanding through active participation, meaningful connections, and confidence-building exercises.'
    }
  ];

  return (
    <section className="bg-indigo-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Unlock your learning potential
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <feature.icon className="h-10 w-10 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-indigo-100 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;