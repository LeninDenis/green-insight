import React, { useEffect, useState } from 'react';
import '../styles/Recommended.css';
import ArticleCard from '../components/ArticleCard';

const Recommended = () => {
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <div className="recommended-page">

      <div className="section">
        <h2>Рекомендуемые статьи</h2>
        <div className="articles-grid">
          {recommendedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Популярные статьи</h2>
        <div className="articles-grid">
          {popularArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
