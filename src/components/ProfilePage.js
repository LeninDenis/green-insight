import React from 'react';
import '../styles/ProfilePage.css';
import defaultAvatar from '../assets/avatar/default-avatar.jpg';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h2>Профиль</h2>
      <div className="profile-info">
        <img src={defaultAvatar} alt="Аватар" className="profile-avatar" />
        <p><strong>Имя:</strong> Денис</p>
        <p><strong>Фамилия:</strong> Ленин</p>
        <p><strong>Статус:</strong> Автор</p>
      </div>

      <div className="author-section">
        <h3>Мои статьи</h3>
        <ul>
          <li><a href="/article/1">Первая статья</a></li>
          <li><a href="/article/2">Вторая статья</a></li>
        </ul>

        <button className="subscription-btn">Оформить подписку</button>
      </div>

      <button className="logout-btn">Выйти</button>
    </div>
  );
};

export default ProfilePage;
