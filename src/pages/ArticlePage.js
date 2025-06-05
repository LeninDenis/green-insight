import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ArticleService from '../api/ArticleService';
import Loader from '../components/UI/Loader';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/ArticlePage.css';
import {Coins, Eye, ThumbsUp} from 'lucide-react';
import MDEditor from "@uiw/react-md-editor";
import ReactStars from "react-rating-stars-component";
import { toast } from 'react-toastify';

const ArticlePage = () => {
  const params = useParams();
  const { user, logged } = useAuth();
  const articleRef = useRef(null);
  const likeRef = useRef(0);
  const ratingRef = useRef(0);

  const [article, setArticle] = useState(null);
  const [interaction, setInteraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(null);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  const fetchData = useCallback(async (id) => {
    setLoading(true);
    try {
      const art = user
        ? await ArticleService.getArticleByIdProtected(id)
        : await ArticleService.getArticleById(id);
      const interact = user
        ? await ArticleService.getInteraction(user.id, id)
        : "empty";

      if (art.status === 200) {
        setArticle(art.data);
        setLikes(art.data.interaction.likes);
      } else {
        toast.error(`Ошибка загрузки статьи: ${art.data.message} (код ${art.status})`);
        return;
      }

      if (interact.status === 200) {
        setInteraction(interact.data);
        setLiked(interact.data.likes > 0);
        if (interact.data.rating) {
          setRating(interact.data.rating);
          setRated(true);
        }
      } else if (interact.status === 404) {
        setInteraction("empty");
        setLiked(false);
      } else {
        toast.error(`Ошибка взаимодействия: ${interact.data.message} (код ${interact.status})`);
      }
    } catch (e) {
      console.error(e);
      toast.error('Неизвестная ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const sendInteraction = async () => {
    const article = articleRef.current;
    const likes = likeRef.current;
    const ratings = ratingRef.current;

    if (!article) return;

    try {
      let reqLike = likes - article.interaction.likes;
      if (reqLike === 0) reqLike = null;
      const view = 1;

      const response = await ArticleService.interact(article.id, reqLike, view, ratings);
      if (response.status === 200) {
      } else {
        console.error(response);
        toast.error('Ошибка при отправке взаимодействия с статьей');
      }
    } catch (e) {
      console.error('Ошибка взаимодействия', e);
      toast.error('Ошибка при отправке взаимодействия с статьей');
    }
  };

  useEffect(() => {
    if (logged !== null) {
      fetchData(params.id);
    }
  }, [logged, fetchData, params.id]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sendInteraction();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      sendInteraction();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  useEffect(() => {
    ratingRef.current = rating;
  }, [rating]);

  useEffect(() => {
    articleRef.current = article;
  }, [article]);

  useEffect(() => {
    likeRef.current = likes;
  }, [likes]);

  const handleLike = () => {
    if (user) {
      if (!liked) {
        setLikes(likes + 1);
        setLiked(true);
      } else {
        setLikes(likes - 1);
        setLiked(false);
      }
    } else {
      toast.error('Для выполнения этого действия необходимо пройти авторизацию');
    }
  };

  const handleRatingChange = (newRating) => {
    if (!user) {
      toast.error('Требуется авторизация для оценки статьи');
      return;
    }
    if (!rated) {
      setRating(newRating);
      setRated(true);
    }
  };

  if (loading || !article || (user ? !interaction : false)) {
    return <Loader />;
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      {article.paidStatus === "PAID" && (
          <div className="is-sub">
            <Coins color="#EFC934"/>
            <span>По подписке</span>
          </div>
      )}
      <p className="annotation">{article.annotation}</p>
      <p className="author">Автор: {article.creator.fname} {article.creator.lname}</p>

      <div className="content">
        <MDEditor.Markdown
          source={article.content}
          className="wmde-markdown"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>

      <div className="like-section">
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          <ThumbsUp size={20} fill={liked ? 'white' : 'none'} /> {likes}
        </button>
        <div className="button">
          {article.interaction.views} <Eye size={20} />
        </div>
      </div>

      <div className="rating-section">
        <h4>Оцените статью:</h4>
        <ReactStars
          count={5}
          onChange={handleRatingChange}
          size={30}
          activeColor="#ffd700"
          value={rating}
          edit={!rated}
        />
      </div>
    </div>
  );
};

export default ArticlePage;
