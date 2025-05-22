import React, { useEffect, useState } from 'react';
import '../styles/pages/ProfilePage.css';
import defaultAvatar from '../assets/avatar/default-avatar.jpg';
import SubscriptionsModal from '../components/SubscriptionsModal';
import EditProfileModal from '../components/EditProfileModal';
import SendLinkModal from '../components/SendLinkModal';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserService from "../api/UserService";
import ArticleService from "../api/ArticleService";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/UI/Loader";
import ModerationTab from '../components/ModerationTab';
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaCheckCircle } from 'react-icons/fa';

const fetchProfileData = async (id, user) => {
  const response = await UserService.getUserById(id);
  if (response.status !== 200) throw new Error('Ошибка загрузки профиля');

  const data = response.data;
  let arts;
  if (user && user.role === 'ADMIN') {
    arts = await ArticleService.getArticlesByUIdProtected(id);
  } else {
    arts = await ArticleService.getArticlesByUId(id);
  }

  if (arts.status !== 200 && arts.status !== 404) throw new Error('Ошибка загрузки статей');

  return { currentUser: data, articles: arts.data };
};

const VerifiedBadge = () => (
  <span className="verified-icon-wrapper">
    <FaCheckCircle className="verified-icon" />
    <span className="verified-tooltip">Подтверждённый профиль</span>
  </span>
);

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logged } = useAuth();
  const [likedArticles, setLikedArticles] = useState([]);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [moderationOpen, setModerationOpen] = useState(false);
  const [showSendLinkModal, setShowSendLinkModal] = useState(false);
  const [activeTab, setActiveTab] = useState('myArticles');

  const { data, isLoading, error } = useQuery({
    queryKey: ['profile', id, user?.role],
    queryFn: () => fetchProfileData(id, user),
    enabled: logged !== null,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 1,
  });

  const subscriptions = ['Standard'];

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Ошибка сервера, повторите попытку позднее");
    }
  }, [error]);

  const isCurrentUser = user && data && user.id === data.currentUser.id;

  const handleSendLink = async (link) => {
    try {
      const response = await UserService.sendDiskLink(link);
      if (response.status === 200) {
        toast.success('Ссылка успешно отправлена!');
      } else {
        toast.error('Не удалось отправить ссылку');
      }
    } catch (err) {
      toast.error('Ошибка при отправке ссылки');
    }
  };

  return !data || isLoading ? (<Loader />) : (
    <div className="profile-page">
      <h2>Профиль</h2>

      <div className="profile-info">
        <img src={defaultAvatar} alt="Аватар" className="profile-avatar" />
        <p>
          <strong>Имя:</strong> {data.currentUser?.fname || 'Имя'}
          {data.currentUser?.is_verified && <VerifiedBadge />}
        </p>
        <p><strong>Фамилия:</strong> {data.currentUser?.lname || 'Фамилия'}</p>
        <p><strong>Статус:</strong> {data.currentUser?.role || "Пользователь"}</p>

        {isCurrentUser && (
          <div className="button-group">
            <Link to="/create-article">
              <button className="create-article-btn">Создать статью</button>
            </Link>

            <button className="edit-btn" onClick={() => setEditModalOpen(true)}>
              Редактировать профиль
            </button>

            <button className="send-link-btn" onClick={() => setShowSendLinkModal(true)}>
              Отправить ссылку
            </button>

            {data.currentUser?.role === 'ADMIN' && (
              <button className="moderation-btn" onClick={() => setModerationOpen(true)}>
                Модерация
              </button>
            )}
          </div>
        )}
      </div>

      {(data.currentUser?.role === 'AUTHOR' || data.currentUser?.role === 'ADMIN') && (
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
              data.articles?.length === 0 ? (
                <p>У вас пока нет опубликованных статей.</p>
              ) : (
                data.articles.map((article) => (
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
          {data.currentUser?.role === 'USER' && (
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
          user={data.currentUser}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      {showSendLinkModal && (
        <SendLinkModal
          onClose={() => setShowSendLinkModal(false)}
          onSubmit={handleSendLink}
        />
      )}

      {moderationOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setModerationOpen(false)}>Закрыть</button>
            <ModerationTab userId={user?.id} currentUserId={data.currentUser?.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
