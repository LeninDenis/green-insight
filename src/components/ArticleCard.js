import {Link} from "react-router-dom";
import React from "react";
import '../styles/pages/HomePage.css';

const ArticleCard = ({article}) => {
    const date = new Date(article.creationDate);
    return (
        <Link to={`/articles/${article.id}`}>
            <div className="article-card">
                <h3>{article.title}</h3>
                <p>Автор: <Link to={"/user/"+article.creator.id}>{article.creator.fname} {article.creator.lname}</Link></p>
                <p> Дата создания: {date.toLocaleDateString('ru-RU')}</p>
                <p>{article.annotation}</p>
            </div>
        </Link>
    );
}

export default ArticleCard;