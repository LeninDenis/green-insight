import { Link } from "react-router-dom";
import React from "react";
import { Star, ThumbsUp, Eye } from "lucide-react";
import '../styles/pages/HomePage.css';

const ArticleCard = ({ article }) => {
  const date = new Date(article.creationDate);

  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <p>
        Автор:{" "}
        <Link to={`/user/${article.creator.id}`}>
          {article.creator.fname} {article.creator.lname}
        </Link>
      </p>
      <p>Дата создания: {date.toLocaleDateString("ru-RU")}</p>
      <p>{article.annotation}</p>

      <div className="article-stats">
        <div className="article-rating">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={16} className="star-icon" />
          ))}
          <span className="rating-value">0.0</span>
        </div>
        <div className="article-actions">
          <div className="icon-with-text">
            <ThumbsUp size={16} />
            <span>{article.likes || 0}</span>
          </div>
          <div className="icon-with-text">
            <Eye size={16} />
            <span>{article.views || 0}</span>
          </div>
        </div>
      </div>

      <div className="article-card-footer">
        <Link to={`/articles/${article.id}`} className="read-more-btn">
          Читать далее
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;