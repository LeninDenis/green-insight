import React from 'react';
import '../styles/Support.css';

const SupportPage = () => {
  return (
    <div className="support-page">
      <h1>Поддержка</h1>
      <p>Если у вас возникли вопросы или проблемы, не стесняйтесь обращаться к нам.</p>
      <p>Вы можете написать нам на электронную почту: <strong>support@greeninsight.com</strong></p>
      <p>Или заполнить форму на нашем сайте.</p>
      <h2>Часто задаваемые вопросы:</h2>
      <ul>
        <li>Как подписаться на платный доступ?</li>
        <li>Как отменить подписку?</li>
        <li>Как внести изменения в мой профиль?</li>
        <li>Как сообщить об ошибке на сайте?</li>
      </ul>
    </div>
  );
};

export default SupportPage;