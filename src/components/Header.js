import React, { useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo/logo.png';
import AuthModal from './AuthModal';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

function Header() {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageMenuOpen(false);
  };

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isRegisterMode, setRegisterMode] = useState(false);

  const openLogin = () => {
    setRegisterMode(false);
    setAuthModalOpen(true);
  };

  const openRegister = () => {
    setRegisterMode(true);
    setAuthModalOpen(true);
  };

  const closeModal = () => setAuthModalOpen(false);

  return (
    <header className={`header ${isDarkMode ? 'dark' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Green Insight" />
      </div>
      <nav className="nav">
        <a href="/">{t('home')}</a>
        <a href="/themes">{t('themes')}</a>
        <a href="/trends">{t('trends')}</a>
        <a href="/recommended">{t('recommended')}</a>
        <a href="/news">{t('news')}</a>
      </nav>
      <div className="auth-buttons">
        <button className="login-btn" onClick={openLogin}>
          {t('login')}
        </button>
        <button className="register-btn" onClick={openRegister}>
          {t('register')}
        </button>
      </div>
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="theme-button">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div className="language-selector">
        <button
          className="current-language-btn"
          onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
        >
          {i18n.language.toUpperCase()}
        </button>
        {languageMenuOpen && (
          <div className="language-menu">
            <button onClick={() => changeLanguage('ru')}>RU</button>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('kz')}>KZ</button>
          </div>
        )}
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeModal}
        isRegister={isRegisterMode}
      />
    </header>
  );
}

export default Header;
