import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import GettingStarted from './components/GettingStarted';
import OnboardingFlow from './components/OnboardingFlow';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleGetStarted = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Here you would typically redirect to a dashboard or next step
    alert('Onboarding complete! Welcome to Bhatia Tutors!');
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Stats />
      <Features />
      <GettingStarted />
    </div>
  );
}

export default App;