import React from 'react';
import { Users, Clock, Trophy } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    { 
      icon: Users, 
      value: '18+', 
      label: 'years help students' 
    },
    { 
      icon: Clock, 
      value: '10 million+', 
      label: 'hours of live instruction' 
    },
    { 
      icon: Trophy, 
      value: '3,000+', 
      label: 'subjects available' 
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <stat.icon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;