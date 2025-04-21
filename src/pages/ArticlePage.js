import React, {useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import ArticleService from '../api/ArticleService';
import Loader from '../components/UI/Loader';
import ErrorPopup from '../components/UI/ErrorPopup';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/ArticlePage.css';
import {Eye, ThumbsUp} from 'lucide-react';
import MDEditor from "@uiw/react-md-editor";

const ArticlePage = () => {
  const params = useParams();
  const { user, logged } = useAuth();
  const articleRef = useRef(null);
  const likeRef = useRef(0);
  const [article, setArticle] = useState(null);
  const [interaction, setInteraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(null);

  const fetchData = async (id) => {
    setLoading(true);
    try {
      // const articlePromise = user
      //     ? ArticleService.getArticleByIdProtected(id)
      //     : ArticleService.getArticleById(id);
      //
      // const interactionPromise = user
      //     ? ArticleService.getInteraction(user.id, id)
      //     : Promise.resolve("empty");
      // const [art, interact] = await Promise.all([articlePromise, interactionPromise]);
      const art = user
          ? await ArticleService.getArticleByIdProtected(id)
          : await ArticleService.getArticleById(id);
      const interact = user
          ? await ArticleService.getInteraction(user.id, id)
          : "empty";
      if(art.status === 200){
        setArticle(art.data);
        setLikes(art.data.interaction.likes);
      } else {
        setError({ status: art.status, message: art.data.message });
      }
      if(interact.status === 200){
        console.log(interact.data.likes);
        setInteraction(interact.data);
        setLiked(interact.data.likes > 0);
      } else if(interact.status === 404) {
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

    if (!article) return;

    try {
      let like = likes - article.interaction.likes;
      if (like === 0) like = null;
      const view = 1;
      const rating = null;

      const response = await ArticleService.interact(article.id, like, view, rating);
      if (response.status === 200) {
        console.log("Successfully interacted");
      } else {
        console.error(response);
      }
    } catch (e) {
      console.error("Error while trying to interact ", e);
    }
  };

  useEffect(() => {
    if(logged !== null){
      fetchData(params.id);
    }
    return () => {
      if(user) {
        sendInteraction();
      }
    };
  }, [logged]);

  useEffect(() => {
    articleRef.current = article;
  }, [article]);

  useEffect(() => {
    likeRef.current = likes;
  }, [likes]);

  const handleLike = () => {
    if(user){
      if (!liked) {
        setLikes(likes + 1);
        setLiked(true);
      } else {
        setLikes(likes - 1);
        setLiked(false);
      }
    } else {
      setError({status: 401, message: "Для выполнения этого действия необходимо пройти авторизацию"})
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
            style={{whiteSpace: 'pre-wrap'}}/>
      </div>

      <div className="like-section">
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          <ThumbsUp size={20} fill={liked ? 'white' : 'none'}/> {likes}
        </button>
        <div className="button">
          {article.interaction.views} <Eye size={20}/>
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

export default ArticlePage;
