import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
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
import SubscribePage from './pages/SubscribePage';
import './App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import GILayout from "./layout/GILayout";

const queryClient = new QueryClient();

const App = ()  => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <div className="app-container">
              <GILayout onLogin={() => setShowLogin(true)}
                        onRegister={() => setShowRegister(true)}>
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/recommended" element={<RecommendedPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/user/:id" element={<ProfilePage />} />
                    <Route path="/create-article" element={<CreateArticlePage />} />
                    <Route path="/articles/:id" element={<ArticlePage />} />
                    <Route path="/subscribe" element={<SubscribePage />} />
                  </Routes>
                </main>
              </GILayout>
              {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
              {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}

              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
