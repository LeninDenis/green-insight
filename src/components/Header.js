import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo/logo.png';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaSun, FaMoon } from 'react-icons/fa';

function Header({ onLogin, onRegister }) {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguageMenuOpen(false);
  };

  return (
    <header className={`header ${isDarkMode ? 'dark' : ''}`}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Green Insight" />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/">{t('home')}</Link>
        <Link to="/themes">{t('themes')}</Link>
        <Link to="/trends">{t('trends')}</Link>
        <Link to="/recommended">{t('recommended')}</Link>
        <Link to="/news">{t('news')}</Link>
      </nav>
      <div className="auth-buttons">
        {user ? (
          <>
            <Link to="/profile" className="profile-btn">
              {t('profile')}
            </Link>
            <button className="logout-btn" onClick={logout}>
              {t('logout')}
            </button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={onLogin}>
              {t('login')}
            </button>
            <button className="register-btn" onClick={onRegister}>
              {t('register')}
            </button>
          </>
        )}
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
    </header>
  );
}

export default Header;