import React from 'react';
import { Phone, Menu, X } from 'lucide-react';

interface HeaderProps {
  onGetStarted: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="bg-indigo-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <Phone className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">We're open! Call now: (800) 803-4058</span>
        </div>
      </div>
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Bhatia Tutors</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Learning Plans</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">How It Works</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Our Difference</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Summer Programs</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">For Schools</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Subjects</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Tutoring Jobs</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Sign In</a>
            <button
              onClick={onGetStarted}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Learning Plans</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">How It Works</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Our Difference</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">For Schools</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Tutoring Jobs</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Sign In</a>
              <button
                onClick={onGetStarted}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors w-full"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;