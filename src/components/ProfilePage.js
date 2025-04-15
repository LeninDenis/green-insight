import React, { useState } from 'react';
import '../styles/ProfilePage.css';
import defaultAvatar from '../assets/avatar/default-avatar.jpg';
import SubscriptionsModal from '../components/SubscriptionsModal';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [status, setStatus] = useState(user?.status || 'Читатель');

  const subscriptions = ['Автор 1', 'Автор 2', 'Автор 3'];

  const handleBecomeAuthor = () => {
    alert('Заявка на статус автора отправлена!');
    // setStatus('Автор');
  };

  return (
    <div className="profile-page">
      <h2>Профиль</h2>
      <div className="profile-info">
        <img src={defaultAvatar} alt="Аватар" className="profile-avatar" />
        <p><strong>Имя:</strong> {user?.fname || 'Имя'}</p>
        <p><strong>Фамилия:</strong> {user?.lname || 'Фамилия'}</p>
        <p><strong>Статус:</strong> {status}</p>
      </div>

      {status === 'Автор' && (
        <div className="author-section">
          <h3>Мои статьи</h3>
          <ul>
            <li><a href="/article/1">Первая статья</a></li>
            <li><a href="/article/2">Вторая статья</a></li>
          </ul>
          <button className="subscription-btn">Оформить подписку</button>
        </div>
      )}

          <div className="profile-buttons">
            {status === 'Читатель' && user && (
              <button className="subscription-btn" onClick={() => setShowSubscriptions(true)}>
                Мои подписки
              </button>
            )}

            {status !== 'Автор' && user && (
              <button className="subscription-btn" onClick={handleBecomeAuthor}>
                Стать автором
              </button>
            )}

            {user && (
              <button className="logout-btn">Выйти</button>
            )}
          </div>


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