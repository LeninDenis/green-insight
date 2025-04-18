import React from 'react';
import '../styles/pages/AboutPage.css';
import { useTheme } from '../context/ThemeContext';

const AboutUs = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`aboutus-page ${isDarkMode ? 'dark' : ''}`}>
      <h1>О нас</h1>
      <p>
        <strong>Green Insight</strong> — это онлайн-агрегатор научно-популярных статей об экологии, созданный с целью
        распространения достоверной информации о состоянии окружающей среды и способах её сохранения.
      </p>
      <p>
        Мы собираем материалы из проверенных источников, фильтруем их по тематикам и предлагаем как бесплатный, так и
        платный доступ к эксклюзивному контенту для заинтересованных читателей.
      </p>
      <p>
        Наша миссия — повысить экологическую грамотность общества, вдохновить на осознанное отношение к природе и
        поддержать научные инициативы в области экологии.
      </p>
    </div>
  );
};

export default AboutUs;
