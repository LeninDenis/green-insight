import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleService from '../api/ArticleService';
import Loader from '../components/UI/Loader';
import ErrorPopup from '../components/UI/ErrorPopup';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/ArticlePage.css';
import { Eye, ThumbsUp } from 'lucide-react';
import MDEditor from "@uiw/react-md-editor";
import ReactStars from "react-rating-stars-component";

const ArticlePage = () => {
  const params = useParams();
  const { user, logged } = useAuth();
  const articleRef = useRef(null);
  const interactionRef = useRef(null);
  const likeRef = useRef(0);
  const ratingRef = useRef(0);
  const [article, setArticle] = useState(null);
  const [interaction, setInteraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(null);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  const fetchData = async (id) => {
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
        setError({ status: art.status, message: art.data.message });
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
        setError({ status: interact.status, message: interact.data.message });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const sendInteraction = async () => {
    const article = articleRef.current;
    const likes = likeRef.current;
    const ratings = ratingRef.current;

    if (!article) return;

    try {
      let reqLike = likes - article.interaction.likes;
      if (reqLike === 0) reqLike = null;
      let reqRating = !rated ? null : ratings;
      const view = 1;

      const response = await ArticleService.interact(article.id, reqLike, view, reqRating);
      if (response.status === 200) {
        console.log("Successfully interacted");
      } else {
        console.error(response);
      }
    } catch (e) {
      console.log(e);
      console.error("Error while trying to interact ", e);
    }
  }

  useEffect(() => {
    if(logged !== null) {
      fetchData(params.id);
    }
  }, [logged]);

  useEffect(() => {
    return () => {
      sendInteraction();
    }
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
      setError({ status: 401, message: "Для выполнения этого действия необходимо пройти авторизацию" });
    }
  };

  return (loading || !article || (user ? !interaction : false)) ? (<Loader />) : (
    <div className="article-page">
      <h1>{article.title}</h1>
      <p className="annotation">{article.annotation}</p>
      <p className="author">Автор: {article.creator.fname} {article.creator.lname}</p>

      <div className="content">
        <MDEditor.Markdown
          source={article.content}
          className="wmde-markdown"
          style={{ whiteSpace: 'pre-wrap' }} />
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
          onChange={(newRating) => {
            if (!user) {
              setError({ status: 401, message: "Требуется авторизация для оценки статьи" });
              return;
            }
            if (!rated) {
              setRating(newRating);
              setRated(true);
            }
          }}
          size={30}
          activeColor="#ffd700"
          value={rating}
          edit={!rated}
        />
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

export default ArticlePage;
