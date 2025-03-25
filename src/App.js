import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ThemesPage from './components/ThemesPage';
import TrendsPage from './components/TrendsPage';
import RecommendedPage from './components/RecommendedPage';
import NewsPage from './components/NewsPage';
import AboutPage from './components/AboutPage';
import ContactsPage from './components/ContactsPage';
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
          <div className="App">
            <Header 
              onLogin={() => setShowLogin(true)} 
              onRegister={() => setShowRegister(true)} 
            />
            
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/themes" element={<ThemesPage />} />
                <Route path="/trends" element={<TrendsPage />} />
                <Route path="/recommended" element={<RecommendedPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
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