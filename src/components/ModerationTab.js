import React, { useEffect, useState } from 'react';
import '../styles/pages/ModerationTab.css';
import { toast } from 'react-toastify';
import ArticleService from '../api/ArticleService';
import Loader from './UI/Loader';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ModerationTab = ({ userId, currentUserId, close }) => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (userId, currentUserId) => {
    setLoading(true);
    try {
      const res = await ArticleService.getArticlesProtected(
        userId && currentUserId && userId === currentUserId ? null : currentUserId,
        'MODERATION'
      );
      if (res.status === 200) {
        setArticles(res.data);
      } else {
        toast.error(res.data?.message || t('moderation.errorFetch'));
      }
    } catch (e) {
      toast.error(t('moderation.serverError'));
    } finally {
      setLoading(false);
    }
  };

  const moderate = async (e, id, status) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await ArticleService.moderate(id, status);
      if (res.status === 200) {
        toast.success(
          status === 'GRANTED' ? t('moderation.approved') : t('moderation.rejected')
        );
        setArticles((prev) => prev.filter((article) => article.id !== id));
      } else {
        toast.error(res.data?.message || t('moderation.errorModerate'));
      }
    } catch (e) {
      toast.error(t('moderation.serverError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(userId, currentUserId);
  }, []);

  return (
    <div className="moderation-tab">
      <h2>{t('moderation.title')}</h2>
      <button className="close-btn" onClick={close}><X /></button>
      {loading ? (
        <Loader />
      ) : articles.length === 0 ? (
        <p>{t('moderation.noArticles')}</p>
      ) : (
        <div className="moderation-list">
          {articles.map((article) => (
            <div key={article.id} className="moderation-card">
              <h3>{article.title}</h3>
              <p>
                <strong>{t('moderation.author')}:</strong>{' '}
                {article.creator.fname} {article.creator.lname}
              </p>
              <div className="moderation-actions">
                <button
                  className="approve-btn"
                  onClick={(e) => moderate(e, article.id, 'GRANTED')}
                >
                  {t('moderation.approveBtn')}
                </button>
                <button
                  className="reject-btn"
                  onClick={(e) => moderate(e, article.id, 'DENIED')}
                >
                  {t('moderation.rejectBtn')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModerationTab;
