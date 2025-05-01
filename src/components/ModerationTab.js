import React, { useEffect, useState } from 'react';
import '../styles/pages/ModerationTab.css';
import ArticleService from '../api/ArticleService';

const ModerationTab = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    //фейковые данные
    setArticles([
      { id: 1, title: 'Будущее солнечной энергетики', author: 'Иван Петров' },
      { id: 2, title: 'Глобальное потепление: миф или реальность?', author: 'Анна Смирнова' }
    ]);
  }, []);

  return (
    <div className="moderation-tab">
      <h2>Модерация статей</h2>
      {articles.length === 0 ? (
        <p>Нет статей на модерации.</p>
      ) : (
        <div className="moderation-list">
          {articles.map((article) => (
            <div key={article.id} className="moderation-card">
              <h3>{article.title}</h3>
              <p><strong>Автор:</strong> {article.author}</p>
              <div className="moderation-actions">
                <button className="approve-btn">Одобрить</button>
                <button className="reject-btn">Отклонить</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModerationTab;
