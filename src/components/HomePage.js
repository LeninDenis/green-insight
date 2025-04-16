import React, {useEffect, useState} from 'react';
import '../styles/HomePage.css';
import ArticleCard from "./ArticleCard";
import ArticleService from "../api/ArticleService";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);

  const fetchData = async () => {
      const response = await ArticleService.getAllArticles();
      if(response.status === 200){
          setArticles(response.data);
      }
  }
  useEffect(() => {
      fetchData();
  }, [])

  // const articles = [
  //   {
  //       id: 1,
  //       title: "Sample",
  //       content: null,
  //       creationDate: "2025-04-16T07:59:03.010069",
  //       annotation: "Sample article",
  //       articleStatus: "GRANTED",
  //       paidStatus: "FREE",
  //       creator: {
  //           id: 1,
  //           fname: "Solomon",
  //           lname: "Kazakpayev",
  //           role: "ADMIN"
  //       },
  //       category: {
  //           id: 3,
  //           name: "Disasters",
  //           description: "Disasters description"
  //       },
  //       interaction: {
  //           articleId: 1,
  //           userId: null,
  //           likes: 0,
  //           views: 0,
  //           rating: 0.0
  //       }
  //   }
  // ];
  //
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homepage">
      <h1>Главная страница</h1>
      
      <input
        type="text"
        placeholder="Поиск статей..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      
      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleCard
            article={article}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
