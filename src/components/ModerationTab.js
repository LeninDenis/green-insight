import React, {useEffect, useState} from 'react';
import '../styles/pages/ModerationTab.css';
import {toast} from "react-toastify";
import ArticleService from "../api/ArticleService";
import Loader from "./UI/Loader";

const ModerationTab = ({userId, currentUserId}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (userId, currentUserId) => {
    setLoading(true);
    try{
      const res = await ArticleService.getArticlesProtected(
          userId
          && currentUserId
          && userId === currentUserId
              ? null : currentUserId,
          "MODERATION");
      if(res.status === 200) {
        setArticles(res.data);
      } else {
        toast.error(res.data?.message || "Ошибка при выдаче статей для модерации");
      }
    } catch (e) {
      toast.error("Ошибка сервера, повторите попытку позднее");
    } finally {
      setLoading(false);
    }
  }

  const moderate = async (e, id, status) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await ArticleService.moderate(id, status);
      if(res.status === 200){
        toast.success(`Статья ${status === 'GRANTED' ? "одобрена" : "отклонена"}!`);
        setArticles(prev => prev.filter(article => article.id !== id));
      } else {
        toast.error(res.data?.message || "Ошибка при модерировании статьи");
      }
    } catch (e) {
      toast.error("Ошибка сервера, повторите попытку позднее");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(userId, currentUserId);
  }, []);

  return (
    <div className="moderation-tab">
      <h2>Модерация статей</h2>
      {loading ? (<Loader />) : (
        articles.length === 0 ? (
              <p>Нет статей на модерации.</p>
          ) : (
              <div className="moderation-list">
                {articles.map((article) => (
                    <div key={article.id} className="moderation-card">
                      <h3>{article.title}</h3>
                      <p><strong>Автор:</strong> {article.creator.fname} {article.creator.lname}</p>
                      <div className="moderation-actions">
                        <button
                            className="approve-btn"
                            onClick={(e) => moderate(e, article.id, 'GRANTED')}>
                          Одобрить
                        </button>
                        <button
                            className="reject-btn"
                            onClick={(e) => moderate(e, article.id, 'DENIED')}>
                          Отклонить
                        </button>
                      </div>
                    </div>
                ))}
              </div>
          )
      )}
    </div>
  );
};

export default ModerationTab;
