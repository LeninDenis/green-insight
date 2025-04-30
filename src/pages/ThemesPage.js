import React from 'react';
import '../styles/pages/ThemesPage.css';
import { Link } from 'react-router-dom';

const themes = [
  { id: 1, title: 'Климат и окружающая среда', description: 'Изучение изменений климата, экологии и влияния человека на природу.' },
  { id: 2, title: 'Космос и астрономия', description: 'Последние открытия в изучении космоса, планет и галактик.' },
  { id: 3, title: 'Искусственный интеллект', description: 'Технологии машинного обучения, нейросетей и их применение.' },
  { id: 4, title: 'Биология и генетика', description: 'Исследования ДНК, биотехнологии и будущее медицины.' },
  { id: 5, title: 'Физика и химия', description: 'Фундаментальные законы природы и новые открытия в науке.' }
];

const Themes = () => {
  return (
    <div className="themes-page">
      <h1>Темы</h1>
      <div className="themes-grid">
        {themes.map((theme) => (
          <Link to={`/themes/${theme.id}`} key={theme.id} className="theme-card-link">
            <div className="theme-card">
              <h3>{theme.title}</h3>
              <p>{theme.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <button className="suggest-theme-btn">Предложить тему</button>
    </div>
  );
};

export default Themes;
