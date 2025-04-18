import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleService from '../api/ArticleService';
import Loader from '../components/UI/Loader';
import ErrorPopup from '../components/UI/ErrorPopup';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/ArticlePage.css';
import { ThumbsUp } from 'lucide-react';

const ArticlePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // заглушка
        setTimeout(() => {
          setArticle({
            title: "Как спасти планету: 5 простых шагов",
            annotation: "Статья об осознанном потреблении, переработке и бережном отношении к природе.",
            content_html: `
              <h2>1. Сократите использование пластика</h2>
              <p>Используйте многоразовые сумки, бутылки и контейнеры.</p>
              <h2>2. Разделяйте отходы</h2>
              <p>Узнайте, где в вашем городе есть пункты приёма перерабатываемых материалов.</p>
              <blockquote>“Земля — это не подарок от родителей, а долг перед нашими детьми.”</blockquote>
              <h2>3. Поддерживайте эко-инициативы</h2>
              <p>Участвуйте в высадке деревьев, субботниках и экологических марафонах.</p>
            `,
            author: {
              fname: 'Денис',
              lname: 'Ленин'
            },
            likes: 15
          });
          setLikes(15);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError({ status: 500, message: 'Ошибка загрузки статьи' });
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
      // TODO: запрос к серверу на увеличение лайков
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorPopup status={error.status} message={error.message} onClose={() => setError(null)} />;

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <p className="annotation">{article.annotation}</p>
      <p className="author">Автор: {article.author?.fname} {article.author?.lname}</p>

      <div className="content" dangerouslySetInnerHTML={{ __html: article.content_html }}></div>

      <div className="like-section">
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}> 
          <ThumbsUp size={20} /> {likes}
        </button>
      </div>
    </div>
  );
};

export default ArticlePage;
