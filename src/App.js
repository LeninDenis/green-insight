import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import ThemesPage from './pages/ThemesPage';
import RecommendedPage from './pages/RecommendedPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import SupportPage from './pages/SupportPage';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import CreateArticlePage from './pages/CreateArticlePage';
import ArticlePage from './pages/ArticlePage';
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
                <Route path="/create-article" element={<CreateArticlePage />} />
                <Route path="/articles/:id" element={<ArticlePage />} />
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
