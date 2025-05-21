import React, {useEffect, useState} from 'react';
import '../styles/pages/HomePage.css';
import ArticleCard from "../components/ArticleCard";
import ArticleService from "../api/ArticleService";
import Loader from "../components/UI/Loader";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";

const fetchData = async () => {
    const response = await ArticleService.getAllArticles();
    if(response.status !== 200){
        throw new Error(response.data?.message || "Ошибка при загрузке статей");
    }
    return response.data;
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {data: articles, isLoading, error} = useQuery({
      queryKey: ['articles'],
      queryFn: fetchData,
      staleTime: Infinity,
      cacheTime: 10 * 60 * 1000,
      retry: 1
  });

  useEffect(() => {
      if(error){
          toast.error(error.message || "Ошибка сервера, повторите позднее");
      }
  }, [error]);

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

        {isLoading ? (<Loader />) : (
            <div className="articles-grid">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id} article={article}
                    />
                ))}
            </div>
        )}
    </div>
  );
};

export default HomePage;
