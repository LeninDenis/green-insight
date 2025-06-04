import React, { useEffect, useState } from 'react';
import '../styles/pages/ProfilePage.css';
import defaultAvatar from '../assets/avatar/default-avatar.jpg';
import EditProfileModal from '../components/EditProfileModal';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from "../api/UserService";
import ArticleService from "../api/ArticleService";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/UI/Loader";
import ModerationTab from '../components/ModerationTab';
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaCheckCircle } from 'react-icons/fa';
import SubscriptionCard from "../components/SubscriptionCard";
import PaymentService from "../api/PaymentService";
import ArticleCard from "../components/ArticleCard";
import RewardService from "../api/RewardService";

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

  let condition = user?.role === "ADMIN"
      || (user?.role === "AUTHOR" && data.id === user?.id);
  console.log(condition);

  let reward = condition
      ? await RewardService.getRewards(id)
      : {status: 400};

  if(reward.status !== 200) reward = {data: []};

  let subscriptions = [];
  if(user && user.scopes.includes("payment.view")){
    let res = await PaymentService.getActive();
    if(res.status === 200){
      subscriptions = res?.data ? [res.data] : [];
    } else if(res.status === 404){
      subscriptions = [];
    }
  } else if(user && user.role === "ADMIN" && user.id !== id){
    let res = (await PaymentService.listAll(id));
    subscriptions = res?.data ? res.data : [];
  }

  if (arts.status !== 200 && arts.status !== 404) throw new Error('Ошибка загрузки статей');

  return { currentUser: data, articles: arts.data, subs: subscriptions, reward: reward.data};
};

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logged, refresh } = useAuth();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [moderationOpen, setModerationOpen] = useState(false);
  const [rew, setRew] = useState()

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

  useEffect(() => {
    if(editModalOpen || moderationOpen){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    }
  }, [editModalOpen, moderationOpen]);

  const isCurrentUser = user && data && user.id === data.currentUser.id;
  const totalReward = data && data.reward.length > 0
      ? data.reward.reduce((sum, item) => sum + item.reward, 0)
      : 0;

  const handleCreateArticle = () => {
    if(user?.scopes.includes("article.write") || user?.role === "ADMIN"){
      navigate("/create-article");
    } else {
      toast.info("Для написания вашей первой статьи необходимо перейти в \"Редактировать профиль\" и нажать на кнопку \"Стать автором\"");
    }
  }

  const handleReward = () => {
    toast.info("Пока что деньги вывести нельзя, поскольку Stripe не разрешает такие операции в тестовом режиме.");
  }

  return !data || isLoading ? (<Loader />) : (
    <div className="profile-page">
      <h2>Профиль</h2>

      <div className="profile-info">
        <img src={defaultAvatar} alt="Аватар" className="profile-avatar" />
        <p>
          <strong>Имя:</strong> {data.currentUser?.fname || 'Имя'}
        </p>
        <p><strong>Фамилия:</strong> {data.currentUser?.lname || 'Фамилия'}</p>
        <p><strong>Статус:</strong> {data.currentUser?.role || "Пользователь"}</p>

        {isCurrentUser && (
          <div className="button-group">
            <button className="create-article-btn" onClick={handleCreateArticle}>Создать статью</button>

            <button className="edit-btn" onClick={() => setEditModalOpen(true)}>
              Редактировать профиль
            </button>
          </div>
        )}
      </div>

      {isCurrentUser && (
          <div className="profile-buttons">
            {data.currentUser?.role === 'ADMIN' && (
                <button className="moderation-btn" onClick={() => setModerationOpen(true)}>
                  Модерация
                </button>
            )}
            {data.subs.length === 0 && data.currentUser?.role === 'USER' && (
                <button className="subscription-btn" onClick={() => navigate('/subscribe')}>
                  Оформить подписку
                </button>
            )}
          </div>
      )}

      {(user?.role === "ADMIN"
          || (user?.role === "AUTHOR" && data.currentUser?.id === user?.id)) && (
          <div className="reward">
            <h3>Вознаграждение</h3>
            <div className="reward-info">
              <span>На сегодняшний день заработок с платформы GreenInsight составил</span>
              <span>${totalReward}</span>
            </div>
            {data.currentUser?.id === user?.id && (
                <div className="reward-action">
                  <button className="reward-btn" onClick={handleReward}>Получить</button>
                </div>
            )}
          </div>
      )}

      {(user?.id === data.currentUser?.id || user?.role === "ADMIN") && data.subs.length > 0 && (
          <div className="my-subs">
            <h3>Активные подписки</h3>
            {data.subs.map((sub) => (
                <SubscriptionCard subscription={sub} />
            ))}
          </div>
      )}

      {(data.currentUser?.role === 'AUTHOR'
          || data.currentUser?.role === 'ADMIN'
          || data.currentUser?.scopes.includes("article.write")) && (
        <div className="author-section">
          <div className="tabs">
            <h3>{data.currentUser?.id === user?.id ? "Мои статьи" : "Статьи автора"}</h3>
          </div>

          <div className="tab-content">
            {data.articles?.length === 0 ? (
                <p>У вас пока нет опубликованных статей.</p>
            ) : (
                data.articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))
            )}
          </div>
        </div>
      )}

      {editModalOpen && (
        <div className="modal-overlay" onClick={() => setEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <EditProfileModal
                user={data.currentUser}
                onClose={() => setEditModalOpen(false)}
                refresh={refresh}
            />
          </div>
        </div>
      )}

      {moderationOpen && (
        <div className="modal-overlay" onClick={() => setModerationOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ModerationTab
                userId={user?.id}
                currentUserId={data.currentUser?.id}
                close={() => setModerationOpen(false)}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
