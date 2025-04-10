import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/about">О нас</a>
        <a href="/contacts">Контакты</a>
        <a href="/support">Поддержка</a>
      </div>
    </footer>
  );
}

export default Footer;
