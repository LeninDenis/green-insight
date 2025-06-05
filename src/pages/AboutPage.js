import React from 'react';
import '../styles/pages/AboutPage.css';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`aboutus-page ${isDarkMode ? 'dark' : ''}`}>
      <h1>{t('about.title')}</h1>
      <p>
        <strong>Green Insight</strong> — {t('about.description1')}
      </p>
      <p>{t('about.description2')}</p>
      <p>{t('about.description3')}</p>
    </div>
  );
};

export default AboutUs;
