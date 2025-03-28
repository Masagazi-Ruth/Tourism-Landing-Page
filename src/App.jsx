import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Events from './pages/EventsPage'; 
import Teams from './pages/TeamsPage';
import About from './pages/AboutPage';
import Contact from './pages/ContactPage';
import DetailPage from './pages/DetailPage';
import TermsAndConditions from './pages/TermsAndConditionsPage';
import PrivacyPolicy from './pages/PrivacyPolicyPage';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

function App() {
  return (
    <Router>
      <div className="w-screen flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/detailpage" element={<DetailPage />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;