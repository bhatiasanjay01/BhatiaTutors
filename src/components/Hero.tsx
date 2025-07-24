import React from 'react';
import { Star, Users, BookOpen, Award } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-cyan-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Supportive learning that gets{' '}
              <span className="text-indigo-600">results</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with expert tutors and unlock your learning potential with personalized, 
              one-on-one instruction tailored to your unique needs and goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={onGetStarted}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors text-lg"
              >
                Get Started
              </button>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors">
                I'm a Parent or Guardian
              </button>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors">
                I'm a School Administrator
              </button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span>Excellent</span>
              </div>
              <div className="flex items-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2">4.9 of 5 based on 11,598 reviews</span>
              </div>
              <span>Trustpilot</span>
            </div>
          </div>

          <div className="relative">
            <div className="bg-cyan-100 rounded-full p-8 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Online Tutoring</h3>
                    <p className="text-gray-600">Connect with expert tutors instantly</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 bg-white rounded-full p-4 shadow-lg">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-pink-400 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-blue-400 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;