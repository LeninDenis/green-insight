import React, { useEffect, useState } from 'react';
import '../styles/pages/ProfilePage.css';
import defaultAvatar from '../assets/avatar/default-avatar.jpg';
import SubscriptionsModal from '../components/SubscriptionsModal';
import EditProfileModal from '../components/EditProfileModal';
import { Link, useParams } from "react-router-dom";
import UserService from "../api/UserService";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/UI/Loader";
import ArticleService from "../api/ArticleService";

const ProfilePage = () => {
  const params = useParams();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('USER');
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const subscriptions = ['Standard'];

  const fetchData = async (id) => {
    try {
      const response = await UserService.getUserById(id);
      if (response.status === 200) {
        setCurrentUser(response.data);
        setStatus(response.data.role);
        let arts;
        if (user.role === 'ADMIN') {
          arts = await ArticleService.getArticlesByUIdProtected(id);
        } else {
          arts = await ArticleService.getArticlesByUId(id);
        }
        if (arts.status === 200) {
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
    if (user) {
      fetchData(params.id);
    }
  }, [user]);

  return user && loading ? (<Loader />) : (
    <div className="profile-page">
      <h2>Профиль</h2>
      <div className="profile-info">
        <img src={defaultAvatar} alt="Аватар" className="profile-avatar" />
        <p><strong>Имя:</strong> {currentUser?.fname || 'Имя'} </p>
        <p><strong>Фамилия:</strong> {currentUser?.lname || 'Фамилия'} </p>
        <p><strong>Статус:</strong> {status} </p>

        {user.id === currentUser.id && (
            <div className="create-article-wrapper">
              <Link to="/create-article">
                <button className="create-article-btn">Создать статью</button>
              </Link>
            </div>
          )}

        {user.id === currentUser?.id && (
          <button className="edit-btn" onClick={() => setEditModalOpen(true)}>
            Редактировать профиль
          </button>
        )}
      </div>

      {(status === 'AUTHOR' || status === 'ADMIN') && (
        <div className="author-section">
          <h3>Мои статьи</h3>

          <div>
            {articles.map((article) => (
              <p key={article.id}><Link>{article.title}</Link></p>
            ))}
          </div>

          {status === 'USER' && user.id === currentUser.id && (
            <button className="subscription-btn">
              Оформить подписку
            </button>
          )}
        </div>
      )}

      {user && currentUser?.id === user.id && (
        <div className="profile-buttons">
          {status === 'USER' && (
            <button className="subscription-btn" onClick={() => setShowSubscriptions(true)}>
              Мои подписки
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

      {editModalOpen && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
