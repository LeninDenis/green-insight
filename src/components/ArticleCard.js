import {Link} from "react-router-dom";
import React from "react";
import '../styles/HomePage.css';

const ArticleCard = ({article, image}) => {
    const date = new Date(article.creationDate);
    return (
        <div className="article-card">
            {/*<img src={image} alt={article.title} className="article-image" />*/}
            <h3>{article.title}</h3>
            {/*{article.creator.role === "ADMIN" ? "ADMIN" : ""}*/}
            <p>Автор: <Link to={"/user/"+article.creator.id}>{article.creator.fname} {article.creator.lname}</Link></p>
            <p> Дата создания: {date.toLocaleDateString('ru-RU')}</p>
            <p>{article.annotation}</p>
            <Link className="read-more">Читать дальше</Link>
        </div>
    );
}

export default ArticleCard;