import React from 'react';
import { Search, User, ChevronDown, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface DashboardProps {
  userProfile: {
    firstName: string;
    lastName: string;
    email: string;
    selectedSubjects: string[];
    membershipPlan: {
      hours: number;
      price: number;
      type: string;
    };
    gradeLevel: string;
  };
  onBackToHome: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, onBackToHome }) => {
  const getRecommendedClasses = () => {
    const { selectedSubjects, gradeLevel } = userProfile;
    
    const classDatabase = [
      {
        id: 1,
        title: "Building Blocks of 3rd Grade Reading",
        subject: "English",
        grades: "Grade 3",
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
        color: "bg-purple-500"
      },
      {
        id: 2,
        title: "Summer Learning: Bridging the Gap to 2nd Grade Reading",
        subject: "English",
        grades: "Grades 1-2",
        image: "https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=400",
        color: "bg-teal-500"
      },
      {
        id: 3,
        title: "Cosmic Adventure Camp with Janet's Planet",
        subject: "Science",
        grades: "Grades 1-5",
        image: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=400",
        color: "bg-orange-500"
      },
      {
        id: 4,
        title: "High School Geometry Fundamentals",
        subject: "Math",
        grades: "Grades 9-12",
        image: "https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400",
        color: "bg-red-500"
      },
      {
        id: 5,
        title: "Storyteller's Studio",
        subject: "English",
        grades: "Grades K-2",
        image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
        color: "bg-yellow-500"
      },
      {
        id: 6,
        title: "Practical Probability & Spirited Statistics",
        subject: "Math",
        grades: "Grades 6-8",
        image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
        color: "bg-blue-500"
      },
      {
        id: 7,
        title: "Building Blocks of Elementary Math",
        subject: "Math",
        grades: "Grade 6",
        image: "https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg?auto=compress&cs=tinysrgb&w=400",
        color: "bg-indigo-500"
      },
      {
        id: 8,
        title: "Creative Writing Workshop",
        subject: "English",
        grades: "Grades 4-6",
        image: "https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400",
        color: "bg-green-500"
      },
      {
        id: 9,
        title: "Introduction to Coding",
        subject: "Coding",
        grades: "Grades 3-8",
        image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400",
        color: "bg-purple-600"
      }
    ];

    // Filter classes based on selected subjects
    return classDatabase.filter(classItem => {
      const subjectMatch = selectedSubjects.some(subject => {
        const subjectMap: Record<string, string[]> = {
          'english': ['English'],
          'math': ['Math'],
          'science': ['Science'],
          'coding': ['Coding'],
          'social-studies': ['Social Studies'],
          'world-languages': ['Languages'],
          'arts': ['Arts'],
          'music': ['Music']
        };
        
        return subjectMap[subject]?.includes(classItem.subject);
      });
      
      return subjectMatch;
    }).slice(0, 6); // Show first 6 matching classes
  };

  const recommendedClasses = getRecommendedClasses();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="bg-indigo-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
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

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find your next subject or class"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <button className="text-gray-700 hover:text-indigo-600 font-medium flex items-center">
                  Tutoring <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <button className="text-gray-700 hover:text-indigo-600 font-medium flex items-center">
                  Subjects <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <button className="text-gray-700 hover:text-indigo-600 font-medium flex items-center">
                  Classes & Self-Guided <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700">
                  Upgrade
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {userProfile.firstName[0]}{userProfile.lastName[0]}
                  </span>
                </div>
                <span className="text-gray-700 font-medium">{userProfile.firstName}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome {userProfile.firstName}!
          </h1>
        </div>

        {/* No Upcoming Sessions Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">No upcoming live sessions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Get started with 1-on-1 tutoring</h3>
              <p className="text-indigo-100 mb-4">
                Request a tutor to schedule recurring sessions for any subject.
              </p>
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                <User className="h-4 w-4 mr-2" />
                View Options
              </button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Take an online class</h3>
              <p className="text-indigo-100 mb-4">
                Find a live class in a subject you know or a subject you want to get to know.
              </p>
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Search for a class
              </button>
            </div>
          </div>
        </div>

        {/* My Subjects Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">My Subjects</h2>
            <div className="flex space-x-3">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Add a new subject
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Take an assessment
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Once you've added subjects to your My Learning profile, they'll appear here.
          </p>
          
          {/* Membership Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Current Membership</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-indigo-600">
                  {userProfile.membershipPlan.hours} tutoring hours
                </p>
                <p className="text-gray-600">
                  ${userProfile.membershipPlan.price}/month • {userProfile.membershipPlan.type}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  All-inclusive catalog access to classes for Learning Memberships
                </p>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Manage Plan
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recommendations</h2>
              <p className="text-gray-600">Recommended live classes</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedClasses.map((classItem) => (
              <div key={classItem.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-32 ${classItem.color} relative`}>
                  <img 
                    src={classItem.image} 
                    alt={classItem.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <span className="text-xs font-medium bg-black/30 px-2 py-1 rounded">
                      {classItem.subject}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {classItem.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{classItem.grades}</p>
                  <button className="w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded-lg font-medium hover:bg-indigo-200 transition-colors">
                    View schedule and times
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center mx-auto">
              View all classes
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center">
          <button
            onClick={onBackToHome}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Back to Homepage
          </button>
        </div>
      </main>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;