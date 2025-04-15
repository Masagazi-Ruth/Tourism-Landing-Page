import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Events from './pages/EventsPage';
import Teams from './pages/TeamsPage';
import About from './pages/AboutPage';
import Contact from './pages/ContactPage';
import DetailPage from './pages/DetailPage';
import TermsAndConditions from './pages/TermsAndConditionsPage';
import PrivacyPolicy from './pages/PrivacyPolicyPage';
import LoginPage from './pages/LoginPage';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Profile from './pages/ProfilePage'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="w-screen flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/termsandconditions" element={<TermsAndConditions />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route path="/events" element={<ProtectedRoute element={<Events />} />}/>
              <Route path="/events/:id" element={<DetailPage />} />
              <Route path="/teams" element={<ProtectedRoute element={<Teams />} />}/>
              <Route path="/detailpage" element={<ProtectedRoute element={<DetailPage />} />}/>
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> 

              {/* Dashboard with Nested Routes */}
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />}
              >
                <Route path="/profile/detailpage" element={<DetailPage />} />
              </Route>

              {/* Redirect to login if no route matches */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;