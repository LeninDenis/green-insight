import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/layout/Header.css';
import '../styles/layout/Footer.css';
import logo from '../assets/logo/logo.png';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import Loader from "../components/UI/Loader";
import {toast} from "react-toastify";

function GILayout({ children, onLogin, onRegister }) {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { isDarkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setLanguageMenuOpen(false);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        setLoading(true);
        logout();
        toast.success("Вы вышли из аккаунта!");
        navigate("/");
        setLoading(false);
    }

    return (
        <div className="gi-inner">
            <header className={`header ${isDarkMode ? 'dark' : ''}`}>
                <div className="header-left">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Green Insight" />
                        </Link>
                    </div>
                </div>

                <nav className="nav">
                    <Link to="/">{t('home')}</Link>
                    <Link to="/recommended">{t('recommended')}</Link>
                </nav>

                <div className="header-right">
                    <div className="auth-buttons">
                        {user ? (
                            <>
                                <Link to={`/user/${user.id}`} className="profile-btn">
                                    {t('profile')}
                                </Link>
                                <button className="logout-btn" onClick={(e) => handleLogout(e)}>
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
                </div>
            </header>
            {loading ? (<Loader />) : children}
            <footer className={`footer ${isDarkMode ? 'dark' : ''}`}>
                <div className="footer-content">
                    <div className="footer-copy">
                        © {new Date().getFullYear()} Green Insight. {t('rights')}
                    </div>
                    <div className="footer-links">
                        <a href="/about">{t('about_us')}</a>
                        <a href="/contacts">{t('contacts')}</a>
                        <a href="/support">{t('support')}</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default GILayout;