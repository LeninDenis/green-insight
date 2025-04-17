import React, { useEffect, useState } from 'react';
import '../styles/Recommended.css';
import ArticleCard from './ArticleCard';
import ArticleService from '../api/ArticleService';

const Recommended = () => {
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);

  const fetchRecommendedData = async () => {
    const response = await ArticleService.getRecommendedArticles();
    if (response.status === 200) {
      setRecommendedArticles(response.data);
    }
  };

  const fetchPopularData = async () => {
    const response = await ArticleService.getPopularArticles();
    if (response.status === 200) {
      setPopularArticles(response.data);
    }
  };

  useEffect(() => {
    fetchRecommendedData();
    fetchPopularData();
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
