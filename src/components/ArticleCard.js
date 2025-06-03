import { Link } from "react-router-dom";
import React from "react";
import { Star, ThumbsUp, Eye } from "lucide-react";
import {useTheme} from "../context/ThemeContext";

const ArticleCard = ({ article }) => {
  const { isDarkMode } = useTheme();
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
              <Star
                  key={i}
                  size={16}
                  stroke={
                      i <= Math.round(article.interaction.rating)
                          ? (isDarkMode ? "#e0e0e0" : "#333333")
                          : "#ccc"
                  }
                  fill={
                      i <= Math.round(article.interaction.rating)
                          ? (isDarkMode ? "#e0e0e0" : "#333333")
                          : "none"
                  }
              />
          ))}
          <span className="rating-value">{(article.interaction.rating || 0.0).toFixed(1)}</span>
        </div>
        <div className="article-actions">
          <div className="icon-with-text">
            <ThumbsUp size={16} />
            <span>{article.interaction.likes || 0}</span>
          </div>
          <div className="icon-with-text">
            <Eye size={16} />
            <span>{article.interaction.views || 0}</span>
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