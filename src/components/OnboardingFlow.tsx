import React, { useState } from 'react';
import { ArrowLeft, Check, FileText, BookOpen, Quote, X, Clock, TrendingUp, Users, Phone, CreditCard, CheckCircle, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import Dashboard from './Dashboard';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  const steps = [
    {
      title: 'Whatever your learning goals may be, we can help.',
      subtitle: 'Tell us more about yourself:',
      options: [
        { id: 'student', label: "I'm a Student" },
        { id: 'parent', label: "I'm a Parent or Guardian" },
        { id: 'admin', label: "I'm a School Administrator" }
      ]
    },
    {
      title: 'What grade level is your child in?',
      subtitle: '',
      options: [
        { id: 'elementary', label: 'Elementary' },
        { id: 'middle', label: 'Middle School' },
        { id: 'high', label: 'High School' },
        { id: 'college', label: 'College / Graduate School' },
        { id: 'adult', label: 'Adult / Professional' }
      ],
      sideContent: {
        icon: FileText,
        text: 'We look at 100+ variables to create a personalized learning plan just for you.'
      }
    },
    {
      title: 'What would you like to get help with today?',
      subtitle: '',
      options: [
        { id: 'academics', label: 'Academics' },
        { id: 'test-prep', label: 'Test Prep' },
        { id: 'enrichment', label: 'Enrichment / Development' },
        { id: 'other', label: 'Other' }
      ],
      sideContent: {
        icon: BookOpen,
        text: 'Covering 3,000+ subjects, we can connect you with highly vetted experts, self-study tools, and more.'
      }
    },
    {
      title: 'Which subjects and class styles suit your kid?',
      subtitle: 'Pick any topics and formats you\'d like to try.',
      type: 'subjects',
      subjects: [
        { id: 'english', label: 'English', category: 'core' },
        { id: 'math', label: 'Math', category: 'core' },
        { id: 'science', label: 'Science & Nature', category: 'core' },
        { id: 'social-studies', label: 'Social Studies', category: 'core' },
        { id: 'world-languages', label: 'World Languages', category: 'languages' },
        { id: 'coding', label: 'Coding & Tech', category: 'tech' },
        { id: 'life-skills', label: 'Life Skills', category: 'life' },
        { id: 'arts', label: 'Arts', category: 'creative' },
        { id: 'music', label: 'Music', category: 'creative' },
        { id: 'games', label: 'Games & Hobbies', category: 'enrichment' },
        { id: 'health', label: 'Health & Wellness', category: 'life' },
        { id: 'test-prep', label: 'Test Prep', category: 'academic' },
        { id: 'early-education', label: 'Early Education', category: 'foundational' }
      ],
      learningPreferences: {
        learningStyle: {
          title: 'How does your kid learn best?',
          options: [
            { id: 'live-online', label: 'Live online meetings' },
            { id: 'self-paced', label: 'Self-paced' }
          ]
        },
        classSize: {
          title: 'What class size works best?',
          options: [
            { id: 'one-on-one', label: '1-on-1' },
            { id: 'small-group', label: 'Small group' }
          ]
        }
      }
    },
    {
      title: 'Does your child have an IEP, 504, or other accommodations?',
      subtitle: '',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
        { id: 'evaluation', label: 'Evaluation in progress' },
        { id: 'not-sure', label: 'Not sure' }
      ],
      testimonial: {
        text: 'Without Bhatia Tutors, there\'s no way I would have been able to not only pass, but excel.',
        author: 'Caleb, Student'
      }
    },
    {
      title: 'How soon do you need help?',
      subtitle: '',
      options: [
        { id: 'right-away', label: 'Right away' },
        { id: 'few-weeks', label: 'In a few weeks' },
        { id: 'not-sure', label: 'Not sure' }
      ],
      testimonial: {
        text: 'I went from really struggling in my accounting course to getting an A! Couldn\'t have done it without Varsity Tutors.',
        author: 'Samantha, Student'
      }
    },
    {
      title: 'Alright! We can definitely help.',
      subtitle: 'Let\'s finish your profile so we can start designing your personalized learning solution.',
      type: 'profile-completion',
      sideContent: [
        {
          icon: TrendingUp,
          text: 'A recent study of our tutoring students showed an average increase of an entire letter grade.',
          stat: '4,700,000 hours'
        },
        {
          icon: Users,
          text: 'We know every student is unique. And they deserve a tutoring experience as unique as their needs. With thousands of tutors available, we\'re confident to find the one best for you.',
          stat: 'Personalized matching'
        }
      ]
    },
    {
      title: 'Thanks!',
      subtitle: 'We\'ll Be Calling You Shortly.',
      type: 'pricing-thank-you'
    },
    {
      title: 'Create Account',
      type: 'account-creation'
    },
    {
      title: 'Membership details and payment',
      type: 'payment'
    }
  ];

  const handleAnswer = (answerId: string) => {
    setAnswers({ ...answers, [currentStep]: answerId });
    
    // Skip subjects screen if not academics
    if (currentStep === 2 && answerId !== 'academics') {
      // Skip to the IEP question (step 4)
      setCurrentStep(4);
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSubjectsAnswer = (selectedSubjects: string[], learningStyle: string, classSize: string) => {
    setAnswers({ 
      ...answers, 
      [currentStep]: { 
        subjects: selectedSubjects,
        learningStyle,
        classSize
      }
    });
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleProfileCompletion = (profileData: any) => {
    setAnswers({ 
      ...answers, 
      [currentStep]: profileData
    });
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePaymentComplete = (paymentData: any) => {
    // Create complete user profile
    const profile = {
      ...answers,
      accountData: answers[steps.length + 1], // Account creation data
      paymentData,
      selectedPlan: answers.selectedPlan
    };
    
    // Create user profile for dashboard
    const dashboardProfile = {
      firstName: answers[steps.length + 1]?.firstName || 'User',
      lastName: answers[steps.length + 1]?.lastName || '',
      email: answers[steps.length + 1]?.email || answers[steps.length]?.email || '',
      selectedSubjects: answers[3]?.subjects || [],
      membershipPlan: answers.selectedPlan || { hours: 2, price: 199, type: '2 tutoring hours per month' },
      gradeLevel: answers[1] || 'elementary'
    };
    
    setUserProfile(dashboardProfile);
    setShowDashboard(true);
  };

  const handleBackToHome = () => {
    setShowDashboard(false);
    onComplete();
  };

  // Show dashboard if payment is complete
  if (showDashboard && userProfile) {
    return <Dashboard userProfile={userProfile} onBackToHome={handleBackToHome} />;
  }

  const goBack = () => {
    if (currentStep > 0) {
      // Handle navigation for skipped subjects screen
      if (currentStep === 4 && answers[2] !== 'academics') {
        setCurrentStep(2);
        return;
      }
      // Handle navigation from urgency back to IEP
      if (currentStep === 5 && answers[2] !== 'academics') {
        setCurrentStep(4);
        return;
      }
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  // Subjects selection component
  if (currentStepData.type === 'subjects') {
    return <SubjectsSelection 
      stepData={currentStepData} 
      onAnswer={handleSubjectsAnswer}
      onBack={goBack}
      answers={answers}
      currentStep={currentStep}
    />;
  }

  // Profile completion component
  if (currentStepData.type === 'profile-completion') {
    return <ProfileCompletion 
      stepData={currentStepData} 
      onAnswer={handleProfileCompletion}
      onBack={goBack}
      answers={answers}
      currentStep={currentStep}
    />;
  }

  // Pricing and thank you component
  if (currentStepData.type === 'pricing-thank-you') {
    return <PricingThankYou
      stepData={currentStepData} 
      onPlanSelect={(plan) => {
        setSelectedPlan(plan);
        setCurrentStep(currentStep + 1);
      }}
      onComplete={onComplete}
      answers={answers}
    />;
  }

  // Account creation component
  if (currentStepData.type === 'account-creation') {
    return <AccountCreation 
      stepData={currentStepData} 
      onNext={() => setCurrentStep(currentStep + 1)}
      onBack={() => setCurrentStep(currentStep - 1)}
      answers={answers}
      setAnswers={setAnswers}
    />;
  }

  // Payment component
  if (currentStepData.type === 'payment') {
    return <PaymentScreen 
      stepData={currentStepData} 
      onComplete={handlePaymentComplete}
      onBack={() => setCurrentStep(currentStep - 1)}
      answers={answers}
      selectedPlan={selectedPlan}
    />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {currentStepData.title}
            </h1>
            {currentStepData.subtitle && (
              <p className="text-lg text-gray-600 mb-8">{currentStepData.subtitle}</p>
            )}
            
            <div className="space-y-4 mb-8">
              {currentStepData.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className={`w-full text-left p-4 rounded-full border-2 transition-all hover:border-indigo-300 hover:bg-indigo-50 ${
                    answers[currentStep] === option.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">{option.label}</span>
                    {answers[currentStep] === option.id && (
                      <Check className="h-5 w-5 text-indigo-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={goBack}
                className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            )}
          </div>

          <div className="lg:pl-8">
            {currentStepData.sideContent && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center mb-4">
                  <currentStepData.sideContent.icon className="h-8 w-8 text-indigo-600 mr-3" />
                </div>
                <p className="text-gray-700">{currentStepData.sideContent.text}</p>
              </div>
            )}

            {currentStepData.testimonial && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Quote className="h-8 w-8 text-indigo-200 mb-4" />
                <blockquote className="text-gray-700 italic mb-4">
                  "{currentStepData.testimonial.text}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">{currentStepData.testimonial.author[0]}</span>
                  </div>
                  <span className="text-gray-600">— {currentStepData.testimonial.author}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mt-20 pt-20 border-t border-gray-200">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 text-2xl font-bold">+</span>
                </div>
              </div>
            </div>
            <div className="bg-indigo-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Step 1: Create a Learner Profile</h3>
              <p className="text-indigo-100 leading-relaxed">
                Create a learner profile by inputting personal details, outlining learning goals, 
                and specifying preferred subjects. A complete and accurate profile is crucial for 
                maximizing the effectiveness of our learning platform, as it allows for tailored 
                recommendations and personalized support that align with each individual's unique 
                needs and aspirations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pricing and Thank You Component
interface PricingThankYouProps {
  stepData: any;
  onPlanSelect: (plan: any) => void;
  onComplete: () => void;
  answers: Record<string, any>;
}

const PricingThankYou: React.FC<PricingThankYouProps> = ({ 
  stepData, 
  onPlanSelect,
  onComplete, 
  answers 
}) => {
  // Calculate pricing based on selected subjects and grade level
  const getSubjectPricing = () => {
    const gradeLevel = answers[1]; // Grade level from step 1
    const selectedSubjects = answers[3]?.subjects || []; // Subjects from step 3
    
    // Subject pricing algorithm (simplified)
    const subjectCosts: Record<string, number> = {
      'math': 85,
      'english': 75,
      'science': 90,
      'social-studies': 70,
      'world-languages': 80,
      'coding': 95,
      'test-prep': 100,
      'music': 65,
      'arts': 60
    };
    
    // Grade level multipliers
    const gradeLevelMultipliers: Record<string, number> = {
      'elementary': 0.8,
      'middle': 1.0,
      'high': 1.2,
      'college': 1.5,
      'adult': 1.3
    };
    
    const multiplier = gradeLevelMultipliers[gradeLevel] || 1.0;
    const avgCost = selectedSubjects.length > 0 
      ? selectedSubjects.reduce((sum: number, subject: string) => 
          sum + (subjectCosts[subject] || 75), 0) / selectedSubjects.length
      : 75;
    
    const baseCost = Math.round(avgCost * multiplier);
    
    return {
      twoHours: Math.round(baseCost * 2.5),
      fourHours: Math.round(baseCost * 4.2),
      eightHours: Math.round(baseCost * 7.5)
    };
  };

  const pricing = getSubjectPricing();
  const selectedSubjects = answers[3]?.subjects || [];
  const gradeLevel = answers[1] || 'middle';
  
  const formatGradeLevel = (grade: string) => {
    const gradeMap: Record<string, string> = {
      'elementary': 'Elementary',
      'middle': 'Middle School',
      'high': 'High School',
      'college': 'College',
      'adult': 'Adult'
    };
    return gradeMap[grade] || 'Middle School';
  };

  const formatSubjects = (subjects: string[]) => {
    const subjectMap: Record<string, string> = {
      'math': 'Math',
      'english': 'English',
      'science': 'Science & Nature',
      'social-studies': 'Social Studies',
      'world-languages': 'World Languages',
      'coding': 'Coding & Tech',
      'test-prep': 'Test Prep',
      'music': 'Music',
      'arts': 'Arts'
    };
    return subjects.map(s => subjectMap[s] || s).join(', ');
  };

  const handlePlanSelect = (planType: string, price: number, hours: number) => {
    const plan = {
      type: planType,
      price: price,
      hours: hours,
      description: `${hours} tutoring hours per month`
    };
    onPlanSelect(plan);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
            {stepData.title}
          </h1>
          <h2 className="text-2xl text-gray-700 mb-6">{stepData.subtitle}</h2>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 max-w-2xl mx-auto mb-8">
            <p className="text-gray-700 mb-4">
              <strong>A personal education consultant will call you in the next few minutes from a local number.</strong>
            </p>
            
            <div className="text-left">
              <p className="font-semibold text-gray-900 mb-2">Ready for your call?</p>
              <p className="font-semibold text-gray-900 mb-2">Here's what we'll discuss:</p>
              <ul className="text-gray-700 space-y-1">
                <li>• Your student's unique interests and learning style</li>
                <li>• Current academic goals and any challenges</li>
                <li>• Our personalized support options</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Personalized Message */}
        <div className="text-center mb-12">
          <div className="bg-indigo-50 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              We are so excited to work with your {formatGradeLevel(gradeLevel)} student!
            </h3>
            <p className="text-gray-700 mb-4">
              Please find your personalized program options below. We're confident we can help with{' '}
              <strong>{formatSubjects(selectedSubjects)}</strong>, and we're excited to begin.
            </p>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Ready to try our membership Risk-Free now? Choose one of the following:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {/* 2 Hours Plan */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-2">2 tutoring hours</h4>
              <p className="text-gray-600 mb-4">per month</p>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${pricing.twoHours}<span className="text-lg text-gray-600">/month</span>
              </div>
              <button 
                onClick={() => handlePlanSelect('2-hours', pricing.twoHours, 2)}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
              >
                Get started
              </button>
            </div>

            {/* 4 Hours Plan */}
            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-indigo-600 text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">4 tutoring hours</h4>
              <p className="text-gray-600 mb-4">per month</p>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${pricing.fourHours}<span className="text-lg text-gray-600">/month</span>
              </div>
              <button 
                onClick={() => handlePlanSelect('4-hours', pricing.fourHours, 4)}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
              >
                Get started
              </button>
            </div>

            {/* 8 Hours Plan */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-2">8 tutoring hours</h4>
              <p className="text-gray-600 mb-4">per month</p>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                ${pricing.eightHours}<span className="text-lg text-gray-600">/month</span>
              </div>
              <button 
                onClick={() => handlePlanSelect('8-hours', pricing.eightHours, 8)}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
              >
                Get started
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col space-y-3 text-gray-700">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>No long-term commitments. Cancel anytime.</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Full flexibility. Freedom to adjust plans each month.</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span>Use as much as you like. Additional hours billed with your monthly cycle.</span>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">What's Included:</h3>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            With one membership good for your entire household, we support every learning 
            milestone throughout each family member's learning journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* 1-on-1 Tutoring */}
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">1-on-1 Tutoring</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Highly Personalized Instruction</li>
                <li>• Network of Rigorously Vetted Tutors</li>
                <li>• Purpose-Built Learning Interface</li>
              </ul>
            </div>

            {/* Unlimited Learning */}
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Unlimited Learning</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Live Small Group Classes</li>
                <li>• On-Demand Lessons</li>
                <li>• Assessments & Practice</li>
                <li>• Seasonal Learning Programs</li>
              </ul>
            </div>

            {/* Flexibility For Life */}
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Flexibility For Life</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Instruction in Over 3,000 Subjects</li>
                <li>• Tailored Support for Every Stage and Milestone</li>
              </ul>
            </div>

            {/* Instant Help */}
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-indigo-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Instant Help</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Instant Tutoring</li>
                <li>• 24/7 AI Tutor Chat</li>
                <li>• Expert Essay Review</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={onComplete}
            className="text-indigo-600 hover:text-indigo-700 font-medium underline"
          >
            No Thanks. I would rather sign up after the call.
          </button>
        </div>
      </div>
    </div>
  );
};

// Account Creation Component
interface AccountCreationProps {
  stepData: any;
  onNext: () => void;
  onBack: () => void;
  answers: Record<string, any>;
  setAnswers: (answers: Record<string, any>) => void;
}

const AccountCreation: React.FC<AccountCreationProps> = ({ 
  stepData, 
  onNext, 
  onBack, 
  answers,
  setAnswers 
}) => {
  const [email, setEmail] = useState(answers[6]?.email || '');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleContinue = () => {
    if (email && password && firstName && lastName) {
      setAnswers({
        ...answers,
        accountCreation: {
          email,
          password,
          firstName,
          lastName
        }
      });
      onNext();
    }
  };

  const isComplete = email && password && firstName && lastName;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Progress Dots */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {stepData.title}
          </h1>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="sanjay.bhatia01@gmail.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                This email will be used for all learners on your account
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Sanjay"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Bhatia"
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!isComplete}
            className={`w-full mt-6 py-3 px-4 rounded-md font-medium transition-colors ${
              isComplete
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign in
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-8">
          ©2025 Bhatia Tutors - A QuantiEdge Company. All rights reserved.
        </div>
        
        <div className="flex justify-center space-x-4 text-xs text-gray-500 mt-2">
          <a href="#" className="hover:text-gray-700">Show Disclaimer</a>
          <a href="#" className="hover:text-gray-700">Privacy</a>
          <a href="#" className="hover:text-gray-700">Our Guarantee</a>
          <a href="#" className="hover:text-gray-700">Terms of Use</a>
          <a href="#" className="hover:text-gray-700">A Nerdy Company</a>
          <a href="#" className="hover:text-gray-700">Sitemap</a>
          <a href="#" className="hover:text-gray-700">Accessibility</a>
          <a href="#" className="hover:text-gray-700">Sign in</a>
        </div>
      </div>
    </div>
  );
};

// Payment Screen Component
interface PaymentScreenProps {
  stepData: any;
  onComplete: (paymentData: any) => void;
  onBack: () => void;
  answers: Record<string, any>;
  selectedPlan: any;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ 
  stepData, 
  onComplete, 
  onBack, 
  answers,
  selectedPlan 
}) => {
  const [phoneNumber, setPhoneNumber] = useState(answers[6]?.phoneNumber || '');
  const [zipCode, setZipCode] = useState(answers[6]?.zipCode || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [cardError, setCardError] = useState(false);

  const email = answers.accountCreation?.email || answers[6]?.email || '';

  const handlePayment = () => {
    if (phoneNumber && zipCode && cardNumber && expirationDate && cvv && agreeToTerms) {
      const paymentData = {
        phoneNumber,
        zipCode,
        cardNumber,
        expirationDate,
        cvv,
        selectedPlan
      };
      onComplete(paymentData);
    }
  };

  const isComplete = phoneNumber && zipCode && cardNumber && expirationDate && cvv && agreeToTerms;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Progress Dots */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">
            {stepData.title}
          </h1>

          {/* Account Info Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Account info</h3>
            <p className="text-xs text-gray-600 mb-3">
              We will use this number to contact you and connect you with a tutor.
            </p>
            
            <div className="space-y-3">
              <div>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">Phone number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="(+1) 385 352 6820"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">Zip code</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Membership Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Membership</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-bold text-gray-900">
                  ${selectedPlan?.price}
                </span>
                <span className="text-sm text-gray-600">/ month</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{selectedPlan?.description}</p>
              <p className="text-xs text-gray-500">
                All-inclusive catalog access to classes for Learning Memberships
              </p>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <CreditCard className="h-4 w-4 text-gray-600 mr-2" />
              <span className="text-sm font-semibold text-gray-900">Pay with card</span>
            </div>
            
            {/* Card Icons */}
            <div className="flex space-x-2 mb-4">
              <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                VISA
              </div>
              <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                MC
              </div>
              <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                AMEX
              </div>
              <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                DISC
              </div>
            </div>

            <div className="space-y-3">
              {/* Card Number */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => {
                      setCardNumber(e.target.value);
                      setCardError(false);
                    }}
                    placeholder="•••• •••• •••• ••••"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      cardError ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {cardError && (
                    <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
                  )}
                </div>
                {cardError && (
                  <p className="text-xs text-red-500 mt-1">Please fill out a card number.</p>
                )}
              </div>

              {/* Expiration Date */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Expiration Date <span className="text-gray-400">(MM/YY)</span>
                </label>
                <input
                  type="text"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* CVV */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  CVV <span className="text-gray-400">(3 digits)</span>
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="•••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start mt-4">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5"
              />
              <span className="ml-2 text-xs text-gray-700">
                By paying with my card, I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700 underline">
                  PayPal Privacy Statement
                </a>
              </span>
            </div>

            {/* Alternative Payment */}
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 underline">
                Choose another way to pay
              </a>
            </div>
          </div>

          {/* Confirm Payment Button */}
          <button
            onClick={handlePayment}
            disabled={!isComplete}
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
              isComplete
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Confirm payment
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 mt-8">
          ©2025 Bhatia Tutors - A QuantiEdge Company. All rights reserved.
        </div>
        
        <div className="flex justify-center space-x-4 text-xs text-gray-500 mt-2">
          <a href="#" className="hover:text-gray-700">Show Disclaimer</a>
          <a href="#" className="hover:text-gray-700">Privacy</a>
          <a href="#" className="hover:text-gray-700">Our Guarantee</a>
          <a href="#" className="hover:text-gray-700">Terms of Use</a>
          <a href="#" className="hover:text-gray-700">A Nerdy Company</a>
          <a href="#" className="hover:text-gray-700">Sitemap</a>
          <a href="#" className="hover:text-gray-700">Accessibility</a>
          <a href="#" className="hover:text-gray-700">Sign in</a>
        </div>
      </div>
    </div>
  );
};

// Subjects Selection Component
interface SubjectsSelectionProps {
  stepData: any;
  onAnswer: (subjects: string[], learningStyle: string, classSize: string) => void;
  onBack: () => void;
  answers: Record<string, any>;
  currentStep: number;
}

const SubjectsSelection: React.FC<SubjectsSelectionProps> = ({ 
  stepData, 
  onAnswer, 
  onBack, 
  answers, 
  currentStep 
}) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [learningStyle, setLearningStyle] = useState('');
  const [classSize, setClassSize] = useState('');

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleNext = () => {
    if (selectedSubjects.length > 0 && learningStyle && classSize) {
      onAnswer(selectedSubjects, learningStyle, classSize);
    }
  };

  const isComplete = selectedSubjects.length > 0 && learningStyle && classSize;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {stepData.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">{stepData.subtitle}</p>
            
            {/* Subjects Grid */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-4">Select all that apply — you can update these later</p>
              <div className="flex flex-wrap gap-3">
                {stepData.subjects.map((subject: any) => (
                  <button
                    key={subject.id}
                    onClick={() => toggleSubject(subject.id)}
                    className={`inline-flex items-center px-4 py-2 rounded-full border-2 transition-all ${
                      selectedSubjects.includes(subject.id)
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <span className="mr-2">{getSubjectIcon(subject.category)}</span>
                    {subject.label}
                    {selectedSubjects.includes(subject.id) && (
                      <X className="h-4 w-4 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onBack}
              className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Learning Style */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {stepData.learningPreferences.learningStyle.title}
              </h3>
              <div className="space-y-3">
                {stepData.learningPreferences.learningStyle.options.map((option: any) => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={learningStyle === option.id}
                      onChange={() => setLearningStyle(option.id)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Class Size */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {stepData.learningPreferences.classSize.title}
              </h3>
              <div className="space-y-3">
                {stepData.learningPreferences.classSize.options.map((option: any) => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={classSize === option.id}
                      onChange={() => setClassSize(option.id)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6">
              <button className="text-gray-500 hover:text-gray-700">
                Not sure yet
              </button>
              <button
                onClick={handleNext}
                disabled={!isComplete}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  isComplete
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Completion Component
interface ProfileCompletionProps {
  stepData: any;
  onAnswer: (profileData: any) => void;
  onBack: () => void;
  answers: Record<string, any>;
  currentStep: number;
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ 
  stepData, 
  onAnswer, 
  onBack, 
  answers, 
  currentStep 
}) => {
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleContinue = () => {
    if (zipCode && email && phoneNumber && agreeToTerms) {
      onAnswer({
        zipCode,
        email,
        phoneNumber,
        agreeToTerms
      });
    }
  };

  const isComplete = zipCode && email && phoneNumber && agreeToTerms;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {stepData.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">{stepData.subtitle}</p>
            
            {/* Form Fields */}
            <div className="space-y-6 mb-8">
              {/* ZIP Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="84043"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
                  />
                  {zipCode && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sanjay.bhatia01@gmail.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="(385) 352-6820"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
                />
                <span className="ml-3 text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-700 underline">
                    Terms of Use
                  </a>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              
              <button
                onClick={handleContinue}
                disabled={!isComplete}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  isComplete
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>

          {/* Right Column - Side Content */}
          <div className="space-y-6">
            {stepData.sideContent.map((content: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <content.icon className="h-8 w-8 text-indigo-600 mr-3" />
                  {content.stat && (
                    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {content.stat}
                    </span>
                  )}
                </div>
                <p className="text-gray-700">{content.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get subject icons
const getSubjectIcon = (category: string) => {
  const icons: Record<string, string> = {
    core: '📚',
    languages: '🌍',
    tech: '💻',
    life: '🎯',
    creative: '🎨',
    enrichment: '🎮',
    academic: '📝',
    foundational: '🧸'
  };
  return icons[category] || '📖';
};

export default OnboardingFlow;