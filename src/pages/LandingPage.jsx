import React from 'react';
import Body from '../components/Body';
import ErrorBoundary from '../components/ErrorBoundary';
const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <ErrorBoundary>
          <Body />
      </ErrorBoundary>
    </div>
  );
};

export default LandingPage;

