import React, { useEffect, useState } from 'react';
import '../styles/pages/RecommendedPage.css';
import ArticleCard from '../components/ArticleCard';
import {useAuth} from "../context/AuthContext";
import ArticleService from "../api/ArticleService";
import ErrorPopup from "../components/UI/ErrorPopup";
import Loader from "../components/UI/Loader";

const Recommended = () => {
  const { logged } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedArticles, setRecommendedArticles] = useState([]);

  const fetchData = async () => {
      setLoading(true);
      try{
          const recs = logged
              ? await ArticleService.getRecommendations()
              : await ArticleService.getAllArticles();
          if(recs.status === 200){
              setRecommendedArticles(recs.data);
          } else {
              setError({status: recs.status, message: recs.data.message});
          }
      } catch (e){
          console.log(e);
      } finally {
          setLoading(false);
      }
  }

  useEffect(() => {
      if(logged !== null){
          fetchData();
      }
  }, [logged]);

  console.log(logged);

  return loading ? (<Loader />) : (
    <div className="recommended-page">
      <div className="section">
        <h2>Рекомендуемые статьи</h2>
        <div className="articles-grid">
          {recommendedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
        {error && (
            <ErrorPopup
                status={error.status}
                message={error.message}
                onClose={() => setError(null)}
            />
        )}
    </div>
  );
};

export default Recommended;
