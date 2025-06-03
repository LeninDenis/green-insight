import React, { useEffect } from 'react';
import '../styles/pages/HomePage.css';
import ArticleCard from '../components/ArticleCard';
import {useAuth} from "../context/AuthContext";
import ArticleService from "../api/ArticleService";
import Loader from "../components/UI/Loader";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";

const fetchRecommended = async (logged) => {
    if (logged) {
        const recs = await ArticleService.getRecommendations();
        if (recs.status !== 200) {
            throw new Error(recs.data?.message || 'Ошибка при загрузке рекомендаций');
        }
        return recs.data;
    } else {
        const recs = await ArticleService.getAllArticles();
        if (recs.status !== 200) {
            throw new Error(recs.data?.message || 'Ошибка при загрузке статей');
        }
        return recs.data;
    }
};

const Recommended = () => {
  const { logged } = useAuth();
  const {data: recommendedArticles, isLoading, error} = useQuery({
        queryKey: ['recommend', logged],
        queryFn: () => fetchRecommended(logged),
        enabled: logged !== null,
        staleTime: Infinity,
        cacheTime: 10 * 60 * 1000,
        retry: 1
    });

  useEffect(() => {
      if(error){
          toast.error(error.message || "Ошибка сервера, повторите попытку позднее");
      }
  }, [error]);

  return !recommendedArticles || isLoading ? (<Loader />) : (
    <div className="recommended-page">
      <div className="section">
        <h1>Рекомендуемые статьи</h1>
        <div className="articles-grid">
          {recommendedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
