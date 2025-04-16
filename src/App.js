import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ThemesPage from './components/ThemesPage';
import RecommendedPage from './components/RecommendedPage';
import AboutPage from './components/AboutPage';
import ContactsPage from './components/ContactsPage';
import SupportPage from './components/SupportPage';
import ProfilePage from './components/ProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="app-container">
            <Header 
              onLogin={() => setShowLogin(true)} 
              onRegister={() => setShowRegister(true)} 
            />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/themes" element={<ThemesPage />} />
                <Route path="/recommended" element={<RecommendedPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/user/:id" element={<ProfilePage />} />
              </Routes>
            </main>

            <Footer />

            {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
            {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
