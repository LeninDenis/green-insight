import React from 'react';
import '../styles/layout/Footer.css';
import { useTheme } from '../context/ThemeContext';

function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`footer ${isDarkMode ? 'dark' : ''}`}>
      <div className="footer-content">
        <div className="footer-copy">
          © {new Date().getFullYear()} Green Insight. Все права защищены.
        </div>
        <div className="footer-links">
          <a href="/about">О нас</a>
          <a href="/contacts">Контакты</a>
          <a href="/support">Поддержка</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
