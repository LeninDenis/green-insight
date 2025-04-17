import React, {useEffect, useState} from 'react';
import '../styles/HomePage.css';
import ArticleCard from "./ArticleCard";
import ArticleService from "../api/ArticleService";
import Loader from "./Loader";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
      try{
          const response = await ArticleService.getAllArticles();
          if(response.status === 200){
              setArticles(response.data);
          }
      } catch (e) {
          console.log(e);
          setArticles([]);
      } finally {
          setLoading(false);
      }
  }
  useEffect(() => {
      fetchData();
  }, [])

  // const filteredArticles = articles.filter((article) =>
  //   article.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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

        {loading ? (<Loader />) : (
            <div className="articles-grid">
                {articles.map((article) => (
                    <ArticleCard
                        article={article}
                    />
                ))}
            </div>
        )}
    </div>
  );
};

export default HomePage;
