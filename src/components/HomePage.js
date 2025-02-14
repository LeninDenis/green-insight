import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function ArticleCard({ image, title, description, author, link }) {
  return (
    <div className="article-card">
      <img src={image} alt={title} className="article-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        Автор: <Link to={author.link}>{author.name}</Link>
      </p>
      <Link to={link} className="read-more">Читать дальше</Link>
    </div>
  );
}

const HomePage = () => {
  // Состояние для хранения списка статей и поискового запроса
  const [searchQuery, setSearchQuery] = useState('');

  const articles = [
    {
      id: 1,
      title: 'Сохранение лесов: важность и вызовы',
      description: 'Леса играют ключевую роль в поддержании экологического баланса. Узнайте, как их сохранить.',
      author: { name: 'Иван Иванов', link: '/author/ivan-ivanov' },
      category: 'Экология',
      image: '/path-to-image/forest.jpg',
      link: '/article/1',
    },
    {
      id: 2,
      title: 'Новые технологии в энергетике',
      description: 'Какие инновации помогут миру перейти на возобновляемые источники энергии.',
      author: { name: 'Анна Смирнова', link: '/author/anna-smirnova' },
      category: 'Технологии',
      image: '/path-to-image/energy.jpg',
      link: '/article/2',
    },
    {
      id: 3,
      title: 'Здоровый образ жизни: мифы и реальность',
      description: 'Проверенные советы для улучшения здоровья и самочувствия.',
      author: { name: 'Ольга Кузнецова', link: '/author/olga-kuznetsova' },
      category: 'Здоровье',
      image: '/path-to-image/health.jpg',
      link: '/article/3',
    },
  ];

  // Фильтрация статей по названию
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homepage">
      <h1>Главная страница</h1>
      
      {/* Поле ввода для поиска */}
      <input
        type="text"
        placeholder="Поиск статей..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      
      {/* Сетка статей */}
      <div className="articles-grid">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            image={article.image}
            title={article.title}
            description={article.description}
            author={article.author}
            link={article.link}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
