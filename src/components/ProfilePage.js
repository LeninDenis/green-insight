import React, {useEffect, useState} from 'react';
import '../styles/ProfilePage.css';
import defaultAvatar from '../assets/avatar/default-avatar.jpg';
import SubscriptionsModal from '../components/SubscriptionsModal';
import {Link, useParams} from "react-router-dom";
import UserService from "../api/UserService";
import {useAuth} from "../context/AuthContext";
import Loader from "./Loader";
import ArticleService from "../api/ArticleService";

const ProfilePage = () => {
  const params = useParams();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('USER');
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [loading, setLoading] = useState(true);

  const subscriptions = ['Standard'];

  const fetchData = async (id) => {
      try{
          const response = await UserService.getUserById(id);
          if(response.status === 200){
              setCurrentUser(response.data);
              setStatus(response.data.role);
              let arts = await ArticleService.getArticlesByUIdProtected(id);
              if(arts.status === 200){
                  setArticles(arts.data);
              }
          }
      } catch (e) {
          console.log(e);
          setArticles([]);
      } finally {
          setLoading(false);
      }
  }
  useEffect(() => {
    fetchData(params.id);
  }, []);

  const handleBecomeAuthor = () => {
    alert('Заявка на статус автора отправлена!');
  };

  return user && loading ? (<Loader />) : (
    <div className="profile-page">
      <h2>Профиль</h2>
      <div className="profile-info">
        <img src={defaultAvatar} alt="Аватар" className="profile-avatar" />
        <p><strong>Имя:</strong> {currentUser?.fname || 'Имя'} </p>
        <p><strong>Фамилия:</strong> {currentUser?.lname || 'Фамилия'} </p>
        <p><strong>Статус:</strong> {status} </p>
      </div>

      {status === 'AUTHOR' || status === 'ADMIN' && (
        <div className="author-section">
          <h3>Мои статьи</h3>
          <div>{articles.map((article) => (
              <p><Link>{article.title}</Link></p>
          ))}</div>
            {status === 'USER' && user.id === currentUser.id && (
                <button
                    className="subscription-btn">
                    Оформить подписку
                </button>
            )}
        </div>
      )}
      {user && currentUser.id === user.id && (
          <div className="profile-buttons">
              {status === 'USER' && currentUser && (
                  <button className="subscription-btn" onClick={() => setShowSubscriptions(true)}>
                      Мои подписки
                  </button>
              )}

              {status === 'USER' && currentUser && (
                  <button className="subscription-btn" onClick={handleBecomeAuthor}>
                      Стать автором
                  </button>
              )}

              {currentUser && (
                  <button className="logout-btn">Выйти</button>
              )}
          </div>
      )}
      {showSubscriptions && (
        <SubscriptionsModal
          subscriptions={subscriptions}
          onClose={() => setShowSubscriptions(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;