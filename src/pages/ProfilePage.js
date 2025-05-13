import React, { useEffect, useState } from 'react';
import '../styles/pages/ProfilePage.css';
import defaultAvatar from '../assets/avatar/default-avatar.jpg';
import SubscriptionsModal from '../components/SubscriptionsModal';
import EditProfileModal from '../components/EditProfileModal';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserService from "../api/UserService";
import ArticleService from "../api/ArticleService";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/UI/Loader";
import ModerationTab from '../components/ModerationTab';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentUser, setCurrentUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);
  const [status, setStatus] = useState('USER');
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [moderationOpen, setModerationOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('myArticles');

  const subscriptions = ['Standard']; // заглушка

  const fetchData = async (id) => {
    try {
      const response = await UserService.getUserById(id);
      if (response.status === 200) {
        const data = response.data;
        setCurrentUser(data);
        setStatus(data.role);

        let arts;
        if (user.role === 'ADMIN') {
          arts = await ArticleService.getArticlesByUIdProtected(id);
        } else {
          arts = await ArticleService.getArticlesByUId(id);
        }

        if (arts.status === 200) {
          setArticles(arts.data);
        }

        // likedArticles заглушка
        setLikedArticles([]);
      }
    } catch (error) {
      console.error(error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData(id);
    }
  }, [user, id]);

  if (!user || loading) return <Loader />;

  const isCurrentUser = currentUser && user.id === currentUser.id;

  return (
    <div className="profile-page">
      <h2>Профиль</h2>

      <div className="profile-info">
        <img src={defaultAvatar} alt="Аватар" className="profile-avatar" />
        <p><strong>Имя:</strong> {currentUser?.fname || 'Имя'}</p>
        <p><strong>Фамилия:</strong> {currentUser?.lname || 'Фамилия'}</p>
        <p><strong>Статус:</strong> {status}</p>

        {isCurrentUser && (
          <div className="button-group">
            <Link to="/create-article">
              <button className="create-article-btn">Создать статью</button>
            </Link>

            <button className="edit-btn" onClick={() => setEditModalOpen(true)}>
              Редактировать профиль
            </button>

            {status === 'ADMIN' && (
              <button className="moderation-btn" onClick={() => setModerationOpen(true)}>
                Модерация
              </button>
            )}
          </div>
        )}
      </div>

      {(status === 'AUTHOR' || status === 'ADMIN') && (
        <div className="author-section">
          <div className="tabs">
            <button
              className={activeTab === 'myArticles' ? 'active' : ''}
              onClick={() => setActiveTab('myArticles')}
            >
              Мои статьи
            </button>
            <button
              className={activeTab === 'likedArticles' ? 'active' : ''}
              onClick={() => setActiveTab('likedArticles')}
            >
              Понравившиеся
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'myArticles' ? (
              articles.length === 0 ? (
                <p>У вас пока нет опубликованных статей.</p>
              ) : (
                articles.map((article) => (
                  <p key={article.id}>
                    <Link to={`/articles/${article.id}`}>{article.title}</Link>
                  </p>
                ))
              )
            ) : (
              likedArticles.length === 0 ? (
                <p>Вы ещё не поставили лайк ни одной статье.</p>
              ) : (
                likedArticles.map((article) => (
                  <p key={article.id}>
                    <Link to={`/articles/${article.id}`}>{article.title}</Link>
                  </p>
                ))
              )
            )}
          </div>
        </div>
      )}

      {isCurrentUser && (
        <div className="profile-buttons">
          {status === 'USER' && (
            <>
              <button className="subscription-btn" onClick={() => navigate('/subscribe')}>
                Оформить подписку
              </button>
              <button className="subscription-btn" onClick={() => setShowSubscriptions(true)}>
                Мои подписки
              </button>
            </>
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

      {moderationOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setModerationOpen(false)}>Закрыть</button>
            <ModerationTab />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
