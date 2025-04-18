import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleService from '../api/ArticleService';
import Loader from '../components/UI/Loader';
import ErrorPopup from '../components/UI/ErrorPopup';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/ArticlePage.css';
import { ThumbsUp } from 'lucide-react';
import MDEditor from "@uiw/react-md-editor";

const ArticlePage = () => {
  const params = useParams();
  const { user, logged } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const fetchData = async (id) => {
    try {
      let art;
      if(user){
        art = await ArticleService.getArticleByIdProtected(id);
      } else {
        art = await ArticleService.getArticleById(id);
      }
      if(art.status === 200){
        setArticle(art.data);
        setLikes(art.data.interaction.likes);
      } else {
        setError({ status: art.status, message: art.data.message });
      }
    } catch (err) {
      setError({ status: 500, message: 'Ошибка загрузки статьи' });
    } finally {
      setLoading(false);
    }
  };

  const interact = async () => {
    try{
      let like = likes - article.interaction.likes;
      if(like === 0) like = null;
      let view = 1;
      let rating = null;
      const interaction = await ArticleService.interact(article.id, like, view, rating);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData(params.id);
    return () => {
      interact();
    };
  }, [user, logged]);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  return (loading || !article) ? (<Loader />) : (
    <div className="article-page">
      <h1>{article.title}</h1>
      <p className="annotation">{article.annotation}</p>
      <p className="author">Автор: {article.creator.fname} {article.creator.lname}</p>

      <div className="content">
        <MDEditor.Markdown
            source={article.content}
            className="wmde-markdown"
            style={{whiteSpace: 'pre-wrap'}}/>
      </div>

      <div className="like-section">
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}> 
          <ThumbsUp size={20} fill={liked ? 'white' : 'none'}/> {likes}
        </button>
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
