import React from 'react';
import { Link } from 'react-router-dom';
import ArticleService from '../api/ArticleService';
import '../styles/components/UserArticles.css';

const UserArticles = ({ articles, currentUser, user }) => {

  const handleApprove = async (id) => {
    try {
      const response = await ArticleService.approveArticle(id);
      if (response.status === 200) {
        alert('Статья одобрена');
      }
    } catch (error) {
      console.error('Ошибка при одобрении:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await ArticleService.rejectArticle(id);
      if (response.status === 200) {
        alert('Статья отклонена');
      }
    } catch (error) {
      console.error('Ошибка при отклонении:', error);
    }
  };

  return (
    <div className="user-articles">
      {articles.length === 0 ? (
        <p>Нет статей</p>
      ) : (
        articles.map(article => (
          <div key={article.id} className="article-item">
            <p>
              <Link to={`/articles/${article.id}`}>{article.title}</Link>
            </p>
            {(user.role === 'ADMIN') && (
              <div className="admin-buttons">
                <button onClick={() => handleApprove(article.id)}>Одобрить</button>
                <button onClick={() => handleReject(article.id)}>Отказать</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default UserArticles;
